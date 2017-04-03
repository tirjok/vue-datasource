<template>
  <div class="vue-datasource">
    <div class="box">
      <nav class="level structure-item is-structure-container">
        <!--limits-->
        <div class="level-left structure-item">
          <div class="level-item">
            <p class="subtitle is-5">
              <strong>{{ translation.table.label_limits }}</strong>
            </p>
          </div>
          <div class="level-item">
             <p class="select">
               <select v-model="perpage" number>
                 <option v-for="limit in limits" :value="limit">{{ limit }}</option>
               </select>
             </p>
          </div>

        </div><!--/limits-->
        <!--search-input-->
        <div class="level-right">
          <div class="level-item">
            <p class="control has-addons">
              <input class="input" type="text"
                     v-model="search"
                     :placeholder="translation.table.placeholder_search">

              <button type="button" class="button is-primary"
                      @click.prevent="searching">{{ translation.table.label_search }}
              </button>
            </p>
          </div>

        </div><!--/search-input-->
      </nav>

      <table class="table is-narrow">
        <thead>
        <tr>
          <!--columns-->
          <th v-for="column in columns">{{ column.name }}</th>
          <!--/columns-->
        </tr>
        </thead>
        <tbody>
        <tr v-if="pagination.total == 0">
          <td :colspan="columns.length">{{ translation.table.records_not_found }}</td>
        </tr>
        <!--rows-->
        <tr v-else
            :class="{ 'success': (index == indexSelected) }"
            v-for="(row, index) in tableData"
            @click.prevent="selectRow(row, index)">
          <td v-for="k in columns">
            {{ fetchFromObject(row, k.key, k.render) }}
          </td>
        </tr>
        <!--/rows-->
        <tr>
          <!--info-table-->
          <td class="text-center" :colspan="columns.length">
            {{ tableInfo }}
          </td>
          <!--/info-table-->
        </tr>
        </tbody>
      </table>

      <!-- Main container -->
      <nav class="level">
        <!-- Left side -->
        <div class="level-left">
          <div class="level-item">
            <div class="control has-addons">
              <a v-for="btn in actions" class="button" :class="btn.class" @click="btn.event($event, selected)">
                  <span class="icon is-small" v-if="btn.icon">
                    <i :class="btn.icon"></i>
                  </span>
                <span>{{ btn.text }}</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Right side -->
        <div class="level-right">
          <p class="level-item">
            <pagination :pages="pagination" :translation="translation.pagination" @change="changePage"></pagination>
          </p>
        </div>
      </nav>
    </div>
  </div>
</template>
<script type="text/babel">
  import Utils from './utils/DatasourceUtils';
  import Language from './utils/DatasourceLanguage';
  import Pagination from './components/Pagination.vue';

  export default {
    components: {
      Pagination
    },
    props: {
      /**
       * Table information
       * @type {Array}
       */
      tableData: {
        type: Array,
        required: true
      },
      /**
       * Defines the table labels language
       * @type {String}
       */
      language: {
        type: String,
        default: 'es'
      },
      /**
       * Columns to display
       * @type {Array}
       */
      columns: {
        type: Array,
        required: true
      },
      /**
       * Pagination information about the table data
       * @type {Object}
       */
      pagination: {
        type: Object,
        default() {
          return {
            total: 0,
            to: 0,
            from: 0,
            per_page: 15
          }
        }
      },
      /**
       * Action buttons
       * @type {Array}
       */
      actions: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        limits: [1, 5, 10, 15, 20], // values that the user can select to display records
        perpage: 15, // default value to show records
        selected: null, // row and Object selected on click event
        indexSelected: -1, // index row selected on click event
        search: '' // word to search in the table
      }
    },
    computed: {
      /**
       * Defines the table labels language
       * @return {Object}
       */
      translation() {
        return Language.translations[this.language];
      },
      tableInfo: Utils.tableInfo
    },
    methods: {
      fetchFromObject: Utils.fetchFromObject,
      changePage: Utils.changePage,
      selectRow: Utils.selectRow,
      searching() {
        this.selected = null;
        this.indexSelected = -1;
        this.$emit('searching', this.search);
      }
    },
    watch: {
      /**
       * Handle show limit changed.
       * @return {void}
       */
      perpage() {
        this.selected = null;
        this.indexSelected = -1;
        this.$emit('change', {perpage: this.perpage, page: 1});
      },
      tableData() {
        this.selected = null;
        this.indexSelected = -1;
      }
    }
  }
</script>

<style>
  .success {
    background-color: lightgreen;
  }
</style>

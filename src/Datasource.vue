<script>
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
            },
            theme: {
                type: String,
                default: 'bootstrap-3'
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
        created () {
            this.$options.template = require(`./themes/${this.theme}/table.html`)
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
                this.indexSelected  = -1;
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
                this.$emit('change', { perpage: this.perpage, page: 1 });
            },
            /**
             * Handle reset selected item
             * @return {void}
             */
            tableData() {
                this.selected = null;
                this.indexSelected = -1;
            }
        }
    }
</script>
<style lang="sass" scoped>
    /************************************** Bootstrap 3 */
    .vue-datasource-b3 {
        .panel {
            .panel-body {
                padding: 0;
                .table {
                    margin: 0;
                }
            }
            .panel-footer {
                .Vue__datasource_actions {
                    margin-top: 10px;
                }
            }
        }
    }
    /************************************* /Bootstrap 3 */
    
    /************************************** Bootstrap 4 */
    .vue-datasource-b4 {
        .card {
            .card-block {
                padding: 0;
                .table {
                    margin-bottom: 0;
                }
            }
        }
    }
    /************************************* /Bootstrap 4 */

    /******************************************** Bulma */
    .vue-datasource-bulma {
        .panel {
            .panel-block {
                padding: 0;
                .table {
                    margin-bottom: 0;
                    tr {
                        &.success {
                            background: #dff0d8;
                        }
                    }
                }
            }
            .vue-actions {
                .button {
                    margin-right: 3px;
                }
            }
        }
    }
    /******************************************* /Bulma */
</style>
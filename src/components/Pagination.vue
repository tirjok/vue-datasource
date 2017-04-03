<template>
  <nav class="pagination is-right" aria-label="Page pagination">
    <ul class="pagination-list">
      <li>
        <a class="pagination-link" href="#" @click.prevent="firstPage" :disabled="pages.current_page == 1">
          {{ translation.btn_first }}
        </a>
      </li>
      <li>
        <a class="pagination-link" href="#" @click.prevent="previous"
           :disabled="pages.current_page == 1"
           aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li v-for="n in items">
        <a class="pagination-link" :class="(pages.current_page == n) ? 'is-current': ''"
           href="#" @click.prevent="change(n)">{{ n }}</a>
      </li>
      <li>
        <a class="pagination-link" href="#" @click.prevent="next"
           :disabled="pages.current_page === pages.last_page"
           aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
      <li>
        <a class="pagination-link" href="#" @click.prevent="lastPage(pages.last_page)"
           :disabled="pages.current_page === pages.last_page">
          {{ translation.btn_last }}
        </a>
      </li>
    </ul>
  </nav>
</template>
<script type="text/babel">
  export default {
    props: ['pages', 'translation'],
    computed: {
      items() {
        let temp = [],
          bottomLimit = this.pages.current_page - 2,
          topLimit = this.pages.current_page + 2,
          showing = 5;

        if (bottomLimit <= 0) {
          bottomLimit = 1;
          topLimit = 5;
        }

        if (topLimit >= this.pages.last_page) {
          bottomLimit = this.pages.last_page - 4;
          topLimit = this.pages.last_page;
        }

        if (this.pages.last_page < 5) {
          showing = this.pages.last_page;
        }

        if (bottomLimit <= 0) {
          bottomLimit = 1;
        }

        if (this.pages.last_page == 0 || this.pages.last_page == 1) {
          showing = 1;
        }

        for (let i = 0; i < showing; i++) {
          temp[i] = i + bottomLimit;
        }

        return temp;
      }
    },
    methods: {
      firstPage() {
        if (this.pages.current_page != 1) {
          this.change(1);
        }
      },
      previous() {
        if (this.pages.current_page != 1) {
          this.change(--this.pages.current_page);
        }
      },
      change(page) {
        this.$emit('change', page);
      },
      next() {
        if (this.pages.current_page != this.pages.last_page) {
          this.change(++this.pages.current_page);
        }
      },
      lastPage(page){
        if (this.pages.current_page != this.pages.last_page) {
          this.change(page);
        }
      },
      changePageWithKeyBoard(key) {
        if (key === 'ArrowLeft') {
          this.previous();
        }
        else if (key === 'ArrowRight') {
          this.next();
        }
      }
    },
    created() {
      window.addEventListener('keyup', ({key}) => this.changePageWithKeyBoard(key));
    }
  }
</script>

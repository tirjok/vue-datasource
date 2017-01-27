<script type="text/babel">
    export default {
        props: ['pages', 'translation', 'theme'],
        created() {
            this.$options.template = require(`../themes/${this.theme}/pagination.html`)
        },
        computed: {
            items() {
                let temp = [],
                    bottomLimit = this.pages.current_page - 2,
                    topLimit = this.pages.current_page + 2,
                    showing = 5;

                if(bottomLimit <= 0) {
                    bottomLimit = 1;
                    topLimit = 5;
                }

                if(topLimit >= this.pages.last_page) {
                    bottomLimit = this.pages.last_page-4;
                    topLimit = this.pages.last_page;
                }

                if(this.pages.last_page < 5) {
                    showing = this.pages.last_page;
                }

                if(bottomLimit <= 0) {
                    bottomLimit = 1;
                }

                if(this.pages.last_page == 0 || this.pages.last_page == 1) {
                    showing = 1;
                }

                for(let i=0; i<showing; i++) {
                    temp[i] = i + bottomLimit;
                }

                return temp;
            }
        },
        methods: {
            firstPage() {
                if(this.pages.current_page != 1) {
                    this.change(1);
                }
            },
            previous() {
                if(this.pages.current_page != 1) {
                    this.change(--this.pages.current_page);
                }
            },
            change(page) {
                this.$emit('change', page);
            },
            next() {
                if(this.pages.current_page != this.pages.last_page) {
                    this.change(++this.pages.current_page);
                }
            },
            lastPage(page){
                if(this.pages.current_page != this.pages.last_page) {
                    this.change(page);
                }
            }
        }
    }
</script>
<style lang="sass" scoped>
    .Vue__pagination {
        nav {
            .pagination {
                margin: 10px 0 !important;
            }
        }
    }
</style>
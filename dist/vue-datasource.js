(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueDatasourceComponent"] = factory();
	else
		root["VueDatasourceComponent"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = __webpack_require__(5);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _DatasourceUtils = __webpack_require__(4);
	
	var _DatasourceUtils2 = _interopRequireDefault(_DatasourceUtils);
	
	var _DatasourceLanguage = __webpack_require__(3);
	
	var _DatasourceLanguage2 = _interopRequireDefault(_DatasourceLanguage);
	
	var _Pagination = __webpack_require__(6);
	
	var _Pagination2 = _interopRequireDefault(_Pagination);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: {
	    Pagination: _Pagination2.default
	  },
	  props: {
	    tableData: {
	      type: Array,
	      required: true
	    },
	
	    language: {
	      type: String,
	      default: 'es'
	    },
	
	    columns: {
	      type: Array,
	      required: true
	    },
	
	    pagination: {
	      type: Object,
	      default: function _default() {
	        return {
	          total: 0,
	          to: 0,
	          from: 0,
	          per_page: 15
	        };
	      }
	    },
	
	    actions: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    }
	  },
	  data: function data() {
	    return {
	      limits: [1, 5, 10, 15, 20],
	      perpage: 15,
	      selected: null,
	      indexSelected: -1,
	      search: '' };
	  },
	
	  computed: {
	    translation: function translation() {
	      return _DatasourceLanguage2.default.translations[this.language];
	    },
	
	    tableInfo: _DatasourceUtils2.default.tableInfo
	  },
	  methods: {
	    fetchFromObject: _DatasourceUtils2.default.fetchFromObject,
	    changePage: _DatasourceUtils2.default.changePage,
	    selectRow: _DatasourceUtils2.default.selectRow,
	    searching: function searching() {
	      this.selected = null;
	      this.indexSelected = -1;
	      this.$emit('searching', this.search);
	    }
	  },
	  watch: {
	    perpage: function perpage() {
	      this.selected = null;
	      this.indexSelected = -1;
	      this.$emit('change', { perpage: this.perpage, page: 1 });
	    },
	    tableData: function tableData() {
	      this.selected = null;
	      this.indexSelected = -1;
	    }
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  props: ['pages', 'translation'],
	  computed: {
	    items: function items() {
	      var temp = [],
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
	
	      for (var i = 0; i < showing; i++) {
	        temp[i] = i + bottomLimit;
	      }
	
	      return temp;
	    }
	  },
	  methods: {
	    firstPage: function firstPage() {
	      if (this.pages.current_page != 1) {
	        this.change(1);
	      }
	    },
	    previous: function previous() {
	      if (this.pages.current_page != 1) {
	        this.change(--this.pages.current_page);
	      }
	    },
	    change: function change(page) {
	      this.$emit('change', page);
	    },
	    next: function next() {
	      if (this.pages.current_page != this.pages.last_page) {
	        this.change(++this.pages.current_page);
	      }
	    },
	    lastPage: function lastPage(page) {
	      if (this.pages.current_page != this.pages.last_page) {
	        this.change(page);
	      }
	    },
	    changePageWithKeyBoard: function changePageWithKeyBoard(key) {
	      if (key === 'ArrowLeft') {
	        this.previous();
	      } else if (key === 'ArrowRight') {
	        this.next();
	      }
	    }
	  },
	  created: function created() {
	    var _this = this;
	
	    window.addEventListener('keyup', function (_ref) {
	      var key = _ref.key;
	      return _this.changePageWithKeyBoard(key);
	    });
	  }
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  translations: {
	    'en': {
	      'table': {
	        'label_limits': 'Show',
	        'label_search': 'Search',
	        'placeholder_search': 'Type to search..',
	        'records_not_found': 'No records found'
	      },
	      'pagination': {
	        'label_show': 'Showing',
	        'label_to': 'to',
	        'label_of': 'of',
	        'label_entries': 'entries',
	        'btn_first': 'First',
	        'btn_last': 'Latest'
	      }
	    },
	
	    'es': {
	      'table': {
	        'label_limits': 'Mostrar',
	        'label_search': 'Buscar',
	        'placeholder_search': 'Buscar ..',
	        'records_not_found': 'No se encontraron registros.'
	      },
	      'pagination': {
	        'label_show': 'Mostrando',
	        'label_to': 'a',
	        'label_of': 'de',
	        'label_entries': 'registros',
	        'btn_first': 'Primero',
	        'btn_last': 'Último'
	      }
	    },
	
	    'fr': {
	      'table': {
	        'label_limits': 'Afficher',
	        'label_search': 'Recherche',
	        'placeholder_search': 'Recherche par mot-clé..',
	        'records_not_found': 'Aucun enregistrements trouvés'
	      },
	      'pagination': {
	        'label_show': 'Affichage de',
	        'label_to': 'à',
	        'label_of': 'de',
	        'label_entries': 'entrées',
	        'btn_first': 'Première',
	        'btn_last': 'Dernière'
	      }
	    }
	  }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  fetchFromObject: function fetchFromObject(obj, column, render) {
	    if (typeof obj === 'undefined') return false;
	    var _index = column.indexOf('.');
	    if (_index > -1) {
	      return this.fetchFromObject(obj[column.substring(0, _index)], column.substr(_index + 1));
	    }
	    if (typeof render != 'undefined') {
	      return render(obj[column]);
	    }
	    return obj[column];
	  },
	  changePage: function changePage(page) {
	    this.selected = null;
	    this.indexSelected = -1;
	    this.$emit('change', { perpage: this.perpage, page: page });
	  },
	  selectRow: function selectRow(row, index) {
	    if (this.indexSelected == index) {
	      this.indexSelected = -1;
	      this.selected = null;
	    } else {
	      this.indexSelected = index;
	      this.selected = {
	        'row': row,
	        'index': index
	      };
	    }
	  },
	  tableInfo: function tableInfo() {
	    var label_show = this.translation.pagination.label_show;
	    var from = this.pagination.from == null ? 0 : this.pagination.from;
	    var label_to = this.translation.pagination.label_to;
	    var to = this.pagination.to == null ? 0 : this.pagination.to;
	    var label_of = this.translation.pagination.label_of;
	    var total = this.pagination.total;
	    var label_entries = this.translation.pagination.label_entries;
	
	    return label_show + ' ' + from + ' ' + label_to + ' ' + to + ' ' + label_of + ' ' + total + ' ' + label_entries;
	  }
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(1)
	
	/* template */
	var __vue_template__ = __webpack_require__(8)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(2)
	
	/* template */
	var __vue_template__ = __webpack_require__(7)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	module.exports = __vue_exports__


/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('nav', {
	    staticClass: "pagination is-right",
	    attrs: {
	      "aria-label": "Page pagination"
	    }
	  }, [_c('ul', {
	    staticClass: "pagination-list"
	  }, [_c('li', [_c('a', {
	    staticClass: "pagination-link",
	    attrs: {
	      "href": "#",
	      "disabled": _vm.pages.current_page == 1
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.firstPage($event)
	      }
	    }
	  }, [_vm._v("\n        " + _vm._s(_vm.translation.btn_first) + "\n      ")])]), _vm._v(" "), _c('li', [_c('a', {
	    staticClass: "pagination-link",
	    attrs: {
	      "href": "#",
	      "disabled": _vm.pages.current_page == 1,
	      "aria-label": "Previous"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.previous($event)
	      }
	    }
	  }, [_c('span', {
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }, [_vm._v("«")])])]), _vm._v(" "), _vm._l((_vm.items), function(n) {
	    return _c('li', [_c('a', {
	      staticClass: "pagination-link",
	      class: (_vm.pages.current_page == n) ? 'is-current' : '',
	      attrs: {
	        "href": "#"
	      },
	      on: {
	        "click": function($event) {
	          $event.preventDefault();
	          _vm.change(n)
	        }
	      }
	    }, [_vm._v(_vm._s(n))])])
	  }), _vm._v(" "), _c('li', [_c('a', {
	    staticClass: "pagination-link",
	    attrs: {
	      "href": "#",
	      "disabled": _vm.pages.current_page === _vm.pages.last_page,
	      "aria-label": "Next"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.next($event)
	      }
	    }
	  }, [_c('span', {
	    attrs: {
	      "aria-hidden": "true"
	    }
	  }, [_vm._v("»")])])]), _vm._v(" "), _c('li', [_c('a', {
	    staticClass: "pagination-link",
	    attrs: {
	      "href": "#",
	      "disabled": _vm.pages.current_page === _vm.pages.last_page
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.lastPage(_vm.pages.last_page)
	      }
	    }
	  }, [_vm._v("\n        " + _vm._s(_vm.translation.btn_last) + "\n      ")])])], 2)])
	},staticRenderFns: []}

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "vue-datasource"
	  }, [_c('div', {
	    staticClass: "box"
	  }, [_c('nav', {
	    staticClass: "level structure-item is-structure-container"
	  }, [_c('div', {
	    staticClass: "level-left structure-item"
	  }, [_c('div', {
	    staticClass: "level-item"
	  }, [_c('p', {
	    staticClass: "subtitle is-5"
	  }, [_c('strong', [_vm._v(_vm._s(_vm.translation.table.label_limits))])])]), _vm._v(" "), _c('div', {
	    staticClass: "level-item"
	  }, [_c('p', {
	    staticClass: "select"
	  }, [_c('select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.perpage),
	      expression: "perpage"
	    }],
	    attrs: {
	      "number": ""
	    },
	    on: {
	      "change": function($event) {
	        var $$selectedVal = Array.prototype.filter.call($event.target.options, function(o) {
	          return o.selected
	        }).map(function(o) {
	          var val = "_value" in o ? o._value : o.value;
	          return val
	        });
	        _vm.perpage = $event.target.multiple ? $$selectedVal : $$selectedVal[0]
	      }
	    }
	  }, _vm._l((_vm.limits), function(limit) {
	    return _c('option', {
	      domProps: {
	        "value": limit
	      }
	    }, [_vm._v(_vm._s(limit))])
	  }))])])]), _vm._v(" "), _c('div', {
	    staticClass: "level-right"
	  }, [_c('div', {
	    staticClass: "level-item"
	  }, [_c('p', {
	    staticClass: "control has-addons"
	  }, [_c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.search),
	      expression: "search"
	    }],
	    staticClass: "input",
	    attrs: {
	      "type": "text",
	      "placeholder": _vm.translation.table.placeholder_search
	    },
	    domProps: {
	      "value": (_vm.search)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.search = $event.target.value
	      }
	    }
	  }), _vm._v(" "), _c('button', {
	    staticClass: "button is-primary",
	    attrs: {
	      "type": "button"
	    },
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.searching($event)
	      }
	    }
	  }, [_vm._v(_vm._s(_vm.translation.table.label_search) + "\n            ")])])])])]), _vm._v(" "), _c('table', {
	    staticClass: "table is-striped Vue__table"
	  }, [_c('thead', [_c('tr', _vm._l((_vm.columns), function(column) {
	    return _c('th', [_vm._v(_vm._s(column.name))])
	  }))]), _vm._v(" "), _c('tbody', [(_vm.pagination.total == 0) ? _c('tr', [_c('td', {
	    attrs: {
	      "colspan": _vm.columns.length
	    }
	  }, [_vm._v(_vm._s(_vm.translation.table.records_not_found))])]) : _vm._l((_vm.tableData), function(row, index) {
	    return _c('tr', {
	      class: {
	        'success': (index == _vm.indexSelected)
	      },
	      on: {
	        "click": function($event) {
	          $event.preventDefault();
	          _vm.selectRow(row, index)
	        }
	      }
	    }, _vm._l((_vm.columns), function(k) {
	      return _c('td', [_vm._v("\n          " + _vm._s(_vm.fetchFromObject(row, k.key, k.render)) + "\n        ")])
	    }))
	  }), _vm._v(" "), _c('tr', [_c('td', {
	    staticClass: "text-center",
	    attrs: {
	      "colspan": _vm.columns.length
	    }
	  }, [_vm._v("\n          " + _vm._s(_vm.tableInfo) + "\n        ")])])], 2)]), _vm._v(" "), _c('nav', {
	    staticClass: "level"
	  }, [_c('div', {
	    staticClass: "level-left"
	  }, [_c('div', {
	    staticClass: "level-item"
	  }, [_c('div', {
	    staticClass: "control has-addons"
	  }, _vm._l((_vm.actions), function(btn) {
	    return _c('a', {
	      staticClass: "button",
	      class: btn.class,
	      on: {
	        "click": function($event) {
	          btn.event($event, _vm.selected)
	        }
	      }
	    }, [(btn.icon) ? _c('span', {
	      staticClass: "icon is-small"
	    }, [_c('i', {
	      class: btn.icon
	    })]) : _vm._e(), _vm._v(" "), _c('span', [_vm._v(_vm._s(btn.text))])])
	  }))])]), _vm._v(" "), _c('div', {
	    staticClass: "level-right"
	  }, [_c('p', {
	    staticClass: "level-item"
	  }, [_c('pagination', {
	    attrs: {
	      "pages": _vm.pagination,
	      "translation": _vm.translation.pagination
	    },
	    on: {
	      "change": _vm.changePage
	    }
	  })], 1)])])])])
	},staticRenderFns: []}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=vue-datasource.js.map
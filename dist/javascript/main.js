// Config
// Selectors
// store selectors for reference so we only call them once
var words = document.getElementsByClassName('words');
var highlight = document.getElementById('highlighted');
Array.prototype.forEach.call(words, function (element) {
  console.log(element);
  element.innerHTML = element.innerHTML.replace(/(^|<\/?[^>]+>|\s+)([^\s<]+)/g, '$1<span class="word">$2</span>');
  element.addEventListener('click', function (eventAction) {
    if (eventAction.target.classList.contains('word')) {
      eventAction.target.classList.toggle('highlighted');
      highlighted.innerHTML = 'Highlighted: ' + element.querySelectorAll('.highlighted').length;
    }
  }, true);
});
/*
    JavaScript autoComplete v1.0.4
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/JavaScript-autoComplete
    License: http://www.opensource.org/licenses/mit-license.php
*/
// var autoComplete = (function(){
//   // "use strict";
//   function autoComplete(options){
//       if (!document.querySelector) return;
//       // helpers
//       function hasClass(el, className){ return el.classList ? el.classList.contains(className) : new RegExp('\\b'+ className+'\\b').test(el.className); }
//       function addEvent(el, type, handler){
//           if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
//       }
//       function removeEvent(el, type, handler){
//           // if (el.removeEventListener) not working in IE11
//           if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
//       }
//       function live(elClass, event, cb, context){
//           addEvent(context || document, event, function(e){
//               var found, el = e.target || e.srcElement;
//               while (el && !(found = hasClass(el, elClass))) el = el.parentElement;
//               if (found) cb.call(el, e);
//           });
//       }
//       var o = {
//           selector: 0,
//           source: 0,
//           minChars: 3,
//           delay: 150,
//           offsetLeft: 0,
//           offsetTop: 1,
//           cache: 1,
//           menuClass: '',
//           renderItem: function (item, search){
//               // escape special characters
//               search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
//               var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
//               return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, "<b>$1</b>") + '</div>';
//           },
//           onSelect: function(e, term, item){}
//       };
//       for (var k in options) { if (options.hasOwnProperty(k)) o[k] = options[k]; }
//       // init
//       var elems = typeof o.selector == 'object' ? [o.selector] : document.querySelectorAll(o.selector);
//       for (var i=0; i<elems.length; i++) {
//           var that = elems[i];
//           // create suggestions container "sc"
//           that.sc = document.createElement('div');
//           that.sc.className = 'autocomplete-suggestions '+o.menuClass;
//           that.autocompleteAttr = that.getAttribute('autocomplete');
//           that.setAttribute('autocomplete', 'off');
//           that.cache = {};
//           that.last_val = '';
//           that.updateSC = function(resize, next){
//               var rect = that.getBoundingClientRect();
//               that.sc.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + o.offsetLeft) + 'px';
//               that.sc.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + o.offsetTop) + 'px';
//               that.sc.style.width = Math.round(rect.right - rect.left) + 'px'; // outerWidth
//               if (!resize) {
//                   that.sc.style.display = 'block';
//                   if (!that.sc.maxHeight) { that.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(that.sc, null) : that.sc.currentStyle).maxHeight); }
//                   if (!that.sc.suggestionHeight) that.sc.suggestionHeight = that.sc.querySelector('.autocomplete-suggestion').offsetHeight;
//                   if (that.sc.suggestionHeight)
//                       if (!next) that.sc.scrollTop = 0;
//                       else {
//                           var scrTop = that.sc.scrollTop, selTop = next.getBoundingClientRect().top - that.sc.getBoundingClientRect().top;
//                           if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0)
//                               that.sc.scrollTop = selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight;
//                           else if (selTop < 0)
//                               that.sc.scrollTop = selTop + scrTop;
//                       }
//               }
//           }
//           addEvent(window, 'resize', that.updateSC);
//           document.body.appendChild(that.sc);
//           live('autocomplete-suggestion', 'mouseleave', function(e){
//               var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
//               if (sel) setTimeout(function(){ sel.className = sel.className.replace('selected', ''); }, 20);
//           }, that.sc);
//           live('autocomplete-suggestion', 'mouseover', function(e){
//               var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
//               if (sel) sel.className = sel.className.replace('selected', '');
//               this.className += ' selected';
//           }, that.sc);
//           live('autocomplete-suggestion', 'mousedown', function(e){
//               if (hasClass(this, 'autocomplete-suggestion')) { // else outside click
//                   var v = this.getAttribute('data-val');
//                   that.value = v;
//                   o.onSelect(e, v, this);
//                   that.sc.style.display = 'none';
//               }
//           }, that.sc);
//           that.blurHandler = function(){
//               try { var over_sb = document.querySelector('.autocomplete-suggestions:hover'); } catch(e){ var over_sb = 0; }
//               if (!over_sb) {
//                   that.last_val = that.value;
//                   that.sc.style.display = 'none';
//                   setTimeout(function(){ that.sc.style.display = 'none'; }, 350); // hide suggestions on fast input
//               } else if (that !== document.activeElement) setTimeout(function(){ that.focus(); }, 20);
//           };
//           addEvent(that, 'blur', that.blurHandler);
//           var suggest = function(data){
//               var val = that.value;
//               that.cache[val] = data;
//               if (data.length && val.length >= o.minChars) {
//                   var s = '';
//                   for (var i=0;i<data.length;i++) s += o.renderItem(data[i], val);
//                   that.sc.innerHTML = s;
//                   that.updateSC(0);
//               }
//               else
//                   that.sc.style.display = 'none';
//           }
//           that.keydownHandler = function(e){
//               var key = window.event ? e.keyCode : e.which;
//               // down (40), up (38)
//               if ((key == 40 || key == 38) && that.sc.innerHTML) {
//                   var next, sel = that.sc.querySelector('.autocomplete-suggestion.selected');
//                   if (!sel) {
//                       next = (key == 40) ? that.sc.querySelector('.autocomplete-suggestion') : that.sc.childNodes[that.sc.childNodes.length - 1]; // first : last
//                       next.className += ' selected';
//                       that.value = next.getAttribute('data-val');
//                   } else {
//                       next = (key == 40) ? sel.nextSibling : sel.previousSibling;
//                       if (next) {
//                           sel.className = sel.className.replace('selected', '');
//                           next.className += ' selected';
//                           that.value = next.getAttribute('data-val');
//                       }
//                       else { sel.className = sel.className.replace('selected', ''); that.value = that.last_val; next = 0; }
//                   }
//                   that.updateSC(0, next);
//                   return false;
//               }
//               // esc
//               else if (key == 27) { that.value = that.last_val; that.sc.style.display = 'none'; }
//               // enter
//               else if (key == 13 || key == 9) {
//                   var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
//                   if (sel && that.sc.style.display != 'none') { o.onSelect(e, sel.getAttribute('data-val'), sel); setTimeout(function(){ that.sc.style.display = 'none'; }, 20); }
//               }
//           };
//           addEvent(that, 'keydown', that.keydownHandler);
//           that.keyupHandler = function(e){
//               var key = window.event ? e.keyCode : e.which;
//               if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
//                   var val = that.value;
//                   if (val.length >= o.minChars) {
//                       if (val != that.last_val) {
//                           that.last_val = val;
//                           clearTimeout(that.timer);
//                           if (o.cache) {
//                               if (val in that.cache) { suggest(that.cache[val]); return; }
//                               // no requests if previous suggestions were empty
//                               for (var i=1; i<val.length-o.minChars; i++) {
//                                   var part = val.slice(0, val.length-i);
//                                   if (part in that.cache && !that.cache[part].length) { suggest([]); return; }
//                               }
//                           }
//                           that.timer = setTimeout(function(){ o.source(val, suggest) }, o.delay);
//                       }
//                   } else {
//                       that.last_val = val;
//                       that.sc.style.display = 'none';
//                   }
//               }
//           };
//           addEvent(that, 'keyup', that.keyupHandler);
//           that.focusHandler = function(e){
//               that.last_val = '\n';
//               that.keyupHandler(e)
//           };
//           if (!o.minChars) addEvent(that, 'focus', that.focusHandler);
//       }
//       // public destroy method
//       this.destroy = function(){
//           for (var i=0; i<elems.length; i++) {
//               var that = elems[i];
//               removeEvent(window, 'resize', that.updateSC);
//               removeEvent(that, 'blur', that.blurHandler);
//               removeEvent(that, 'focus', that.focusHandler);
//               removeEvent(that, 'keydown', that.keydownHandler);
//               removeEvent(that, 'keyup', that.keyupHandler);
//               if (that.autocompleteAttr)
//                   that.setAttribute('autocomplete', that.autocompleteAttr);
//               else
//                   that.removeAttribute('autocomplete');
//               document.body.removeChild(that.sc);
//               that = null;
//           }
//       };
//   }
//   return autoComplete;
// })();
// (function(){
//   if (typeof define === 'function' && define.amd)
//       define('autoComplete', function () { return autoComplete; });
//   else if (typeof module !== 'undefined' && module.exports)
//       module.exports = autoComplete;
//   else
//       window.autoComplete = autoComplete;
// })();
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

!function (t, e) {
  "function" == typeof define && define.amd ? define([], e) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = e() : t.Tagify = e();
}(this, function () {
  "use strict";

  function c(t) {
    return function (t) {
      if (Array.isArray(t)) {
        for (var e = 0, i = new Array(t.length); e < t.length; e++) {
          i[e] = t[e];
        }

        return i;
      }
    }(t) || function (t) {
      if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) return Array.from(t);
    }(t) || function () {
      throw new TypeError("Invalid attempt to spread non-iterable instance");
    }();
  }

  function s(e, t) {
    var i = Object.keys(e);

    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      t && (s = s.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable;
      })), i.push.apply(i, s);
    }

    return i;
  }

  function u(e) {
    for (var t = 1; t < arguments.length; t++) {
      var i = null != arguments[t] ? arguments[t] : {};
      t % 2 ? s(i, !0).forEach(function (t) {
        r(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : s(i).forEach(function (t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }

    return e;
  }

  function r(t, e, i) {
    return e in t ? Object.defineProperty(t, e, {
      value: i,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }) : t[e] = i, t;
  }

  function t(t, e) {
    if (!t) return console.warn("Tagify: ", "invalid input element ", t), this;
    this.applySettings(t, e), this.state = {}, this.value = [], this.listeners = {}, this.DOM = {}, this.extend(this, new this.EventDispatcher(this)), this.build(t), this.loadOriginalValues(), this.events.customBinding.call(this), this.events.binding.call(this), t.autofocus && this.DOM.input.focus();
  }

  return t.prototype = {
    isIE: window.document.documentMode,
    TEXTS: {
      empty: "empty",
      exceed: "number of tags exceeded",
      pattern: "pattern mismatch",
      duplicate: "already exists",
      notAllowed: "not allowed"
    },
    DEFAULTS: {
      delimiters: ",",
      pattern: null,
      maxTags: 1 / 0,
      callbacks: {},
      addTagOnBlur: !0,
      duplicates: !1,
      whitelist: [],
      blacklist: [],
      enforceWhitelist: !1,
      keepInvalidTags: !1,
      autoComplete: !0,
      mixTagsAllowedAfter: /,|\.|\:|\s/,
      mixTagsInterpolator: ["[[", "]]"],
      backspace: !0,
      skipInvalid: !1,
      editTags: 2,
      transformTag: function transformTag() {},
      dropdown: {
        classname: "",
        enabled: 2,
        maxItems: 10,
        itemTemplate: "",
        fuzzySearch: !0,
        highlightFirst: !1,
        closeOnSelect: !0
      }
    },
    templates: {
      wrapper: function wrapper(t, e) {
        return '<tags class="tagify '.concat(e.mode ? "tagify--" + e.mode : "", " ").concat(t.className, '"\n                          ').concat(e.readonly ? 'readonly aria-readonly="true"' : 'aria-haspopup="true" aria-expanded="false"', '\n                          role="tagslist">\n                <span contenteditable data-placeholder="').concat(e.placeholder || "&#8203;", '" aria-placeholder="').concat(e.placeholder || "", '"\n                      class="tagify__input"\n                      role="textbox"\n                      aria-multiline="false"></span>\n            </tags>');
      },
      tag: function tag(t, e) {
        return "<tag title='".concat(e.title || t, "'\n                         contenteditable='false'\n                         spellcheck='false'\n                         class='tagify__tag ").concat(e["class"] ? e["class"] : "", "'\n                         ").concat(this.getAttributes(e), ">\n                <x title='' class='tagify__tag__removeBtn' role='button' aria-label='remove tag'></x>\n                <div>\n                    <span class='tagify__tag-text'>").concat(t, "</span>\n                </div>\n            </tag>");
      },
      dropdownItem: function dropdownItem(t) {
        var e = (t.value || t).replace(/`|'/g, "&#39;");
        return "<div ".concat(this.getAttributes(t), "\n                         class='tagify__dropdown__item ").concat(t["class"] ? t["class"] : "", '\'\n                         tabindex="0"\n                         role="menuitem"\n                         aria-labelledby="dropdown-label">').concat(e, "</div>");
      }
    },
    customEventsList: ["click", "add", "remove", "invalid", "input", "edit"],
    applySettings: function applySettings(t, e) {
      var i = t.getAttribute("data-whitelist"),
          s = t.getAttribute("data-blacklist");
      if (this.DEFAULTS.templates = this.templates, this.DEFAULTS.dropdown.itemTemplate = this.templates.dropdownItem, this.settings = this.extend({}, this.DEFAULTS, e), this.settings.readonly = t.hasAttribute("readonly"), this.settings.placeholder = t.getAttribute("placeholder") || this.settings.placeholder || "", this.isIE && (this.settings.autoComplete = !1), s && (s = s.split(this.settings.delimiters)) instanceof Array && (this.settings.blacklist = s), i && (i = i.split(this.settings.delimiters)) instanceof Array && (this.settings.whitelist = i), t.pattern) try {
        this.settings.pattern = new RegExp(t.pattern);
      } catch (t) {}
      if (this.settings && this.settings.delimiters) try {
        this.settings.delimiters = new RegExp(this.settings.delimiters, "g");
      } catch (t) {}
      "select" == this.settings.mode && (this.settings.dropdown.enabled = 0);
    },
    parseHTML: function parseHTML(t) {
      return new DOMParser().parseFromString(t.trim(), "text/html").body.firstElementChild;
    },
    escapeHTML: function escapeHTML(t) {
      var e = document.createTextNode(t),
          i = document.createElement("p");
      return i.appendChild(e), i.innerHTML;
    },
    build: function build(t) {
      var e = this.DOM,
          i = this.settings.templates.wrapper(t, this.settings);
      e.originalInput = t, e.scope = this.parseHTML(i), e.input = e.scope.querySelector("[contenteditable]"), t.parentNode.insertBefore(e.scope, t), 0 <= this.settings.dropdown.enabled && this.dropdown.init.call(this);
    },
    destroy: function destroy() {
      this.DOM.scope.parentNode.removeChild(this.DOM.scope), this.dropdown.hide.call(this, !0);
    },
    loadOriginalValues: function loadOriginalValues(t) {
      var e = 0 < arguments.length && void 0 !== t ? t : this.DOM.originalInput.value;

      if (e) {
        this.removeAllTags();

        try {
          e = JSON.parse(e);
        } catch (t) {}

        "mix" == this.settings.mode ? this.parseMixTags(e) : this.addTags(e).forEach(function (t) {
          return t && t.classList.add("tagify--noAnim");
        });
      }
    },
    extend: function extend(t, e, i) {
      function s(t) {
        var e = Object.prototype.toString.call(t).split(" ")[1].slice(0, -1);
        return t === Object(t) && "Array" != e && "Function" != e && "RegExp" != e && "HTMLUnknownElement" != e;
      }

      function n(t, e) {
        for (var i in e) {
          e.hasOwnProperty(i) && (s(e[i]) ? s(t[i]) ? n(t[i], e[i]) : t[i] = Object.assign({}, e[i]) : t[i] = e[i]);
        }
      }

      return t instanceof Object || (t = {}), n(t, e), i && n(t, i), t;
    },
    EventDispatcher: function EventDispatcher(s) {
      var n = document.createTextNode("");
      this.off = function (t, e) {
        return e && n.removeEventListener.call(n, t, e), this;
      }, this.on = function (t, e) {
        return e && n.addEventListener.call(n, t, e), this;
      }, this.trigger = function (t, e) {
        var i;
        if (t) if (s.settings.isJQueryPlugin) $(s.DOM.originalInput).triggerHandler(t, [e]);else {
          try {
            i = new CustomEvent(t, {
              detail: e
            });
          } catch (t) {
            console.warn(t);
          }

          n.dispatchEvent(i);
        }
      };
    },
    events: {
      customBinding: function customBinding() {
        var e = this;
        this.customEventsList.forEach(function (t) {
          e.on(t, e.settings.callbacks[t]);
        });
      },
      binding: function binding(t) {
        var e,
            i = !(0 < arguments.length && void 0 !== t) || t,
            s = this.events.callbacks,
            n = i ? "addEventListener" : "removeEventListener",
            a = 1 == this.settings.editTags ? "click_" : 2 == this.settings.editTags ? "dblclick" : "";

        for (var o in i && !this.listeners.main && (this.DOM.input.addEventListener(this.isIE ? "keydown" : "input", s[this.isIE ? "onInputIE" : "onInput"].bind(this)), this.settings.isJQueryPlugin && $(this.DOM.originalInput).on("tagify.removeAllTags", this.removeAllTags.bind(this))), e = this.listeners.main = this.listeners.main || r({
          paste: ["input", s.onPaste.bind(this)],
          focus: ["input", s.onFocusBlur.bind(this)],
          blur: ["input", s.onFocusBlur.bind(this)],
          keydown: ["input", s.onKeydown.bind(this)],
          click: ["scope", s.onClickScope.bind(this)]
        }, a, ["scope", s.onDoubleClickScope.bind(this)])) {
          this.DOM[e[o][0]][n](o.replace(/_/g, ""), e[o][1]);
        }

        this.DOM.input.removeEventListener("blur", e.blur[1]), this.DOM.input.addEventListener("blur", e.blur[1]);
      },
      callbacks: {
        onFocusBlur: function onFocusBlur(t) {
          var e = t.target ? t.target.textContent.trim() : "";

          if ("mix" != this.settings.mode) {
            if ("focus" == t.type) return this.DOM.scope.classList.add("tagify--focus"), this.trigger("focus"), void (0 === this.settings.dropdown.enabled && this.dropdown.show.call(this));
            "blur" == t.type && (this.DOM.scope.classList.remove("tagify--focus"), this.trigger("blur"), e && this.settings.addTagOnBlur && this.addTags(e, !0).length), this.DOM.input.removeAttribute("style"), this.dropdown.hide.call(this);
          }
        },
        onKeydown: function onKeydown(t) {
          var e,
              i = this,
              s = t.target.textContent.trim();

          if ("mix" == this.settings.mode) {
            switch (t.key) {
              case "Delete":
              case "Backspace":
                var n = [];
                e = this.DOM.input.children, setTimeout(function () {
                  [].forEach.call(e, function (t) {
                    return n.push(t.getAttribute("value"));
                  }), i.value = i.value.filter(function (t) {
                    return -1 != n.indexOf(t.value);
                  });
                }, 20);
            }

            return !0;
          }

          switch (t.key) {
            case "Backspace":
              "" != s && 8203 != s.charCodeAt(0) || (!0 === this.settings.backspace ? this.removeTag() : "edit" == this.settings.backspace && setTimeout(this.editTag.bind(this), 0));
              break;

            case "Esc":
            case "Escape":
              t.target.blur();
              break;

            case "Down":
            case "ArrowDown":
              "select" == this.settings.mode && this.dropdown.show.call(this);
              break;

            case "ArrowRight":
            case "Tab":
              if (!s) return !0;

            case "Enter":
              t.preventDefault(), this.addTags(s, !0);
          }
        },
        onInput: function onInput(t) {
          var e = "mix" == this.settings.mode ? this.DOM.input.textContent : this.input.normalize.call(this),
              i = e.length >= this.settings.dropdown.enabled,
              s = {
            value: e,
            inputElm: this.DOM.input
          };
          if ("mix" == this.settings.mode) return this.events.callbacks.onMixTagsInput.call(this, t);
          e ? this.input.value != e && (s.isValid = this.validateTag(e), this.input.set.call(this, e, !1), this.trigger("input", s), -1 != e.search(this.settings.delimiters) ? this.addTags(e).length && this.input.set.call(this) : 0 <= this.settings.dropdown.enabled && this.dropdown[i ? "show" : "hide"].call(this, e)) : this.input.set.call(this, "");
        },
        onMixTagsInput: function onMixTagsInput(t) {
          var e, i, s, n, a;
          if (this.maxTagsReached()) return !0;
          window.getSelection && 0 < (e = window.getSelection()).rangeCount && ((i = e.getRangeAt(0).cloneRange()).collapse(!0), i.setStart(window.getSelection().focusNode, 0), (n = (s = i.toString().split(this.settings.mixTagsAllowedAfter))[s.length - 1].match(this.settings.pattern)) && (this.state.tag = {
            prefix: n[0],
            value: n.input.split(n[0])[1]
          }, n = this.state.tag, a = this.state.tag.value.length >= this.settings.dropdown.enabled)), this.update(), this.trigger("input", this.extend({}, this.state.tag, {
            textContent: this.DOM.input.textContent
          })), this.state.tag && this.dropdown[a ? "show" : "hide"].call(this, this.state.tag.value);
        },
        onInputIE: function onInputIE(t) {
          var e = this;
          setTimeout(function () {
            e.events.callbacks.onInput.call(e, t);
          });
        },
        onPaste: function onPaste(t) {},
        onClickScope: function onClickScope(t) {
          var e,
              i = t.target.closest("tag");
          if ("TAGS" == t.target.tagName) this.DOM.input.focus();else {
            if ("X" == t.target.tagName) return void this.removeTag(t.target.parentNode);
            i && (e = this.getNodeIndex(i), this.trigger("click", {
              tag: i,
              index: e,
              data: this.value[e]
            }));
          }
          "select" != this.settings.mode && 0 !== this.settings.dropdown.enabled || this.dropdown.show.call(this);
        },
        onEditTagInput: function onEditTagInput(t) {
          var e = t.closest("tag"),
              i = this.getNodeIndex(e),
              s = this.input.normalize(t),
              n = s.toLowerCase() == t.originalValue.toLowerCase() || this.validateTag(s);
          e.classList.toggle("tagify--invalid", !0 !== n), e.isValid = n, this.trigger("input", {
            tag: e,
            index: i,
            data: this.extend({}, this.value[i], {
              newValue: s
            })
          });
        },
        onEditTagBlur: function onEditTagBlur(t) {
          var e = t.closest("tag"),
              i = this.getNodeIndex(e),
              s = this.input.normalize(t),
              n = s || t.originalValue,
              a = this.input.normalize(t) != t.originalValue,
              o = e.isValid,
              r = u({}, this.value[i], {
            value: n
          });
          this.DOM.input.focus(), s ? a ? (this.settings.transformTag.call(this, r), void 0 !== (o = this.validateTag(r.value)) && !0 !== o || (this.editTagDone(e, r), this.trigger("edit", {
            tag: e,
            index: i,
            data: this.value[i]
          }))) : this.editTagDone(e) : this.removeTag(e);
        },
        onEditTagkeydown: function onEditTagkeydown(t) {
          switch (t.key) {
            case "Esc":
            case "Escape":
              t.target.textContent = t.target.originalValue;

            case "Enter":
            case "Tab":
              t.preventDefault(), t.target.blur();
          }
        },
        onDoubleClickScope: function onDoubleClickScope(t) {
          var e,
              i,
              s = t.target.closest("tag"),
              n = this.settings;
          s && (e = s.classList.contains("tagify--editable"), i = s.hasAttribute("readonly"), "mix" == n.mode || "select" == n.mode || n.readonly || n.enforceWhitelist || e || i || this.editTag(s));
        }
      }
    },
    editTag: function editTag(t) {
      var e = this,
          i = 0 < arguments.length && void 0 !== t ? t : this.getLastTag(),
          s = i.querySelector(".tagify__tag-text"),
          n = this.events.callbacks;
      if (s) return i.classList.add("tagify--editable"), s.originalValue = s.textContent, s.setAttribute("contenteditable", !0), s.addEventListener("blur", n.onEditTagBlur.bind(this, s)), s.addEventListener("input", n.onEditTagInput.bind(this, s)), s.addEventListener("keydown", function (t) {
        return n.onEditTagkeydown.call(e, t);
      }), s.focus(), this.setRangeAtStartEnd(!1, s), this;
      console.warn("Cannot find element in Tag template: ", ".tagify__tag-text");
    },
    editTagDone: function editTagDone(t, e) {
      var i,
          s = t.querySelector(".tagify__tag-text"),
          n = s.cloneNode(!0);
      n.removeAttribute("contenteditable"), t.classList.remove("tagify--editable"), s.parentNode.replaceChild(n, s), e && (s.textContent = e.value, t.title = e.value, i = this.getNodeIndex(t), this.value[i].value = e.value, this.update());
    },
    setRangeAtStartEnd: function setRangeAtStartEnd(t, e) {
      var i, s;
      document.createRange && ((i = document.createRange()).selectNodeContents(e || this.DOM.input), i.collapse(!!t), (s = window.getSelection()).removeAllRanges(), s.addRange(i));
    },
    input: {
      value: "",
      set: function set(t, e, i) {
        var s = 0 < arguments.length && void 0 !== t ? t : "",
            n = !(1 < arguments.length && void 0 !== e) || e,
            a = 0 < this.settings.dropdown.enabled || this.settings.dropdown.closeOnSelect;
        this.input.value = s, n && (this.DOM.input.innerHTML = s), !s && a && setTimeout(this.dropdown.hide.bind(this), 20), this.input.autocomplete.suggest.call(this, ""), this.input.validate.call(this);
      },
      validate: function validate() {
        var t = !this.input.value || this.validateTag(this.input.value);
        "select" == this.settings.mode ? this.DOM.scope.classList.toggle("tagify--invalid", !0 !== t) : this.DOM.input.classList.toggle("tagify__input--invalid", !0 !== t);
      },
      normalize: function normalize(t) {
        var e = (0 < arguments.length && void 0 !== t ? t : this.DOM.input).innerText;
        return "settings" in this && this.settings.delimiters && (e = e.replace(/(?:\r\n|\r|\n)/g, this.settings.delimiters.source.charAt(1))), e = e.replace(/\s/g, " ").replace(/^\s+/, "");
      },
      autocomplete: {
        suggest: function suggest(t) {
          t && this.input.value ? this.DOM.input.setAttribute("data-suggest", t.substring(this.input.value.length)) : this.DOM.input.removeAttribute("data-suggest");
        },
        set: function set(t) {
          var e = this.DOM.input.getAttribute("data-suggest"),
              i = t || (e ? this.input.value + e : null);
          return !!i && (this.input.set.call(this, i), this.input.autocomplete.suggest.call(this, ""), this.dropdown.hide.call(this), this.setRangeAtStartEnd(), !0);
        }
      }
    },
    getNodeIndex: function getNodeIndex(t) {
      var e = 0;
      if (t) for (; t = t.previousElementSibling;) {
        e++;
      }
      return e;
    },
    getTagElms: function getTagElms() {
      return this.DOM.scope.querySelectorAll("tag");
    },
    getLastTag: function getLastTag() {
      var t = this.DOM.scope.querySelectorAll("tag:not(.tagify--hide):not([readonly])");
      return t[t.length - 1];
    },
    isTagDuplicate: function isTagDuplicate(e) {
      return "select" != this.settings.mode && this.value.some(function (t) {
        return "string" == typeof e ? e.trim().toLowerCase() === t.value.toLowerCase() : JSON.stringify(t).toLowerCase() === JSON.stringify(e).toLowerCase();
      });
    },
    getTagIndexByValue: function getTagIndexByValue(i) {
      var s = [];
      return this.getTagElms().forEach(function (t, e) {
        t.textContent.trim().toLowerCase() == i.toLowerCase() && s.push(e);
      }), s;
    },
    getTagElmByValue: function getTagElmByValue(t) {
      var e = this.getTagIndexByValue(t)[0];
      return this.getTagElms()[e];
    },
    markTagByValue: function markTagByValue(t, e) {
      return !!(e = e || this.getTagElmByValue(t)) && (e.classList.add("tagify--mark"), e);
    },
    isTagBlacklisted: function isTagBlacklisted(e) {
      return e = e.toLowerCase().trim(), this.settings.blacklist.filter(function (t) {
        return e == t.toLowerCase();
      }).length;
    },
    isTagWhitelisted: function isTagWhitelisted(e) {
      return this.settings.whitelist.some(function (t) {
        return "string" == typeof e ? e.trim().toLowerCase() === (t.value || t).toLowerCase() : JSON.stringify(t).toLowerCase() === JSON.stringify(e).toLowerCase();
      });
    },
    validateTag: function validateTag(t) {
      var e = t.trim(),
          i = !0;
      return e ? this.settings.pattern && !this.settings.pattern.test(e) ? i = this.TEXTS.pattern : !this.settings.duplicates && this.isTagDuplicate(e) ? i = this.TEXTS.duplicate : (this.isTagBlacklisted(e) || this.settings.enforceWhitelist && !this.isTagWhitelisted(e)) && (i = this.TEXTS.notAllowed) : i = this.TEXTS.empty, i;
    },
    maxTagsReached: function maxTagsReached() {
      return this.value.length >= this.settings.maxTags && this.TEXTS.exceed;
    },
    normalizeTags: function normalizeTags(t) {
      function i(t) {
        return t.split(a).filter(function (t) {
          return t;
        }).map(function (t) {
          return {
            value: t.trim()
          };
        });
      }

      var e,
          s = this.settings,
          n = s.whitelist,
          a = s.delimiters,
          o = s.mode,
          r = !!n && n[0] instanceof Object,
          l = t instanceof Array && t[0] instanceof Object && "value" in t[0],
          d = [];
      if (l) return t = (e = []).concat.apply(e, c(t.map(function (e) {
        return i(e.value).map(function (t) {
          return u({}, e, {}, t);
        });
      })));

      if ("number" == typeof t && (t = t.toString()), "string" == typeof t) {
        if (!t.trim()) return [];
        t = i(t);
      } else if (!l && t instanceof Array) {
        var h;
        t = (h = []).concat.apply(h, c(t.map(function (t) {
          return i(t);
        })));
      }

      return r && (t.forEach(function (e) {
        var t = n.filter(function (t) {
          return t.value.toLowerCase() == e.value.toLowerCase();
        });
        t[0] ? d.push(t[0]) : "mix" != o && d.push(e);
      }), t = d), t;
    },
    parseMixTags: function parseMixTags(t) {
      var a = this,
          e = this.settings,
          o = e.mixTagsInterpolator,
          r = e.duplicates,
          l = e.transformTag;
      return t = t.split(o[0]).map(function (t) {
        var e,
            i,
            s = t.split(o[1]),
            n = s[0];

        try {
          e = JSON.parse(n);
        } catch (t) {
          e = a.normalizeTags(n)[0];
        }

        return !(1 < s.length && a.isTagWhitelisted(e.value)) || r && a.isTagDuplicate(e) || (l.call(a, e), i = a.createTagElem(e), s[0] = i.outerHTML, a.value.push(e)), s.join("");
      }).join(""), this.DOM.input.innerHTML = t, this.update(), t;
    },
    addMixTag: function addMixTag(t) {
      if (t && this.state.tag) {
        for (var e, i, s, n, a = this.state.tag.prefix + this.state.tag.value, o = document.createNodeIterator(this.DOM.input, NodeFilter.SHOW_TEXT, null, !1), r = 100; (e = o.nextNode()) && r--;) {
          if (e.nodeType === Node.TEXT_NODE) {
            if (-1 == (s = e.nodeValue.indexOf(a))) continue;
            n = e.splitText(s), this.settings.transformTag.call(this, t), i = this.createTagElem(t), n.nodeValue = n.nodeValue.replace(a, ""), e.parentNode.insertBefore(i, n);
          }
        }

        i && (this.value.push(t), this.update(), this.trigger("add", this.extend({}, {
          index: this.value.length,
          tag: i
        }, t))), this.state.tag = null;
      }
    },
    addEmptyTag: function addEmptyTag() {
      var t = {
        value: ""
      },
          e = this.createTagElem(t);
      this.appendTag.call(this, e), this.value.push(t), this.update(), this.editTag(e);
    },
    addTags: function addTags(t, n, e) {
      var a = this,
          o = 2 < arguments.length && void 0 !== e ? e : this.settings.skipInvalid,
          r = [];
      return t && t.length ? (t = this.normalizeTags.call(this, t), "mix" == this.settings.mode ? this.addMixTag(t[0]) : ("select" == this.settings.mode && (t.length = 1), this.DOM.input.removeAttribute("style"), t.forEach(function (t) {
        var e,
            i,
            s = {};

        if (t = Object.assign({}, t), a.settings.transformTag.call(a, t), !0 !== (e = a.maxTagsReached() || a.validateTag(t.value))) {
          if (o) return;
          s["aria-invalid"] = !0, s["class"] = (t["class"] || "") + " tagify--notAllowed", s.title = e, a.markTagByValue(t.value), a.trigger("invalid", {
            data: t,
            index: a.value.length,
            message: e
          });
        }

        if (s.role = "tag", t.readonly && (s["aria-readonly"] = !0), i = a.createTagElem(a.extend({}, t, s)), r.push(i), "select" == a.settings.mode && (a.settings.dropdown.closeOnSelect && (a.dropdown.hide.call(a), a.events.callbacks.onFocusBlur.call(a, {
          type: "blur"
        })), n = !1, a.input.set.call(a, t.value, !0, !0), a.getLastTag())) return a.editTagDone(a.getLastTag(), t), a.value[0] = t, a.update(), a.trigger("add", {
          tag: i,
          data: t
        }), [i];
        a.appendTag(i), !0 === e ? (a.value.push(t), a.update(), a.trigger("add", {
          tag: i,
          index: a.value.length - 1,
          data: t
        })) : a.settings.keepInvalidTags || setTimeout(function () {
          a.removeTag(i, !0);
        }, 1e3), a.dropdown.position.call(a);
      }), t.length && n && this.input.set.call(this), r)) : ("select" == this.settings.mode && this.removeAllTags(), r);
    },
    appendTag: function appendTag(t) {
      var e = this.DOM.scope.lastElementChild;
      e === this.DOM.input ? this.DOM.scope.insertBefore(t, e) : this.DOM.scope.appendChild(t);
    },
    minify: function minify(t) {
      return t.replace(new RegExp(">[\r\n ]+<", "g"), "><");
    },
    createTagElem: function createTagElem(t) {
      var e = this.escapeHTML(t.value),
          i = this.settings.templates.tag.call(this, e, t);
      return this.settings.readonly && (t.readonly = !0), i = this.minify(i), this.parseHTML(i);
    },
    removeTag: function removeTag(t, e, i) {
      var s = 0 < arguments.length && void 0 !== t ? t : this.getLastTag(),
          n = 1 < arguments.length ? e : void 0,
          a = 2 < arguments.length && void 0 !== i ? i : 250;

      if ("string" == typeof s && (s = this.getTagElmByValue(s)), s instanceof HTMLElement) {
        var o,
            r = this,
            l = this.getNodeIndex(s);
        "select" == this.settings.mode && (a = 0, this.input.set.call(this)), s.classList.contains("tagify--notAllowed") && (n = !0), a && 10 < a ? (s.style.width = parseFloat(window.getComputedStyle(s).width) + "px", document.body.clientTop, s.classList.add("tagify--hide"), setTimeout(d, 400)) : d();
      }

      function d() {
        s.parentNode && (s.parentNode.removeChild(s), n ? r.settings.keepInvalidTags && r.trigger("remove", {
          tag: s,
          index: l
        }) : (o = r.value.splice(l, 1)[0], r.update(), r.trigger("remove", {
          tag: s,
          index: l,
          data: o
        }), r.dropdown.render.call(r), r.dropdown.position.call(r)));
      }
    },
    removeAllTags: function removeAllTags() {
      this.value = [], this.update(), Array.prototype.slice.call(this.getTagElms()).forEach(function (t) {
        return t.parentNode.removeChild(t);
      }), this.dropdown.position.call(this);
    },
    getAttributes: function getAttributes(t) {
      if ("[object Object]" != Object.prototype.toString.call(t)) return "";
      var e,
          i,
          s = Object.keys(t),
          n = "";

      for (i = s.length; i--;) {
        "class" != (e = s[i]) && t.hasOwnProperty(e) && t[e] && (n += " " + e + (t[e] ? '="'.concat(t[e], '"') : ""));
      }

      return n;
    },
    preUpdate: function preUpdate() {
      this.DOM.scope.classList.toggle("hasMaxTags", this.value.length >= this.settings.maxTags);
    },
    update: function update() {
      this.preUpdate(), this.DOM.originalInput.value = "mix" == this.settings.mode ? this.getMixedTagsAsString() : this.value.length ? JSON.stringify(this.value) : "";
    },
    getMixedTagsAsString: function getMixedTagsAsString() {
      var e = this,
          i = "",
          s = 0,
          n = this.settings.mixTagsInterpolator;
      return this.DOM.input.childNodes.forEach(function (t) {
        1 == t.nodeType && t.classList.contains("tagify__tag") ? i += n[0] + JSON.stringify(e.value[s++]) + n[1] : i += t.textContent;
      }), i;
    },
    dropdown: {
      init: function init() {
        this.DOM.dropdown = this.dropdown.build.call(this);
      },
      build: function build() {
        var t = this.settings.dropdown,
            e = t.position,
            i = t.classname,
            s = "".concat("manual" == e ? "" : "tagify__dropdown", " ").concat(i).trim(),
            n = '<div class="'.concat(s, '" role="menu"></div>');
        return this.parseHTML(n);
      },
      show: function show(t) {
        var e,
            i,
            s,
            n = this.settings,
            a = "manual" == n.dropdown.position;

        if (n.whitelist.length) {
          if (this.suggestedListItems = this.dropdown.filterListItems.call(this, t), !this.suggestedListItems.length) return this.input.autocomplete.suggest.call(this), void this.dropdown.hide.call(this);
          s = (i = this.suggestedListItems[0]).value || i, this.settings.autoComplete && 0 == s.indexOf(t) && this.input.autocomplete.suggest.call(this, s), e = this.dropdown.createListHTML.call(this, this.suggestedListItems), this.DOM.dropdown.innerHTML = this.minify(e), (n.enforceWhitelist && !a || n.dropdown.highlightFirst) && this.dropdown.highlightOption.call(this, this.DOM.dropdown.children[0]), this.DOM.scope.setAttribute("aria-expanded", !0), this.trigger("dropdown:show", this.DOM.dropdown), document.body.contains(this.DOM.dropdown) || (a || (this.dropdown.position.call(this), document.body.appendChild(this.DOM.dropdown), this.events.binding.call(this, !1)), this.dropdown.events.binding.call(this));
        }
      },
      hide: function hide(t) {
        var e = this.DOM,
            i = e.scope,
            s = e.dropdown,
            n = "manual" == this.settings.dropdown.position && !t;
        s && document.body.contains(s) && !n && (window.removeEventListener("resize", this.dropdown.position), this.dropdown.events.binding.call(this, !1), setTimeout(this.events.binding.bind(this), 250), i.setAttribute("aria-expanded", !1), s.parentNode.removeChild(s), this.trigger("dropdown:hide", s));
      },
      render: function render() {
        this.suggestedListItems = this.dropdown.filterListItems.call(this, "");
        var t = this.dropdown.createListHTML.call(this, this.suggestedListItems);
        this.DOM.dropdown.innerHTML = this.minify(t);
      },
      position: function position() {
        var t = this.DOM.scope.getBoundingClientRect();
        this.DOM.dropdown.style.cssText = "left: " + (t.left + window.pageXOffset) + "px;                                                top: " + (t.top + t.height - 1 + window.pageYOffset) + "px;                                                width: " + t.width + "px";
      },
      events: {
        binding: function binding(t) {
          var e = !(0 < arguments.length && void 0 !== t) || t,
              i = this.dropdown.events.callbacks,
              s = this.listeners.dropdown = this.listeners.dropdown || {
            position: this.dropdown.position.bind(this),
            onKeyDown: i.onKeyDown.bind(this),
            onMouseOver: i.onMouseOver.bind(this),
            onMouseLeave: i.onMouseLeave.bind(this),
            onClick: i.onClick.bind(this)
          },
              n = e ? "addEventListener" : "removeEventListener";
          "manual" != this.settings.dropdown.position && (window[n]("resize", s.position), window[n]("keydown", s.onKeyDown)), window[n]("mousedown", s.onClick), this.DOM.dropdown[n]("mouseover", s.onMouseOver), this.DOM.dropdown[n]("mouseleave", s.onMouseLeave), this.DOM[this.listeners.main.click[0]][n]("click", this.listeners.main.click[1]);
        },
        callbacks: {
          onKeyDown: function onKeyDown(t) {
            var e = this,
                i = this.DOM.dropdown.querySelector("[class$='--active']"),
                s = i,
                n = "";

            switch (t.key) {
              case "ArrowDown":
              case "ArrowUp":
              case "Down":
              case "Up":
                t.preventDefault(), s = (s = s && s[("ArrowUp" == t.key || "Up" == t.key ? "previous" : "next") + "ElementSibling"]) || this.DOM.dropdown.children["ArrowUp" == t.key || "Up" == t.key ? this.DOM.dropdown.children.length - 1 : 0], this.dropdown.highlightOption.call(this, s, !0);
                break;

              case "Escape":
              case "Esc":
                this.dropdown.hide.call(this);
                break;

              case "ArrowRight":
              case "Tab":
                try {
                  var a = s ? s.textContent : this.suggestedListItems[0].value;
                  this.input.autocomplete.set.call(this, a);
                } catch (t) {}

                return !1;

              case "Enter":
                t.preventDefault();
                var o = this.settings.dropdown.enabled || this.settings.dropdown.closeOnSelect;
                if (i) return n = this.suggestedListItems[this.getNodeIndex(i)] || this.input.value, this.trigger("dropdown:select", n), this.addTags([n], !0), this.dropdown[o ? "hide" : "show"].call(this), "select" == this.settings.mode && setTimeout(function () {
                  return e.DOM.input.blur();
                }), !1;
                this.addTags(this.input.value, !0);
                break;

              case "Backspace":
                if ("mix" == this.settings.mode) return;
                "" != (a = this.input.value.trim()) && 8203 != a.charCodeAt(0) || (!0 === this.settings.backspace ? this.removeTag() : "edit" == this.settings.backspace && setTimeout(this.editTag.bind(this), 0));
            }
          },
          onMouseOver: function onMouseOver(t) {
            t.target.className.includes("__item") && this.dropdown.highlightOption.call(this, t.target);
          },
          onMouseLeave: function onMouseLeave(t) {
            this.dropdown.highlightOption.call(this);
          },
          onClick: function onClick(t) {
            var e,
                i,
                s = this;
            if (0 == t.button && t.target != this.DOM.dropdown) if (i = t.target.closest(".tagify__dropdown__item")) {
              if (i.parentNode !== this.DOM.dropdown) return;
              e = this.suggestedListItems[this.getNodeIndex(i)] || this.input.value, this.trigger("dropdown:select", e), this.addTags([e], !0), "select" != this.settings.mode && setTimeout(function () {
                return s.DOM.input.focus();
              }), this.settings.dropdown.closeOnSelect && this.dropdown.hide.call(this);
            } else this.dropdown.hide.call(this), t.target.closest(".tagify") || this.events.callbacks.onFocusBlur.call(this, {
              type: "blur",
              target: this.DOM.input
            });
          }
        }
      },
      highlightOption: function highlightOption(t, e) {
        var i,
            s = "tagify__dropdown__item--active";
        this.DOM.dropdown.querySelectorAll("[class$='--active']").forEach(function (t) {
          t.classList.remove(s), t.removeAttribute("aria-selected");
        }), t ? (t.classList.add(s), t.setAttribute("aria-selected", !0), e && (t.parentNode.scrollTop = t.clientHeight + t.offsetTop - t.parentNode.clientHeight), this.settings.autoComplete && (i = this.suggestedListItems[this.getNodeIndex(t)].value || this.input.value, this.input.autocomplete.suggest.call(this, i))) : this.input.autocomplete.suggest.call(this);
      },
      filterListItems: function filterListItems(t) {
        var e,
            i,
            s,
            n,
            a = this,
            o = [],
            r = this.settings.whitelist,
            l = this.settings.dropdown.maxItems || 1 / 0,
            d = 0;
        if (!t) return r.filter(function (t) {
          return !a.isTagDuplicate(t.value || t);
        }).slice(0, l);

        for (; d < r.length && (s = (((e = r[d] instanceof Object ? r[d] : {
          value: r[d]
        }).searchBy || "") + " " + e.value).toLowerCase().indexOf(t.toLowerCase()), i = this.settings.dropdown.fuzzySearch ? 0 <= s : 0 == s, n = !this.settings.duplicates && this.isTagDuplicate(e.value), i && !n && l-- && o.push(e), 0 != l); d++) {
          ;
        }

        return o;
      },
      createListHTML: function createListHTML(t) {
        var e = this.settings.templates.dropdownItem.bind(this);
        return t.map(e).join("");
      }
    }
  }, t;
});
var input = document.querySelector('input[name=basic]'); // init Tagify script on the above inputs

new Tagify(input);

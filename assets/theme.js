function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(function ($) {
  var _this11 = this;

  var $ = jQuery = $;
  var cc = {
    sections: []
  };
  theme.Shopify = {
    formatMoney: function formatMoney(t, r) {
      function e(t, r) {
        return void 0 === t ? r : t;
      }

      function a(t, r, a, o) {
        if (r = e(r, 2), a = e(a, ","), o = e(o, "."), isNaN(t) || null == t) return 0;
        t = (t / 100).toFixed(r);
        var n = t.split(".");
        return n[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + a) + (n[1] ? o + n[1] : "");
      }

      "string" == typeof t && (t = t.replace(".", ""));
      var o = "",
          n = /\{\{\s*(\w+)\s*\}\}/,
          i = r || this.money_format;

      switch (i.match(n)[1]) {
        case "amount":
          o = a(t, 2);
          break;

        case "amount_no_decimals":
          o = a(t, 0);
          break;

        case "amount_with_comma_separator":
          o = a(t, 2, ".", ",");
          break;

        case "amount_with_space_separator":
          o = a(t, 2, " ", ",");
          break;

        case "amount_with_period_and_space_separator":
          o = a(t, 2, " ", ".");
          break;

        case "amount_no_decimals_with_comma_separator":
          o = a(t, 0, ".", ",");
          break;

        case "amount_no_decimals_with_space_separator":
          o = a(t, 0, " ", "");
          break;

        case "amount_with_apostrophe_separator":
          o = a(t, 2, "'", ".");
          break;

        case "amount_with_decimal_separator":
          o = a(t, 2, ".", ".");
      }

      return i.replace(n, o);
    },
    formatImage: function formatImage(originalImageUrl, format) {
      return originalImageUrl ? originalImageUrl.replace(/^(.*)\.([^\.]*)$/g, '$1_' + format + '.$2') : '';
    },
    Image: {
      imageSize: function imageSize(t) {
        var e = t.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/);
        return null !== e ? e[1] : null;
      },
      getSizedImageUrl: function getSizedImageUrl(t, e) {
        if (null == e) return t;
        if ("master" == e) return this.removeProtocol(t);
        var o = t.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i);

        if (null != o) {
          var i = t.split(o[0]),
              r = o[0];
          return this.removeProtocol(i[0] + "_" + e + r);
        }

        return null;
      },
      removeProtocol: function removeProtocol(t) {
        return t.replace(/http(s)?:/, "");
      }
    }
  };

  var ccComponent = /*#__PURE__*/function () {
    "use strict";

    function ccComponent(name) {
      var cssSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".cc-".concat(name);

      _classCallCheck(this, ccComponent);

      var _this = this;

      this.instances = []; // Initialise any instance of this component within a section

      $(document).on('cc:component:load', function (event, component, target) {
        if (component === name) {
          $(target).find("".concat(cssSelector, ":not(.cc-initialized)")).each(function () {
            _this.init(this);
          });
        }
      }); // Destroy any instance of this component within a section

      $(document).on('cc:component:unload', function (event, component, target) {
        if (component === name) {
          $(target).find(cssSelector).each(function () {
            _this.destroy(this);
          });
        }
      }); // Initialise any instance of this component

      $(cssSelector).each(function () {
        _this.init(this);
      });
    }

    _createClass(ccComponent, [{
      key: "init",
      value: function init(container) {
        $(container).addClass('cc-initialized');
      }
    }, {
      key: "destroy",
      value: function destroy(container) {
        $(container).removeClass('cc-initialized');
      }
    }, {
      key: "registerInstance",
      value: function registerInstance(container, instance) {
        this.instances.push({
          container: container,
          instance: instance
        });
      }
    }, {
      key: "destroyInstance",
      value: function destroyInstance(container) {
        this.instances = this.instances.filter(function (item) {
          if (item.container === container) {
            if (typeof item.instance.destroy === 'function') {
              item.instance.destroy();
            }

            return item.container !== container;
          }
        });
      }
    }]);

    return ccComponent;
  }();

  (function () {
    function throttle(callback, threshold) {
      var debounceTimeoutId = -1;
      var tick = false;
      return function () {
        clearTimeout(debounceTimeoutId);
        debounceTimeoutId = setTimeout(callback, threshold);

        if (!tick) {
          callback.call();
          tick = true;
          setTimeout(function () {
            tick = false;
          }, threshold);
        }
      };
    }

    var scrollEvent = document.createEvent('Event');
    scrollEvent.initEvent('throttled-scroll', true, true);
    window.addEventListener("scroll", throttle(function () {
      window.dispatchEvent(scrollEvent);
    }, 200));
  })(); // requires: throttled-scroll, debouncedresize

  /*
    Define a section by creating a new function object and registering it with the section handler.
    The section handler manages:
      Instantiation for all sections on the current page
      Theme editor lifecycle events
      Deferred initialisation
      Event cleanup
  
    There are two ways to register a section.
    In a theme:
      theme.Sections.register('slideshow', theme.SlideshowSection);
      theme.Sections.register('header', theme.HeaderSection, { deferredLoad: false });
      theme.Sections.register('background-video', theme.VideoManager, { deferredLoadViewportExcess: 800 });
  
    As a component:
      cc.sections.push({ name: 'faq', section: theme.Faq });
  
    Assign any of these to receive Shopify section lifecycle events:
      this.onSectionLoad
      this.afterSectionLoadCallback
      this.onSectionSelect
      this.onSectionDeselect
      this.onBlockSelect
      this.onBlockDeselect
      this.onSectionUnload
      this.afterSectionUnloadCallback
  
    If you add any events using the manager's registerEventListener,
    e.g. this.registerEventListener(element, 'click', this.functions.handleClick.bind(this)),
    these will be automatically cleaned up after onSectionUnload.
   */


  theme.Sections = new function () {
    var _ = this;

    _._instances = [];
    _._deferredSectionTargets = [];
    _._sections = [];
    _._deferredLoadViewportExcess = 300; // load defferred sections within this many px of viewport

    _._deferredWatcherRunning = false;

    _.init = function () {
      $(document).on('shopify:section:load', function (e) {
        // load a new section
        var target = _._themeSectionTargetFromShopifySectionTarget(e.target);

        if (target) {
          _.sectionLoad(target);
        }
      }).on('shopify:section:unload', function (e) {
        // unload existing section
        var target = _._themeSectionTargetFromShopifySectionTarget(e.target);

        if (target) {
          _.sectionUnload(target);
        }
      });
      $(window).on('throttled-scroll.themeSectionDeferredLoader debouncedresize.themeSectionDeferredLoader', _._processDeferredSections);
      _._deferredWatcherRunning = true;
    }; // register a type of section


    _.register = function (type, section, options) {
      _._sections.push({
        type: type,
        section: section,
        afterSectionLoadCallback: options ? options.afterLoad : null,
        afterSectionUnloadCallback: options ? options.afterUnload : null
      }); // load now


      $('[data-section-type="' + type + '"]').each(function () {
        if (Shopify.designMode || options && options.deferredLoad === false || !_._deferredWatcherRunning) {
          _.sectionLoad(this);
        } else {
          _.sectionDeferredLoad(this, options);
        }
      });
    }; // prepare a section to load later


    _.sectionDeferredLoad = function (target, options) {
      _._deferredSectionTargets.push({
        target: target,
        deferredLoadViewportExcess: options && options.deferredLoadViewportExcess ? options.deferredLoadViewportExcess : _._deferredLoadViewportExcess
      });

      _._processDeferredSections(true);
    }; // load deferred sections if in/near viewport


    _._processDeferredSections = function (firstRunCheck) {
      if (_._deferredSectionTargets.length) {
        var viewportTop = $(window).scrollTop(),
            viewportBottom = viewportTop + $(window).height(),
            loopStart = firstRunCheck === true ? _._deferredSectionTargets.length - 1 : 0;

        for (var i = loopStart; i < _._deferredSectionTargets.length; i++) {
          var target = _._deferredSectionTargets[i].target,
              viewportExcess = _._deferredSectionTargets[i].deferredLoadViewportExcess,
              sectionTop = $(target).offset().top - viewportExcess,
              doLoad = sectionTop > viewportTop && sectionTop < viewportBottom;

          if (!doLoad) {
            var sectionBottom = sectionTop + $(target).outerHeight() + viewportExcess * 2;
            doLoad = sectionBottom > viewportTop && sectionBottom < viewportBottom;
          }

          if (doLoad || sectionTop < viewportTop && sectionBottom > viewportBottom) {
            // in viewport, load
            _.sectionLoad(target); // remove from deferred queue and resume checks


            _._deferredSectionTargets.splice(i, 1);

            i--;
          }
        }
      } // remove event if no more deferred targets left, if not on first run


      if (firstRunCheck !== true && _._deferredSectionTargets.length === 0) {
        _._deferredWatcherRunning = false;
        $(window).off('.themeSectionDeferredLoader');
      }
    }; // load in a section


    _.sectionLoad = function (target) {
      var target = target,
          sectionObj = _._sectionForTarget(target),
          section = false;

      if (sectionObj.section) {
        section = sectionObj.section;
      } else {
        section = sectionObj;
      }

      if (section !== false) {
        var instance = {
          target: target,
          section: section,
          $shopifySectionContainer: $(target).closest('.shopify-section'),
          thisContext: {
            functions: section.functions,
            registeredEventListeners: []
          }
        };
        instance.thisContext.registerEventListener = _._registerEventListener.bind(instance.thisContext);

        _._instances.push(instance); //Initialise any components


        if ($(target).data('components')) {
          //Init each component
          var components = $(target).data('components').split(',');
          components.forEach(function (component) {
            $(document).trigger('cc:component:load', [component, target]);
          });
        }

        _._callSectionWith(section, 'onSectionLoad', target, instance.thisContext);

        _._callSectionWith(section, 'afterSectionLoadCallback', target, instance.thisContext); // attach additional UI events if defined


        if (section.onSectionSelect) {
          instance.$shopifySectionContainer.on('shopify:section:select', function (e) {
            _._callSectionWith(section, 'onSectionSelect', e.target, instance.thisContext);
          });
        }

        if (section.onSectionDeselect) {
          instance.$shopifySectionContainer.on('shopify:section:deselect', function (e) {
            _._callSectionWith(section, 'onSectionDeselect', e.target, instance.thisContext);
          });
        }

        if (section.onBlockSelect) {
          $(target).on('shopify:block:select', function (e) {
            _._callSectionWith(section, 'onBlockSelect', e.target, instance.thisContext);
          });
        }

        if (section.onBlockDeselect) {
          $(target).on('shopify:block:deselect', function (e) {
            _._callSectionWith(section, 'onBlockDeselect', e.target, instance.thisContext);
          });
        }
      }
    }; // unload a section


    _.sectionUnload = function (target) {
      var sectionObj = _._sectionForTarget(target);

      var instanceIndex = -1;

      for (var i = 0; i < _._instances.length; i++) {
        if (_._instances[i].target == target) {
          instanceIndex = i;
        }
      }

      if (instanceIndex > -1) {
        var instance = _._instances[instanceIndex]; // remove events and call unload, if loaded

        $(target).off('shopify:block:select shopify:block:deselect');
        instance.$shopifySectionContainer.off('shopify:section:select shopify:section:deselect');

        _._callSectionWith(instance.section, 'onSectionUnload', target, instance.thisContext);

        _._unloadRegisteredEventListeners(instance.thisContext.registeredEventListeners);

        _._callSectionWith(sectionObj, 'afterSectionUnloadCallback', target, instance.thisContext);

        _._instances.splice(instanceIndex); //Destroy any components


        if ($(target).data('components')) {
          //Init each component
          var components = $(target).data('components').split(',');
          components.forEach(function (component) {
            $(document).trigger('cc:component:unload', [component, target]);
          });
        }
      } else {
        // check if it was a deferred section
        for (var i = 0; i < _._deferredSectionTargets.length; i++) {
          if (_._deferredSectionTargets[i].target == target) {
            _._deferredSectionTargets[i].splice(i, 1);

            break;
          }
        }
      }
    }; // Helpers


    _._registerEventListener = function (element, eventType, callback) {
      element.addEventListener(eventType, callback);
      this.registeredEventListeners.push({
        element: element,
        eventType: eventType,
        callback: callback
      });
    };

    _._unloadRegisteredEventListeners = function (registeredEventListeners) {
      registeredEventListeners.forEach(function (rel) {
        rel.element.removeEventListener(rel.eventType, rel.callback);
      });
    };

    _._callSectionWith = function (section, method, container, thisContext) {
      if (typeof section[method] === 'function') {
        try {
          if (thisContext) {
            section[method].bind(thisContext)(container);
          } else {
            section[method](container);
          }
        } catch (ex) {
          var sectionType = container.dataset['sectionType'];
          console.warn("Theme warning: '".concat(method, "' failed for section '").concat(sectionType, "'"));
          console.debug(container, ex);
        }
      }
    };

    _._themeSectionTargetFromShopifySectionTarget = function (target) {
      var $target = $('[data-section-type]:first', target);

      if ($target.length > 0) {
        return $target[0];
      } else {
        return false;
      }
    };

    _._sectionForTarget = function (target) {
      var type = $(target).attr('data-section-type');

      for (var i = 0; i < _._sections.length; i++) {
        if (_._sections[i].type == type) {
          return _._sections[i];
        }
      }

      return false;
    };

    _._sectionAlreadyRegistered = function (type) {
      for (var i = 0; i < _._sections.length; i++) {
        if (_._sections[i].type == type) {
          return true;
        }
      }

      return false;
    };
  }();

  theme.Disclosure = function () {
    var selectors = {
      disclosureList: '[data-disclosure-list]',
      disclosureToggle: '[data-disclosure-toggle]',
      disclosureInput: '[data-disclosure-input]',
      disclosureOptions: '[data-disclosure-option]'
    };
    var classes = {
      listVisible: 'disclosure-list--visible'
    };

    function Disclosure($disclosure) {
      this.$container = $disclosure;
      this.cache = {};

      this._cacheSelectors();

      this._connectOptions();

      this._connectToggle();

      this._onFocusOut();
    }

    Disclosure.prototype = $.extend({}, Disclosure.prototype, {
      _cacheSelectors: function _cacheSelectors() {
        this.cache = {
          $disclosureList: this.$container.find(selectors.disclosureList),
          $disclosureToggle: this.$container.find(selectors.disclosureToggle),
          $disclosureInput: this.$container.find(selectors.disclosureInput),
          $disclosureOptions: this.$container.find(selectors.disclosureOptions)
        };
      },
      _connectToggle: function _connectToggle() {
        this.cache.$disclosureToggle.on('click', function (evt) {
          var ariaExpanded = $(evt.currentTarget).attr('aria-expanded') === 'true';
          $(evt.currentTarget).attr('aria-expanded', !ariaExpanded);
          this.cache.$disclosureList.toggleClass(classes.listVisible);
        }.bind(this));
      },
      _connectOptions: function _connectOptions() {
        this.cache.$disclosureOptions.on('click', function (evt) {
          evt.preventDefault();

          this._submitForm($(evt.currentTarget).data('value'));
        }.bind(this));
      },
      _onFocusOut: function _onFocusOut() {
        this.cache.$disclosureToggle.on('focusout', function (evt) {
          var disclosureLostFocus = this.$container.has(evt.relatedTarget).length === 0;

          if (disclosureLostFocus) {
            this._hideList();
          }
        }.bind(this));
        this.cache.$disclosureList.on('focusout', function (evt) {
          var childInFocus = $(evt.currentTarget).has(evt.relatedTarget).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(classes.listVisible);

          if (isVisible && !childInFocus) {
            this._hideList();
          }
        }.bind(this));
        this.$container.on('keyup', function (evt) {
          if (evt.which !== 27) return; // escape

          this._hideList();

          this.cache.$disclosureToggle.focus();
        }.bind(this));

        this.bodyOnClick = function (evt) {
          var isOption = this.$container.has(evt.target).length > 0;
          var isVisible = this.cache.$disclosureList.hasClass(classes.listVisible);

          if (isVisible && !isOption) {
            this._hideList();
          }
        }.bind(this);

        $('body').on('click', this.bodyOnClick);
      },
      _submitForm: function _submitForm(value) {
        this.cache.$disclosureInput.val(value);
        this.$container.parents('form').submit();
      },
      _hideList: function _hideList() {
        this.cache.$disclosureList.removeClass(classes.listVisible);
        this.cache.$disclosureToggle.attr('aria-expanded', false);
      },
      unload: function unload() {
        $('body').off('click', this.bodyOnClick);
        this.cache.$disclosureOptions.off();
        this.cache.$disclosureToggle.off();
        this.cache.$disclosureList.off();
        this.$container.off();
      }
    });
    return Disclosure;
  }(); /// Show a short-lived text popup above an element


  theme.showQuickPopup = function (message, $origin) {
    var $popup = $('<div class="simple-popup"/>');
    var offs = $origin.offset();
    var originLeft = $origin[0].getBoundingClientRect().left;
    $popup.html(message).css({
      'left': offs.left,
      'top': offs.top
    }).hide();
    $('body').append($popup);
    var marginLeft = -($popup.outerWidth() - $origin.outerWidth()) / 2;

    if (originLeft + marginLeft < 0) {
      //Pull it away from the left edge of the screen
      marginLeft -= originLeft + marginLeft - 2;
    }

    $popup.css({
      marginTop: -$popup.outerHeight() - 10,
      marginLeft: marginLeft
    });
    $popup.fadeIn(200).delay(3500).fadeOut(400, function () {
      $(this).remove();
    });
  }; // Loading third party scripts


  theme.scriptsLoaded = {};

  theme.loadScriptOnce = function (src, callback, beforeRun, sync) {
    if (typeof theme.scriptsLoaded[src] === 'undefined') {
      theme.scriptsLoaded[src] = [];
      var tag = document.createElement('script');
      tag.src = src;

      if (sync || beforeRun) {
        tag.async = false;
      }

      if (beforeRun) {
        beforeRun();
      }

      if (typeof callback === 'function') {
        theme.scriptsLoaded[src].push(callback);

        if (tag.readyState) {
          // IE, incl. IE9
          tag.onreadystatechange = function () {
            if (tag.readyState == "loaded" || tag.readyState == "complete") {
              tag.onreadystatechange = null;

              for (var i = 0; i < theme.scriptsLoaded[this].length; i++) {
                theme.scriptsLoaded[this][i]();
              }

              theme.scriptsLoaded[this] = true;
            }
          }.bind(src);
        } else {
          tag.onload = function () {
            // Other browsers
            for (var i = 0; i < theme.scriptsLoaded[this].length; i++) {
              theme.scriptsLoaded[this][i]();
            }

            theme.scriptsLoaded[this] = true;
          }.bind(src);
        }
      }

      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      return true;
    } else if (_typeof(theme.scriptsLoaded[src]) === 'object' && typeof callback === 'function') {
      theme.scriptsLoaded[src].push(callback);
    } else {
      if (typeof callback === 'function') {
        callback();
      }

      return false;
    }
  };

  theme.loadStyleOnce = function (src) {
    var srcWithoutProtocol = src.replace(/^https?:/, '');

    if (!document.querySelector('link[href="' + encodeURI(srcWithoutProtocol) + '"]')) {
      var tag = document.createElement('link');
      tag.href = srcWithoutProtocol;
      tag.rel = 'stylesheet';
      tag.type = 'text/css';
      var firstTag = document.getElementsByTagName('link')[0];
      firstTag.parentNode.insertBefore(tag, firstTag);
    }
  }; // Turn a <select> tag into clicky boxes
  // Use with: $('select').clickyBoxes()


  $.fn.clickyBoxes = function (prefix) {
    if (prefix == 'destroy') {
      $(this).off('.clickyboxes');
      $(this).next('.clickyboxes').off('.clickyboxes');
    } else {
      return $(this).filter('select:not(.clickybox-replaced)').addClass('clickybox-replaced').each(function () {
        //Make sure rows are unique
        var prefix = prefix || $(this).attr('id'); //Create container

        var $optCont = $('<ul class="clickyboxes"/>').attr('id', 'clickyboxes-' + prefix).data('select', $(this)).insertAfter(this);
        var $label;

        if ($(this).is('[id]')) {
          $label = $('label[for="' + $(this).attr('id') + '"]'); // Grab real label
        } else {
          $label = $(this).siblings('label'); // Rough guess
        }

        if ($label.length > 0) {
          $optCont.addClass('options-' + removeDiacritics($label.text()).toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/-*$/, ''));
        } //Add options to container


        $(this).find('option').each(function () {
          $('<li/>').appendTo($optCont).append($('<a href="#"/>').attr('data-value', $(this).val()).html($(this).html()).addClass('opt--' + removeDiacritics($(this).text()).toLowerCase().replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/-*$/, '')));
        }); //Select change event

        $(this).hide().addClass('replaced').on('change.clickyboxes keyup.clickyboxes', function () {
          //Choose the right option to show
          var val = $(this).val();
          $optCont.find('a').removeClass('active').filter(function () {
            return $(this).attr('data-value') == val;
          }).addClass('active');
        }).trigger('keyup'); //Initial value
        //Button click event

        $optCont.on('click.clickyboxes', 'a', function () {
          if (!$(this).hasClass('active')) {
            var $clicky = $(this).closest('.clickyboxes');
            $clicky.data('select').val($(this).data('value')).trigger('change');
            $clicky.trigger('change');
          }

          return false;
        });
      });
    }
  }; /// v1.0
  /// Restyling select dropdowns


  $.fn.selectReplace = function (prefix) {
    var chevronDown = '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/><path d="M0-.75h24v24H0z" fill="none"/></svg>';

    if (prefix == 'destroy') {
      $(this).off('.selectreplace');
    } else {
      return $(this).filter('select:not(.replaced, .noreplace)').addClass('replaced').each(function () {
        //Add formatting containers
        var $opts = $(this).find('option');
        var initialText = $opts.filter(':selected').length > 0 ? $opts.filter(':selected').text() : $opts.first().text();
        var $cont = $(this).wrap('<div class="pretty-select">').parent().addClass('id-' + $(this).attr('id')).append('<span class="text"><span class="value">' + initialText + '</span></span>' + chevronDown);
        $cont.toggleClass('plaintext', $(this).hasClass('plaintext'));
      }).on('change.selectreplace keyup.selectreplace', function () {
        $(this).siblings('.text').find('.value').html($(this).find(':selected').html());
      });
    }
  }; // Source: https://davidwalsh.name/javascript-debounce-function
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.


  theme.debounce = function (func) {
    var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 700;
    var immediate = arguments.length > 2 ? arguments[2] : undefined;
    var timeout;
    return function () {
      var context = this,
          args = arguments;

      var later = function later() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  (function () {
    function throttle(callback, threshold) {
      var debounceTimeoutId = -1;
      var tick = false;
      return function () {
        clearTimeout(debounceTimeoutId);
        debounceTimeoutId = setTimeout(callback, threshold);

        if (!tick) {
          callback.call();
          tick = true;
          setTimeout(function () {
            tick = false;
          }, threshold);
        }
      };
    }

    var scrollEvent = document.createEvent('Event');
    scrollEvent.initEvent('throttled-scroll', true, true);
    window.addEventListener("scroll", throttle(function () {
      window.dispatchEvent(scrollEvent);
    }, 200));
  })();

  var ccPopup = /*#__PURE__*/function () {
    "use strict";

    function ccPopup($container, namespace) {
      _classCallCheck(this, ccPopup);

      this.$container = $container;
      this.namespace = namespace;
      this.cssClasses = {
        visible: 'cc-popup--visible',
        bodyNoScroll: 'cc-popup-no-scroll',
        bodyNoScrollPadRight: 'cc-popup-no-scroll-pad-right'
      };
    }
    /**
     * Open popup on timer / local storage - move focus to input ensure you can tab to submit and close
     * Add the cc-popup--visible class
     * Update aria to visible
     */


    _createClass(ccPopup, [{
      key: "open",
      value: function open(callback) {
        var _this2 = this;

        // Prevent the body from scrolling
        if (this.$container.data('freeze-scroll')) {
          $('body').addClass(this.cssClasses.bodyNoScroll); // Add any padding necessary to the body to compensate for the scrollbar that just disappeared

          var scrollDiv = document.createElement('div');
          scrollDiv.className = 'popup-scrollbar-measure';
          document.body.appendChild(scrollDiv);
          var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
          document.body.removeChild(scrollDiv);

          if (scrollbarWidth > 0) {
            $('body').css('padding-right', scrollbarWidth + 'px').addClass(this.cssClasses.bodyNoScrollPadRight);
          }
        } // Add reveal class


        this.$container.addClass(this.cssClasses.visible); // Track previously focused element

        this.previouslyActiveElement = document.activeElement; // Focus on the close button after the animation in has completed

        setTimeout(function () {
          _this2.$container.find('.cc-popup-close')[0].focus();
        }, 500); // Pressing escape closes the modal

        $(window).on('keydown' + this.namespace, function (event) {
          if (event.keyCode === 27) {
            _this2.close();
          }
        });

        if (callback) {
          callback();
        }
      }
    }, {
      key: "close",

      /**
       * Close popup on click of close button or background - where does the focus go back to?
       * Remove the cc-popup--visible class
       */
      value: function close(callback) {
        var _this3 = this;

        // Remove reveal class
        this.$container.removeClass(this.cssClasses.visible); // Revert focus

        if (this.previouslyActiveElement) {
          $(this.previouslyActiveElement).focus();
        } // Destroy the escape event listener


        $(window).off('keydown' + this.namespace); // Allow the body to scroll and remove any scrollbar-compensating padding

        if (this.$container.data('freeze-scroll')) {
          var transitionDuration = 500;
          var $innerModal = this.$container.find('.cc-popup-modal');

          if ($innerModal.length) {
            transitionDuration = parseFloat(getComputedStyle($innerModal[0])['transitionDuration']);

            if (transitionDuration && transitionDuration > 0) {
              transitionDuration *= 1000;
            }
          }

          setTimeout(function () {
            $('body').removeClass(_this3.cssClasses.bodyNoScroll).removeClass(_this3.cssClasses.bodyNoScrollPadRight).css('padding-right', '0');
          }, transitionDuration);
        }

        if (callback) {
          callback();
        }
      }
    }]);

    return ccPopup;
  }();

  ;

  (function () {
    theme.initAnimateOnScroll = function () {
      if (document.body.classList.contains('cc-animate-enabled') && window.innerWidth >= 768) {
        var animationTimeout = typeof document.body.dataset.ccAnimateTimeout !== "undefined" ? document.body.dataset.ccAnimateTimeout : 200;

        if ('IntersectionObserver' in window) {
          var intersectionObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
              // In view and hasn't been animated yet
              if (entry.isIntersecting && !entry.target.classList.contains("cc-animate-complete")) {
                setTimeout(function () {
                  entry.target.classList.add("-in", "cc-animate-complete");
                }, animationTimeout);
                setTimeout(function () {
                  //Once the animation is complete (assume 5 seconds), remove the animate attribute to remove all css
                  entry.target.classList.remove("data-cc-animate");
                  entry.target.style.transitionDuration = null;
                  entry.target.style.transitionDelay = null;
                }, 5000); // Remove observer after animation

                observer.unobserve(entry.target);
              }
            });
          });
          document.querySelectorAll('[data-cc-animate]:not(.cc-animate-init)').forEach(function (elem) {
            //Set the animation delay
            if (elem.dataset.ccAnimateDelay) {
              elem.style.transitionDelay = elem.dataset.ccAnimateDelay;
            } ///Set the animation duration


            if (elem.dataset.ccAnimateDuration) {
              elem.style.transitionDuration = elem.dataset.ccAnimateDuration;
            } //Init the animation


            if (elem.dataset.ccAnimate) {
              elem.classList.add(elem.dataset.ccAnimate);
            }

            elem.classList.add("cc-animate-init"); //Watch for elem

            intersectionObserver.observe(elem);
          });
        } else {
          //Fallback, load all the animations now
          var elems = document.querySelectorAll('[data-cc-animate]:not(.cc-animate-init)');

          for (var _i = 0; _i < elems.length; _i++) {
            elems[_i].classList.add("-in", "cc-animate-complete");
          }
        }
      }
    };

    theme.initAnimateOnScroll();
    document.addEventListener('shopify:section:load', function () {
      setTimeout(theme.initAnimateOnScroll, 100);
    }); //Reload animations when changing from mobile to desktop

    try {
      window.matchMedia('(min-width: 768px)').addEventListener('change', function (event) {
        if (event.matches) {
          setTimeout(theme.initAnimateOnScroll, 100);
        }
      });
    } catch (e) {}
  })();

  var PriceRangeInstance = /*#__PURE__*/function () {
    "use strict";

    function PriceRangeInstance(container) {
      var _this4 = this;

      _classCallCheck(this, PriceRangeInstance);

      this.container = container;
      this.selectors = {
        inputMin: '.cc-price-range__input--min',
        inputMax: '.cc-price-range__input--max',
        control: '.cc-price-range__control',
        controlMin: '.cc-price-range__control--min',
        controlMax: '.cc-price-range__control--max',
        bar: '.cc-price-range__bar',
        activeBar: '.cc-price-range__bar-active'
      };
      this.controls = {
        min: {
          barControl: container.querySelector(this.selectors.controlMin),
          input: container.querySelector(this.selectors.inputMin)
        },
        max: {
          barControl: container.querySelector(this.selectors.controlMax),
          input: container.querySelector(this.selectors.inputMax)
        }
      };
      this.controls.min.value = parseInt(this.controls.min.input.value === '' ? this.controls.min.input.placeholder : this.controls.min.input.value);
      this.controls.max.value = parseInt(this.controls.max.input.value === '' ? this.controls.max.input.placeholder : this.controls.max.input.value);
      this.valueMin = this.controls.min.input.min;
      this.valueMax = this.controls.min.input.max;
      this.valueRange = this.valueMax - this.valueMin;
      [this.controls.min, this.controls.max].forEach(function (item) {
        item.barControl.setAttribute('aria-valuemin', _this4.valueMin);
        item.barControl.setAttribute('aria-valuemax', _this4.valueMax);
        item.barControl.setAttribute('tabindex', 0);
      });
      this.controls.min.barControl.setAttribute('aria-valuenow', this.controls.min.value);
      this.controls.max.barControl.setAttribute('aria-valuenow', this.controls.max.value);
      this.bar = container.querySelector(this.selectors.bar);
      this.activeBar = container.querySelector(this.selectors.activeBar);
      this.inDrag = false;
      this.bindEvents();
      this.render();
    }

    _createClass(PriceRangeInstance, [{
      key: "getPxToValueRatio",
      value: function getPxToValueRatio() {
        return this.bar.clientWidth / (this.valueMax - this.valueMin);
      }
    }, {
      key: "getPcToValueRatio",
      value: function getPcToValueRatio() {
        return 100.0 / (this.valueMax - this.valueMin);
      }
    }, {
      key: "setActiveControlValue",
      value: function setActiveControlValue(value) {
        // only accept valid numbers
        if (isNaN(parseInt(value))) return; // clamp & default

        if (this.activeControl === this.controls.min) {
          if (value === '') {
            value = this.valueMin;
          }

          value = Math.max(this.valueMin, value);
          value = Math.min(value, this.controls.max.value);
        } else {
          if (value === '') {
            value = this.valueMax;
          }

          value = Math.min(this.valueMax, value);
          value = Math.max(value, this.controls.min.value);
        } // round


        this.activeControl.value = Math.round(value); // update input

        if (this.activeControl.input.value != this.activeControl.value) {
          if (this.activeControl.value == this.activeControl.input.placeholder) {
            this.activeControl.input.value = '';
          } else {
            this.activeControl.input.value = this.activeControl.value;
          }

          this.activeControl.input.dispatchEvent(new CustomEvent('change', {
            bubbles: true,
            cancelable: false,
            detail: {
              sender: 'theme:component:price_range'
            }
          }));
        } // a11y


        this.activeControl.barControl.setAttribute('aria-valuenow', this.activeControl.value);
      }
    }, {
      key: "render",
      value: function render() {
        this.drawControl(this.controls.min);
        this.drawControl(this.controls.max);
        this.drawActiveBar();
      }
    }, {
      key: "drawControl",
      value: function drawControl(control) {
        control.barControl.style.left = (control.value - this.valueMin) * this.getPcToValueRatio() + '%';
      }
    }, {
      key: "drawActiveBar",
      value: function drawActiveBar() {
        this.activeBar.style.left = (this.controls.min.value - this.valueMin) * this.getPcToValueRatio() + '%';
        this.activeBar.style.right = (this.valueMax - this.controls.max.value) * this.getPcToValueRatio() + '%';
      }
    }, {
      key: "handleControlTouchStart",
      value: function handleControlTouchStart(e) {
        e.preventDefault();
        this.startDrag(e.target, e.touches[0].clientX);
        this.boundControlTouchMoveEvent = this.handleControlTouchMove.bind(this);
        this.boundControlTouchEndEvent = this.handleControlTouchEnd.bind(this);
        window.addEventListener('touchmove', this.boundControlTouchMoveEvent);
        window.addEventListener('touchend', this.boundControlTouchEndEvent);
      }
    }, {
      key: "handleControlTouchMove",
      value: function handleControlTouchMove(e) {
        this.moveDrag(e.touches[0].clientX);
      }
    }, {
      key: "handleControlTouchEnd",
      value: function handleControlTouchEnd(e) {
        e.preventDefault();
        window.removeEventListener('touchmove', this.boundControlTouchMoveEvent);
        window.removeEventListener('touchend', this.boundControlTouchEndEvent);
        this.stopDrag();
      }
    }, {
      key: "handleControlMouseDown",
      value: function handleControlMouseDown(e) {
        e.preventDefault();
        this.startDrag(e.target, e.clientX);
        this.boundControlMouseMoveEvent = this.handleControlMouseMove.bind(this);
        this.boundControlMouseUpEvent = this.handleControlMouseUp.bind(this);
        window.addEventListener('mousemove', this.boundControlMouseMoveEvent);
        window.addEventListener('mouseup', this.boundControlMouseUpEvent);
      }
    }, {
      key: "handleControlMouseMove",
      value: function handleControlMouseMove(e) {
        this.moveDrag(e.clientX);
      }
    }, {
      key: "handleControlMouseUp",
      value: function handleControlMouseUp(e) {
        e.preventDefault();
        window.removeEventListener('mousemove', this.boundControlMouseMoveEvent);
        window.removeEventListener('mouseup', this.boundControlMouseUpEvent);
        this.stopDrag();
      }
    }, {
      key: "startDrag",
      value: function startDrag(target, startX) {
        if (this.controls.min.barControl === target) {
          this.activeControl = this.controls.min;
        } else {
          this.activeControl = this.controls.max;
        }

        this.dragStartX = startX;
        this.dragStartValue = this.activeControl.value;
        this.inDrag = true;
      }
    }, {
      key: "moveDrag",
      value: function moveDrag(moveX) {
        if (this.inDrag) {
          var value = this.dragStartValue + (moveX - this.dragStartX) / this.getPxToValueRatio();
          this.setActiveControlValue(value);
          this.render();
        }
      }
    }, {
      key: "stopDrag",
      value: function stopDrag() {
        this.inDrag = false;
      }
    }, {
      key: "handleControlKeyDown",
      value: function handleControlKeyDown(e) {
        if (e.key === 'ArrowRight') {
          this.incrementControlFromKeypress(e.target, 10.0);
        } else if (e.key === 'ArrowLeft') {
          this.incrementControlFromKeypress(e.target, -10.0);
        }
      }
    }, {
      key: "incrementControlFromKeypress",
      value: function incrementControlFromKeypress(control, pxAmount) {
        if (this.controls.min.barControl === control) {
          this.activeControl = this.controls.min;
        } else {
          this.activeControl = this.controls.max;
        }

        this.setActiveControlValue(this.activeControl.value + pxAmount / this.getPxToValueRatio());
        this.render();
      }
    }, {
      key: "handleInputChange",
      value: function handleInputChange(e) {
        // strip out non numeric values
        e.target.value = e.target.value.replace(/\D/g, '');

        if (!e.detail || e.detail.sender != 'theme:component:price_range') {
          if (this.controls.min.input === e.target) {
            this.activeControl = this.controls.min;
          } else {
            this.activeControl = this.controls.max;
          }

          this.setActiveControlValue(e.target.value);
          this.render();
        }
      }
    }, {
      key: "handleInputKeyup",
      value: function handleInputKeyup(e) {
        // enforce numeric chars in the input
        setTimeout(function () {
          this.value = this.value.replace(/\D/g, '');
        }.bind(e.target), 10);
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        var _this5 = this;

        [this.controls.min, this.controls.max].forEach(function (item) {
          item.barControl.addEventListener('touchstart', _this5.handleControlTouchStart.bind(_this5));
          item.barControl.addEventListener('mousedown', _this5.handleControlMouseDown.bind(_this5));
          item.barControl.addEventListener('keydown', _this5.handleControlKeyDown.bind(_this5));
          item.input.addEventListener('change', _this5.handleInputChange.bind(_this5));
          item.input.addEventListener('keyup', _this5.handleInputKeyup.bind(_this5));
        });
      }
    }, {
      key: "destroy",
      value: function destroy() {}
    }]);

    return PriceRangeInstance;
  }();

  var PriceRange = /*#__PURE__*/function (_ccComponent) {
    "use strict";

    _inherits(PriceRange, _ccComponent);

    var _super = _createSuper(PriceRange);

    function PriceRange() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'price-range';
      var cssSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".cc-".concat(name);

      _classCallCheck(this, PriceRange);

      return _super.call(this, name, cssSelector);
    }

    _createClass(PriceRange, [{
      key: "init",
      value: function init(container) {
        _get(_getPrototypeOf(PriceRange.prototype), "init", this).call(this, container);

        this.registerInstance(container, new PriceRangeInstance(container));
      }
    }, {
      key: "destroy",
      value: function destroy(container) {
        this.destroyInstance(container);

        _get(_getPrototypeOf(PriceRange.prototype), "destroy", this).call(this, container);
      }
    }]);

    return PriceRange;
  }(ccComponent);

  new PriceRange();

  var AccordionInstance = /*#__PURE__*/function () {
    "use strict";

    function AccordionInstance(container) {
      _classCallCheck(this, AccordionInstance);

      this.accordion = container;
      this.itemClass = '.cc-accordion-item';
      this.titleClass = '.cc-accordion-item__title';
      this.panelClass = '.cc-accordion-item__panel';
      this.allowMultiOpen = this.accordion.dataset.allowMultiOpen === 'true'; // If multiple open items not allowed, set open item as active (if there is one)

      if (!this.allowMultiOpen) {
        this.activeItem = this.accordion.querySelector("".concat(this.itemClass, "[open]"));
      }

      this.bindEvents();
    }
    /**
     * Adds inline 'height' style to a panel, to trigger open transition
     * @param {HTMLDivElement} panel - The accordion item content panel
     */


    _createClass(AccordionInstance, [{
      key: "open",

      /**
       * Opens an accordion item
       * @param {HTMLDetailsElement} item - The accordion item
       * @param {HTMLDivElement} panel - The accordion item content panel
       */
      value: function open(item, panel) {
        panel.style.height = '0'; // Set item to open. Blocking the default click action and opening it this way prevents a
        // slight delay which causes the panel height to be set to '0' (because item's not open yet)

        item.open = true;
        AccordionInstance.addPanelHeight(panel); // Slight delay required before starting transitions

        setTimeout(function () {
          item.classList.add('is-open');
        }, 10);

        if (!this.allowMultiOpen) {
          // If there's an active item and it's not the opened item, close it
          if (this.activeItem && this.activeItem !== item) {
            var activePanel = this.activeItem.querySelector(this.panelClass);
            this.close(this.activeItem, activePanel);
          }

          this.activeItem = item;
        }
      }
      /**
       * Closes an accordion item
       * @param {HTMLDetailsElement} item - The accordion item
       * @param {HTMLDivElement} panel - The accordion item content panel
       */

    }, {
      key: "close",
      value: function close(item, panel) {
        AccordionInstance.addPanelHeight(panel);
        item.classList.remove('is-open');
        item.classList.add('is-closing');

        if (this.activeItem === item) {
          this.activeItem = null;
        } // Slight delay required to allow scroll height to be applied before changing to '0'


        setTimeout(function () {
          panel.style.height = '0';
        }, 10);
      }
      /**
       * Handles 'click' event on the accordion
       * @param {Object} e - The event object
       */

    }, {
      key: "handleClick",
      value: function handleClick(e) {
        // Ignore clicks not on a toggle (<summary> element)
        if (!e.target.matches(this.titleClass)) return; // Prevent the default action
        // We'll trigger it manually after open transition initiated or close transition complete

        e.preventDefault();
        var item = e.target.parentNode;
        var panel = e.target.nextElementSibling;

        if (item.open) {
          this.close(item, panel);
        } else {
          this.open(item, panel);
        }
      }
      /**
       * Handles 'transitionend' event in the accordion
       * @param {Object} e - The event object
       */

    }, {
      key: "handleTransition",
      value: function handleTransition(e) {
        // Ignore transitions not on a panel element
        if (!e.target.matches(this.panelClass)) return;
        var panel = e.target;
        var item = panel.parentNode;

        if (item.classList.contains('is-closing')) {
          item.classList.remove('is-closing');
          item.open = false;
        }

        AccordionInstance.removePanelHeight(panel);
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        // Need to assign the function calls to variables because bind creates a new function,
        // which means the event listeners can't be removed in the usual way
        this.clickHandler = this.handleClick.bind(this);
        this.transitionHandler = this.handleTransition.bind(this);
        this.accordion.addEventListener('click', this.clickHandler);
        this.accordion.addEventListener('transitionend', this.transitionHandler);
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this.accordion.removeEventListener('click', this.clickHandler);
        this.accordion.removeEventListener('transitionend', this.transitionHandler);
      }
    }], [{
      key: "addPanelHeight",
      value: function addPanelHeight(panel) {
        panel.style.height = "".concat(panel.scrollHeight, "px");
      }
      /**
       * Removes inline 'height' style from a panel, to trigger close transition
       * @param {HTMLDivElement} panel - The accordion item content panel
       */

    }, {
      key: "removePanelHeight",
      value: function removePanelHeight(panel) {
        panel.getAttribute('style'); // Fix Safari bug (doesn't remove attribute without this first!)

        panel.removeAttribute('style');
      }
    }]);

    return AccordionInstance;
  }();

  var Accordion = /*#__PURE__*/function (_ccComponent2) {
    "use strict";

    _inherits(Accordion, _ccComponent2);

    var _super2 = _createSuper(Accordion);

    function Accordion() {
      var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'accordion';
      var cssSelector = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ".cc-".concat(name);

      _classCallCheck(this, Accordion);

      return _super2.call(this, name, cssSelector);
    }

    _createClass(Accordion, [{
      key: "init",
      value: function init(container) {
        _get(_getPrototypeOf(Accordion.prototype), "init", this).call(this, container);

        this.registerInstance(container, new AccordionInstance(container));
      }
    }, {
      key: "destroy",
      value: function destroy(container) {
        this.destroyInstance(container);

        _get(_getPrototypeOf(Accordion.prototype), "destroy", this).call(this, container);
      }
    }]);

    return Accordion;
  }(ccComponent);

  new Accordion(); // Manage videos

  theme.VideoManager = new function () {
    var _ = this;

    _._permitPlayback = function (container) {
      return !($(container).hasClass('video-container--background') && $(window).outerWidth() < 768);
    }; // Youtube


    _.youtubeVars = {
      incrementor: 0,
      apiReady: false,
      videoData: {},
      toProcessSelector: '.video-container[data-video-type="youtube"]:not(.video--init)'
    };

    _.youtubeApiReady = function () {
      _.youtubeVars.apiReady = true;

      _._loadYoutubeVideos();
    };

    _._loadYoutubeVideos = function (container) {
      if ($(_.youtubeVars.toProcessSelector, container).length) {
        if (_.youtubeVars.apiReady) {
          // play those videos
          $(_.youtubeVars.toProcessSelector, container).each(function () {
            // Don't init background videos on mobile
            if (_._permitPlayback($(this))) {
              $(this).addClass('video--init');
              _.youtubeVars.incrementor++;
              var containerId = 'theme-yt-video-' + _.youtubeVars.incrementor;
              $(this).data('video-container-id', containerId);
              var videoElement = $('<div class="video-container__video-element">').attr('id', containerId).appendTo($('.video-container__video', this));
              var autoplay = $(this).data('video-autoplay');
              var loop = $(this).data('video-loop');
              var player = new YT.Player(containerId, {
                height: '360',
                width: '640',
                videoId: $(this).data('video-id'),
                playerVars: {
                  iv_load_policy: 3,
                  modestbranding: 1,
                  autoplay: 0,
                  loop: loop ? 1 : 0,
                  playlist: $(this).data('video-id'),
                  rel: 0,
                  showinfo: 0
                },
                events: {
                  onReady: _._onYoutubePlayerReady.bind({
                    autoplay: autoplay,
                    loop: loop,
                    $container: $(this)
                  }),
                  onStateChange: _._onYoutubePlayerStateChange.bind({
                    autoplay: autoplay,
                    loop: loop,
                    $container: $(this)
                  })
                }
              });
              _.youtubeVars.videoData[containerId] = {
                id: containerId,
                container: this,
                videoElement: videoElement,
                player: player
              };
            }
          });
        } else {
          // load api
          theme.loadScriptOnce('https://www.youtube.com/iframe_api');
        }
      }
    };

    _._onYoutubePlayerReady = function (event) {
      event.target.setPlaybackQuality('hd1080');

      if (this.autoplay) {
        event.target.mute();
        event.target.playVideo();
      }

      _._initBackgroundVideo(this.$container);
    };

    _._onYoutubePlayerStateChange = function (event) {
      if (event.data == YT.PlayerState.PLAYING) {
        this.$container.addClass('video--play-started');

        if (this.autoplay) {
          event.target.mute();
        }

        if (this.loop) {
          // 4 times a second, check if we're in the final second of the video. If so, loop it for a more seamless loop
          var finalSecond = event.target.getDuration() - 1;

          if (finalSecond > 2) {
            var loopTheVideo = function loopTheVideo() {
              if (event.target.getCurrentTime() > finalSecond) {
                event.target.seekTo(0);
              }

              setTimeout(loopTheVideo, 250);
            };

            loopTheVideo();
          }
        }
      }
    };

    _._unloadYoutubeVideos = function (container) {
      for (var dataKey in _.youtubeVars.videoData) {
        var data = _.youtubeVars.videoData[dataKey];

        if ($(container).find(data.container).length) {
          data.player.destroy();
          delete _.youtubeVars.videoData[dataKey];
          return;
        }
      }
    }; // Vimeo


    _.vimeoVars = {
      incrementor: 0,
      apiReady: false,
      videoData: {},
      toProcessSelector: '.video-container[data-video-type="vimeo"]:not(.video--init)'
    };

    _.vimeoApiReady = function () {
      _.vimeoVars.apiReady = true;

      _._loadVimeoVideos();
    };

    _._loadVimeoVideos = function (container) {
      if ($(_.vimeoVars.toProcessSelector, container).length) {
        if (_.vimeoVars.apiReady) {
          // play those videos
          $(_.vimeoVars.toProcessSelector, container).each(function () {
            // Don't init background videos on mobile
            if (_._permitPlayback($(this))) {
              $(this).addClass('video--init');
              _.vimeoVars.incrementor++;
              var $this = $(this);
              var containerId = 'theme-vi-video-' + _.vimeoVars.incrementor;
              $(this).data('video-container-id', containerId);
              var videoElement = $('<div class="video-container__video-element">').attr('id', containerId).appendTo($('.video-container__video', this));
              var autoplay = !!$(this).data('video-autoplay');
              var player = new Vimeo.Player(containerId, {
                url: $(this).data('video-url'),
                width: 640,
                loop: $(this).data('video-autoplay'),
                autoplay: autoplay,
                muted: $this.hasClass('video-container--background')
              });
              player.on('playing', function () {
                $(this).addClass('video--play-started');
              }.bind(this));
              player.ready().then(function () {
                if (autoplay) {
                  player.setVolume(0);
                  player.play();
                }

                if (player.element && player.element.width && player.element.height) {
                  var ratio = parseInt(player.element.height) / parseInt(player.element.width);
                  $this.find('.video-container__video').css('padding-bottom', ratio * 100 + '%');
                }

                _._initBackgroundVideo($this);
              });
              _.vimeoVars.videoData[containerId] = {
                id: containerId,
                container: this,
                videoElement: videoElement,
                player: player,
                autoPlay: autoplay
              };
            }
          });
        } else {
          // load api
          if (window.define) {
            // workaround for third parties using RequireJS
            theme.loadScriptOnce('https://player.vimeo.com/api/player.js', function () {
              _.vimeoVars.apiReady = true;

              _._loadVimeoVideos();

              window.define = window.tempDefine;
            }, function () {
              window.tempDefine = window.define;
              window.define = null;
            });
          } else {
            theme.loadScriptOnce('https://player.vimeo.com/api/player.js', function () {
              _.vimeoVars.apiReady = true;

              _._loadVimeoVideos();
            });
          }
        }
      }
    };

    _._unloadVimeoVideos = function (container) {
      for (var dataKey in _.vimeoVars.videoData) {
        var data = _.vimeoVars.videoData[dataKey];

        if ($(container).find(data.container).length) {
          data.player.unload();
          delete _.vimeoVars.videoData[dataKey];
          return;
        }
      }
    }; // Init third party apis - Youtube and Vimeo


    _._loadThirdPartyApis = function (container) {
      //Don't init youtube or vimeo background videos on mobile
      if (_._permitPlayback($('.video-container', container))) {
        _._loadYoutubeVideos(container);

        _._loadVimeoVideos(container);
      }
    }; // Mp4


    _.mp4Vars = {
      incrementor: 0,
      videoData: {},
      toProcessSelector: '.video-container[data-video-type="mp4"]:not(.video--init)'
    };

    _._loadMp4Videos = function (container) {
      if ($(_.mp4Vars.toProcessSelector, container).length) {
        // play those videos
        $(_.mp4Vars.toProcessSelector, container).addClass('video--init').each(function () {
          _.mp4Vars.incrementor++;
          var $this = $(this);
          var containerId = 'theme-mp-video-' + _.mp4Vars.incrementor;
          $(this).data('video-container-id', containerId);
          var videoElement = $('<div class="video-container__video-element">').attr('id', containerId).appendTo($('.video-container__video', this));
          var $video = $('<video playsinline>');

          if ($(this).data('video-loop')) {
            $video.attr('loop', 'loop');
          }

          if ($(this).data('video-autoplay')) {
            $video.attr({
              autoplay: 'autoplay',
              muted: 'muted'
            });
            $video[0].muted = true; // required by Chrome - ignores attribute

            $video.one('loadeddata', function () {
              this.play();
            });
          }

          $video.on('playing', function () {
            $(this).addClass('video--play-started');
          }.bind(this));
          $video.attr('src', $(this).data('video-url')).appendTo(videoElement);
        });
      }
    };

    _._unloadMp4Videos = function (container) {}; // background video placement for iframes


    _._initBackgroundVideo = function ($container) {
      if ($container.hasClass('video-container--background') && $container.find('.video-container__video iframe').length) {
        var assessBackgroundVideo = function assessBackgroundVideo() {
          var $container = this,
              cw = $container.width(),
              ch = $container.height(),
              cr = cw / ch,
              $frame = $('.video-container__video iframe', this),
              vr = $frame.attr('width') / $frame.attr('height'),
              $pan = $('.video-container__video', this),
              vCrop = 75; // pushes video outside container to hide controls

          if (cr > vr) {
            var vh = cw / vr + vCrop * 2;
            $pan.css({
              marginTop: (ch - vh) / 2 - vCrop,
              marginLeft: '',
              height: vh + vCrop * 2,
              width: ''
            });
          } else {
            var vw = cw * vr + vCrop * 2 * vr;
            $pan.css({
              marginTop: -vCrop,
              marginLeft: (cw - vw) / 2,
              height: ch + vCrop * 2,
              width: vw
            });
          }
        };

        assessBackgroundVideo.bind($container)();
        $(window).on('debouncedresize.' + $container.data('video-container-id'), assessBackgroundVideo.bind($container));
      }
    }; // Compatibility with Sections


    this.onSectionLoad = function (container) {
      // url only - infer type
      $('.video-container[data-video-url]:not([data-video-type])').each(function () {
        var url = $(this).data('video-url');

        if (url.indexOf('.mp4') > -1) {
          $(this).attr('data-video-type', 'mp4');
        }

        if (url.indexOf('vimeo.com') > -1) {
          $(this).attr('data-video-type', 'vimeo');
          $(this).attr('data-video-id', url.split('?')[0].split('/').pop());
        }

        if (url.indexOf('youtu.be') > -1 || url.indexOf('youtube.com') > -1) {
          $(this).attr('data-video-type', 'youtube');

          if (url.indexOf('v=') > -1) {
            $(this).attr('data-video-id', url.split('v=').pop().split('&')[0]);
          } else {
            $(this).attr('data-video-id', url.split('?')[0].split('/').pop());
          }
        }
      });

      _._loadThirdPartyApis(container);

      _._loadMp4Videos(container);

      $(window).on('debouncedresize.video-manager-resize', function () {
        _._loadThirdPartyApis(container);
      }); // play button

      $('.video-container__play', container).on('click', function (evt) {
        evt.preventDefault();
        var $container = $(this).closest('.video-container'); // reveal

        $container.addClass('video-container--playing'); // broadcast a play event on the section container

        $(container).trigger("cc:video:play"); // play

        var id = $container.data('video-container-id');

        if (id.indexOf('theme-yt-video') === 0) {
          _.youtubeVars.videoData[id].player.playVideo();
        } else {
          _.vimeoVars.videoData[id].player.play();
        }
      }); // modal close button

      $('.video-container__stop', container).on('click', function (evt) {
        evt.preventDefault();
        var $container = $(this).closest('.video-container'); // hide

        $container.removeClass('video-container--playing'); // broadcast a stop event on the section container

        $(container).trigger("cc:video:stop"); // play

        var id = $container.data('video-container-id');

        if (id.indexOf('theme-yt-video') === 0) {
          _.youtubeVars.videoData[id].player.stopVideo();
        } else {
          _.vimeoVars.videoData[id].player.pause();

          _.vimeoVars.videoData[id].player.setCurrentTime(0);
        }
      });
    };

    this.onSectionUnload = function (container) {
      $('.video-container__play, .video-container__stop', container).off('click');
      $(window).off('.' + $('.video-container').data('video-container-id'));
      $(window).off('debouncedresize.video-manager-resize');

      _._unloadYoutubeVideos(container);

      _._unloadVimeoVideos(container);

      _._unloadMp4Videos(container);

      $(container).trigger("cc:video:stop");
    };
  }(); // Youtube API callback

  window.onYouTubeIframeAPIReady = function () {
    theme.VideoManager.youtubeApiReady();
  }; // Register the section


  cc.sections.push({
    name: 'video',
    section: theme.VideoManager
  });
  theme.MapSection = new function () {
    var _ = this;

    _.config = {
      zoom: 14,
      styles: {
        "default": [],
        silver: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f5f5"
          }]
        }, {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#f5f5f5"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#bdbdbd"
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e5e5e5"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#ffffff"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dadada"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e5e5e5"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#c9c9c9"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }],
        retro: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#ebe3cd"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#523735"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#f5f1e6"
          }]
        }, {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#c9b2a6"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#dcd2be"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#ae9e90"
          }]
        }, {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#93817c"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#a5b076"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#447530"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f1e6"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
            "color": "#fdfcf8"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#f8c967"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#e9bc62"
          }]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e98d58"
          }]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#db8555"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#806b63"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8f7d77"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#ebe3cd"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dfd2ae"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#b9d3c2"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#92998d"
          }]
        }],
        dark: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#212121"
          }]
        }, {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#212121"
          }]
        }, {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "stylers": [{
            "visibility": "off"
          }]
        }, {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#bdbdbd"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#181818"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1b1b1b"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#2c2c2c"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8a8a8a"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{
            "color": "#373737"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#3c3c3c"
          }]
        }, {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [{
            "color": "#4e4e4e"
          }]
        }, {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        }, {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#000000"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#3d3d3d"
          }]
        }],
        night: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#242f3e"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#746855"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#242f3e"
          }]
        }, {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#d59563"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#d59563"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#263c3f"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#6b9a76"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#38414e"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#212a37"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9ca5b3"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#746855"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#1f2835"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#f3d19c"
          }]
        }, {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [{
            "color": "#2f3948"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#d59563"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#17263c"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#515c6d"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#17263c"
          }]
        }],
        aubergine: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#8ec3b9"
          }]
        }, {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1a3646"
          }]
        }, {
          "featureType": "administrative.country",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        }, {
          "featureType": "administrative.land_parcel",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#64779e"
          }]
        }, {
          "featureType": "administrative.province",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#4b6878"
          }]
        }, {
          "featureType": "landscape.man_made",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#334e87"
          }]
        }, {
          "featureType": "landscape.natural",
          "elementType": "geometry",
          "stylers": [{
            "color": "#023e58"
          }]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#283d6a"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#6f9ba5"
          }]
        }, {
          "featureType": "poi",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#023e58"
          }]
        }, {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#3C7680"
          }]
        }, {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#304a7d"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        }, {
          "featureType": "road",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#2c6675"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [{
            "color": "#255763"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#b0d5ce"
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#023e58"
          }]
        }, {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#98a5be"
          }]
        }, {
          "featureType": "transit",
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#1d2c4d"
          }]
        }, {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [{
            "color": "#283d6a"
          }]
        }, {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#3a4762"
          }]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#0e1626"
          }]
        }, {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#4e6d70"
          }]
        }]
      }
    };
    _.apiStatus = null;

    this.geolocate = function ($map) {
      var deferred = $.Deferred();
      var geocoder = new google.maps.Geocoder();
      var address = $map.data('address-setting');
      geocoder.geocode({
        address: address
      }, function (results, status) {
        if (status !== google.maps.GeocoderStatus.OK) {
          deferred.reject(status);
        }

        deferred.resolve(results);
      });
      return deferred;
    };

    this.createMap = function (container) {
      var $map = $('.map-section__map-container', container);
      return _.geolocate($map).then(function (results) {
        var mapOptions = {
          zoom: _.config.zoom,
          styles: _.config.styles[$(container).data('map-style')],
          center: results[0].geometry.location,
          scrollwheel: false,
          disableDoubleClickZoom: true,
          disableDefaultUI: true,
          zoomControl: true
        };
        _.map = new google.maps.Map($map[0], mapOptions);
        _.center = _.map.getCenter();
        var marker = new google.maps.Marker({
          map: _.map,
          position: _.center,
          clickable: false
        });
        google.maps.event.addDomListener(window, 'resize', function () {
          google.maps.event.trigger(_.map, 'resize');

          _.map.setCenter(_.center);
        });
      }.bind(this)).fail(function () {
        var errorMessage;

        switch (status) {
          case 'ZERO_RESULTS':
            errorMessage = theme.strings.addressNoResults;
            break;

          case 'OVER_QUERY_LIMIT':
            errorMessage = theme.strings.addressQueryLimit;
            break;

          default:
            errorMessage = theme.strings.addressError;
            break;
        } // Only show error in the theme editor


        if (Shopify.designMode) {
          var $mapContainer = $map.parents('.map-section');
          $mapContainer.addClass('page-width map-section--load-error');
          $mapContainer.find('.map-section__wrapper').html('<div class="errors text-center">' + errorMessage + '</div>');
        }
      });
    };

    this.onSectionLoad = function (target) {
      var $container = $(target); // Global function called by Google on auth errors

      window.gm_authFailure = function () {
        if (!Shopify.designMode) return;
        $container.addClass('page-width map-section--load-error');
        $container.find('.map-section__wrapper').html('<div class="errors text-center">' + theme.strings.authError + '</div>');
      }; // create maps


      var key = $container.data('api-key');

      if (typeof key !== 'string' || key === '') {
        return;
      } // load map


      theme.loadScriptOnce('https://maps.googleapis.com/maps/api/js?key=' + key, function () {
        _.createMap($container);
      });
    };

    this.onSectionUnload = function (target) {
      if (typeof window.google !== 'undefined' && typeof google.maps !== 'undefined') {
        google.maps.event.clearListeners(this.map, 'resize');
      }
    };
  }(); // Register the section

  cc.sections.push({
    name: 'map',
    section: theme.MapSection
  });
  /**
   * Popup Section Script
   * ------------------------------------------------------------------------------
   *
   * @namespace Popup
   */

  theme.Popup = new function () {
    /**
     * Popup section constructor. Runs on page load as well as Theme Editor
     * `section:load` events.
     * @param {string} container - selector for the section container DOM element
     */
    var dismissedStorageKey = 'cc-theme-popup-dismissed';

    this.onSectionLoad = function (container) {
      var _this6 = this;

      this.namespace = theme.namespaceFromSection(container);
      this.$container = $(container);
      this.popup = new ccPopup(this.$container, this.namespace);
      var dismissForDays = this.$container.data('dismiss-for-days'),
          delaySeconds = this.$container.data('delay-seconds'),
          showPopup = true,
          testMode = this.$container.data('test-mode'),
          lastDismissed = window.localStorage.getItem(dismissedStorageKey); // Should we show it during this page view?
      // Check when it was last dismissed

      if (lastDismissed) {
        var dismissedDaysAgo = (new Date().getTime() - lastDismissed) / (1000 * 60 * 60 * 24);

        if (dismissedDaysAgo < dismissForDays) {
          showPopup = false;
        }
      } // Check for error or success messages


      if (this.$container.find('.cc-popup-form__response').length) {
        showPopup = true;
        delaySeconds = 1; // If success, set as dismissed

        if (this.$container.find('.cc-popup-form__response--success').length) {
          this.functions.popupSetAsDismissed.call(this);
        }
      } // Prevent popup on Shopify robot challenge page


      if (document.querySelector('.shopify-challenge__container')) {
        showPopup = false;
      } // Show popup, if appropriate


      if (showPopup || testMode) {
        setTimeout(function () {
          _this6.popup.open();
        }, delaySeconds * 1000);
      } // Click on close button or modal background


      this.$container.on('click' + this.namespace, '.cc-popup-close, .cc-popup-background', function () {
        _this6.popup.close(function () {
          _this6.functions.popupSetAsDismissed.call(_this6);
        });
      });
    };

    this.onSectionSelect = function () {
      this.popup.open();
    };

    this.functions = {
      /**
       * Use localStorage to set as dismissed
       */
      popupSetAsDismissed: function popupSetAsDismissed() {
        window.localStorage.setItem(dismissedStorageKey, new Date().getTime());
      }
    };
    /**
     * Event callback for Theme Editor `section:unload` event
     */

    this.onSectionUnload = function () {
      this.$container.off(this.namespace);
    };
  }(); // Register section

  cc.sections.push({
    name: 'newsletter-popup',
    section: theme.Popup
  });
  /**
   * StoreAvailability Section Script
   * ------------------------------------------------------------------------------
   *
   * @namespace StoreAvailability
   */

  theme.StoreAvailability = function (container) {
    var loadingClass = 'store-availability-loading';
    var initClass = 'store-availability-initialized';
    var storageKey = 'cc-location';

    this.onSectionLoad = function (container) {
      var _this7 = this;

      this.namespace = theme.namespaceFromSection(container);
      this.$container = $(container);
      this.productId = this.$container.data('store-availability-container');
      this.sectionUrl = this.$container.data('section-url');
      this.$modal;
      var firstRun = true; // Handle when a variant is selected

      $(window).on("cc-variant-updated".concat(this.namespace).concat(this.productId), function (e, args) {
        if (args.product.id === _this7.productId) {
          _this7.functions.updateContent.bind(_this7)(args.variant.id, args.product.title, firstRun, _this7.$container.data('has-only-default-variant'), typeof args.variant.available !== "undefined");

          firstRun = false;
        }
      }); // Handle single variant products

      if (this.$container.data('single-variant-id')) {
        this.functions.updateContent.bind(this)(this.$container.data('single-variant-id'), this.$container.data('single-variant-product-title'), firstRun, this.$container.data('has-only-default-variant'), this.$container.data('single-variant-product-available'));
        firstRun = false;
      }
    };

    this.onSectionUnload = function () {
      $(window).off("cc-variant-updated".concat(this.namespace).concat(this.productId));
      this.$container.off('click');

      if (this.$modal) {
        this.$modal.off('click');
      }
    };

    this.functions = {
      // Returns the users location data (if allowed)
      getUserLocation: function getUserLocation() {
        return new Promise(function (resolve, reject) {
          var storedCoords;

          if (sessionStorage[storageKey]) {
            storedCoords = JSON.parse(sessionStorage[storageKey]);
          }

          if (storedCoords) {
            resolve(storedCoords);
          } else {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function (position) {
                var coords = {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                }; //Set the localization api

                fetch('/localization.json', {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(coords)
                }); //Write to a session storage

                sessionStorage[storageKey] = JSON.stringify(coords);
                resolve(coords);
              }, function () {
                resolve(false);
              }, {
                maximumAge: 3600000,
                // 1 hour
                timeout: 5000
              });
            } else {
              resolve(false);
            }
          }
        });
      },
      // Requests the available stores and calls the callback
      getAvailableStores: function getAvailableStores(variantId, cb) {
        return $.get(this.sectionUrl.replace('VARIANT_ID', variantId), cb);
      },
      // Haversine Distance
      // The haversine formula is an equation giving great-circle distances between
      // two points on a sphere from their longitudes and latitudes
      calculateDistance: function calculateDistance(coords1, coords2, unitSystem) {
        var dtor = Math.PI / 180;
        var radius = unitSystem === 'metric' ? 6378.14 : 3959;
        var rlat1 = coords1.latitude * dtor;
        var rlong1 = coords1.longitude * dtor;
        var rlat2 = coords2.latitude * dtor;
        var rlong2 = coords2.longitude * dtor;
        var dlon = rlong1 - rlong2;
        var dlat = rlat1 - rlat2;
        var a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(rlat1) * Math.cos(rlat2) * Math.pow(Math.sin(dlon / 2), 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return radius * c;
      },
      // Updates the existing modal pickup with locations with distances from the user
      updateLocationDistances: function updateLocationDistances(coords) {
        var unitSystem = this.$modal.find('[data-unit-system]').data('unit-system');
        var self = this;
        this.$modal.find('[data-distance="false"]').each(function () {
          var _this8 = this;

          var thisCoords = {
            latitude: parseFloat($(this).data('latitude')),
            longitude: parseFloat($(this).data('longitude'))
          };

          if (thisCoords.latitude && thisCoords.longitude) {
            var distance = self.functions.calculateDistance(coords, thisCoords, unitSystem).toFixed(1);
            $(this).html(distance); //Timeout to trigger animation

            setTimeout(function () {
              $(_this8).closest('.store-availability-list__location__distance').addClass('-in');
            }, 0);
          }

          $(this).attr('data-distance', 'true');
        });
      },
      // Requests the available stores and updates the page with info below Add to Basket, and append the modal to the page
      updateContent: function updateContent(variantId, productTitle, firstRun, isSingleDefaultVariant, isVariantAvailable) {
        var _this9 = this;

        this.$container.off('click', '[data-store-availability-modal-open]');
        this.$container.off('click' + this.namespace, '.cc-popup-close, .cc-popup-background');
        $('.store-availabilities-modal').remove();

        if (firstRun) {
          this.$container.hide();
        } else if (!isVariantAvailable) {
          //If the variant is Unavailable (not the same as Out of Stock) - hide the store pickup completely
          this.$container.addClass(loadingClass).addClass(initClass);
          this.$container.css('height', '0px');
        } else {
          this.$container.addClass(loadingClass).addClass(initClass);
          this.$container.css('height', this.$container.outerHeight() > 0 ? this.$container.outerHeight() + 'px' : 'auto');
        }

        if (isVariantAvailable) {
          this.functions.getAvailableStores.call(this, variantId, function (response) {
            if (response.trim().length > 0 && !response.includes('NO_PICKUP')) {
              _this9.$container.html(response);

              _this9.$container.html(_this9.$container.children().first().html()); // editor bug workaround


              _this9.$container.find('[data-store-availability-modal-product-title]').html(productTitle);

              if (isSingleDefaultVariant) {
                _this9.$container.find('.store-availabilities-modal__variant-title').remove();
              }

              _this9.$container.find('.cc-popup').appendTo('body');

              _this9.$modal = $('body').find('.store-availabilities-modal');
              var popup = new ccPopup(_this9.$modal, _this9.namespace);

              _this9.$container.on('click', '[data-store-availability-modal-open]', function () {
                popup.open(); //When the modal is opened, try and get the users location

                _this9.functions.getUserLocation().then(function (coords) {
                  if (coords && _this9.$modal.find('[data-distance="false"]').length) {
                    //Re-retrieve the available stores location modal contents
                    _this9.functions.getAvailableStores.call(_this9, variantId, function (response) {
                      _this9.$modal.find('.store-availabilities-list').html($(response).find('.store-availabilities-list').html());

                      _this9.functions.updateLocationDistances.bind(_this9)(coords);
                    });
                  }
                });

                return false;
              });

              _this9.$modal.on('click' + _this9.namespace, '.cc-popup-close, .cc-popup-background', function () {
                popup.close();
              });

              if (firstRun) {
                _this9.$container.slideDown(300);
              } else {
                _this9.$container.removeClass(loadingClass);

                var newHeight = _this9.$container.find('.store-availability-container').outerHeight();

                _this9.$container.css('height', newHeight > 0 ? newHeight + 'px' : 'auto');
              }
            }
          });
        }
      }
    }; // Initialise the section when it's instantiated

    this.onSectionLoad(container);
  }; // Register section


  cc.sections.push({
    name: 'store-availability',
    section: theme.StoreAvailability
  });
  /*================ General ================*/

  theme.icons = {
    left: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>',
    right: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>',
    close: '<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>',
    chevronLeft: '<svg fill="#000000" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M 14.51,6.51 14,6 8,12 14,18 14.51,17.49 9.03,12 Z"></path></svg>',
    chevronRight: '<svg fill="#000000" viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M 10,6 9.49,6.51 14.97,12 9.49,17.49 10,18 16,12 Z"></path></svg>',
    tick: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>'
  };
  theme.viewport = {
    isXs: function isXs() {
      return $(window).outerWidth() < 768;
    },
    isSm: function isSm() {
      return $(window).outerWidth() >= 768;
    },
    isMd: function isMd() {
      return $(window).outerWidth() >= 992;
    },
    isLg: function isLg() {
      return $(window).outerWidth() >= 1200;
    },
    scrollTo: function scrollTo($elem) {
      var scrollTop = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      var speed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
      var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var compensateForNavToolbar = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if ($elem && typeof $elem === 'string') {
        $elem = $($elem);
      }

      if (compensateForNavToolbar) {
        offset += $('#toolbar').outerHeight();
      }

      if (scrollTop === -1 && $elem && $elem.length) {
        scrollTop = $elem.offset().top - offset;
      }

      $('html,body').animate({
        scrollTop: scrollTop
      }, speed);
    }
  };
  theme.browser = {
    isSafari: function isSafari() {
      return navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
    }
  };
  theme.device = {
    isTouch: function isTouch() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    }
  }; // Get Shopify feature support

  try {
    theme.Shopify.features = JSON.parse(document.documentElement.querySelector('#shopify-features').textContent);
  } catch (e) {
    theme.Shopify.features = {};
  } // Manage option dropdowns


  theme.productData = {};
  ; //Lazy load images for browsers which dont support ES6 class

  if (!theme.imageLazyLoader) {
    var images = document.querySelectorAll('img[loading="lazy"][data-lazy-src],[data-lazy-bg]');

    for (var i = 0; i < images.length; i++) {
      var img = images[i],
          imgWidth = img.clientWidth ? img.clientWidth : 500,
          imgLazySrc = img.getAttribute('data-lazy-src');

      if (imgLazySrc) {
        img.setAttribute('src', imgLazySrc.replace('{width}x', imgWidth + 'x'));
      } else {
        var imgLazyBg = img.getAttribute('data-lazy-bg');

        if (imgLazyBg) {
          img.style.backgroundImage = 'url(' + imgLazyBg.replace('{width}x', imgWidth + 'x') + ')';
        }
      }
    }

    theme.imageLazyLoader = {
      loadLazyImage: function loadLazyImage() {},
      loadLazyImages: function loadLazyImages() {}
    };
  }

  ;

  theme.namespaceFromSection = function (container) {
    return ['.', $(container).data('section-type'), $(container).data('section-id')].join('');
  };

  theme.initContentSlider = function (target, afterChange) {
    var lastSlide = $('.slideshow .slide', target).length - 1;
    var speed = $(this).data('transition') == 'instant' ? 0 : 1000;

    if ($(this).data('transition-speed')) {
      speed = $(this).data('transition-speed');
    }

    $('.slideshow', target).each(function () {
      $(this).on('init', function () {
        //Lazyload all slide images after a few seconds
        setTimeout(function () {
          $('.slideshow', target).find('img[loading="lazy"]').each(function () {
            theme.imageLazyLoader.loadLazyImage($(this)[0]);
            $(this).attr('loading', 'auto');
          });
        }, 5000);
      }).slick({
        autoplay: $(this).data('autoplay'),
        fade: $(this).data('transition') != 'slide',
        speed: speed,
        autoplaySpeed: $(this).data('autoplay-speed') * 1000,
        arrows: $(this).data('navigation') == 'arrows',
        dots: $(this).data('navigation') == 'dots',
        infinite: true,
        useTransform: true,
        prevArrow: '<button type="button" class="slick-prev" aria-label="' + theme.strings.previous + '">' + theme.icons.chevronLeft + '</button>',
        nextArrow: '<button type="button" class="slick-next" aria-label="' + theme.strings.next + '">' + theme.icons.chevronRight + '</button>',
        pauseOnHover: false,
        cssEase: 'cubic-bezier(0.25, 1, 0.5, 1)',
        lazyLoad: $(this).find('[data-lazy]').length > 0 ? 'ondemand' : null,
        responsive: [{
          breakpoint: 768,
          settings: {
            fade: $(this).data('transition') != 'slide',
            // keep instant gif-style on mobile
            speed: $(this).data('transition') == 'instant' ? 0 : 750,
            arrows: false,
            //$(this).data('navigation') == 'arrows',
            dots: $(this).data('navigation') != 'none',
            // $(this).data('navigation') == 'none' || $(this).data('navigation') == 'dots',
            lazyLoad: $(this).find('[data-lazy]').length > 0 ? 'progressive' : null
          }
        }]
      }).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var _this10 = this;

        //Figure out the direction we're travelling in
        var direction = "left";

        if ((nextSlide < currentSlide && !(currentSlide === lastSlide && nextSlide === 0) || currentSlide == 0 && nextSlide === lastSlide) && !(nextSlide === 1 && currentSlide === 0)) {
          direction = 'right';
        } //Pop the direction to animate from, forcing the text left or right and hidden


        $(this).addClass("direction-".concat(direction));
        var $outgoingSlide = $(slick.$slides.get(currentSlide));
        $outgoingSlide.addClass('-outgoing').addClass('-leaving');
        var movingToClonedSlide = currentSlide === lastSlide && nextSlide === nextSlide || currentSlide === 0 && nextSlide === lastSlide;
        setTimeout(function () {
          //Remove the direction and animate the text in
          $(_this10).removeClass('direction-left').removeClass('direction-right');
          $outgoingSlide.removeClass('-outgoing');
        }, movingToClonedSlide ? 600 : 100); //Cloned slides take longer to initialise

        setTimeout(function () {
          $outgoingSlide.removeClass('-leaving');
        }, 1000);
      }).on('afterChange', function (event, slick, currentSlide) {
        if (afterChange) {
          afterChange(currentSlide);
        }
      });
    });
  }; /// Wide images inside rich text content
  // To use: add class 'uncontain' to image, or add alt text ending 'fullwidth'


  theme.uncontainImages = function (container) {
    // set up
    $('.reading-column [data-fullwidth]:not(.uncontain)', container).addClass('uncontain'); // event

    if ($('.reading-column .uncontain').length > 0) {
      var checkWideImages = function checkWideImages() {
        var contW = $('#page-wrap-inner').css('border-color') == 'rgb(255, 0, 1)' ? $(window).width() : $('.container:visible:first').width();
        $('.reading-column .uncontain').each(function () {
          var thisContW = $(this).closest('div:not(.uncontain), p:not(.uncontain)').width();
          $(this).css({
            width: contW,
            marginLeft: -(contW - thisContW) / 2.0,
            maxWidth: 'none'
          });
        });
      };

      $(window).on('resize.wideimgs wideimgs.wideimgs', checkWideImages).trigger('wideimgs');
      $(function () {
        checkWideImages();
      });
    } else {
      $(window).off('.wideimgs');
    }
  }; /// Cookie management


  theme.createCookie = function (name, value, days) {
    var expires = "";

    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + "; path=/";
  };

  theme.readCookie = function (name) {
    var nameEQ = name + "=";

    try {
      var ca = document.cookie.split(';');

      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];

        while (c.charAt(0) == ' ') {
          c = c.substring(1, c.length);
        }

        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
    } catch (error) {}

    return null;
  };

  theme.eraseCookie = function (name) {
    theme.createCookie(name, "", -1);
  }; /// Format money wrapper


  theme.formatMoney = function (price) {
    var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : theme.money_format;
    var formattedMoney = theme.Shopify.formatMoney(price, format);

    if (theme.settings.superscriptDecimals) {
      if (format.includes("{{amount}}") || format.includes("{{ amount }}") || format.includes("{{amount_with_apostrophe_separator}}") || format.includes("{{ amount_with_apostrophe_separator }}")) {
        formattedMoney = formattedMoney.replace(".", "<sup>") + "</sup>";
      } else if (format.includes("{{amount_with_comma_separator}}") || format.includes("{{ amount_with_comma_separator }}")) {
        formattedMoney = formattedMoney.replace(",", "<sup>") + "</sup>";
      }
    }

    return formattedMoney;
  };
  /*============== Components ===============*/


  theme.OptionManager = new function () {
    var _ = this;

    _._getVariantOptionElement = function (variant, $container) {
      return $container.find('select[name="id"] option[value="' + variant.id + '"]');
    };

    _.selectors = {
      container: '.product-container',
      gallery: '.product-gallery',
      priceArea: '.product-price',
      submitButton: '.product-form input[type=submit], .product-form button[type=submit]',
      multiOption: '.option-selectors'
    };
    _.strings = {
      priceNonExistent: theme.strings.priceNonExistent,
      buttonDefault: theme.strings.buttonDefault,
      buttonNoStock: theme.strings.buttonNoStock,
      buttonNoVariant: theme.strings.buttonNoVariant,
      unitPriceSeparator: theme.strings.unitPriceSeparator,
      inventoryNotice: theme.strings.onlyXLeft
    };

    _._getString = function (key, variant) {
      var string = _.strings[key];

      if (variant) {
        string = string.replace('[PRICE]', '<span class="theme-money">' + theme.formatMoney(variant.price) + '</span>');
      }

      return string;
    };

    _.getProductData = function ($form) {
      var productId = $form.data('product-id');
      var data = null;

      if (!theme.productData[productId]) {
        var productJsonElem = document.getElementById('ccProductJson-' + productId);

        if (productJsonElem) {
          theme.productData[productId] = JSON.parse(productJsonElem.innerHTML);
        }
      }

      data = theme.productData[productId];

      if (!data) {
        console.warn('CC: Product data missing (id: ' + $form.data('product-id') + ')');
      }

      return data;
    };

    _.getBaseUnit = function (variant) {
      return variant.unit_price_measurement.reference_value === 1 ? variant.unit_price_measurement.reference_unit : variant.unit_price_measurement.reference_value + variant.unit_price_measurement.reference_unit;
    }, _.addVariantUrlToHistory = function (variant) {
      if (variant) {
        var newurl = window.location.protocol + '//' + window.location.host + window.location.pathname + '?variant=' + variant.id;
        window.history.replaceState({
          path: newurl
        }, '', newurl);
      }
    };

    _.updateWeight = function (variant, $container) {
      var weightData = _._getVariantOptionElement(variant, $container).data('weight');

      if (weightData) {
        $container.find('.product-weight').removeClass('product-weight--no-weight').find('.product-weight__value').html(weightData);
      } else {
        $container.find('.product-weight').addClass('product-weight--no-weight').find('.product-weight__value').empty();
      }
    };

    _.updateSku = function (variant, $container) {
      $container.find('.sku .sku__value').html(variant ? variant.sku : '');
      $container.find('.sku').toggleClass('sku--no-sku', !variant || !variant.sku);
    };

    _.updateBarcode = function (variant, $container) {
      $container.find('.barcode .barcode__value').html(variant ? variant.barcode : '');
      $container.find('.barcode').toggleClass('barcode--no-barcode', !variant || !variant.barcode);
    };

    _.updateInventoryNotice = function (variant, $container) {
      var inventoryData = _._getVariantOptionElement(variant, $container).data('inventory');

      if (inventoryData) {
        $container.find('.product-inventory-notice').removeClass('product-inventory-notice--no-inventory').html(_._getString('inventoryNotice').replace('[[ quantity ]]', inventoryData));
      } else {
        $container.find('.product-inventory-notice').addClass('product-inventory-notice--no-inventory').empty();
      }
    };

    _.updateInventoryLimit = function (variant, $container) {
      var inventoryData = _._getVariantOptionElement(variant, $container).data('inventory');

      if (inventoryData) {
        $container.find('[data-limit]').attr('data-limit', inventoryData);
      } else {
        $container.find('[data-limit]').attr('data-limit', "");
      }
    };

    _.updateBackorder = function (variant, $container) {
      var $backorder = $container.find('.backorder');

      if ($backorder.length) {
        if (variant && variant.available) {
          if (variant.inventory_management && _._getVariantOptionElement(variant, $container).data('stock') == 'out') {
            var productData = _.getProductData($backorder.closest('form'));

            $backorder.find('.backorder__variant').html(productData.title + (variant.title.indexOf('Default') >= 0 ? '' : ' - ' + variant.title));
            $backorder.removeClass('hidden');
          } else {
            $backorder.addClass('hidden');
          }
        } else {
          $backorder.addClass('hidden');
        }
      }
    };

    _.updatePrice = function (variant, $container) {
      var $priceArea = $container.find(_.selectors.priceArea);
      $priceArea.removeClass('on-sale');

      if (variant) {
        var $newPriceArea = $('<div>');
        $('<span class="current-price theme-money">').html(theme.formatMoney(variant.price)).appendTo($newPriceArea);

        if (variant.compare_at_price > variant.price) {
          $newPriceArea.append(' ');
          $('<span class="was-price theme-money">').html(theme.formatMoney(variant.compare_at_price)).appendTo($newPriceArea);
          $priceArea.addClass('on-sale');
        }

        if (variant.unit_price_measurement) {
          var $newUnitPriceArea = $('<div class="unit-price">').appendTo($newPriceArea);
          $('<span class="unit-price__price theme-money">').html(theme.formatMoney(variant.unit_price)).appendTo($newUnitPriceArea);
          $('<span class="unit-price__separator">').html(_._getString('unitPriceSeparator')).appendTo($newUnitPriceArea);
          $('<span class="unit-price__unit">').html(_.getBaseUnit(variant)).appendTo($newUnitPriceArea);
        }

        $priceArea.html($newPriceArea.html());
      } else {
        $priceArea.html(_._getString('priceNonExistent', variant));
      }
    };

    _._updateButtonText = function ($button, string, variant) {
      $button.each(function () {
        var newVal;
        newVal = _._getString('button' + string, variant);

        if (newVal !== false) {
          if ($(this).is('input')) {
            $(this).val(newVal);
          } else {
            $(this).html(newVal);
          }
        }
      });
    };

    _.updateButtons = function (variant, $container) {
      var $button = $container.find(_.selectors.submitButton);
      var $buttonText = $container.find(_.selectors.submitButton + ' .button-text');

      if (variant && variant.available == true) {
        $button.removeAttr('disabled').attr('data-btn-type', 'add-to-cart').removeClass('product-add--adding');

        _._updateButtonText($buttonText, 'Default', variant);
      } else {
        $button.attr('disabled', 'disabled').attr('data-btn-type', 'unavailable');

        if (variant) {
          _._updateButtonText($buttonText, 'NoStock', variant);
        } else {
          _._updateButtonText($buttonText, 'NoVariant', variant);
        }
      }
    };

    _.updateContainerStatusClasses = function (variant, $container) {
      $container.toggleClass('variant-status--unavailable', !variant.available);
      $container.toggleClass('variant-status--backorder', variant.available && variant.inventory_management && _._getVariantOptionElement(variant, $container).data('stock') == 'out');
    };

    _.initProductOptions = function (originalInput) {
      $(originalInput).not('.theme-init').addClass('theme-init').each(function () {
        var $originalInput = $(this);

        if ($originalInput.is('select')) {
          var productData = _.getProductData($originalInput.closest('form')); // change state for original dropdown


          $originalInput.on('change.themeProductOptions firstrun.themeProductOptions', function (e) {
            if ($(this).is('input[type=radio]:not(:checked)')) {
              return; // handle radios - only update for checked
            }

            var variant = e.detail;

            if (!variant && variant !== false) {
              for (var i = 0; i < productData.variants.length; i++) {
                if (productData.variants[i].id == $(this).val()) {
                  variant = productData.variants[i];
                }
              }
            }

            var $container = $(this).closest(_.selectors.container); // update price

            _.updatePrice(variant, $container); // update buttons


            _.updateButtons(variant, $container); // variant images


            if (variant && variant.featured_media) {
              $container.find(_.selectors.gallery).trigger('variantImageSelected', variant);
            } // extra details


            _.updateBarcode(variant, $container);

            _.updateWeight(variant, $container);

            _.updateSku(variant, $container);

            _.updateInventoryNotice(variant, $container);

            _.updateBackorder(variant, $container);

            _.updateContainerStatusClasses(variant, $container);

            _.updateInventoryLimit(variant, $container); // emit an event to broadcast the variant update


            $(window).trigger('cc-variant-updated', {
              variant: variant,
              product: productData
            }); // variant urls

            var $form = $(this).closest('form');

            if ($form.data('enable-history-state') && e.type == 'change') {
              _.addVariantUrlToHistory(variant);
            } // notify quickbuy of content change


            $container.find('.quickbuy-container').trigger('changedsize');
          }); // split-options wrapper

          $originalInput.closest(_.selectors.container).find(_.selectors.multiOption).on('change.themeProductOptions', 'select', function () {
            var selectedOptions = [];
            $(this).closest(_.selectors.multiOption).find('select').each(function () {
              selectedOptions.push($(this).val());
            }); // find variant

            var variant = false;

            for (var i = 0; i < productData.variants.length; i++) {
              var v = productData.variants[i];
              var matchCount = 0;

              for (var j = 0; j < selectedOptions.length; j++) {
                if (v.options[j] == selectedOptions[j]) {
                  matchCount++;
                }
              }

              if (matchCount == selectedOptions.length) {
                variant = v;
                break;
              }
            } // trigger change


            if (variant) {
              $originalInput.val(variant.id);
            } // a jQuery event may not be picked up by all listeners


            $originalInput[0].dispatchEvent(new CustomEvent('change', {
              bubbles: true,
              cancelable: false,
              detail: variant
            }));
          }); // first-run

          $originalInput.trigger('firstrun');
        } // ajax


        theme.applyAjaxToProductForm($originalInput.closest('form'));
      });
    };

    _.unloadProductOptions = function (originalInput) {
      $(originalInput).removeClass('theme-init').each(function () {
        $(this).trigger('unloading').off('.themeProductOptions');
        $(this).closest(_.selectors.container).find(_.selectors.multiOption).off('.themeProductOptions');
        theme.removeAjaxFromProductForm($(this).closest('form'));
      });
    };
  }();
  ;

  theme.loadCartNoteMonitor = function (container) {
    $('.cart-form [name="note"]', container).on('change.themeLoadCartNoteMonitor', function () {
      $.post(theme.routes.cart_url + '/update.js', {
        note: $(this).val()
      }, function (data) {}, 'json');
    });
  };

  theme.unloadCartNoteMonitor = function (container) {
    $('.cart-form [name="note"]', container).off('change.themeLoadCartNoteMonitor');
  };

  theme.loadProductGrid = function (container) {
    $(window).trigger('normheights');
    theme.loadInPlaceQuantityAdjustment(container);
    theme.applyAjaxToProductForm($('form.product-form', container));
  };

  theme.unloadProductGrid = function (container) {
    theme.unloadInPlaceQuantityAdjustment(container);
    theme.removeAjaxFromProductForm($('form.product-form', container));
  };

  theme.ProductMediaGallery = function ($gallery) {
    var _this = this;

    var currentMedia;
    var initialisedMedia = {};
    var $viewInSpaceButton = $gallery.find('.view-in-space');
    var vimeoApiReady = false;

    this.Image = function ($elem, autoplay) {
      this.show = function () {
        $elem.show();
      };

      this.destroy = function () {
        $gallery.trigger('zoom.destroy');
      };

      this.hide = function () {
        $gallery.trigger('zoom.destroy');
        $elem.hide();
      }; //Init the image


      this.show();
      $gallery.trigger('initzoom');

      if ($gallery.closest('.quickbuy-form').length) {
        $.colorbox.resize();
      }
    };

    this.Video = function ($elem, autoplay) {
      var _video = this;

      var playerObj = {
        play: function play() {},
        pause: function pause() {},
        destroy: function destroy() {}
      };
      var videoElement = $elem.find('video')[0];

      this.show = function () {
        $elem.show();
      };

      this.play = function () {
        _video.show();

        playerObj.play();
      };

      this.hide = function () {
        playerObj.pause();
        $elem.hide();
      };

      this.destroy = function () {
        playerObj.destroy();
      }; //Init the video


      theme.loadStyleOnce('https://cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.css'); // set up a controller for Plyr video

      window.Shopify.loadFeatures([{
        name: 'video-ui',
        version: '1.0',
        onLoad: function () {
          playerObj = {
            playerType: 'html5',
            element: videoElement,
            plyr: new Shopify.Plyr(videoElement, {
              controls: ['play', 'progress', 'mute', 'volume', 'play-large', 'fullscreen'],
              loop: {
                active: $elem.data('enable-video-looping')
              },
              autoplay: $(window).width() >= 768 && autoplay,
              hideControlsOnPause: true,
              iconUrl: '//cdn.shopify.com/shopifycloud/shopify-plyr/v1.0/shopify-plyr.svg',
              tooltips: {
                controls: false,
                seek: true
              }
            }),
            play: function play() {
              this.plyr.play();
            },
            pause: function pause() {
              this.plyr.pause();
            },
            destroy: function destroy() {
              this.plyr.destroy();
            }
          };
          $elem.addClass('product-media--video-loaded');
          initialisedMedia[$elem.data('media-id')] = _video;
        }.bind(this)
      }]);

      _video.show();
    };

    this.ExternalVideo = function ($elem, autoplay) {
      var _video = this;

      var playerObj = {
        play: function play() {},
        pause: function pause() {},
        destroy: function destroy() {}
      };
      var iframeElement = $elem.find('iframe')[0];

      this.play = function () {
        _video.show();

        playerObj.play();
      };

      this.show = function () {
        $elem.show();
      };

      this.hide = function () {
        playerObj.pause();
        $elem.hide();
      };

      this.destroy = function () {
        playerObj.destroy();
      }; //Init the external video


      if (/^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(iframeElement.src)) {
        var loadYoutubeVideo = function loadYoutubeVideo() {
          playerObj = {
            playerType: 'youtube',
            element: iframeElement,
            player: new YT.Player(iframeElement, {
              videoId: $elem.data('video-id'),
              events: {
                onReady: function onReady() {
                  initialisedMedia[$elem.data('media-id')] = _video;
                  $elem.addClass('product-media--video-loaded');

                  if (autoplay && $(window).width() >= 768) {
                    _video.play();
                  }
                },
                onStateChange: function onStateChange(event) {
                  if (event.data === 0 && $elem.data('enable-video-looping')) {
                    event.target.seekTo(0);
                  }
                }
              }
            }),
            play: function play() {
              this.player.playVideo();
            },
            pause: function pause() {
              this.player.pauseVideo();
            },
            destroy: function destroy() {
              this.player.destroy();
            }
          };
        };

        if (window.YT && window.YT.Player) {
          loadYoutubeVideo();
        } else {
          // set up a controller for YouTube video
          var temp = window.onYouTubeIframeAPIReady;

          window.onYouTubeIframeAPIReady = function () {
            temp();
            loadYoutubeVideo();
          };

          theme.loadScriptOnce('https://www.youtube.com/iframe_api');
        }
      } else if (/vimeo\.com/.test(iframeElement.src)) {
        var loadVimeoVideos = function loadVimeoVideos() {
          if (vimeoApiReady) {
            if ($elem.data('enable-video-looping')) {
              iframeElement.setAttribute('src', iframeElement.getAttribute('src') + '&loop=1');
            }

            if (autoplay && $(window).width() >= 768) {
              iframeElement.setAttribute('src', iframeElement.getAttribute('src') + '&autoplay=1');
            }

            playerObj = {
              playerType: 'vimeo',
              element: iframeElement,
              player: new Vimeo.Player(iframeElement),
              play: function play() {
                this.player.play();
              },
              pause: function pause() {
                this.player.pause();
              },
              destroy: function destroy() {
                this.player.destroy();
              }
            };
            playerObj.player.ready().then(function () {
              initialisedMedia[$elem.data('media-id')] = _video;
              $elem.addClass('product-media--video-loaded');
            });
          } else {
            theme.loadScriptOnce('https://player.vimeo.com/api/player.js', function () {
              vimeoApiReady = true;
              loadVimeoVideos();
            });
          }
        };

        loadVimeoVideos();
      }

      _video.show();
    };

    this.Model = function ($elem, autoplay, dontShow) {
      var _model = this;

      var playerObj = {
        play: function play() {},
        pause: function pause() {},
        destroy: function destroy() {}
      };
      var modelElement = $elem.find('model-viewer')[0];

      this.show = function () {
        $elem.show();

        if (window.ShopifyXR && $viewInSpaceButton.length) {
          //Change the view in space button to launch this model
          $viewInSpaceButton.attr('data-shopify-model3d-id', $elem.data('media-id'));
          window.ShopifyXR.setupXRElements();
        }
      };

      this.play = function () {
        _model.show();

        playerObj.play();
      };

      this.hide = function () {
        playerObj.pause();
        $elem.hide();

        if (window.ShopifyXR && $viewInSpaceButton.length) {
          //Reset the view in space button to launch the first model
          $viewInSpaceButton.attr('data-shopify-model3d-id', $viewInSpaceButton.data('shopify-model3d-first-id'));
          $viewInSpaceButton.attr('data-shopify-title', $viewInSpaceButton.data('shopify-first-title'));
          window.ShopifyXR.setupXRElements();
        }
      };

      this.destroy = function () {//Nothing needed
      };

      this.initAugmentedReality = function () {
        if ($('.model-json', $gallery).length) {
          var doInit = function doInit() {
            if (!window.ShopifyXR) {
              document.addEventListener('shopify_xr_initialized', function shopifyXrEventListener(event) {
                doInit(); //Ensure this only fires once

                event.target.removeEventListener(event.type, shopifyXrEventListener);
              });
              return;
            }

            window.ShopifyXR.addModels(JSON.parse($('.model-json', $gallery).html()));
            window.ShopifyXR.setupXRElements();
          };

          window.Shopify.loadFeatures([{
            name: 'shopify-xr',
            version: '1.0',
            onLoad: doInit
          }]);
        }
      }; //Init the model


      theme.loadStyleOnce('https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css');
      window.Shopify.loadFeatures([{
        name: 'model-viewer-ui',
        version: '1.0',
        onLoad: function () {
          playerObj = new Shopify.ModelViewerUI(modelElement);
          $elem.addClass('product-media--model-loaded');

          if (autoplay && $(window).width() >= 768) {
            _model.play();
          }
        }.bind(this)
      }]);
      initialisedMedia[$elem.data('media-id')] = _model;

      if (!dontShow) {
        _model.show();
      }

      if (!window.ShopifyXR) {
        _model.initAugmentedReality();
      }
    };

    this.showMedia = function ($mediaToShow, autoplay) {
      //In with the new
      if ($mediaToShow.length) {
        //Out with the old
        if (currentMedia) {
          currentMedia.hide();
        } //Function to instantiate and return the relevant media


        var getMedia = function getMedia(MediaType) {
          var media;

          if (initialisedMedia.hasOwnProperty($mediaToShow.data('media-id'))) {
            media = initialisedMedia[$mediaToShow.data('media-id')];

            if (autoplay && $(window).width() >= 768) {
              media.show(); //Delay play so its easier for users to understand that it paused

              setTimeout(media.play, 250);
            } else {
              media.show();
            }
          } else {
            media = new MediaType($mediaToShow, autoplay);
          }

          return media;
        }; //Initialise the media


        if ($mediaToShow.data('media-type') === "image") {
          currentMedia = getMedia(_this.Image);
        } else if ($mediaToShow.data('media-type') === "video") {
          currentMedia = getMedia(_this.Video);
        } else if ($mediaToShow.data('media-type') === "external_video") {
          currentMedia = getMedia(_this.ExternalVideo);
        } else if ($mediaToShow.data('media-type') === "model") {
          currentMedia = getMedia(_this.Model);
        } else {
          console.warn('CC: Media is unknown', $mediaToShow);
          $gallery.find('.product-media:visible').hide();
          $mediaToShow.show();
        }
      }
    };

    this.destroy = function () {
      for (var i = 0; i < initialisedMedia.length; i++) {
        initialisedMedia[i].destroy();
      }

      $('.main a.main-img-link--lightbox', $gallery).off('click');
      $('.thumbnails .thumbnail', $gallery).off('click');
    };

    var $mediaToInit = $gallery.find('.product-media:first'); //Init the first media item

    _this.showMedia($mediaToInit, false); // On mobile, init the first model (without showing it) to init the view in your space button


    if ($mediaToInit.data('media-type') !== 'model' && $(window).width() < 768) {
      var $firstModel = $gallery.find('.product-media[data-media-type="model"]:first');

      if ($firstModel.length) {
        new _this.Model($firstModel, false, true);
      }
    } //Clicking on a lightbox


    $gallery.on('click', '.main a.main-img-link--lightbox', function () {
      //Don't do anything if the screen isn't very large. Otherwise, lightbox ahoy...
      if ($(window).height() >= 580 && $(window).width() >= 768) {
        if ($gallery.find('img:not(.zoomImg)').length == 1) {
          //One image only?
          $.colorbox({
            href: $(this).attr('href'),
            minWidth: '200',
            maxWidth: '96%',
            maxHeight: '96%'
          });
        } else {
          //Many images. Dupe thumbs to create a faux-gallery
          $('#gallery-cont').remove();
          var $galleryCont = $('<div id="gallery-cont"/>').append($gallery.find('.thumbnails a[data-media-type=\'image\']').clone().attr({
            rel: 'gallery',
            title: ''
          })).hide().appendTo('body'); //Trigger box (on the right one)

          $galleryCont.children().colorbox({
            className: 'product-gallery--popup',
            minWidth: '200',
            maxWidth: '96%',
            maxHeight: '96%',
            next: theme.icons.right,
            previous: theme.icons.left,
            close: theme.icons.close
          }).filter('[href="' + $(this).attr('href') + '"]').first().click();
        }
      }

      return false;
    }); // Product gallery thumbnail click

    $gallery.on('click', '.thumbnails .thumbnail', function (e) {
      e.preventDefault();
      $gallery.data('full-image-width', $(this).data('full-image-width'));
      $(this).addClass('active').siblings('.active').removeClass('active');
      var $mediaToShow = $gallery.find('.product-media[data-media-id="' + $(this).data('media-id') + '"]');

      _this.showMedia($mediaToShow, true);
    });
  };

  ;

  theme.initProductForm = function ($form) {
    var productData = theme.OptionManager.getProductData($form);
    var $qtyAdj = $form.find('.qty-adjuster'); /// Product options

    theme.OptionManager.initProductOptions($('[name="id"]', $form)); // Product form button-options

    var toMakeClicky = ',' + $form.find('.option-selectors').data('box-options') + ',';
    var $clickies = $('.selector-wrapper:not(.has-clickyboxes) select', $form).filter(function () {
      return toMakeClicky.indexOf(',' + $(this).closest('.selector-wrapper').find('label').html() + ',') >= 0;
    }).clickyBoxes().parent().addClass('has-clickyboxes'); // If we have clicky boxes, add the disabled-state to options that have no valid variants

    if ($clickies.length > 0) {
      // each option
      for (var optionIndex = 0; optionIndex < productData.options.length; optionIndex++) {
        // list each value for this option
        var optionValues = {};

        for (var variantIndex = 0; variantIndex < productData.variants.length; variantIndex++) {
          var variant = productData.variants[variantIndex];

          if (typeof optionValues[variant.options[optionIndex]] === 'undefined') {
            optionValues[variant.options[optionIndex]] = false;
          } // mark true if an option is available


          if (variant.available) {
            optionValues[variant.options[optionIndex]] = true;
          }
        } // mark any completely unavailable options


        for (var key in optionValues) {
          if (!optionValues[key]) {
            $('.selector-wrapper:eq(' + optionIndex + ') .clickyboxes li a', $form).filter(function () {
              return $(this).attr('data-value') == key;
            }).addClass('unavailable');
          }
        }
      }
    } /// Style up select-dropdowns


    $form.find('select:not([name="id"])').selectReplace().closest('.selector-wrapper').addClass('has-pretty-select'); /// In lightbox? resize after any content changes

    if ($form.closest('.quickbuy-form').length) {
      $form.find('[name="id"]').on('change', function () {
        setTimeout(function () {
          $.colorbox.resize();
        }, 10);
      });
    }

    function updateAjaxButtons() {
      var currentVariantId = $form.find('select[name="id"]').val();
      var cartItemData = JSON.parse($('#LimitedCartJson').html());
      var cartContainsThisVariant = false;
      var thisCartItem;

      if (cartItemData && cartItemData.items && currentVariantId) {
        cartContainsThisVariant = cartItemData.items.some(function (variant) {
          if (variant.id == currentVariantId) {
            thisCartItem = variant;
            return true;
          }
        });
      }

      $qtyAdj.attr('data-line-item-id', currentVariantId);

      if (cartContainsThisVariant) {
        var $addButton = $form.find('.product-add');
        $addButton.removeClass('product-add--adding');
        $addButton.attr('data-btn-type', 'in-cart');
        $addButton.find('.button-text').text(theme.strings.removeFromCart);
        theme.loadInPlaceQuantityAdjustment($form.parent(), cartItemData);
        theme.applyAjaxToProductForm($form.parent());
        $form.find('.qty-adjuster__value').val(thisCartItem.quantity);
        theme.updateAdjusterButtonsDisabledState($qtyAdj, false, true);
      } else {
        $form.removeClass('product-form--added');
        theme.updateAdjusterButtonsDisabledState($qtyAdj, true);
        $form.find('.qty-adjuster--loading').removeClass('qty-adjuster--loading');
      }
    }

    var formHasAjaxButtons = $form.hasClass('product-form--not-quickbuy');

    if (formHasAjaxButtons) {
      updateAjaxButtons();
      $(window).on('cc-cart-updated', function () {
        $('[name="id"]', $form).trigger('change');
      });
    }

    $(window).on("cc-variant-updated.ajax-buttons".concat(productData.id), function (e, args) {
      if (args.product.id === productData.id) {
        if (args.variant.available) {
          if (formHasAjaxButtons) {
            updateAjaxButtons();
          } else {
            theme.updateAdjusterButtonsDisabledState($qtyAdj, true);
          }
        } else {
          theme.updateAdjusterButtonsDisabledState($qtyAdj, true);
        }
      }
    });
  };

  theme.unloadProductForm = function ($form) {
    theme.OptionManager.unloadProductOptions($('[name="id"]', $form));
    $form.find('[name="id"]').off('change');
    $form.find('.clickybox-replaced').clickyBoxes('destroy');
    $('select.replaced', $form).selectReplace('destroy');
    $form.find('.qty-adjuster').off('click');
    var productData = theme.OptionManager.getProductData($form);

    if (productData) {
      $(window).off("cc-variant-updated.ajax-buttons".concat(productData.id));
    }
  };

  theme.applyAjaxToProductForm = function ($form_param) {
    var shopifyAjaxAddURL = theme.routes.cart_add_url + '.js';
    var shopifyAjaxCartURL = theme.routes.cart_url + '.js';
    $form_param.filter('[data-ajax-add-to-cart="true"]').on('submit', function (e) {
      e.preventDefault();
      var $form = $(this);
      var quantity = 1;
      var $quantity = $form.find('.qty-adjuster__value');

      if ($quantity.length) {
        quantity = $quantity.val();
      } // Disable add button


      $form.find(':submit').attr('disabled', 'disabled').each(function () {
        $(this).addClass('product-add--adding');
      });
      var $btns = $form.find(':submit'); // add class to page

      theme.cartLoadingStarted();
      var serializedForm = $form.serialize();

      if (serializedForm.indexOf('quantity=') === -1) {
        serializedForm += "&quantity=".concat(quantity);
      } // Add to cart


      $.post(shopifyAjaxAddURL, serializedForm, function (itemData) {
        theme.createCookie('theme_added_to_cart', 'justnow', 1); // Update persistent cart summaries
        // enable add button

        $btns.each(function () {
          var $btn = $(this);
          setTimeout(function () {
            $btn.addClass('product-add--added').removeAttr('disabled');
            setTimeout(function () {
              $btn.removeClass('product-add--added').removeClass('product-add--adding');
            }, 2000);
          }, 500);
        }).first();
        theme.updateCartSummaries($form.data('open-cart-drawer') || theme.settings.openCartDrawerOnMob && $(window).outerWidth() < 1100, true, !$form.hasClass('product-form--not-quickbuy'));
      }, 'json').fail(function (data) {
        //Enable add button
        var $firstBtn = $form.find(':submit').removeAttr('disabled').each(function () {
          var $btn = $(this);
          var contentFunc = $btn.is('button') ? 'html' : 'val';
          $btn[contentFunc]($btn.data('previous-value'));
        }).first(); //Not added, show message

        if (typeof data != 'undefined' && typeof data.status != 'undefined') {
          var jsonRes = $.parseJSON(data.responseText);
          theme.showQuickPopup(jsonRes.description, $quantity && $quantity.length ? $quantity : $firstBtn);
        } else {
          //Some unknown error? Disable ajax and submit the old-fashioned way.
          $form.attr('ajax-add-to-cart', 'false').submit();
        } //Reset the buttons


        $btns.each(function () {
          $(this).removeClass('product-add--adding');
        });
      }).always(function () {
        theme.cartLoadingFinished();
      });
    });
  };

  theme.removeAjaxFromProductForm = function ($form_param) {
    $form_param.off('submit');
  };

  theme.updateAdjusterButtonsDisabledState = function ($qtyAdj, resetValue, isInCart) {
    var $valueInput = $qtyAdj.find('.qty-adjuster__value');
    var limit = $qtyAdj.attr('data-limit');

    if (limit) {
      limit = parseInt(limit);
    }

    if (resetValue) {
      $valueInput.val('1');
    }

    var quantity = parseInt($valueInput.val());

    if ($qtyAdj.closest('.variant-status--unavailable').length) {
      $qtyAdj.find('.qty-adjuster__up,.qty-adjuster__down').attr('disabled', 'disabled');
    } else {
      if (quantity === limit) {
        $qtyAdj.find('.qty-adjuster__up').attr('disabled', 'disabled');
      } else {
        $qtyAdj.find('.qty-adjuster__up').removeAttr('disabled');
      }

      if (quantity > 1) {
        $qtyAdj.find('.qty-adjuster__down').removeAttr('disabled');
      } else {
        if (isInCart) {
          $qtyAdj.find('.qty-adjuster__down').removeAttr('disabled');
        } else {
          $qtyAdj.find('.qty-adjuster__down').attr('disabled', 'disabled');
        }
      }
    }

    $valueInput.removeAttr('disabled');
  };

  theme.disableInPlaceQuantityAdjustment = function ($qtyAdj) {
    $qtyAdj.addClass('qty-adjuster--loading');
  };

  theme.enableInPlaceQuantityAdjustment = function ($qtyAdj) {
    $qtyAdj.removeClass('qty-adjuster--loading');
  };

  theme.loadInPlaceQuantityAdjustment = function (container, itemData) {
    // handling both mini product forms and quantity updaters (inc in cart)
    if ($('.qty-adjuster:first', container).length && theme.settings.cartType.includes('drawer')) {
      var updateGridWithItemData = function updateGridWithItemData(data) {
        $('.product-form--mini', container).addClass('product-form--temp-could-remove');

        for (var i = 0; i < data.items.length; i++) {
          var item = data.items[i],
              $qtyAdj = null; // mini form

          var $form = $('.product-form--mini[data-product-id="' + item.product_id + '"]', container);

          if ($form) {
            var $addBtn = $form.find('.product-add');

            if ($addBtn.length) {
              $addBtn.css('height', $addBtn.outerHeight() + 'px');
            }

            $form.addClass('product-form--added').removeClass('product-form--temp-could-remove');
            $qtyAdj = $form.parent().find('.qty-adjuster');

            if (!$form.hasClass('product-form--not-quickbuy')) {
              $qtyAdj.attr('data-line-item-id', item.id);
            }
          } // any qty adjuster


          if (!$qtyAdj) {
            $qtyAdj = $('.qty-adjuster[data-line-item-id="' + item.id + '"]', container);
          }

          if ($qtyAdj) {
            $qtyAdj.removeClass('qty-adjuster--loading');

            if (!$form.hasClass('product-form--not-quickbuy')) {
              $qtyAdj.find('.qty-adjuster__value').val(item.quantity);
            }

            $qtyAdj.find('.qty-adjuster__value').removeAttr('disabled');
            theme.updateAdjusterButtonsDisabledState($qtyAdj, false, true);
          }
        }

        $('.product-form--temp-could-remove', container).removeClass('product-form--added product-form--temp-could-remove');
      };

      if (itemData) {
        updateGridWithItemData(itemData);
      } else {
        $.getJSON(theme.routes.cart_url + '.js', updateGridWithItemData);
      }
    }
  };

  theme.unloadInPlaceQuantityAdjustment = function (container) {};

  theme.cartUpdatingRemoveTimeout = -1;

  theme.cartLoadingStarted = function () {
    $('body').addClass('updating-cart');
  };

  theme.cartLoadingFinished = function () {
    clearTimeout(theme.cartUpdatingRemoveTimeout);
    setTimeout(function () {
      $('body').removeClass('updating-cart');
    }, 500);
  };

  theme.updateCartSummaries = function (showCartSummary, isAddToCart, delayQtyAdjusterShow) {
    theme.cartLoadingStarted();
    var itemListScrollTop = $('.cart-summary__item-list:first').scrollTop(),
        cartDrawerInnerScrollTop = $('.cart-summary__inner:first').scrollTop();
    $.get(theme.routes.search_url, function (data) {
      var selectors = ['.toolbar-cart .current-cart', '.cart-summary']; // some little fiddles to make it parseable and resilient to broken markup

      var $parsed = $($.parseHTML('<div>' + data + '</div>')).wrap('<div>').parent();

      for (var i = 0; i < selectors.length; i++) {
        var cartSummarySelector = selectors[i];
        var $newCartObj = $parsed.find(cartSummarySelector).clone(); // do not transition images in again

        $newCartObj.find('.fade-in').removeClass('fade-in');
        var $currCart = $(cartSummarySelector); //Maintain button container height to stop jumping while Buy it Now loads in

        var $buttonContainer = $newCartObj.find('.cart-summary__buttons');

        if ($buttonContainer.length) {
          $buttonContainer.css('height', $currCart.find('.cart-summary__buttons').outerHeight() + 'px');
        }

        var $newCartItem = $newCartObj.find('.cart-summary-item-container').eq(0); //Check if the new cart item already exists in the cart

        if ($currCart.find(".cart-summary-item-container[data-product-id=\"".concat($newCartItem.data('product-id'), "\"]")).length) {
          isAddToCart = false;
        }

        if (isAddToCart && $newCartItem.length) {
          $newCartItem.addClass('cart-summary-item-container--out-left').hide();
        }

        var $cartForm = $('.cart-form--checkout', $currCart);
        var $cartFormNonStick = $('.cart-form--non-stick', $currCart);

        if ($cartForm.hasClass('cart-form--checkout--sticky-true') && $cartFormNonStick.length) {
          $newCartObj.find('.cart-form--checkout').css('top', -Math.abs(parseInt($cartFormNonStick.outerHeight() + 1)) + 'px');
        }

        $currCart.replaceWith($newCartObj);

        if (isAddToCart && $newCartItem.length) {
          $newCartItem.slideDown(300);
          $newCartItem.removeClass('cart-summary-item-container--out-left');
        }

        if ($buttonContainer.length) {
          //Hopefully 'Buy it Now' has loaded in after 1 second
          setTimeout(function () {
            $(cartSummarySelector).find('.cart-summary__buttons').css('height', 'auto');
          }, 1000);
        }
      }

      var cartItemData;

      if ($('#LimitedCartJson').length) {
        cartItemData = JSON.parse($('#LimitedCartJson').html());

        if (delayQtyAdjusterShow) {
          setTimeout(function () {
            theme.loadInPlaceQuantityAdjustment($('body'), cartItemData);
          }, 800);
        } else {
          theme.loadInPlaceQuantityAdjustment($('body'), cartItemData);
        }

        theme.applyAjaxToProductForm($('.cart-summary form.product-form'));
      }

      theme.loadCartNoteMonitor($('.cart-summary'));
      $('.cart-summary__item-list:first').scrollTop(itemListScrollTop);
      $('.cart-summary__inner:first').scrollTop(cartDrawerInnerScrollTop);

      if (theme.settings.cartType != 'page') {
        //Show cart dropdown, if on a product page
        if (showCartSummary) {
          setTimeout(function () {
            $('body').addClass('show-cart-summary product-added-to-cart');
            setTimeout(function () {
              $('.cart-summary__close').focus();
            }, 200);
          }, 20);
        } // Remove updating classes


        $('.cart-summary.updating, .cart-summary .updating').removeClass('updating');

        if (cartItemData) {
          // emit an event to broadcast the cart is updated
          $(window).trigger('cc-cart-updated', {
            cartItemData: cartItemData
          });
        }
      }
    }).always(function () {
      theme.cartLoadingFinished();
    });
  }; // Initialises Featured Collection(s) carousels


  theme.carousels = {
    init: function init() {
      var _this = _this11;

      _this.updateArrows = function (carousel) {
        var section = $(carousel).closest('.section')[0];

        if (carousel.scrollLeft < 15) {
          section.classList.add('cc-start');
        } else {
          section.classList.remove('cc-start');
        }

        if (carousel.scrollLeft + carousel.clientWidth > carousel.scrollWidth - 15) {
          section.classList.add('cc-end');
        } else {
          section.classList.remove('cc-end');
          section.classList.add('cc-carousel-scrolling');
        }
      };

      _this.initArrows = function () {
        var carousels = document.querySelectorAll(".cc-carousel");
        carousels.forEach(function (carousel) {
          var $sectionContainer = $(carousel).closest('.section');
          var $carouselNext = $sectionContainer.find('.cc-carousel--next');
          var $carouselPrevious = $sectionContainer.find('.cc-carousel--previous');
          $carouselNext.addClass('cc-initialized');
          $carouselPrevious.addClass('cc-initialized');

          if ($carouselNext.length && $carouselPrevious.length) {
            $carouselNext.on('click.cc-carousel', function () {
              //Get the left hand edge of the next card out of view
              var nextLeftOffset = -1;
              var carouselOffsetLeft = $(this).closest('.section').find('.cc-carousel').offset().left;
              $(carousel).find('.column').each(function () {
                var offsetLeft = parseInt($(this).offset().left - carouselOffsetLeft);

                if (offsetLeft > carousel.scrollLeft + carousel.clientWidth - 20 && nextLeftOffset === -1) {
                  nextLeftOffset = offsetLeft;
                }
              });

              if (nextLeftOffset === -1) {
                nextLeftOffset = carousel.scrollLeft + carousel.clientWidth;
              }

              carousel.classList.add('cc-carousel--smooth-scroll');
              carousel.scrollLeft = nextLeftOffset;
              setTimeout(function () {
                _this.updateArrows(carousel);

                carousel.classList.remove('cc-carousel--smooth-scroll');
              }, 700);
            });
            $carouselPrevious.on('click.cc-carousel', function () {
              //Get the left hand edge of the next card out of view
              var nextLeftOffset = -1;

              if (theme.viewport.isXs()) {
                var carouselOffsetLeft = $(this).closest('.section').find('.cc-carousel').offset().left;
                var lastLeftOffset = 0;
                $(carousel).find('.column').each(function (index) {
                  var offsetLeft = parseInt($(this).offset().left - carouselOffsetLeft);

                  if (offsetLeft >= 0 && nextLeftOffset === -1) {
                    nextLeftOffset = carousel.scrollLeft + lastLeftOffset;
                  }

                  lastLeftOffset = offsetLeft;
                });
              }

              if (nextLeftOffset === -1) {
                nextLeftOffset = carousel.scrollLeft - carousel.clientWidth;
              }

              carousel.classList.add('cc-carousel--smooth-scroll');
              carousel.scrollLeft = nextLeftOffset;
              setTimeout(function () {
                _this.updateArrows(carousel);

                carousel.classList.remove('cc-carousel--smooth-scroll');
              }, 700);
            });
          }

          _this.updateArrows(carousel);
        });
      };

      _this.initMobileCarousels = function () {
        if (theme.viewport.isXs()) {
          var uninitializedMobCarousels = document.querySelectorAll(".cc-carousel-mobile:not(.cc-carousel)");
          uninitializedMobCarousels.forEach(function (carousel) {
            carousel.classList.add('cc-carousel');
            var $sectionContainer = $(carousel).closest('.section');
            $sectionContainer.find('.cc-carousel--next').addClass('cc-initialized');
            $sectionContainer.find('.cc-carousel--previous').addClass('cc-initialized');
            $sectionContainer.addClass('cc-is-carousel');
          }); //Init left/right buttons

          _this.initArrows();
        } else {
          var initializedMobCarousels = document.querySelectorAll(".cc-carousel-mobile.cc-carousel");
          initializedMobCarousels.forEach(function (carousel) {
            carousel.classList.remove('cc-carousel');
            var $sectionContainer = $(carousel).closest('.section');
            $sectionContainer.find('.cc-carousel--next').removeClass('cc-initialized');
            $sectionContainer.find('.cc-carousel--previous').removeClass('cc-initialized');
            $sectionContainer.removeClass('cc-is-carousel');
          });
        }
      };

      _this.initCarousels = function () {
        var carousels = document.querySelectorAll(".cc-carousel");

        if (carousels.length) {
          //Init click to drag on desktop browsers (except for Safari)
          if (theme.viewport.isSm() && !theme.browser.isSafari()) {
            carousels.forEach(function (carousel) {
              var isDown = false,
                  startX,
                  scrollLeft;

              if (!carousel.classList.contains('cc-initialized')) {
                carousel.classList.add('cc-initialized');
                carousel.addEventListener("mousedown", function (e) {
                  isDown = true;
                  startX = e.pageX - carousel.offsetLeft;
                  scrollLeft = carousel.scrollLeft;
                });
                carousel.addEventListener("mouseleave", function () {
                  isDown = false;
                });
                carousel.addEventListener("mouseup", function () {
                  isDown = false;

                  _this.updateArrows(carousel);
                });
                carousel.addEventListener("mousemove", function (e) {
                  if (!isDown) return;
                  e.preventDefault();
                  var x = e.pageX - carousel.offsetLeft;
                  var walk = x - startX;
                  carousel.scrollLeft = scrollLeft - walk;

                  _this.updateArrows(carousel);
                });
              }
            });
          } else {
            carousels.forEach(function (carousel) {
              //Update arrows on touch end
              carousel.addEventListener("touchend", function () {
                _this.updateArrows(carousel);
              }); //Update arrows on scroll end

              var timer;
              carousel.addEventListener('scroll', function () {
                clearTimeout(timer);
                timer = setTimeout(function () {
                  _this.updateArrows(carousel);
                }, 300);
              }, {
                passive: true
              });
            });
          } //Init left/right buttons


          _this.initArrows();
        }
      };

      if (document.querySelectorAll(".cc-carousel-mobile").length) {
        $(window).off('debouncedresizewidth.cc-carousel').on('debouncedresizewidth.cc-carousel', _this.initMobileCarousels);

        _this.initMobileCarousels();
      }

      _this.initCarousels();
    },
    destroy: function destroy() {
      var carousels = document.querySelector(".cc-carousel");

      if (carousels && carousels.length) {
        carousels.forEach(function (carousel) {
          carousel.removeEventListener('mousedown').removeEventListener('mouseleave').removeEventListener('mouseup').removeEventListener('mousemove').classList.remove('cc-initialized');
          var $sectionContainer = $(carousel).closest('.section');
          $sectionContainer.find('.cc-carousel--previous').removeClass('cc-initialized');
          $sectionContainer.find('.cc-carousel--next').removeClass('cc-initialized');
        });
      }

      $(window).off('.cc-carousel');
    }
  };
  ;
  $(function ($) {
    var activeQuickBuyRequest = null;
    $(document).on('click', '.quick-buy', function (e) {
      if (activeQuickBuyRequest) {
        return false;
      }

      var $this = $(this);
      var placeholder = $('.quickbuy-placeholder-template[data-product-id="' + $this.data('product-id') + '"]:first').html();
      var $template = $('<div class="quickbuy-container">' + placeholder + '</div>');
      var prevIndex = null,
          nextIndex = null,
          $prod = $(this).closest('.product-block'),
          $prodContainer = $prod.parent(),
          $prodContainerProductChild = $prodContainer.children(".product-block".concat(theme.settings.quickBuyType === 'hover' ? ":not('.page-block'):not(.product-block--flex-spacer)" : '.product-block--with-quickbuy'));

      if ($prod.length) {
        var prodInSiblingIndex;
        $prodContainerProductChild.each(function (index) {
          if ($(this).attr('id') === $prod.attr('id')) {
            prodInSiblingIndex = index;
          }
        });

        if (prodInSiblingIndex != null) {
          if (prodInSiblingIndex > 0) {
            var $prevProduct = $prodContainerProductChild.eq(prodInSiblingIndex - 1);
            prevIndex = $prevProduct.attr('id');
          }

          var $nextProduct = $prodContainerProductChild.eq(prodInSiblingIndex + 1);

          if ($nextProduct) {
            nextIndex = $nextProduct.attr('id');
          }
        }
      }

      $.colorbox({
        closeButton: false,
        preloading: false,
        open: true,
        speed: 200,
        //transition: "none",
        html: ['<div class="action-icons">', prevIndex != null ? '<a href="#" class="prev-item action-icon" data-idx="' + prevIndex + '" aria-label="' + theme.strings.previous + '">' + theme.icons.left + '</span></a>' : '', nextIndex != null ? '<a href="#" class="next-item action-icon" data-idx="' + nextIndex + '" aria-label="' + theme.strings.next + '">' + theme.icons.right + '</a>' : '', '<a href="#" class="close-box action-icon" aria-label="', theme.strings.close, '">' + theme.icons.close + '</a>', '</div>', $template.wrap('<div>').parent().html()].join(''),
        onComplete: function onComplete() {
          loadQuickBuyContent($this.attr('href'));
        },
        onCleanup: function onCleanup() {
          $('.quickbuy-container .product-gallery .thumbnails').slick('unslick').off('init reInit setPosition');

          if (theme.activeQuickBuyMediaGallery) {
            theme.activeQuickBuyMediaGallery.destroy();
          }

          theme.unloadProductForm($('.quickbuy-container .product-form'));
        }
      });
      e.stopImmediatePropagation();
      return false;
    });

    var loadQuickBuyContent = function loadQuickBuyContent(href) {
      activeQuickBuyRequest = $.get(href, function (data) {
        var $productSection = $('<div>').append($(data).find('.section-product-template [data-section-type="product-template"]').clone()); //Prepare the html

        $productSection.find('[data-cc-animate]').removeAttr('data-cc-animate');
        $productSection.find('.product-collection-links').remove();
        $productSection.find('.store-availability-container-outer').remove();
        $productSection.find('.social-links').remove();
        $productSection.find('[data-enable-history-state]').attr('data-enable-history-state', 'false');
        $productSection.find('.theme-product-reviews-full').remove();
        $productSection.find('.product-mob-collection-links').remove();
        $productSection.find('[data-show-in-quickbuy="false"]').remove();
        $productSection.find('.product-description-below').remove();
        $productSection.find('.product-section.border-bottom').removeClass('border-bottom');
        $productSection.find('.product-container').addClass('product-container--quickbuy');
        $productSection.find('.product-details').append("<div class=\"more-link-row\"><a class=\"more-link\" href=\"".concat(href, "\">").concat(theme.strings.fullDetails, "</a></div>"));
        var $form = $('<div class="quickbuy-form quickbuy-form--overlay">' + $productSection.html() + '</div>'); // ensure ids and labels match up

        $form.find('label[for]').each(function () {
          $(this).attr('for', $(this).attr('for') + '-qb');
        });
        $form.find(':input[id]').each(function () {
          $(this).attr('id', $(this).attr('id') + '-qb');
        });
        var $quickbuyContainer = $('.quickbuy-container');
        $quickbuyContainer.append($form);
        $('body').removeClass('product-added-to-cart');
        var $gallery = $quickbuyContainer.find('.product-container .product-gallery');

        if ($gallery.length === 1) {
          theme.activeQuickBuyMediaGallery = new theme.ProductMediaGallery($gallery);
        } //Init product form, if required


        theme.initProductForm($quickbuyContainer.find('.product-form'));
        $('.quickbuy-container .product-gallery .thumbnails').on('init reInit setPosition', function ($slick) {
          var lastSlide = $(this).find('.slick-slide:last');

          if (lastSlide.length > 0) {
            var slideInnerWidth = lastSlide.position().left + lastSlide.outerWidth(true);
            var carouselWidth = $(this).width();
            $(this).find('.slick-next, .slick-prev').toggleClass('theme-unnecessary', carouselWidth > slideInnerWidth);
          } // Enable tabbing between slides


          setTimeout(function () {
            $($slick.target).find('.slick-slide').attr('tabindex', '0');
          });
        }).slick({
          slidesToShow: 5,
          slidesToScroll: 4,
          infinite: false,
          speed: 200,
          swipeToSlide: true,
          prevArrow: '<button type="button" class="slick-prev" aria-label="' + theme.strings.previous + '">' + theme.icons.chevronLeft + '</button>',
          nextArrow: '<button type="button" class="slick-next" aria-label="' + theme.strings.next + '">' + theme.icons.chevronRight + '</button>'
        });
        $('.quickbuy-form').imagesLoaded(function () {
          $('.product-gallery').trigger('initzoom');
          setTimeout($.colorbox.resize, 10);
        });
        $form.hide().fadeIn(300, function () {
          $('.quickbuy-form.placeholder').remove();
          $form.removeClass('quickbuy-form--overlay');
          $.colorbox.resize();
        });

        if (Shopify.PaymentButton) {
          $(document).on('shopify:payment_button:loaded.themeQuickBuy', function () {
            $(document).off('shopify:payment_button:loaded.themeQuickBuy');
            $.colorbox.resize();
          });
          Shopify.PaymentButton.init();
        }

        setTimeout(function () {
          if (window.SPR && SPR.initDomEls && SPR.loadBadges) {
            SPR.initDomEls();
            SPR.loadBadges();
          }
        }, 0);
        theme.initAnimateOnScroll();
        $(document).trigger('cc:component:load', ['accordion', $('.quickbuy-container')[0]]);
        activeQuickBuyRequest = null;
      });
    };
  });
  ;
  /*============== Sections ===============*/

  theme.FooterSection = new function () {
    this.onSectionLoad = function (container) {
      $('.disclosure', container).each(function () {
        $(this).data('disclosure', new theme.Disclosure($(this)));
      });
    };

    this.onSectionUnload = function (container) {
      $('.disclosure', container).each(function () {
        $(this).data('disclosure').unload();
      });
    };
  }();
  theme.CartDrawerSection = new function () {
    this.onSectionLoad = function (container) {
      theme.applyAjaxToProductForm($('form.product-form', container));
      theme.loadCartNoteMonitor(container);
      var $body = $('body');
      var $window = $(window);

      function assessScrollPosition() {
        if ($window.scrollTop() === 0) {
          $body.addClass('scrolled-top');
        } else {
          $body.removeClass('scrolled-top');
        }
      }

      assessScrollPosition();

      if (theme.viewport.isSm()) {
        $(window).on('throttled-scroll.cartDrawer', assessScrollPosition);
      } //Handle clear cart


      $(container).on('click', '.btn--empty-cart', function () {
        if (confirm(theme.strings.confirmEmptyCart)) {
          $(container).find('.cart-summary-item-container').each(function (index) {
            var _this12 = this;

            setTimeout(function () {
              $(_this12).addClass('cart-summary-item-container--out');
            }, index * 50);
          });
          $.post(theme.routes.cart_clear_url, function () {
            theme.updateCartSummaries(false, false);
          });
        }

        return false;
      }); /// Accordions

      $(container).on('click', '.cart-accordion-btn', function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var isHidden = $(this).parent().next().toggleClass('hidden').hasClass('hidden');
        $(this).toggleClass('cart-accordion-btn--collapsed', isHidden);

        if (!isHidden) {
          $(this).closest('.cart-summary').find('.cart-accordion-btn:not(.cart-accordion-btn--collapsed)').not(this).click();
        }
      });
      $(container).on('click', '.cart-accordion-btn-container', function (e) {
        e.preventDefault();
        $(this).find('.cart-accordion-btn').click();
      }); //Compensate for the cart notes in the sticky header

      function updateStickyDrawerHeader() {
        var $cartForm = $('.cart-form--checkout', container);
        var $cartFormNonStick = $('.cart-form--non-stick', container);

        if ($cartForm.hasClass('cart-form--checkout--sticky-true') && $cartFormNonStick.length) {
          $cartForm.css('top', -Math.abs(parseInt($cartFormNonStick.outerHeight() + 1)) + 'px');
        }
      }

      updateStickyDrawerHeader();
      $(window).on('debouncedresize.cartDrawer cc-cart-updated', updateStickyDrawerHeader);
    };

    this.onSectionUnload = function (container) {
      theme.removeAjaxFromProductForm($('form.product-form', container));
      theme.unloadCartNoteMonitor(container);
      $(window).off('.cartDrawer');
    };

    this.onSectionSelect = function (container) {
      // display drawer
      if (!$('body').hasClass('show-cart-summary')) {
        $('.toggle-cart-summary:first').click();
      }
    };

    this.onSectionDeselect = function (container) {
      // hide drawer
      if ($('body').hasClass('show-cart-summary')) {
        $('.toggle-cart-summary:first').click();
      }
    };
  }();
  theme.SlideshowSection = new function () {
    this.onSectionLoad = function (target) {
      theme.initContentSlider(target);

      if ($(target).find('.image-overlay--mobile-stack').length > 0) {
        $(target).parent().addClass('slideshow-section--mobile-stack');
      } else {
        $(target).parent().addClass('slideshow-section--no-mobile-stack');
      }
    };

    this.onSectionUnload = function (target) {
      $('.slick-slider', target).slick('unslick').off('init');
      $(window).off('.slideshowSection');
    };

    this.onBlockSelect = function (target) {
      $(target).closest('.slick-slider').slick('slickGoTo', $(target).data('slick-index')).slick('slickPause');
    };

    this.onBlockDeselect = function (target) {
      $(target).closest('.slick-slider').slick('slickPlay');
    };
  }();
  theme.ProductTemplateSection = new function () {
    var galleries = [];

    this.onSectionLoad = function (target) {
      /// Init store availability if applicable
      if ($('[data-store-availability-container]', target).length) {
        this.storeAvailability = new theme.StoreAvailability($('[data-store-availability-container]', target)[0]);
      }

      $('.product-gallery', target).each(function () {
        galleries.push(new theme.ProductMediaGallery($(this)));
      });
      $('.product-gallery .thumbnails', target).on('init reInit setPosition', function ($slick) {
        var lastSlide = $(this).find('.slick-slide:last');

        if (lastSlide.length > 0) {
          var slideInnerWidth = lastSlide.position().left + lastSlide.outerWidth(true);
          var carouselWidth = $(this).width();
          $(this).toggleClass('slick-slider--all-visible', carouselWidth > slideInnerWidth);
        } // Enable tabbing between slides


        setTimeout(function () {
          $($slick.target).find('.slick-slide').attr({
            "tabindex": "0",
            "aria-hidden": "false"
          });
        });
      }).slick({
        slidesToShow: 7,
        slidesToScroll: 4,
        infinite: false,
        speed: 200,
        swipeToSlide: true,
        prevArrow: '<button type="button" class="slick-prev" aria-label="' + theme.strings.previous + '">' + theme.icons.chevronLeft + '</button>',
        nextArrow: '<button type="button" class="slick-next" aria-label="' + theme.strings.next + '">' + theme.icons.chevronRight + '</button>',
        responsive: [{
          breakpoint: 1500,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 3
          }
        }, {
          breakpoint: 1200,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 3
          }
        }, {
          breakpoint: 767,
          settings: {
            slidesToShow: 4.5,
            slidesToScroll: 4
          }
        }]
      });
      var $productForm = $('.product-form:not(.product-form--placeholder)', target);

      if ($productForm.length) {
        theme.initProductForm($('.product-form', target));
      } // reviews link


      if ($('#shopify-product-reviews').length) {
        $(target).on('click', '.themed-product-reviews .spr-badge', function () {
          $('html, body').animate({
            scrollTop: $('#shopify-product-reviews').offset().top - 10
          }, 1000);
          return false;
        });
      } // size chart link


      $(target).on('click', '.size-chart-link', function () {
        $.colorbox({
          inline: true,
          href: '#size-chart-content > .size-chart'
        });
      }); /// Grid item heights

      $(window).trigger('normheights');
    };

    this.onSectionUnload = function (target) {
      $(target).off('click');
      $('.product-gallery .thumbnails', target).slick('unslick');

      if (galleries.length) {
        for (var i = 0; i < galleries.length; i++) {
          galleries[i].destroy();
        }
      }

      theme.unloadProductForm($('.product-form', target));

      if (this.storeAvailability) {
        this.storeAvailability.onSectionUnload();
      }
    };
  }();
  theme.CollectionTemplateSection = new function () {
    this.onSectionLoad = function (container) {
      this.namespace = theme.namespaceFromSection(container);
      this.$container = $(container);
      this.collection_filter_cookie_name = 'theme_collection_filter_closed'; // ajax filter & sort

      if (this.$container.data('ajax-filtering')) {
        // ajax load on link click
        this.$container.on('click' + this.namespace, '.pagination a,.active-filter-controls a', this.functions.ajaxLoadLink.bind(this)); // ajax load form submission

        this.$container.on('change' + this.namespace + ' submit' + this.namespace, '[data-collection-form]', theme.debounce(this.functions.ajaxLoadForm.bind(this), 700)); // handle back button

        this.registerEventListener(window, 'popstate', this.functions.ajaxPopState.bind(this));
      } else {
        this.$container.on('change' + this.namespace, '[data-collection-form]', this.functions.submitForm);
      } // click on the 'filters' button


      this.$container.on('click' + this.namespace, '.cc-toolbar-filter-toggle', this.functions.toggleCollectionFilter.bind(this)); // tap on mobile menu veil

      this.$container.on('click' + this.namespace, '.cc-product-filter__mob-veil, .cc-product-filter__close', this.functions.handleMobileVeilTap.bind(this));

      if (theme.viewport.isSm() && typeof theme.readCookie(this.collection_filter_cookie_name) != 'undefined' && theme.readCookie(this.collection_filter_cookie_name) == 'true') {
        $(container).addClass('cc-filters-closed').addClass('cc-filters-closed-no-trans');
      } /// Style any dropdowns


      $('select:not([name=id])', container).selectReplace();

      if (this.$container.data('use-infinite-scroll')) {
        theme.loadProductGrid(this.$container);
        this.functions.initInfiniteScroll();
      } else {
        theme.loadProductGrid(container);
      }
    };

    this.functions = {
      initInfiniteScroll: function initInfiniteScroll() {
        // Infinite-scroll
        $('.product-list.use-infinite-scroll', this.$container).each(function () {
          var $cont = $(this);
          theme.loadScriptOnce(theme.scripts.jqueryInfiniteScroll, function () {
            $cont.infinitescroll({
              navSelector: ".pagination",
              nextSelector: ".pagination .next",
              itemSelector: ".product-list .product-block",
              loading: {
                msgText: theme.strings.infiniteScrollCollectionLoading,
                finishedMsg: theme.strings.infiniteScrollCollectionFinishedMsg
              },
              pathParse: function pathParse(path, nextPage) {
                return path.match(/^(.*page=)[0-9]*(&.*)?$/).splice(1);
              }
            }, function (newElements) {
              $cont.find('#infscr-loading').remove(); // for nth-child

              $cont.find('.product-block:not(.product-block--flex-spacer):last').prevAll('.product-block--flex-spacer').remove();
              theme.loadProductGrid(this.$container);

              if (window.SPR && SPR.initDomEls && SPR.loadBadges) {
                SPR.initDomEls();
                SPR.loadBadges();
              }
            });
          });
        });
      },
      submitForm: function submitForm(e) {
        e.currentTarget.submit();
      },
      handleMobileVeilTap: function handleMobileVeilTap() {
        this.$container.toggleClass('cc-filters-mob-open');
      },
      toggleCollectionFilter: function toggleCollectionFilter() {
        this.$container.removeClass('cc-filters-closed-no-trans');

        if (theme.viewport.isXs()) {
          this.$container.toggleClass('cc-filters-mob-open');
        } else {
          if (this.$container.hasClass('cc-filters-closed')) {
            //Open the filters
            theme.createCookie(this.collection_filter_cookie_name, 'false', 365);
            this.$container.removeClass('cc-filters-closed');
          } else {
            //Close the filters
            theme.createCookie(this.collection_filter_cookie_name, 'true', 365);
            this.$container.addClass('cc-filters-closed');
          }
        }

        return false;
      },
      ajaxLoadLink: function ajaxLoadLink(evt) {
        evt.preventDefault();
        this.functions.ajaxLoadUrl.call(this, $(evt.currentTarget).attr('href'));
      },
      ajaxLoadForm: function ajaxLoadForm(evt) {
        if (evt.type === 'submit') {
          evt.preventDefault();
        }

        var queryVals = [];
        this.$container[0].querySelectorAll('[data-collection-form] input, [data-collection-form] select').forEach(function (input) {
          if ((input.type !== 'checkbox' && input.type !== 'radio' || input.checked) && // is an active input value
          input.value !== '' // has a value
          ) {
              // if no value, check for the default and include
              if (input.value === '' && input.dataset.currentValue) {
                queryVals.push([input.name, encodeURIComponent(input.dataset.currentValue)]);
              } else {
                queryVals.push([input.name, encodeURIComponent(input.value)]);
              }
            }
        });
        this.$container[0].querySelectorAll('[data-collection-form] [data-current-value]').forEach(function (input) {
          input.setAttribute('value', input.dataset.currentValue);
        });
        var data = new FormData(evt.currentTarget);
        var queryString = new URLSearchParams(data).toString();
        this.functions.ajaxLoadUrl.call(this, this.$container.data('collection-url') + '?' + queryString);
      },
      ajaxPopState: function ajaxPopState(event) {
        this.functions.ajaxLoadUrl.call(this, document.location.href);
      },
      initFilterResults: function initFilterResults() {
        if (this.$container.data('use-infinite-scroll')) {
          this.functions.initInfiniteScroll();
        }

        theme.loadProductGrid(this.$container);
        theme.initAnimateOnScroll(); // init theme components

        var $components = this.$container.closest('[data-components]');

        if ($components.length) {
          var components = $components.data('components').split(',');
          components.forEach(function (component) {
            $(document).trigger('cc:component:load', [component, $components[0]]);
          }.bind(this));
        }
      },
      refreshSelects: function refreshSelects() {
        $('select:not(.original-selector)', this.$container).selectReplace().closest('.selector-wrapper').addClass('has-pretty-select');
      },
      ajaxLoadUrl: function ajaxLoadUrl(url) {
        var _this = this; // update url history


        var fullUrl = url;

        if (fullUrl.slice(0, 1) === '/') {
          fullUrl = window.location.protocol + '//' + window.location.host + fullUrl;
        } // start fetching URL


        var refreshContainerSelector = '[data-ajax-container],.product-list-toolbar',
            $ajaxContainers = this.$container.find(refreshContainerSelector); // loading state

        $ajaxContainers.addClass('cc-product-filter-container--loading'); // fetch content

        if (this.currentAjaxLoadUrlFetch) {
          this.currentAjaxLoadUrlFetch.abort();
        }

        this.currentAjaxLoadUrlFetch = $.get(url, function (data) {
          this.currentAjaxLoadUrlFetch = null;
          var $newPage = $($.parseHTML(data));
          var newTitleTag = $newPage.filter('title').text().trim();
          document.title = newTitleTag;
          window.history.pushState({
            path: fullUrl
          }, newTitleTag, fullUrl); // save active element

          if (document.activeElement) {
            this.activeElementId = document.activeElement.id;
          } // replace contents


          var $newAjaxContainers = $("<div>".concat(data, "</div>")).find(refreshContainerSelector);
          $newAjaxContainers.each(function (index) {
            var $newAjaxContainer = $(this); // preserve accordion state

            $($ajaxContainers[index]).find('.cc-accordion-item').each(function () {
              var accordionIndex = $(this).closest('.cc-accordion').index();

              if ($(this).hasClass('is-open')) {
                $newAjaxContainer.find(".cc-accordion:nth-child(".concat(accordionIndex + 1, ") .cc-accordion-item")).addClass('is-open').attr('open', '');
              } else {
                $newAjaxContainer.find(".cc-accordion:nth-child(".concat(accordionIndex + 1, ") .cc-accordion-item")).removeClass('is-open').removeAttr('open');
              }
            }); // maintain mobile filter menu state

            if ($('.cc-product-filter', _this.$container).length && $('.cc-product-filter', _this.$container).hasClass('-in')) {
              $newAjaxContainer.find('.cc-product-filter').addClass('-in');
            }

            $($ajaxContainers[index]).html($newAjaxContainer.html());

            _this.functions.refreshSelects();
          }); // init js

          this.functions.initFilterResults.call(this); // remove loading state

          $ajaxContainers.removeClass('cc-product-filter-container--loading'); // restore active element

          if (this.activeElementId) {
            var el = document.getElementById(this.activeElementId);

            if (el) {
              el.focus();
            }
          }

          var $collectionContainer = $('[data-ajax-scroll-to]:first', this.$container);

          if ($(window).scrollTop() - 200 > $collectionContainer.offset().top) {
            if (this.$container.data('is-sticky')) {
              var offset = theme.viewport.isSm() ? 25 : 0;
            } else {
              var offset = $('.header-container[data-is-sticky="true"]').outerHeight();
            }

            theme.viewport.scrollTo($collectionContainer, -1, 1000, offset);
          }
        }.bind(this));
      }
    };

    this.onSectionUnload = function (target) {
      $('select.replaced', target).selectReplace('destroy');
      theme.unloadProductGrid(target);
    };
  }();
  ;
  theme.CollectionListingSection = new function () {
    this.onSectionLoad = function (target) {
      /// Grid item heights
      $(window).trigger('normheights');
      theme.loadProductGrid(target);
    };

    this.onSectionUnload = function (target) {
      theme.unloadProductGrid(target);
    };
  }();
  theme.FeaturedCollectionSection = new function () {
    this.onSectionLoad = function (target) {
      theme.loadProductGrid(target);
    };

    this.onSectionUnload = function (target) {
      theme.unloadProductGrid(target);
    };
  }();
  theme.FeaturedCollectionsSection = new function () {
    this.onSectionLoad = function (target) {
      /// Grid item heights
      $(window).trigger('normheights');
    };
  }();
  theme.GallerySection = new function () {
    this.onSectionLoad = function (container) {
      var $carouselGallery = $('.gallery--mobile-carousel', container);

      if ($carouselGallery.length) {
        var assessCarouselFunction = function assessCarouselFunction() {
          var isCarousel = $carouselGallery.hasClass('slick-slider'),
              shouldShowCarousel = theme.viewport.isXs();

          if (!shouldShowCarousel) {
            $('.lazyload--manual', $carouselGallery).removeClass('lazyload--manual').addClass('lazyload');
          }

          if (isCarousel && !shouldShowCarousel) {
            // Destroy carousel
            // - unload slick
            $carouselGallery.slick('unslick').off('init');
            $carouselGallery.find('a, .gallery__item').removeAttr('tabindex').removeAttr('role'); // - re-row items

            var rowLimit = $carouselGallery.data('grid');
            var $currentRow = null;
            $carouselGallery.find('.gallery__item').each(function (index) {
              if (index % rowLimit === 0) {
                $currentRow = $('<div class="gallery__row">').appendTo($carouselGallery);
              }

              $(this).appendTo($currentRow);
            });
          } else if (!isCarousel && shouldShowCarousel) {
            // Create carousel
            // - de-row items
            $carouselGallery.find('.gallery__item').appendTo($carouselGallery);
            $carouselGallery.find('.gallery__row').remove(); // - init carousel

            $carouselGallery.on('init', function () {
              $('.lazyload--manual', this).removeClass('lazyload--manual').addClass('lazyload');
            }).slick({
              autoplay: false,
              fade: false,
              infinite: false,
              useTransform: true,
              arrows: false,
              dots: true
            });
          }
        };

        assessCarouselFunction();
        $(window).on('debouncedresize.themeSection' + container.id, assessCarouselFunction);
      }
    };

    this.onSectionUnload = function (container) {
      $(window).off('.themeSection' + container.id);
      $('.slick-slider', container).each(function () {
        $(this).slick('unslick').off('init');
      });
    };

    this.onBlockSelect = function (block) {
      $(block).closest('.slick-slider').each(function () {
        $(this).slick('slickGoTo', $(this).data('slick-index')).slick('slickPause');
      });
    };

    this.onBlockDeselect = function (block) {
      $(block).closest('.slick-slider').each(function () {
        $(this).slick('slickPlay');
      });
    };
  }();
  theme.HeaderSection = new function () {
    this.onSectionLoad = function (target) {
      /// Create mobile navigation
      $('body').append($('#mobile-navigation-template', target).html()); // move the localisation form when on mobile

      $('#mobile-nav .sub-nav a, #mobile-nav .sub-nav button').attr('tabindex', '-1');

      function toggleSubNav() {
        $(this).attr('aria-expanded', !$(this).siblings().is(':visible'));
        $(this).parent().toggleClass('sub-nav-item--expanded', !$(this).siblings().is(':visible'));
        $(this).siblings().slideToggle(250);
      } // things for the standard nav


      if ($('.main-nav', target).length) {
        var doNavResizeEvents = function doNavResizeEvents() {
          // Keep the logo spacer width equal to the width of the logo
          if ($logoSpacer.length && $logo.length) {
            $logoSpacer.css('width', $logo.outerWidth());
          }
        };

        var ensureDropdownPosition = function ensureDropdownPosition() {
          setTimeout(function () {
            var pw = $('.main-nav').width() + $('.main-nav').offset().left;
            $('.main-nav .nav-item.drop-norm .sub-nav').css('transform', '').each(function () {
              $(this).css({
                visibility: 'hidden',
                zIndex: -1
              }).css({
                display: 'block'
              });
              var oobr = pw - ($(this).offset().left + $(this).outerWidth());
              var oobl = $(this).offset().left;

              if (oobr < 0) {
                // off the right
                $(this).css('transform', 'translate(' + Math.ceil(oobr - 1) + 'px)');
              } else if (oobl < 0) {
                // off the left
                $(this).css('transform', 'translate(' + Math.ceil(-oobl) + 'px)');
              }

              $(this).css({
                visibility: '',
                zIndex: '',
                display: ''
              });
            });
          }, 50);
        }; // Ensuring sub nav dropdown does not go off the RHS of page


        $('.main-nav .sub-nav-item.has-dropdown > a', target).on('keypress', function (e) {
          if (e.keyCode === 32) {
            toggleSubNav.call(this);
          }

          e.preventDefault();
        }); // always follow links

        $('.main-nav', target).on('click', '.sub-nav-item.has-dropdown > a', function () {
          // Sub sub nav
          toggleSubNav.call(this);
          return false;
        }).filter('[data-col-limit]').each(function () {
          // Ensure no columns go over the per-column quota
          var perCol = $(this).data('col-limit');

          if (perCol > 0) {
            $('.nav-item.dropdown.drop-norm > .sub-nav', this).each(function () {
              var $items = $(this).find('.sub-nav-list:not(.sub-nav-image) > .sub-nav-item');
              var cols = Math.ceil($items.length / perCol);

              for (var i = 1; i < cols; i++) {
                var $list = $('<ul class="sub-nav-list"/>').append($items.slice(perCol * i)).insertAfter($(this).find('.sub-nav-list:not(.sub-nav-image):last'));
              }
            });
          }
        }); // hover events

        var navHoverDelay = 250;
        var $navLastOpenDropdown = $();
        var navOpenTimeoutId = -1;
        var $container = $(target);
        $('.main-nav', target).on('mouseenter mouseleave', '.nav-item.dropdown', function (evt) {
          var $dropdownContainer = $(evt.currentTarget); // delay on hover-out

          if (evt.type == 'mouseenter') {
            clearTimeout(navOpenTimeoutId);
            clearTimeout($dropdownContainer.data('navCloseTimeoutId'));
            var $openSiblings = $dropdownContainer.siblings('.open'); // close all menus but last opened

            $openSiblings.not($navLastOpenDropdown).removeClass('open');
            $navLastOpenDropdown = $dropdownContainer; // show after a delay, based on first-open or not

            var timeoutDelay = $openSiblings.length == 0 ? 0 : navHoverDelay; // open it

            var newNavOpenTimeoutId = setTimeout(function () {
              $dropdownContainer.addClass('open').siblings('.open').removeClass('open'); // look for a non-mega dropdown

              var $dropdown = $dropdownContainer.filter('.drop-norm').children('.sub-nav');

              if ($dropdown.length) {
                var transform = '',
                    rightEdge = $('#page-wrap').width() - 30; // centre-aligned menus

                if ($dropdownContainer.closest('.align-center').length) {
                  // check if left-edge is too far left
                  var leftOfDropdown = $dropdownContainer.offset().left + $dropdownContainer.outerWidth() / 2 - $dropdown.outerWidth() / 2;
                  var leftEdge = 30;
                  var leftOutsideAmount = leftOfDropdown - leftEdge;

                  if (leftOutsideAmount < 0) {
                    transform = 'translateX(calc(50% + ' + Math.round(Math.abs(leftOutsideAmount)) + 'px))';
                  } else {
                    // check if right-edge is too far right
                    var rightOfDropdown = $dropdownContainer.offset().left + $dropdownContainer.outerWidth() / 2 + $dropdown.outerWidth() / 2;
                    var rightOusideAmount = rightOfDropdown - rightEdge;

                    if (rightOusideAmount > 0) {
                      transform = 'translateX(calc(50% - ' + Math.round(rightOusideAmount) + 'px))';
                    }
                  }
                } else {
                  // left-aligned menus - check if right-edge is too far right
                  var rightOfDropdown = $dropdownContainer.offset().left + $dropdown.outerWidth();
                  var rightOusideAmount = rightOfDropdown - rightEdge;

                  if (rightOusideAmount > 0) {
                    transform = 'translateX(-' + Math.round(rightOusideAmount) + 'px)';
                  }
                }

                $dropdown.css('transform', transform);
              }
            }, timeoutDelay);
            navOpenTimeoutId = newNavOpenTimeoutId;
            $dropdownContainer.data('navOpenTimeoutId', newNavOpenTimeoutId);
          } else {
            // cancel opening, close after delay, and clear transforms
            clearTimeout($dropdownContainer.data('navOpenTimeoutId'));
            $dropdownContainer.data('navCloseTimeoutId', setTimeout(function () {
              $dropdownContainer.removeClass('open').children('.sub-nav').css('transform', '');
            }, navHoverDelay));
          } // a11y


          $dropdownContainer.children('[aria-expanded]').attr('aria-expanded', evt.type == 'mouseenter');
        }); // touch events

        $('.main-nav', target).on('touchstart touchend click', '.nav-item.dropdown > .nav-item-link', function (evt) {
          if (evt.type == 'touchstart') {
            $(this).data('touchstartedAt', evt.timeStamp);
          } else if (evt.type == 'touchend') {
            // down & up in under a second - presume tap
            if (evt.timeStamp - $(this).data('touchstartedAt') < 1000) {
              $(this).data('touchOpenTriggeredAt', evt.timeStamp);

              if ($(this).parent().hasClass('open')) {
                // trigger close
                $(this).parent().trigger('mouseleave');
              } else {
                // trigger close on any open items
                $('.nav-item.open').trigger('mouseleave'); // trigger open

                $(this).parent().trigger('mouseenter');
              } // prevent fake click


              return false;
            }
          } else if (evt.type == 'click') {
            // if touch open was triggered very recently, prevent click event
            if ($(this).data('touchOpenTriggeredAt') && evt.timeStamp - $(this).data('touchOpenTriggeredAt') < 1000) {
              return false;
            }
          }
        }); // keyboard events

        $('.main-nav', target).on('keydown', '.nav-item.dropdown > .nav-item-link', function (evt) {
          // space on parent link - toggle dropdown
          if (evt.which == 32) {
            var $parent = $(evt.target).parent();
            $parent.trigger($parent.hasClass('open') ? 'mouseleave' : 'mouseenter');
            return false;
          }
        });
        var $logoSpacer = $('#logo-spacer', target);
        var $logo = $('.logo-item', target);
        $(window).on('debouncedresize.headerSection doNavResizeEvents.headerSection', doNavResizeEvents).trigger('doNavResizeEvents');
        $(window).on('debouncedresize.headerSection ensuredropdownposition.headerSection', ensureDropdownPosition).trigger('ensuredropdownposition');
        $(function () {
          ensureDropdownPosition();
        });
      } /// Style any dropdowns


      $('select:not([name=id])', target).selectReplace();
      $('.disclosure', target).add('#mobile-nav .disclosure').each(function () {
        $(this).data('disclosure', new theme.Disclosure($(this)));
      }); /// Predictive search

      var $liveSearchContainer = $('.main-search[data-live-search="true"]', target);
      var $liveSearchForm = $liveSearchContainer.find('form');
      var $searchPopupContainer = $liveSearchContainer.find('.main_search__popup');
      var $searchResultsContainer = $liveSearchContainer.find('.main-search__results');
      var $footerButtons = $searchPopupContainer.find('.main-search__footer-buttons');
      var $allResultsContainer = $searchPopupContainer.find('.all-results-container');

      if ($liveSearchContainer.length) {
        var doPredictiveSearch = function doPredictiveSearch() {
          var $searchContainer = $(this).closest('.main-search'),
              $resultsBox = $searchContainer.find('.main-search__results'),
              $productType = $searchContainer.find('.main-search__product-types:visible'),
              valueToSearch = $(this).val(),
              productTypeToSearch = $productType.length > 0 ? $productType.val() : ""; //Record the value in a cookie

          theme.createCookie(searchTermCookieName, valueToSearch, 1);
          theme.createCookie(searchTypeCookieName, productTypeToSearch, 1); //Only search if search string longer than 2, and it or the product type has changed

          if (valueToSearch.length > 2 && (valueToSearch != $searchInput.data('oldval') || $productType.length === 0 || productTypeToSearch != $searchInput.data('oldtype'))) {
            //Reset previous value
            $searchInput.data('oldval', valueToSearch);
            $searchInput.data('oldtype', productTypeToSearch); // Kill outstanding ajax request

            if (currReqObj != null) {
              currReqObj.abort();
            } // Kill previous search


            clearTimeout(searchTimeoutID); // Create URL for full search results

            var $form = $(this).closest('form').eq(0);
            var linkURL = $form.attr('action') + ($form.attr('action').indexOf('?') > -1 ? '&' : '?') + $form.serialize();

            if (productTypeToSearch.length > 0) {
              linkURL = linkURL.replace('&q=', "&q=product_type:".concat(productTypeToSearch, "+*"));
            } //Show loading


            $searchContainer.removeClass('main-search--has-results main-search--results-on-multiple-lines main-search--no-results').addClass('main-search--loading');
            $searchPopupContainer.css('height', $searchPopupContainer.outerHeight() + 'px');
            liveSearch.popup.show(true, false, false);
            $allResultsContainer.empty();
            $footerButtons.hide();

            if ($('.main-search__results-spinner').length === 0) {
              $resultsBox.html('<div class="main-search__results-spinner"><div class="loading-spinner"></div></div>');
            } // Do next search (in X milliseconds)


            searchTimeoutID = setTimeout(function () {
              var ajaxUrl, ajaxData;

              if (theme.Shopify.features.predictiveSearch) {
                // use the API
                ajaxUrl = theme.routes.search_url + '/suggest.json';
                ajaxData = {
                  "q": "".concat(productTypeToSearch.length > 0 ? "product_type:" + productTypeToSearch + "+*" : "", " ").concat(valueToSearch),
                  "resources": {
                    "type": $form.find('input[name="type"]').val(),
                    "limit": 8,
                    "options": {
                      "unavailable_products": "last",
                      "fields": includeMeta ? "title,product_type,variants.title,vendor,tag,variants.sku" : "title,product_type,variants.title,vendor"
                    }
                  }
                };
              } else {
                // use the theme template fallback
                ajaxUrl = linkURL + '&view=json';
                ajaxData = null;
              } //Ajax hit on search page


              currReqObj = $.ajax({
                url: ajaxUrl,
                data: ajaxData,
                dataType: "json",
                success: function success(response) {
                  currReqObj = null;
                  $searchContainer.removeClass('main-search--has-results main-search--results-on-multiple-lines main-search--no-results');
                  $resultsBox.empty();
                  var $resultsProducts = $('<div class="main-search__results__products collection-listing"><div class="product-list product-list--per-row-4 product-list--image-shape-natural"></div></div>');
                  var $resultsPages = $('<div class="main-search__results__pages">');

                  if (response.resources.results.products) {
                    for (var i = 0; i < response.resources.results.products.length; i++) {
                      var result = response.resources.results.products[i];
                      var $item = $(['<div class="main-search-result">', '<div class="block-inner">', '<div class="block-inner-inner">', '<div class="image-cont">', '<a class="product-link">', '<div class="image-label-wrap">', '<div class="primary-image"></div>', '</div>', '</a>', '</div>', '<div class="product-info">', '<div class="inner">', '<div class="innerer">', '<a class="product-link">', '<div class="product-block__title"></div>', '</a>', '</div>', '</div>', '</div>', '</div>', '</div>', '</div>'].join(''));
                      $item.find('.product-link').attr('href', result.url);

                      if (result.featured_image && result.featured_image.url) {
                        var $img = $('<div class="rimage-outer-wrapper"><div class="rimage-wrapper lazyload--placeholder"><img loading="lazy" class="rimage__image"/></div></div>').appendTo($item.find('.primary-image'));
                        $img.find('.rimage-wrapper').css('padding-top', 1 / Math.max(result.featured_image.aspect_ratio, 0.6) * 100 + '%');
                        $img.find('.rimage__image').attr('data-lazy-src', theme.Shopify.formatImage(result.featured_image.url, '{width}x'));
                      }

                      var $itemInfoCont = $item.find('.product-info .product-link');
                      $itemInfoCont.find('.product-block__title').html(result.title);

                      if (showVendor) {
                        $('<div class="vendor">').html(result.vendor).prependTo($itemInfoCont);
                      }

                      if (showPrice) {
                        var $price = $('<div class="product-price">').appendTo($itemInfoCont);

                        if (result.price_max != result.price_min) {
                          $('<span class="product-price__from">').html(theme.strings.products_listing_from).appendTo($price);
                          $price.append(' ');
                        }

                        if (parseFloat(result.compare_at_price_min) > parseFloat(result.price_min)) {
                          $('<span class="product-price__amount product-price__amount--on-sale theme-money reduced-price">').html(theme.formatMoney(result.price_min)).appendTo($price);
                          $price.append(' ');
                          $('<span class="product-price__compare theme-money struck-out-price">').html(theme.formatMoney(result.compare_at_price_min)).appendTo($price);
                        } else {
                          $('<span class="product-price__amount theme-money">').html(theme.formatMoney(result.price_min)).appendTo($price);
                        }
                      }

                      if (showSoldOutLabel && !result.available) {
                        $("<span class=\"product-label product-label--soldout\"><span>".concat(theme.strings.products_labels_sold_out, "</span></span>")).appendTo($item.find('.product-info'));
                      } else if (showSaleLabel && parseFloat(result.compare_at_price_min) > parseFloat(result.price_min)) {
                        $("<span class=\"product-label product-label--sale\"><span>".concat(theme.strings.products_labels_sale, "</span></span>")).appendTo($item.find('.product-info'));
                      }

                      $resultsProducts.children().append($item);
                    }
                  }

                  if (response.resources.results.pages) {
                    for (var i = 0; i < response.resources.results.pages.length; i++) {
                      var result = response.resources.results.pages[i];
                      var $item = $('<a class="main-search-result main-search-result--page">').attr('href', result.url);
                      $('<div class="main-search-result__text">').html(result.title).appendTo($item);
                      $resultsPages.append($item);
                    }
                  }

                  if (response.resources.results.articles) {
                    for (var i = 0; i < response.resources.results.articles.length; i++) {
                      var result = response.resources.results.articles[i];
                      var $item = $('<a class="main-search-result main-search-result--article">').attr('href', result.url);
                      $('<div class="main-search-result__text">').html(result.title).appendTo($item);
                      $resultsPages.append($item);
                    }
                  }

                  $searchPopupContainer.css('height', 'auto');
                  $searchContainer.removeClass('main-search--loading');
                  var areProducts = $resultsProducts.find('.main-search-result:first').length > 0,
                      arePages = $resultsPages.find('.main-search-result:first').length > 0;

                  if (areProducts || arePages) {
                    // Numerous results
                    $searchContainer.addClass('main-search--has-results');
                    $searchContainer.toggleClass('main-search--results-on-multiple-lines', $resultsProducts.find('.product-block').length > 4);

                    if (areProducts) {
                      $resultsBox.append($resultsProducts);
                    }

                    if (arePages) {
                      $('<h6 class="main-search-result__heading">').html(theme.strings.general_quick_search_pages).prependTo($resultsPages);
                      $resultsBox.append($resultsPages);
                    }

                    $('<a class="main-search__results-all-link btn">').attr('href', linkURL).html(theme.strings.layout_live_search_see_all + theme.icons.chevronRight).appendTo($allResultsContainer);
                    $footerButtons.css('display', 'flex');
                  } else {
                    // No results - show nothing
                    $searchContainer.addClass('main-search--no-results');
                    $('<div class="main-search__empty-message">').html(theme.strings.general_quick_search_no_results).appendTo($resultsBox);
                  }
                },
                error: function error(response) {
                  console.log('Error fetching results');
                }
              });
            }, searchTimeoutThrottle);
          } else if ($(this).val().length <= 2) {
            // Deleted text? Abandon search-in-progress
            $searchInput.data('oldval', valueToSearch);
            $searchInput.data('oldtype', productTypeToSearch);

            if (currReqObj != null) {
              currReqObj.abort();
            }

            clearTimeout(searchTimeoutID); // Clear results

            liveSearch.popup.hide();
            setTimeout(function () {
              $searchPopupContainer.css('height', 'auto');
              $searchContainer.removeClass('main-search--has-results main-search--results-on-multiple-lines main-search--loading');
              $resultsBox.empty();
              $allResultsContainer.empty();
              $footerButtons.hide();
            }, 50);
          }
        };

        var searchTermCookieName = 'theme_quick_search_term';
        var searchTypeCookieName = 'theme_quick_search_type';
        var $searchInput = $('.main-search__input', target);

        if (typeof theme.readCookie(searchTermCookieName) != 'undefined') {
          $searchInput.val(theme.readCookie(searchTermCookieName));
        }

        var $searchType = $('.main-search__product-types', target);

        if ($searchType.length > 0) {
          if (typeof theme.readCookie(searchTypeCookieName) != 'undefined') {
            $searchType.val(theme.readCookie(searchTypeCookieName)).trigger('change');
          }
        }

        var liveSearch = new function () {
          return {
            popup: {
              show: function show() {
                var forceShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
                var forceSearch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                var doSearch = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

                if ($searchResultsContainer.html().length > 0 || forceShow === true || forceSearch === true || $searchInput.val().length >= 3) {
                  if (($searchResultsContainer.html().length === 0 || forceSearch === true) && doSearch === true) {
                    //There are at least 3 chars in the search box, but the search hasn't run yet
                    doPredictiveSearch.call($searchInput);
                  }

                  $liveSearchContainer.addClass('main-search--show-popup');
                }

                $searchPopupContainer.attr('aria-expanded', true);
              },
              hide: function hide() {
                $liveSearchContainer.removeClass('main-search--show-popup');
                $searchPopupContainer.attr('aria-expanded', false);
              }
            },
            hiddenSearch: {
              hide: function hide() {
                var $hiddenContainer = $liveSearchContainer.closest('.hidden-search-container');

                if ($hiddenContainer.length > 0) {
                  $hiddenContainer.removeClass('hidden-search-container--open');
                  $('body').removeClass('hidden-search-container--open');
                }
              }
            }
          };
        }();
        var searchTimeoutThrottle = 500,
            searchTimeoutID = -1,
            currReqObj = null,
            showPrice = $liveSearchContainer.data('live-search-price'),
            showVendor = $liveSearchContainer.data('live-search-vendor'),
            includeMeta = $liveSearchContainer.data('live-search-meta'),
            showSoldOutLabel = $liveSearchContainer.data('show-sold-out-label'),
            showSaleLabel = $liveSearchContainer.data('show-sale-label'),
            previousSearchStr = null;
        $(target).on('keyup.headerSection change.headerSection', '.main-search__input:visible', function () {
          if ($(this).closest('.hidden-search-container--mob-only').length) {
            if (theme.viewport.isXs()) {
              doPredictiveSearch.call(this);
            }
          } else {
            if (previousSearchStr !== $(this).val()) {
              doPredictiveSearch.call(this);
              previousSearchStr = $(this).val();
            }
          }
        });
        $(target).on('click.headerSection', '.main-search__input', liveSearch.popup.show);
        $(target).on('focus.headerSection', '.main-search__input', function () {
          liveSearch.popup.show();
          $(this).select();
        });
        $(target).on('change.headerSection', '.main-search__product-types', function () {
          if ($searchInput.val().length >= 3) {
            liveSearch.popup.show(true, true);
          }
        });
        $(target).on('click.headerSection', '.main-search__results-close-link', function () {
          liveSearch.popup.hide();
          liveSearch.hiddenSearch.hide();
          return false;
        });
        var $hiddenSearchContainer = $('.hidden-search-container', target);
        var $searchForm = $('.hidden-search-container .main-search', target);

        if ($hiddenSearchContainer.length) {
          var moveSearchContainer = function moveSearchContainer() {
            if (theme.viewport.isXs() && $('.hidden-search-container .main-search', target).length > 0) {
              $toolbarContainer.append($searchForm.addClass('main-search--revealable'));
            } else if (theme.viewport.isSm() && $('.hidden-search-container .main-search', target).length === 0) {
              $hiddenSearchContainer.append($searchForm.removeClass('main-search--revealable').css('display', ''));
            }
          };

          var $toolbarContainer = $('#toolbar', target).closest('.container');
          $(target).on('click.headerSection', '[data-show-search-form]', function () {
            if ($hiddenSearchContainer.find('.main-search').length) {
              $hiddenSearchContainer.addClass('hidden-search-container--open');
              $('body').addClass('hidden-search-container--open');
            } else {
              $toolbarContainer.find('.main-search').slideToggle(200).toggleClass('-in');
            }

            return false;
          });
          $(window).on('debouncedresize.headerSection', moveSearchContainer);
          moveSearchContainer();
        } //Esc pressed


        $(target).on('keyup.headerSection', function (evt) {
          if (evt.which === 27) {
            liveSearch.popup.hide();
            liveSearch.hiddenSearch.hide();
          }
        }); //If somewhere other than the popup is clicked

        $('body').on('click.headerSection', function (evt) {
          if ($liveSearchForm.has(evt.target).length === 0) {
            liveSearch.popup.hide();
            liveSearch.hiddenSearch.hide();
          }
        });
        $(target).on('submit.headerSection', '.main-search__form', function () {
          var $productType = $(this).find('.main-search__product-types');
          var productTypeToSearch = $productType.length > 0 ? $productType.val() : ""; //Inject the product type if found

          if (productTypeToSearch.length > 0) {
            var linkURL = $(this).attr('action') + ($(this).attr('action').indexOf('?') > -1 ? '&' : '?') + $(this).serialize();
            linkURL = linkURL.replace('&q=', "&q=product_type:".concat(productTypeToSearch, "+*"));
            window.location.href = linkURL;
            return false;
          }
        });
      } /// Mobile sub-nav


      var navStack = [];
      $(document).on('click', '#mobile-nav .open-sub-nav', function () {
        // hide current & add to stack
        var $toHide = $('#mobile-nav .inner:not(.hide), #mobile-nav .sub-nav.show:not(.hide)').addClass('hide');
        $toHide.find('a, button').attr('tabindex', '-1');
        navStack.push($toHide); // show new

        var $toShow = $('#mobile-nav .sub-nav[data-is-subnav-for="' + $(this).data('sub-nav') + '"]').first().addClass('show');
        $toShow.find('a, button').removeAttr('tabindex');
        $(this).attr('aria-expanded', true);
        return false;
      }).on('click', '#mobile-nav .close-sub-nav', function () {
        // hide current
        $(this).closest('.sub-nav').removeClass('show').find('a, button').attr('tabindex', '-1'); // reveal last seen & pop off stack

        var $popped = navStack.pop().removeClass('hide');
        $popped.find('a, button').removeAttr('tabindex');
        $popped.find('[aria-expanded="true"]').removeAttr('aria-expanded');
        return false;
      }).on('click', '#mobile-nav a.nav-item-link[href="#"], #mobile-nav a.sub-nav-item-link[href="#"]', function () {
        // #-link opens child nav
        $(this).closest('li').find('button').click();
        return false;
      });
    };

    this.onSectionUnload = function (target) {
      $('.main-nav', target).off('click mouseenter mouseleave touchstart touchend keydown');
      $('#mobile-nav').remove();
      $(window).off('.headerSection');
      $(target).off('.headerSection');
      $('.disclosure', target).add('#mobile-nav .disclosure').each(function () {
        $(this).data('disclosure').unload();
      });
      $('select.replaced', target).selectReplace('destroy');
    };
  }();
  theme.AnnouncementBarSection = new function () {
    this.onSectionLoad = function (target) {
      $('.disclosure', target).each(function () {
        $(this).data('disclosure', new theme.Disclosure($(this)));
      }); // Keep the spacer width equal to the width of the localization dropdowns/socials

      var $spacers = $('.announcement-bar__spacer', target);

      if ($spacers.length > 1) {
        var doAnnouncementBarResizeEvents = function doAnnouncementBarResizeEvents() {
          var maxWidth = 0;
          $spacers.each(function () {
            if ($(this).width() > maxWidth) {
              maxWidth = $(this).width();
            }
          });
          $spacers.width(parseInt(maxWidth));
        };

        $(window).on('debouncedresize.announcementBarSection', doAnnouncementBarResizeEvents);
        doAnnouncementBarResizeEvents();
      }
    };

    this.onSectionUnload = function (target) {
      $('.disclosure', target).each(function () {
        $(this).data('disclosure').unload();
      });
      $(window).off('.announcementBarSection');
    };
  }();
  theme.BlogTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      /// Style any dropdowns
      $('select:not([name=id])', target).selectReplace(); // Masonry

      $('.use-masonry', target).each(function () {
        var $toMasonry = $(this);
        window.$ = window.jQuery = $; // rebind jQuery

        theme.loadScriptOnce(theme.scripts.masonry, function () {
          $toMasonry.addClass('masonry').masonry({
            itemSelector: '.article',
            visibleStyle: {
              opacity: 1,
              transform: 'translate3d(0,0,0)'
            },
            hiddenStyle: {
              opacity: 0,
              transform: 'translate3d(0,20px,0)'
            }
          }); // hack: needs a second run, may as well do after load

          setTimeout(function () {
            $(function () {
              $toMasonry.masonry();
            });
          }, 10);
        });
      }); // Infinite scroll

      $('.articles.use-infinite-scroll', target).each(function () {
        var $cont = $(this);
        window.$ = window.jQuery = $; // rebind jQuery

        theme.loadScriptOnce(theme.scripts.jqueryInfiniteScroll, function () {
          $cont.infinitescroll({
            navSelector: ".pagination",
            nextSelector: ".pagination .next",
            itemSelector: ".articles .article",
            loading: {
              msgText: theme.strings.infiniteScrollBlogLoading,
              finishedMsg: theme.strings.infiniteScrollBlogFinishedMsg
            },
            pathParse: function pathParse(path, nextPage) {
              return path.match(/^(.*page=)[0-9]*(&.*)?$/).splice(1);
            }
          }, function (newElements) {
            $cont.find('#infscr-loading').remove(); // for nth-child

            if ($cont.hasClass('masonry')) {
              $(newElements).hide().imagesLoaded(function () {
                $(newElements).show();
                $cont.masonry('appended', $(newElements), true);
              });
            }
          });
        });
      }); /// Check that tags fit in one line

      if ($('.page-title.opposing-items .tags', target).length > 0) {
        var checkTagWidths = function checkTagWidths() {
          var $cont = $('.page-title.opposing-items');
          var $title = $cont.children('.left');
          var $tags = $cont.children('.tags');
          $cont.toggleClass('collapse-tags', $tags.outerWidth(true) > $cont.width() - $title.outerWidth(true));

          if ($cont.hasClass('collapse-tags')) {
            if ($cont.find('.more-link').length == 0) {
              $tags.before(['<a href="#" class="more-link">', theme.strings.blogsShowTags, '</a>'].join(''));
            }
          } else {
            $cont.find('.more-link').remove();
          }
        };

        $(window).on('debouncedresize.checktagswidth checktagswidth.checktagswidth', checkTagWidths).trigger('checktagswidth');
        $(function () {
          checkTagWidths();
        });
        $(document).on('click.checktagswidth', '.page-title.opposing-items.collapse-tags .more-link', function (e) {
          e.preventDefault();
          $(this).closest('.opposing-items').toggleClass('reveal-tags');
        });
      }
    };

    this.onSectionUnload = function (target) {
      $(window).off('.checktagswidth .blogTemplateMasonry');
      $(document).off('.checktagswidth');
      $('select.replaced', target).selectReplace('destroy');
    };
  }();
  theme.SearchTemplateSection = new function () {
    this.onSectionLoad = function (target) {
      theme.loadProductGrid(target);
    };

    this.onSectionUnload = function (target) {
      theme.unloadProductGrid(target);
    };
  }();
  theme.CartTemplateSection = new function () {
    this.onSectionLoad = function (container) {
      var _this = this;

      this.namespace = theme.namespaceFromSection(container); // Show shipping calculator

      if ($('#shipping-calculator', container).length) {
        // load scripts in order
        theme.loadScriptOnce(theme.scripts.underscore, function () {
          theme.loadScriptOnce(theme.scripts.shopifyCommon, function () {
            // final script can be async
            theme.loadScriptOnce(theme.scripts.jqueryCart, function () {
              Shopify.Cart.ShippingCalculator.show({
                submitButton: theme.strings.shippingCalcSubmitButton,
                submitButtonDisabled: theme.strings.shippingCalcSubmitButtonDisabled,
                customerIsLoggedIn: theme.customerIsLoggedIn,
                moneyFormat: theme.shippingCalcMoneyFormat
              });
              $('select', this).selectReplace();
              setTimeout(function () {
                this.trigger('change');
              }.bind($('select', this)), 100);
            }.bind(container));
          }, null, true);
        }, null, true);
      }

      $(container).on("click".concat(this.namespace), '.qty-adjuster__remove', function () {
        if (confirm(theme.strings.cartConfirmRemove)) {
          if ($(container).data('ajax-update')) {
            _this.functions.updateCart.call(this, {
              line: $(this).data('line'),
              quantity: 0
            });

            return false;
          } else {
            return true;
          }
        } else {
          return false;
        }
      });

      if ($(container).data('ajax-update')) {
        // listen to cart changes
        $(document).on('theme:cartchanged.cartTemplateSection', this.functions.refreshCartDependentContent.bind(this));
        $(container).on("change".concat(this.namespace, " changeFromButton").concat(this.namespace), '.qty-adjuster__value', function (evt) {
          var $currentTarget = $(evt.currentTarget);

          if (this.replacingContent || $currentTarget.data('initial-value') && $currentTarget.data('initial-value') === $currentTarget.val() || $currentTarget.val().length === 0) {
            return;
          } // focus on -/+ button or input, depending on source of event


          var toFocusId;

          if (evt.type === 'changeFromButton') {
            toFocusId = $(evt.data).attr('id');
          } else {
            toFocusId = $currentTarget.attr('id');
          }

          $currentTarget.closest('.cart-item').addClass('cart-item-loading');
          this.functions.updateCart.call(this, {
            line: $currentTarget.data('line'),
            quantity: $currentTarget.val()
          }, function () {
            // after update, set focus
            $('#' + toFocusId).focus();
          });
        }.bind(this));
      }

      theme.loadCartNoteMonitor(container);
    };

    this.functions = {
      refreshCartDependentContent: function refreshCartDependentContent() {
        if (this.cartRefreshXhr) {
          this.cartRefreshXhr.abort();
        } // fetch new html for the page


        this.cartRefreshXhr = $.ajax({
          type: 'GET',
          url: theme.routes.cart_url + '?view=ajax',
          success: function (data) {
            var toReplace = ['.cart-items', '.cart-subtotal'];
            var $newDom = $('<div>' + data + '</div>'); // remove any transitions

            $newDom.find('[data-cc-animate]').removeAttr('data-cc-animate');

            for (var i = 0; i < toReplace.length; i++) {
              if ($newDom.find(toReplace[i]).length) {
                this.replacingContent = true; // to avoid triggering change events when focus is lifted before DOM replacement

                $('[data-section-type="cart-template"] ' + toReplace[i]).html($newDom.find(toReplace[i]).html());
              } else {
                //Replace the whole section
                $('[data-section-type="cart-template"]').html($newDom.find('[data-section-type="cart-template"]').html());
              }

              this.replacingContent = false;
            }
          }.bind(this),
          error: function error(data) {
            if (data.statusText != 'abort') {
              console.error('Error refreshing page', data);
              $('#cartform').submit();
            }
          },
          complete: function () {
            this.cartRefreshXhr = null;
          }.bind(this)
        });
      },
      updateCart: function updateCart(params, successCallback) {
        if (this.cartXhr) {
          this.cartXhr.abort();
        }

        if (this.cartRefreshXhr) {
          this.cartRefreshXhr.abort();
        }

        this.cartXhr = $.ajax({
          type: 'POST',
          url: theme.routes.cart_change_url + '.js',
          data: params,
          dataType: 'json',
          success: function success() {
            document.documentElement.dispatchEvent(new CustomEvent('theme:cartchanged', {
              bubbles: true,
              cancelable: false
            }));

            if (successCallback) {
              successCallback();
            }
          },
          error: function error(data) {
            if (data.statusText != 'abort') {
              console.error('Error updating cart', data);
              $('#cartform').submit();
            }
          },
          complete: function () {
            this.cartXhr = null;
          }.bind(this)
        });
      }
    };

    this.onSectionUnload = function (container) {
      // remove shipping calc events
      $('#shipping-calculator #address_country', container).off('change');
      $('#shipping-calculator .get-rates', container).off('click');
      $('select.replaced', container).selectReplace('destroy');
      theme.unloadCartNoteMonitor(container);
    };
  }();
  theme.ProductRecommendations = new function () {
    this.onSectionLoad = function (container) {
      // Look for an element with class 'product-recommendations'
      var productRecommendationsSection = container;

      if (productRecommendationsSection === null) {
        return;
      } // Create request and submit it using Ajax


      var request = new XMLHttpRequest();
      request.open("GET", productRecommendationsSection.dataset.url, true);

      request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
          var newContainer = document.createElement("div");
          newContainer.innerHTML = request.response;
          productRecommendationsSection.innerHTML = newContainer.querySelector(".product-recommendations").innerHTML;
          theme.loadProductGrid(productRecommendationsSection);
        }
      };

      request.send();
    };
  }();
  theme.TestimonialsSection = new function () {
    this.onSectionLoad = function (target) {
      theme.initContentSlider(target);
    };

    this.onSectionUnload = function (target) {
      $('.slick-slider', target).slick('unslick').off('init');
      $(window).off('.testimonialsSection');
    };

    this.onBlockSelect = function (target) {
      $(target).closest('.slick-slider').slick('slickGoTo', $(target).data('slick-index')).slick('slickPause');
    };

    this.onBlockDeselect = function (target) {
      $(target).closest('.slick-slider').slick('slickPlay');
    };
  }();
  $(function ($) {
    $(document).on('keyup.themeTabCheck', function (evt) {
      if (evt.keyCode === 9) {
        $('body').addClass('tab-used');
        $(document).off('keyup.themeTabCheck');
      }
    }); /// Style dropdowns (outside of the product form)

    $('select:not([name=id])').filter(function () {
      $(this).closest('.product-form').length == 0;
    }).selectReplace(); /// Uncontained images

    theme.uncontainImages($('body')); /// General lightbox popups

    $('a[rel=lightbox]').colorbox({
      minWidth: '200',
      maxWidth: '96%',
      maxHeight: '96%'
    }); /// Init carousels

    theme.carousels.init(); /// Check alt sections

    theme.assessFullWidthSections(); /// Any section load reorder

    $(document).on('shopify:section:reorder', function (e) {
      theme.assessFullWidthSections();
    }); /// Any section load

    $(document).on('shopify:section:load', function (e) {
      /// Handle special wide images - available inside any rich text content
      theme.uncontainImages(e.target);
      theme.assessFullWidthSections();
      theme.carousels.init(); /// Init any inline videos

      $('.section-background-video--inline', e.target).each(function () {
        theme.VideoManager.onSectionLoad($(this)[0]);
      });
    }); /// Any section unload

    $(document).on('shopify:section:unload', function (e) {
      /// Unload any inline videos
      $('.section-background-video--inline', e.target).each(function () {
        theme.VideoManager.onSectionUnload($(this)[0]);
      });
      theme.carousels.destroy();
    }); /// Dropdowns that redirect

    $(document).on('change', 'select.redirect', function () {
      window.location = $(this).val();
    }); /// Custom share buttons

    $(document).on('click', '.sharing a', function (e) {
      var $parent = $(this).parent();

      if ($parent.hasClass('twitter')) {
        e.preventDefault();
        var url = $(this).attr('href');
        var width = 575,
            height = 450,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            opts = 'status=1, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
        window.open(url, 'Twitter', opts);
      } else if ($parent.hasClass('facebook')) {
        e.preventDefault();
        var url = $(this).attr('href');
        var width = 626,
            height = 256,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            opts = 'status=1, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
        window.open(url, 'Facebook', opts);
      } else if ($parent.hasClass('pinterest')) {
        e.preventDefault();
        var url = $(this).attr('href');
        var width = 700,
            height = 550,
            left = ($(window).width() - width) / 2,
            top = ($(window).height() - height) / 2,
            opts = 'status=1, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0' + ',width=' + width + ',height=' + height + ',top=' + top + ',left=' + left;
        window.open(url, 'Pinterest', opts);
      }
    }); /// Overlay click

    $(document).on('click', '#page-overlay, .side-menu-header--close', function () {
      $('body').removeClass('show-cart-summary show-mobile-nav product-added-to-cart');
      return false;
    }); /// Toggles for side-modals

    $(document).on('click', '.toggle-mob-nav', function () {
      //prep for reveal
      $('.cart-summary').removeClass('active');
      $('#mobile-nav').addClass('active'); //toggle

      if (!$('body').toggleClass('show-mobile-nav').hasClass('show-mobile-nav')) {
        setTimeout(function () {
          $('#mobile-nav').removeAttr('tabindex');
          $('body a:first:visible').focus();
        }, 500);
      } else {
        // move focus to menu container
        setTimeout(function () {
          $('#mobile-nav').attr('tabindex', '0').focus();
        }, 500);
      }

      return false;
    });

    if (theme.useSideCartSummary != 'off') {
      $(document).on('click', '.toggle-cart-summary', function () {
        // check if cart is toggleable
        if ($('.cart-summary .toggle-cart-summary').is(':visible')) {
          //prep for reveal
          $('#mobile-nav').removeClass('active');
          $('.cart-summary').addClass('active');
          $('body').removeClass('product-added-to-cart'); //toggle

          if (!$('body').toggleClass('show-cart-summary').hasClass('show-cart-summary')) {} else {
            setTimeout(function () {
              $('.cart-summary__close').focus();
            }, 200);
          }

          return false;
        }
      });
    } /// Quantity adjuster initialisation


    $(document).on('keypress', '.qty-adjuster--ajax .qty-adjuster__value', function (e) {
      if (e.which === 13) {
        $(this).trigger('change');
        return false;
      } else if (e.which !== 8 && e.which !== 0 && (e.which < 48 || e.which > 57)) {
        return false;
      }
    });
    $(document).on('click', '.qty-adjuster__down, .qty-adjuster__up', function (e) {
      e.preventDefault();
      var $qtyAdj = $(this).closest('.qty-adjuster'),
          $valueInput = $qtyAdj.find('.qty-adjuster__value'),
          newValue = parseInt($valueInput.val()) + ($(this).hasClass('qty-adjuster__down') ? -1 : 1),
          maxValue = $(this).closest('[data-limit]').attr('data-limit');

      if (maxValue) {
        maxValue = parseInt(maxValue);
      }

      if (maxValue && newValue > maxValue) {
        theme.showQuickPopup(theme.strings.maximumQuantity.replace('[quantity]', maxValue), $valueInput);
        $valueInput.val(maxValue).trigger('change');
      } else {
        $valueInput.val(newValue).trigger('change');
      }

      theme.updateAdjusterButtonsDisabledState($qtyAdj, false);
    });
    $(document).on('click', '.qty-adjuster--ajax .qty-adjuster__remove', function (e) {
      e.preventDefault();
      $(this).closest('.qty-adjuster').find('.qty-adjuster__value').val(0).trigger('change');
      var $cartItem = $(this).closest('.cart-summary-item-container');
      $cartItem.addClass('cart-summary-item-container--out');
      $cartItem.slideUp(300);
    });
    $(document).on('click', '.btn[data-btn-type="in-cart"]', function (e) {
      e.preventDefault();
      var $form = $(this).closest('form');
      $form.find(':submit').attr('disabled', 'disabled').each(function () {
        $(this).addClass('product-add--adding');
      });
      $(".cart-form .cart-summary-item-container[data-product-id=\"".concat($form.find('select[name="id"]').val(), "\"] .qty-adjuster__remove")).trigger('click');
    });
    var doQuantityUpdateXhr = theme.debounce(function () {
      var variantId = $(this).closest('.qty-adjuster').attr('data-line-item-id');
      var $qtyAdj = $(".qty-adjuster[data-line-item-id=\"".concat(variantId, "\"]"));
      theme.disableInPlaceQuantityAdjustment($qtyAdj);
      theme.cartLoadingStarted();
      var $miniProductForm = $(".product-form--not-quickbuy .qty-adjuster[data-line-item-id=\"".concat(variantId, "\"]")).closest('form');

      if ($miniProductForm.length) {
        $miniProductForm.find(':submit').attr('disabled', 'disabled').each(function () {
          $(this).addClass('product-add--adding');
        });
      }

      $.post(theme.routes.cart_url + '/change.js', {
        quantity: $(this).val(),
        id: variantId
      }, function (data) {
        theme.updateCartSummaries(false);
      }, 'json').fail(function () {
        //Enable controls in case of a failure so user can retry
        theme.enableInPlaceQuantityAdjustment($qtyAdj);
      }).always(function () {
        if ($qtyAdj.find('.qty-adjuster__value').val() == 0) {
          theme.enableInPlaceQuantityAdjustment($qtyAdj);
        }

        theme.cartLoadingFinished();
      });
    });
    $(document).on('change', '.qty-adjuster--ajax .qty-adjuster__value', function (e) {
      var $form = $(this).closest('form');

      if ($form.hasClass('product-form--not-quickbuy')) {
        if ($form.hasClass('product-form--added')) {
          doQuantityUpdateXhr.call(this);
        }
      } else {
        doQuantityUpdateXhr.call(this);
      }
    }); /// In-page links

    $(document).on('click', 'a[href^="#"]:not([href="#"]):not(.skip-link):not(.ignore-scroll)', function (e) {
      var $target = $($(this).attr('href')).first();

      if ($target.length == 1) {
        $('html:not(:animated),body:not(:animated)').animate({
          scrollTop: $target.offset().top
        }, 500);
        e.preventDefault();
      }
    }); /// Reload cart summary on page load, if we added something on the previous page (in response to back-button use)

    if (typeof theme.readCookie('theme_added_to_cart') != 'undefined' && theme.readCookie('theme_added_to_cart') == 'justnow') {
      theme.eraseCookie('theme_added_to_cart');
      theme.updateCartSummaries(false);
    } /// Heights in grids


    function normHeights() {
      $('[data-normheights]').each(function () {
        var $items = $(this).find($(this).data('normheights')),
            childFilter = $(this).data('normheights-inner'),
            tallest = 0,
            lastYOffset = 0,
            row = [];
        $items.each(function (index) {
          var $img = $(this).find(childFilter);
          var yOffset = $(this).position().top;

          if (index == 0) {
            lastYOffset = yOffset;
          } else if (yOffset != lastYOffset) {
            $(row).css('min-height', tallest);
            yOffset = $(this).position().top;
            row.length = 0;
            tallest = 0;
          }

          lastYOffset = yOffset;
          row.push(this);
          var h = $img.height();
          if (h > tallest) tallest = h;
        });
        $(row).css('min-height', tallest);
      }); // only reserve product weight

      $('.product-grid').each(function () {
        var $weights = $(this).find('.product-block .product-block__weight');
        var weightLength = 0;
        $weights.each(function () {
          weightLength += $(this).text().replace('&nbsp;', '').trim().length;
        });

        if (weightLength === 0) {
          $weights.remove();
        }
      }); // also asses grids that can only show on item per row

      $('.product-grid.one-row').each(function () {
        var tallestVisibleChild = 0;
        var $productBlocks = $(this).find('.product-block:not(.product-block--flex-spacer)');
        $(this).css('position', 'relative');
        $productBlocks.find('.product-block:not(.product-block--flex-spacer)').each(function (index) {
          if ($(this).position().top == 0) {
            var h = $(this).outerHeight(true);

            if (h > tallestVisibleChild) {
              tallestVisibleChild = h;
            }
          } else {
            return false;
          }
        });
        $(this).css('height', tallestVisibleChild);
        $productBlocks.removeClass('hidden').each(function (index) {
          if ($(this).position().top > 0) {
            $(this).addClass('hidden');
          }
        });
        $(this).css({
          height: '',
          position: ''
        });
      });
    }

    $(window).on('debouncedresize normheights', normHeights).trigger('normheights');
    $(function () {
      normHeights();
    }); /// Gallery variant images

    $(document).on('variantImageSelected', '.product-gallery', function (e, data) {
      var variantSrc = data.featured_media.preview_image.src.split('?')[0].replace(/http[s]?:/, '');
      $('.thumbnails a.thumbnail', this).filter('[href^="' + variantSrc + '"]').trigger('click');
    }); /// Product gallery zoom

    $(document).on('initzoom', '.product-gallery[data-enable-zoom="true"]', function () {
      var $gallery = $(this);
      var $img = $(this).find('.main .product-media:visible .main-img-link'); //Preload the zoom image

      var imgPreload = new Image();

      imgPreload.onload = function () {
        setTimeout(function () {
          $gallery.addClass('gallery-loaded');
        }, 0);
      };

      imgPreload.src = $img.attr('href');

      function refreshZoom() {
        if ($img.length) {
          // Only initialise zoom when device is not mobile and  original image is wider than container
          if (theme.viewport.isSm() && $gallery.width() < $gallery.data('full-image-width')) {
            if (!$img.hasClass('zoom-enabled')) {
              $img.zoom({
                url: $img.attr('href')
              }).addClass('zoom-enabled');
            }
          } else if ($img.hasClass('zoom-enabled')) {
            $img.trigger('zoom.destroy').removeClass('zoom-enabled');
          }
        } else {
          console.warn('CC: Unable for find image to init hover on zoom on');
        }
      }

      refreshZoom();
      $(window).on('debouncedresize', refreshZoom);
    });
    $(document).on('click', '#colorbox .close-box', function () {
      $.colorbox.close();
      return false;
    }).on('click', '#colorbox .action-icons .prev-item, #colorbox .action-icons .next-item', function () {
      $("#".concat($(this).data('idx'), " .quick-buy")).click();

      if (theme.activeQuickBuyMediaGallery) {
        theme.activeQuickBuyMediaGallery.destroy();
      }

      return false;
    }); /// Search in header - for visual effect

    $(document).on('focusin focusout', '.toolbar .main-search__form input', function (e) {
      $(this).closest('.main-search__form').toggleClass('focus', e.type == 'focusin');
    }); /// Page height assessment

    function setMinWrapperHeight() {
      // inner wrap contains the border
      $('#page-wrap-inner').css('min-height', $(window).height());
    }

    $(window).on('debouncedresize setminheight', setMinWrapperHeight).trigger('setminheight');
    $(function () {
      setMinWrapperHeight();
    }); /// Translations for colorbox

    $.extend($.colorbox.settings, {
      previous: theme.strings.colorBoxPrevious,
      next: theme.strings.colorBoxNext,
      close: theme.strings.colorBoxClose
    }); //Hide the footer on the challenge page

    if (document.querySelector('.shopify-challenge__container')) {
      document.getElementById('page-footer').style.display = 'none';
    }

    if (theme.device.isTouch()) {
      document.getElementsByTagName('html')[0].classList.add('touch');
    } // Update the cart when the back button is pressed


    window.addEventListener("pageshow", function (event) {
      if (event.persisted) {
        theme.updateCartSummaries(false, false, false);
      }
    }); /// Register all sections

    theme.Sections.init();
    theme.Sections.register('slideshow', theme.SlideshowSection);
    theme.Sections.register('header', theme.HeaderSection, {
      deferredLoad: false
    });
    theme.Sections.register('footer', theme.FooterSection);
    theme.Sections.register('cart-drawer', theme.CartDrawerSection, {
      deferredLoad: false
    });
    theme.Sections.register('collection-template', theme.CollectionTemplateSection, {
      deferredLoad: false
    });
    theme.Sections.register('product-template', theme.ProductTemplateSection);
    theme.Sections.register('blog-template', theme.BlogTemplateSection, {
      deferredLoad: false
    });
    theme.Sections.register('cart-template', theme.CartTemplateSection, {
      deferredLoad: false
    });
    theme.Sections.register('collection-listing', theme.CollectionListingSection, {
      deferredLoad: false
    });
    theme.Sections.register('featured-collection', theme.FeaturedCollectionSection);
    theme.Sections.register('featured-collections', theme.FeaturedCollectionsSection);
    theme.Sections.register('search-template', theme.SearchTemplateSection, {
      deferredLoad: false
    });
    theme.Sections.register('background-video', theme.VideoManager);
    theme.Sections.register('gallery', theme.GallerySection);
    theme.Sections.register('announcement-bar', theme.AnnouncementBarSection, {
      deferredLoad: false
    });
    theme.Sections.register('product-recommendations', theme.ProductRecommendations);
    theme.Sections.register('testimonials', theme.TestimonialsSection);
  }); //Register dynamically pulled in sections

  $(function ($) {
    if (cc.sections.length) {
      cc.sections.forEach(function (section) {
        try {
          theme.Sections.register(section.name, section.section);
        } catch (err) {
          console.error("Unable to register section ".concat(section.name, "."), err);
        }
      });
    } else {
      console.warn('Barry: No common sections have been registered.');
    }
  });
})(theme.jQuery);  
/* Built with Barry v1.0.7 */
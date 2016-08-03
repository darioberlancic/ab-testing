// ==UserScript==
// @name         Variant
// @namespace    https://www.domain.com
// @version      0.1
// @description  Ticket 320
// @author       Testing Agency: Dario Berlancic
// @match        http://www.berlancic.com/
// @grant        none
// ==/UserScript==
(function IIFE() {
  'use strict';

  //////////////////////////////////////////////
  // Document variables and loading events
  ////////////////////////////////////////
  var root = document.documentElement;
  var head = document.head;
  var body = document.body;

  window.addEventListener('load', function(e) {
    // Fetch jQuery and make it available
    var s = document.createElement('script');
    s.src = '//code.jquery.com/jquery-2.2.4.min.js';
    head.appendChild(s);

    ///////////////////////
    // Create new `Variant`
    //////////////////////
    var v = new Variant('#333', 'UI Variant', 'Testing Agency: Dario Berlancic');
    v.on();

  }, false);

  ////////////////////////////////////
  // Class: `Variant`
  ////////////////////
  function Variant(name, description, creator) {
    var self = this;
    ////////////////
    //
    ///////////////////////////
    // Properties
    ///////////////////////////
    self.name = name;
    self.description = description;
    self.creator = creator;
    self.createdAt = new Date();

    /////////////////////////////
    // Methods
    /////////////////////////////

    /////////////////////////////
    // Init
    ///////
    self.on = function on() { // Power on
      console.log('Variant: ' + self.name + ' initializing...');
      ///////////
      //
      self.injector.css(head);
      self.injector.html(body, 'div');
      self.parts = self.dom.query(_selectors());

      self.events.ael(self.parts.header[0], 'click', _handleClick);
    };

    self.off = function off() { // Power off
      // just drinking beer...
    }

    /////////////////////////////
    // Mighty DOM
    /////////////
    self.dom = {
      query: function query(obj) {
        var keys = Object.keys(obj);
        var parts = {};
        keys.map(function(key) {
          parts[key] = document.querySelectorAll(obj[key]);
        });
        return parts;
      }
    };
    /////////////////////////////
    // Events
    /////////
    self.events = {
      ael: function ael(host, type, handler) {
        host.addEventListener(type, handler, false);
      },
      rel: function rel(host, type, handler) {
        host.removeEventListener(type, handler, false);
      }
    };
    //////////////////////////////
    // Inject
    /////////
    self.injector = {
      html: function html(host, type, options) {
        if (!(arguments.length === 2 || arguments.length === 3)) {
          throw new Error('html(...): Invalid arguments');
        }

        // Element setup
        if (arguments.length === 2) {
          var e = document.createElement(type);
          e.innerHTML = _html();
          host.insertBefore(e, host.lastChild.nextSibling);
        }
        else {
          var e = document.createElement(type);

          // Prefix ids, classes ?
          if (options.prefix) {
            if (options.id) { e.id = options.prefix + options.id; }
            if (options.class) { e.className = options.prefix + options.class; }
          }
          else {
            if (options.id) { e.id = options.id; }
            if (options.class) { e.className = options.class; }
          }

          // Specify where to get markup
          if (options.fn) {
            e.innerHTML = options.fn();
          }
          // DEFAULT: _html
          else {
            e.innerHTML = _html();
          }

          // Prepend: has to be explicitly specified
          if (options.prepend) {
            host.insertBefore(e, host.firstChild);
          }
          // DEFAULT: Appending
          else {
            host.insertBefore(e, host.lastChild.nextSibling);
          }
        }
      },
      css: function css(host) {
        if (!(arguments.length === 1)) {
          throw new Error('css(...): Invalid arguments');
        }

        // Style setup
        var s = document.createElement('style');
        var t = document.createTextNode(_css());
        s.appendChild(t);
        host.appendChild(s);
      },
      js: function js(host, url) {
        if (!(arguments.length === 2)) {
          throw new Error('js(...): Invalid arguments');
        }

        // Script setup
        var s = document.createElement('script');
        s.src = url;
        host.appendChild(s);
      }
    };
    /////////////////////////////////////////////
    // Event handlers
    /////////////////
    function _handleClick(e) {
      e.preventDefault();
      //////////////////
      this.classList.toggle('wipe-out');
    }

    /////////////////////////////////////////////
    // Markup, styles, selectors etc.
    ////////////////////////////////
    function _html() {
      return '' +
      '<div class="markup"></div>' +
      '';
    }

    function _widget() {
      return '' +
      '<div id="widget"></div>' +
      '';
    }

    function _css() {
      return '' +
      '.class { display: block; }' +
      '.wipe-out { display: none; }' +
      '';
    }

    function _selectors() {
      return {
        header: '.b-dev-header',
        main: '.home',
        footer: '.b-dev-footer'
      };
    }

    /////////////////////////////////
    // Helpers
    //////////
    function _rarr(nodeList) {
      return Array.prototype.slice.call(nodeList);
    }

  }

  ////////////////////////////////////////////////////
  // All Variant instances can print basic info about
  // itself.
  ////////////////////////////////////////////////////
  Variant.prototype.printInfo = function printInfo() {
    var self = this;
    ////////////////
    //
    return {
      name: self.name,
      description: self.description,
      creator: self.creator,
      createdAt: self.createdAt
    };
  };

}());

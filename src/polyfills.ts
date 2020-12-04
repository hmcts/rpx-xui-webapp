/**
 * This file includes polyfills needed by Angular and is loaded before the app.
 * You can add your own extra polyfills to this file.
 *
 * This file is divided into 2 sections:
 *   1. Browser polyfills. These are applied before loading ZoneJS and are sorted by browsers.
 *   2. Application imports. Files imported after ZoneJS that should be loaded before your main
 *      file.
 *
 * The current setup is for so-called "evergreen" browsers; the last versions of browsers that
 * automatically update themselves. This includes Safari >= 10, Chrome >= 55 (including Opera),
 * Edge >= 13 on the desktop, and iOS 10 and Chrome on mobile.
 *
 * Learn more in https://angular.io/guide/browser-support
 */

/***************************************************************************************************
 * BROWSER POLYFILLS
 */

 /** IE9, IE10 and IE11 requires all of the following polyfills. */
 import 'core-js/es6/symbol';
 import 'core-js/es6/object';
 import 'core-js/es6/function';
 import 'core-js/es6/parse-int';
 import 'core-js/es6/parse-float';
 import 'core-js/es6/number';
 import 'core-js/es6/math';
 import 'core-js/es6/string';
 import 'core-js/es6/date';
 import 'core-js/es6/array';
 import 'core-js/es6/regexp';
 import 'core-js/es6/map';
 import 'core-js/es6/weak-map';
 import 'core-js/es6/set';
 import 'core-js/es6/promise';
 import 'core-js/fn/promise/finally';
 import 'core-js/es7/object';
 import 'core-js/es7/array';

 /** IE10 and IE11 requires the following for NgClass support on SVG elements */
 import 'classlist.js';  // Run `npm install --save classlist.js`.

 /* Evergreen browsers require these. **/
 import 'core-js/es6/reflect';
 import 'core-js/es7/reflect';

 /**
  * Web Animations `@angular/platform-browser/animations`
  * Only required if AnimationBuilder is used within the application and using IE/Edge or Safari.
  * Standard animation support in Angular DOES NOT require any polyfills (as of Angular 6.0).
  * IE10 and IE11 requires the following to support `@angular/animation`.
  */
 import 'web-animations-js';  // Run `npm install --save web-animations-js`.

 /* IE9, IE10 and IE11 require all of the following polyfills. **/
 import 'isomorphic-fetch';  // Run `yarn add isomorphic-fetch`.

 /**
  * By default, zone.js will patch all possible macroTask and DomEvents
  * user can disable parts of macroTask/DomEvents patch by setting following flags
  * because those flags need to be set before `zone.js` being loaded, and webpack
  * will put import in the top of bundle, so user need to create a separate file
  * in this directory (for example: zone-flags.ts), and put the following flags
  * into that file, and then add the following code before importing zone.js.
  * import './zone-flags.ts';
  *
  * The flags allowed in zone-flags.ts are listed here.
  *
  * The following flags will work for all browsers.
  *
  * (window as any).__Zone_disable_requestAnimationFrame = true; // disable patch requestAnimationFrame
  * (window as any).__Zone_disable_on_property = true; // disable patch onProperty such as onclick
  * (window as any).__zone_symbol__BLACK_LISTED_EVENTS = ['scroll', 'mousemove']; // disable patch specified eventNames
  *
  *  in IE/Edge developer tools, the addEventListener will also be wrapped by zone.js
  *  with the following flag, it will bypass `zone.js` patch for IE/Edge
  *
  *  (window as any).__Zone_enable_cross_context_check = true;
  *
  */

 /***************************************************************************************************
  * Zone JS is required by default for Angular itself.
  */
 if (document['documentMode'] || /Edge/.test(navigator.userAgent)) {
  (window as any).__Zone_enable_cross_context_check = true;
 }
 import 'zone.js/dist/zone';  // Included with Angular CLI.
 import 'zone.js/dist/zone-error';

 if (!Element.prototype.matches) {
  Element.prototype.matches = (Element.prototype as any).msMatchesSelector || Element.prototype.webkitMatchesSelector;
 }

 if (!Object.getOwnPropertyDescriptor(Element.prototype,'classList')){
  if (HTMLElement&&Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList')){
      Object.defineProperty(Element.prototype,'classList',Object.getOwnPropertyDescriptor(HTMLElement.prototype,'classList'));
  }
}

Object.defineProperty(Element.prototype, 'classList', {
    get: function() {
        var self = this, bValue = self.className.split(" ")

        bValue.add = function (){
            var b;
            for(i in arguments){
                b = true;
                for (var j = 0; j<bValue.length;j++)
                    if (bValue[j] == arguments[i]){
                        b = false
                        break
                    }
                if(b)
                    self.className += (self.className?" ":"")+arguments[i]
            }
        }
        bValue.remove = function(){
            self.className = ""
            for(i in arguments)
                for (var j = 0; j<bValue.length;j++)
                    if(bValue[j] != arguments[i])
                        self.className += (self.className?" " :"")+bValue[j]
        }
        bValue.toggle = function(x){
            var b;
            if(x){
                self.className = ""
                b = false;
                for (var j = 0; j<bValue.length;j++)
                    if(bValue[j] != x){
                        self.className += (self.className?" " :"")+bValue[j]
                        b = false
                    } else b = true
                if(!b)
                    self.className += (self.className?" ":"")+x
            } else throw new TypeError("Failed to execute 'toggle': 1 argument required")
            return !b;
        }

        return bValue; 
    },
    enumerable: false
})
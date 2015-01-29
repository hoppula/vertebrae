//     Vertebrae.js 1.1.2

//     (c) 2015 Lari Hoppula
//     (c) 2010-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

var _ = require('underscore');
var Events = require('./events');
var History = require('./history');

module.exports = function(root, $) {

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  var Backbone = {};

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  Backbone.sync = require('./sync')(Backbone);

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... this will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  var Model = require('./model')(Backbone);
  var Collection = require('./collection')(Backbone, Model);
  var View = require('./view')(Backbone);
  var Router = require('./router')(Backbone);

  // extend Backbone with Events module
  _.extend(Backbone, Events);

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.2';

  // Create the default Backbone.history.
  Backbone.history = new History;

  Backbone.Collection = Collection;
  Backbone.Events = Events;
  Backbone.History = History;
  Backbone.Model = Model;
  Backbone.Router = Router;
  Backbone.View = View;

  return Backbone;
};
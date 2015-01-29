# Vertebrae

Vertebrae is [Backbone](http://backbonejs.org/) splitted into CommonJS modules. This modular approach is particularly useful when building isomorphic apps, where you only need certain parts of Backbone, e.g. you want React to handle the View handling but still need Backbone's collections, models & events.

Vertebrae borrows certain stuff from [Exoskeleton](http://exosjs.com/), e.g. **utils.js**, which is a collection of methods to replace underscore.

Vertebrae fully passes the Backbone test suite.

There are other Backbone related projects that are named Vertebrae, but they haven't been active in a while, so I decided to use this name as it's really descriptive (as Backbone consists of individual bones called vertebrae :)

## Installation

    npm install vertebrae

## Optional underscore / lodash

Just like with Exoskeleton, underscore / lodash is 100% optional with Vertebrae.

## Differences to Backbone

In no-underscore / lodash environment, there are no underscore-inspired Collection methods (each, pluck etc.), but there are ES5-inspired methods:

    forEach, map, filter, some, every, reduce, reduceRight, indexOf, lastIndexOf

Also, no underscore-inspired Model methods at all.


## Including whole Backbone (in browser environment)

Constructor accepts root scope, underscore implementation and jQuery implementation.
Underscore is 100% optional but jQuery (or a suitable replacement) is needed for Backbone.ajax and Backbone.View.

  var Vertebrae = require('vertebrae');
  var _ = require('underscore');
  var $ = require('jquery');
  var Backbone = Vertebrae(window, _, $);

Root option is only required for **Backbone.noConflict()**, so if you don't need that, you can just do:

  var Vertebrae = require('vertebrae');
  var $ = require('jquery');
  var Backbone = Vertebrae({}, null, $);


## Individual requires

You might want to include only certain parts of Backbone in your [Browserify](http://browserify.org/) builds, this is easy with Vertebrae.

### Collection

Due to Backbone architecture, Collection needs a Sync adapter when using the standalone module. No default adapter is **require**d to keep the build size small. Here's how you can use the provided [Axios](https://github.com/mzabriskie/axios) adapter, which is a great match for isomorphic applications. You also need to pass the default model as second parameter.

    var ajax = require('vertebrae/adapters/axios');
    var Sync = require('vertebrae/sync')({ajax: ajax});
    var Model = require('vertebrae/model')({sync: Sync});
    var Collection = require('vertebrae/collection')({sync: Sync}, Model);

### Model

Collection notes also apply to model.

    var ajax = require('vertebrae/adapters/axios');
    var Sync = require('vertebrae/sync')({ajax: ajax});
    var Model = require('vertebrae/model')({sync: Sync});

### View

View requires jQuery.

  var $ = require('jquery');
  var View = require('vertebrae/view')({$: $});

### Router

Router takes **History** instance as option, but will initiate new instance if not included.

  var History = require('vertebrae/history');
  var Router = require('vertebrae/router')({history: new History});

or

  var Router = require('vertebrae/router')();

### Events

  var Events = require('vertebrae/events');

## Development

Builds (**backbone.js**, **backbone.min.js**) use browserify's standalone parameter, so they will generate UMD bundle.

Build:

    npm run build

Build minified:

    npm run build_min

Running test suite:

    npm run test

## License
MIT, see LICENSE for additional information.

Copyright (c) 2015 Lari Hoppula, [SC5 Online](http://sc5.io)
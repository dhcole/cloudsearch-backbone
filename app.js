// Shared resources
global.App = require('backbone');
global._ = require('underscore');
App.$ = $;

// Views
App.Views = {
  Search: require('./app/views/Search'),
  Results: require('./app/views/Results'),
  Facet: require('./app/views/Facet'),
  Pager: require('./app/views/Pager')
};

// Models
App.Models = {
  Search: require('./app/models/Search')
};

// Router
App.Router = require('./app/Router');

$(function() {

  var $search = $('[data-search="Search"]');

  App.search = new App.Models.Search({
    'urlRoot': $search.attr('data-endpoint'),
    'return': $search.attr('data-return')
  }, {
    container: this
  });

  // Start router
  App.router = new App.Router({ model: App.search });
  App.history.start({
    pushState: true,
    hashChange: false,
    root: $search.attr('data-path') || ''
  });

});

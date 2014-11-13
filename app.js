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

$(function() {

  $('[data-search="Search"]').each(function() {
    App.search = new App.Models.Search({
      'urlRoot': $(this).attr('data-endpoint'),
      'return': $(this).attr('data-return')
    }, {
      container: this
    });
  });

});


/* Router: reads query string, sets model attributes

  parse: function(res) {
    var model = this,
        out = {},
        urlParts = this.url().split('?')[1].split('&');

    out.facets = res.facets;
    out.results = res.hits.hit;
    out.found = res.hits.found;

    _(urlParts).forEach(function(part) {
      var split = part.split('='),
          param = split[0],
          value = split[1],
          match = _(model.get('params')).find(function(p) {
            return (p.param === param);
          }),
          key = (match) ? match.attr : param;

      out[key] = decodeURIComponent(value);
    });

    return out;
  },




*/
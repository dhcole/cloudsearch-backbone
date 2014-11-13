module.exports = App.Model.extend({

  defaults: {
    query: 'matchall',
    parser: 'structured',
    size: 20,
    partial: false,
    highlights: {},
    expressions: {},
    facets: {}, // Facet results
    getFacets: {}, // URL param facets
    filters: [],
    params: [
      { attr: 'query', param: 'q' },
      { attr: 'parser', param: 'q.parser' },
      { attr: 'options', param: 'q.options' },
      'cursor',
      'partial',
      'return',
      'size',
      'sort',
      'start'
    ]
  },

  url: function(base) {
    var parts = [],
        base = base || this.get('urlRoot'),
        model = this,
        params = _(this.get('params')).clone(),
        filters = [];

    // Facets
    _(model.get('getFacets')).forEach(function(settings, id) {
      params.push({ attr: 'facet.' + id, value: settings });
    });

    // Filters
    if (model.get('filters').length) {

      filters = _(model.get('filters')).map(function(filter) {
        return filter.id + ': ' + JSON.stringify(filter.bucket).replace(/"/g, "'");
      });

      params.push({
        param: 'fq', 
        value: '(and ' + filters.join(' ') + ')'
      });
    }

    // Highlights
    _(model.get('highlights')).forEach(function(settings, id) {
      params.push({ attr: 'highlight.' + id, value: settings });
    });

    // Expressions
    _(model.get('expressions')).forEach(function(settings, id) {
      params.push({ attr: 'expr.' + id, value: settings });
    });

    // Format url request parameters
    _(params).forEach(function(param) {
      var attr = param.attr || param,
          value = param.value || model.get(attr),
          param = param.param || param.attr || param;

      if (value !== undefined && 
          value !== null &&
          value !== '') parts.push(param + '=' + encodeURIComponent(value));
    });

    return base + '?' + parts.join('&');

  },

  parse: function(res) {
    return {
      facets: res.facets,
      results: res.hits.hit,
      found: res.hits.found
    };
  },

  initialize: function(attributes, options) {
    this.view = new App.Views.Search({
      el: options.container,
      model: this
    });

    this.on('change', this.load, this);
    this.load();

  },

  load: function(model, options) {
    this.fetch({
      silent: true,
      success: function(model, res, options) {
        model.view.render();
      }
    });
  }

});

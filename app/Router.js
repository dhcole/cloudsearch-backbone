module.exports = App.Router.extend({

  initialize: function(options) {
    this.model = options.model;
  },

  routes: { '*path': 'all' },

  all: function(path, qs) {
    if (!qs) {
      this.model.load();
      return;
    }

    var model = this.model,
        attributes = {},
        urlParts = qs.split('&'),
        fq = '';

    _(urlParts).forEach(function(part) {
      var split = part.split('='),
          param = split[0],
          value = split[1],
          match = _(model.get('params')).find(function(p) {
            return (p.param === param);
          }),
          key = (match) ? match.attr : param;

      if (_(model.get('params')).indexOf(key) >= 0) {
        attributes[key] = urlClean(value);
      }
      if (key === 'parser') attributes[key] = urlClean(value);
      if (key === 'query') attributes[key] = urlClean(value);
      if (key === 'fq') fq = urlClean(value);
    });

    // Parse filters
    if (fq) attributes.filters = parseFilters(fq);

    // Remove structured parser for normal text searches
    if (!attributes.parser) attributes.parser = undefined;

    // Set attributes and request data without updating url
    model.set(attributes, { silent: true }).load();

    function urlClean(value) {
      return decodeURIComponent(value.replace(/\+/g, ' '));
    }

    function parseFilters(fq) {
      var filters = [];
      var sets = fq.match(/\s\((.*)\)\)/)[1].split(') (');
      _(sets).forEach(function(set) {
        var pairs = set.match(/\s(.*?\w)'/g);
        _(pairs).forEach(function(pair) {
          var parts = pair.match(/\s(.*?):\s'(.*?)'/);
          filters.push({
            id: parts[1],
            bucket: parts[2]
          });
        });
      });
      return filters;
    } 
  }

});

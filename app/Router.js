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
    if (fq) {
      fq = fq.match(/\s\(.+?\)/g).map(function(part) {
        var matches = part.match(/\w\s(.+?):\s'(.+?)'/);
        return { id: matches[1], bucket: matches[2] };
      });
      attributes.filters = fq;
    }

    // Remove structured parser for normal text searches
    if (!attributes.parser) attributes.parser = undefined;

    // Set attributes and request data without updating url
    model.set(attributes, { silent: true }).load();

    function urlClean(value) {
      return decodeURIComponent(value.replace(/\+/g, ' '));
    }
  }

});

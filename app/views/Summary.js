module.exports = App.View.extend({

  template: require('../templates/Summary.html'),

  initialize: function() {
  },

  events: {
    'click .search-filter': 'removeFilter'
  },

  render: function() {
    var start = +this.model.get('start'),
        page = start + +this.model.get('size'),
        count = +this.model.get('found'),
        data = {
          filters: this.model.get('filters'),
          query: this.model.get('query'),
          x: start + 1,
          y: Math.min(page, count),
          count: count
        };
    this.$el.html(this.template(data));
    return this;
  },

  removeFilter: function(e) {
    var id = this.$(e.currentTarget).attr('data-facet'),
        bucket = this.$(e.currentTarget).attr('data-bucket'),
        filter = { id: id, bucket: bucket },
        filters = _(this.model.get('filters')).clone(),
        matches = _(filters).findWhere(filter);

    filters = _(filters).reject(function(f) {
      return (filter.id === f.id && filter.bucket === f.bucket);
    });
    this.model.set({ filters: filters, start: 0 });

    return false;
  }


});

module.exports = App.View.extend({

  template: ($('#template-facet').html()) ?
    _.template($('#template-facet').html()) :
    require('../templates/Facet.html'),

  initialize: function(options) {
    this.label = options.label || this.id;
  },

  events: {
    'click .search-bucket': 'filter'
  },

  render: function() {
    var id = this.id,
        data = this.model.get('facets')[id],
        filters = this.model.get('filters');

    data.label = this.label;

    _(data.buckets).forEach(function(bucket) {
      var match = _(filters).findWhere({ id: id, bucket: bucket.value });
      if (match) bucket.state = 'active';
    });

    this.$el.html(this.template(data));

    return this;
  },

  filter: function(e) {
    var bucket = this.$(e.currentTarget).attr('data-bucket'),
        filter = { id: this.id, bucket: bucket },
        filters = _(this.model.get('filters')).clone(),
        matches = _(filters).findWhere(filter);

    if (matches) {
      filters = _(filters).reject(function(f) {
        return (filter.id === f.id && filter.bucket === f.bucket);
      });
    } else {
      filters.push(filter);
    }
    this.model.set({ filters: filters, start: 0 });

    return false;
  }

});

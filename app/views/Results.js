module.exports = App.View.extend({

  template: require('../templates/Results.html'),
  emptyTemplate: require('../templates/NoResults.html'),

  initialize: function(options) {
    this.link = options.link;
    this.meta = options.meta.split(',');
  },

  events: {
  },

  render: function() {
    var view = this,
        results = this.model.get('results');

    view.$el.empty();

    if (results.length) {

      _(results).forEach(function(item) {
        var data = item.fields;
        data.id = item.id;
        data.link = _(view.link).template({ interpolate: /\{\{(.+?)\}\}/g })(data);
        data.meta = {};

        _(view.meta).forEach(function(m) {
          data.meta[m] = { label: m, value: data[m] };
        });

        view.$el.append(view.template(data));
      });

    } else {
      view.$el.html(view.emptyTemplate());
    }

    return this;
  },

});

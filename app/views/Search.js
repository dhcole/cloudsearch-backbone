module.exports = App.View.extend({

  initialize: function() {
    var model = this.model,
        view = this;
    this.views = [];

    // Load search field
    this.$('[data-search="SearchField"]').each(function() {
      view.views.push(new App.Views.SearchField({ 
        el: this,
        model: model
      }));
    });

    // Load facets
    this.$('[data-search="Facet"]').each(function() {
      var id = $(this).attr('data-facet'),
          label = $(this).attr('data-label'),
          settings = $(this).attr('data-settings') || '{}';
      model.get('getFacets')[id] = settings;

      view.views.push(new App.Views.Facet({
        model: model,
        label: label,
        el: this,
        id: id
      }));
    });

    // Load pagers
    this.$('[data-search="Pager"]').each(function() {
      view.views.push(new App.Views.Pager({ 
        el: this,
        model: model
      }));
    });

    // Load results
    this.$('[data-search="Results"]').each(function() {
      view.views.push(new App.Views.Results({ 
        el: this,
        model: model,
        link: $(this).attr('data-link'),
        meta: $(this).attr('data-meta')
      }));
    });

  },

  events: {
  },

  render: function() {

    _(this.views).forEach(function(view) {
      view.render();
    });

    return this;
  }

});

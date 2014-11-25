module.exports = App.View.extend({

  template: ($('#template-search-field').html()) ?
    _.template($('#template-search-field').html()) :
    require('../templates/SearchField.html'),

  initialize: function() {
  },

  events: {
    'submit form': 'submit'
  },

  render: function() {
    var query = this.model.get('query');
    if (this.model.get('parser') && query === 'matchall') query = '';
    this.$el.html(this.template({ query: query }));

    return this;
  },

  submit: function(e) {
    var query = this.$('input[type="search"]').val();
    this.model.set({
      parser: undefined,
      query: query, 
      start: 0
    });

    return false;
  }

});

module.exports = App.View.extend({

  template: ($('#template-template').html()) ?
    _.template($('#template-template').html()) :
    require('../templates/Template.html'),

  initialize: function() {
  },

  events: {
  },

  render: function() {
    this.$el.html(this.template(data));
    return this;
  }

});

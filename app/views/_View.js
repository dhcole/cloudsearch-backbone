module.exports = App.View.extend({

  template: require('../templates/Template.html'),

  initialize: function() {
  },

  events: {
  },

  render: function() {
    this.$el.html(this.template(data));
    return this;
  }

});

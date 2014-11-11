// Libraries
var _ = require('underscore'),
    Backbone = require('backbone');

module.exports = Backbone.View.extend({

  template: require('../templates/Facet.html'),

  initialize: function() {
  },

  events: {
  },

  render: function() {
    this.$el.html(this.template(this.model));
  }

});

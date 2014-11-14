module.exports = App.View.extend({

  template: require('../templates/Settings.html'),

  initialize: function() {
  },

  events: {
    'change .size': 'size',
    'change .sort': 'sort'
  },

  render: function() {
    var data = {
      count: this.model.get('found')
    };
    this.$el.html(this.template(data));
    this.$('.size').val(this.model.get('size'));
    this.$('.sort').val(this.model.get('sort'));
    return this;
  },

  size: function(e) {
    var size = this.$(e.currentTarget).val();
    this.model.set({ size: size });
    return false;
  },

  sort: function(e) {
    var sort = this.$(e.currentTarget).val();
    this.model.set({ sort: sort, start: 0 });
    return false;
  }


});

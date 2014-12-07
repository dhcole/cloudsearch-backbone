// Libraries
require('../../lib/jquery.SimplePagination.js');

module.exports = App.View.extend({

  initialize: function() {
  },

  events: {
  },

  render: function() {
    this.$el.html('<ul></ul>');
    this.$('ul').pagination({
      items:  this.model.get('found'),
      itemsOnPage: this.model.get('size'),
      currentPage: Math.floor(this.model.get('start') / this.model.get('size')) + 1,
      displayedPages: 5,
      cssStyle: 'pagination',
      prevText: 'Previous',
      nextText: 'Next',
      onPageClick: _(this.loadPage).bind(this)
    });

    return this;
  },

  loadPage: function(pageNumber, event) {
    window.scrollTo(0, 0);
    this.model.set('start', this.model.get('size') * pageNumber - this.model.get('size'));
    return false;
  }

});

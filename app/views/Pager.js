// Libraries
require('../../lib/jquery.SimplePagination.js');

module.exports = App.View.extend({

  initialize: function() {
  },

  events: {
  },

  render: function() {

    this.$el.pagination({
      items:  360, // this.collection.length,
      itemsOnPage: 10, // this.model.get('itemsOnPage'),
      currentPage: 1, // this.model.get('page'),
      displayedPages: 5,
      cssStyle: 'pagination',
      prevText: '&#10094;',
      nextText: '&#10095;',
      onPageClick: this.loadPage
    });

    return this;
  },

  loadPage: function(pageNumber, event) {
    return false;
  }

});

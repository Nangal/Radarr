var Backbone = require('backbone');
var RenamePreviewModel = require('./RenamePreviewModel');

module.exports = Backbone.Collection.extend({
  url: '/rename',
  model: RenamePreviewModel,

  originalFetch: Backbone.Collection.prototype.fetch,

  initialize(options) {
    if (!options.seriesId) {
      throw 'seriesId is required';
    }

    this.seriesId = options.seriesId;
    this.seasonNumber = options.seasonNumber;
  },

  fetch(options) {
    if (!this.seriesId) {
      throw 'seriesId is required';
    }

    options = options || {};
    options.data = {};
    options.data.seriesId = this.seriesId;

    if (this.seasonNumber !== undefined) {
      options.data.seasonNumber = this.seasonNumber;
    }

    return this.originalFetch.call(this, options);
  }
});
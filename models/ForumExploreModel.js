var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    profpic: {
        type: Number,
    },
    repliedAt: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String
    }
});

var detailsSchema = new mongoose.Schema({
    location: {
      type: String
    },
    loot: {
      type: String
    },
    level: {
      type: Number
    }
});

var ForumExploreSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    // causes DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
    postID: {
        type: mongoose.Schema.Types.ObjectId,
        default: mongoose.Types.ObjectId,
        index: { unique: true }
    },
    profpic: {
        type: Number,
        required: false
    },
    postedAt: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    content: detailsSchema,
    rating: {
        type: Number
    },
    comments: [commentSchema]
});

module.exports = mongoose.model('ForumExplore', ForumExploreSchema);

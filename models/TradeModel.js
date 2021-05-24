var mongoose = require('mongoose');
var offerSchema = new mongoose.Schema({
    username: {
        type: String,
    },
    item: {
        type: String,
    },
    offerName: {
        type: String,
    },
    offerType: {
        type: Number,
    },
    offerIndex: {
        type: Number
    }
});
var TradeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
        required: false
    },
    itemType: {
        type: Number,
        required: false
    },
    itemIndex: {
        type: Number,
        required: false
    },
    tradeOffers: [offerSchema]
});


module.exports = mongoose.model('Trade', TradeSchema);

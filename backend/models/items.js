const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    itemName:{type: String, required: true},
    quantity:{ type: Number, min: 1, default: 1 },
    description:{ type: String},
    date_time_seen_at:{type: Date, default: Date.now},
    found_at:{type: String},
    placed_at:{type: String},
    photos:{type: [String], default: []}
});

module.exports = mongoose.model('Item', itemSchema);
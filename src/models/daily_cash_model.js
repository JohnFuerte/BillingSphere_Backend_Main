const mongoose = require("mongoose");

const DailyCashSchema = new mongoose.Schema({
    date: {
        type: String,
        required: [true, " provide a date for this daily cash entry."],
    },
    description: {
        type: String,
        required: [false, "provide a description for this daily cash entry."]
    },
    cashier: {
        type: String,
        required: [true, "provide a cashier for this daily cash entry."]
    },
    twoThousand: [
        {
            qty: {
                type: Number,
                required: [false, "provide a qty of 2000 for this daily cash entry."]
            },
            total: {
                type: Number,
                required: [false, "provide a total of 2000 for this daily cash entry."]
            },
        },
    ],
    fiveHundred: [
        {
            qty: {
                type: Number,
                required: [false, "provide a qty of 500 for this daily cash entry."]
            },
            total: {
                type: Number,
                required: [false, "provide a total of 500 for this daily cash entry."]
            },
        },
    ],
    twoHundred: [
        {
            qty: {
                type: Number,
                required: [false, "provide a qty of 200 for this daily cash entry."]
            },
            total: {
                type: Number,
                required: [false, "provide a total of 200 for this daily cash entry."]
            },
        },
    ],
    oneHundred: [
        {
            qty: {
                type: Number,
                required: [false, "provide a qty of 100 for this daily cash entry."]
            },
            total: {
                type: Number,
                required: [false, "provide a total of 100 for this daily cash entry."]
            },
        },
    ],
    fifty: [
        {
            qty: {
                type: Number,
                required: [false, "provide a qty of 50 for this daily cash entry."]
            },
            total: {
                type: Number,
                required: [false, "provide a total of 50 for this daily cash entry."]
            },
        },
    ],
    twenty: [
        {
            qty: {
                type: Number,
                required: [false, "provide a qty of 20 for this daily cash entry."]
            },
            total: {
                type: Number,
                required: [false, "provide a total of 20 for this daily cash entry."]
            },
        },
    ],
    ten: [
        {
            qty: {
                type: Number,
                required: [false, "provide a qty of 10 for this daily cash entry."]
            },
            total: {
                type: Number,
                required: [false, "provide a total of 10 for this daily cash entry."]
            },
        },
    ],
    coins: [
        {
            qty: {
                type: Number,
                required: [false, "provide a qty of coins for this daily cash entry."]
            },
            total: {
                type: Number,
                required: [false, "provide a total of coins for this daily cash entry."]
            },
        },
    ],
    actualcash: {
        type: Number,
        required: [true, "provide a actualcash for this daily cash entry."]
    },
    systemcash: {
        type: Number,
        required: [false, "provide a actualcash for this daily cash entry."]
    },
    excesscash: {
        type: Number,
        required: [true, "provide a actualcash for this daily cash entry."]
    },
});

module.exports = mongoose.model("DailyCashEntry", DailyCashSchema);
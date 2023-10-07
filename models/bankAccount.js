const mongoose = require('mongoose');
// const autoIncrement = require('mongoose-plugin-autoinc');

const bankAccountSchema = new mongoose.Schema({
    accountNumber: {
        type: String,
        unique: true,
        required: true

    },
    accountHolder: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
);
// bankAccountSchema.plugin(autoIncrement.plugin, {
//     model: 'BankAccount',
//     field: 'accountNumber',
//     startAt: 1,
//     incrementBy: 1,
// })
module.exports = mongoose.model('BankAccount', bankAccountSchema);


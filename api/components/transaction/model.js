import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const transactionSchema = new Schema({

    accountId: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: [true, 'is required']
    },

    value: {
        type: Number,
        required: [true, 'is required']
    },

    dateOfTransaction: {
        type: Date,
        default: Date.now()
    }

}, { timestamp: true });

transactionSchema.plugin(uniqueValidator, {message: 'is already being used'});

module.exports = model('Transaction', transactionSchema);
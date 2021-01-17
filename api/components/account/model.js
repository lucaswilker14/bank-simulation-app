import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const accountSchema = new Schema({

    personId: {
        type: Schema.Types.ObjectId,
        ref: 'Person',
        required: [true, 'is required']
    },

    balance: {
        type: Number,
        required: true
    },

    limitWithdrawDaily: {
        type: Number,
        required: true
    },

    active: {
        type: Boolean,
        default: true
    },

    accountType: {
        type: Number,
        required: true
    },

    creationDate: {
        type: Date,
        default: Date.now()
    }
}, { timestamp: true });

accountSchema.plugin(uniqueValidator, {message: 'is already being used'});

module.exports = model('Account', accountSchema);
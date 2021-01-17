import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const personSchema = new Schema({

    name: {
        type: String,
        required: [true, 'is required']
    },

    CPF: {
        type: String,
        required: [true, 'is required']
    },

    dateOfBirth: {
        type: Date,
        required: [true, 'is required']
    },

}, { timestamp: true });

personSchema.plugin(uniqueValidator, {message: 'is already being used'});

module.exports = model('Person', personSchema);
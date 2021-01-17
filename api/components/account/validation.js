import Joi from 'joi';

const required_number   = Joi.number().required();
const required_id       = Joi.string().id().length(24).required();

const createAccount = Joi.object({
    personId:           required_id,
    balance:            required_number,
    limitWithdrawDaily: required_number,
    accountType:        required_number
});

const makeTransaction = {
    params: Joi.object({ id: required_id }),
    body: Joi.object({ value: required_number })
};

const accountId = Joi.object({
   id: required_id
});



module.exports = { createAccount, makeTransaction, accountId };
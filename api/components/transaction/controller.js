import { model } from 'mongoose';
const transactionModel = model('Transaction');
const accountModel = model('Account')

class TransactionController {

    async makeDeposit(req, res, next) {
        try {
            const { accountId, value } = req.body;
            const account = await accountModel.findOne( { _id: accountId });
            if(!account) return res.send({ message: 'It is not possible to make the deposit. ' +
                    'Check that the account is valid'}).status('404');
            account.balance = account.balance + parseInt(value);
            await account.save();
            return res.send({ message: 'Deposit successful'}).status('200');
        } catch (e) {
            next(e)
        }
    }
}

module.exports = TransactionController;
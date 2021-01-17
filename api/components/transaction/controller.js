import { model } from 'mongoose';
const transactionModel = model('Transaction');
const accountModel = model('Account')

class TransactionController {

    async makeDeposit(accountId, value, res, next) {
        try {
            const account = await accountModel.findOne( { _id: accountId });

            if (!account.active) return res.send({ message: 'It is not possible to make the deposit. ' +
                    'Account is not active'}).status('401');

            if(!account) return res.send({ message: 'It is not possible to make the deposit. ' +
                    'Check that the account is valid'}).status('404');

            if (value <= 0) return res.send({ message: 'It is not possible to make the deposit. ' +
                    'Invalid value to deposit'}).status('401');

            account.balance = account.balance + parseFloat(value);
            await account.save();

            const new_transaction = new transactionModel({accountId, value, typeTransaction: 'DEPOSIT'});
            new_transaction.amount = account.balance;
            await new_transaction.save();

            return res.send({ message: 'Deposit successful'}).status('200');
        } catch (e) {
            next(e)
        }
    }

    async makeWithdraw(accountId, value, res, next) {
        try {
            const account = await accountModel.findOne( { _id: accountId });

            if (!account.active) return res.send({ message: 'It is not possible to make the deposit. ' +
                    'Account is not active'}).status('401');

            if(!account) return res.send({ message: 'It is not possible to make the withdraw. ' +
                    'Check that the account is valid'}).status('404');

            if (value <= 0) return res.send({ message: 'It is not possible to make the withdraw. ' +
                    'Invalid value'}).status('401');

            if (value > account.limitWithdrawDaily) return res.send({ message: 'It is not possible to make the withdraw. ' +
                    'Withdrawal limit exceeded' }).status('401');

            if (value > account.balance) return res.send({ message: 'It is not possible to make the withdraw. ' +
                    'Insufficient balance' }).status('401');

            account.balance = account.balance - parseFloat(value);
            account.limitWithdrawDaily = account.limitWithdrawDaily - parseFloat(value);
            await account.save();

            const new_transaction = new transactionModel({accountId, value, typeTransaction: 'WITHDRAW'});
            new_transaction.amount = account.balance;
            await new_transaction.save();

            return res.send({ message: 'Withdraw successful'}).status('200');
        } catch (e) {
            next(e)
        }
    }
}

module.exports = TransactionController;
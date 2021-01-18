import { model } from 'mongoose';
const transactionModel = model('Transaction');
const accountModel = model('Account')

class TransactionController {

    async makeDeposit(accountId, value, res, next) {
        try {
            const account = await accountModel.findOne( { _id: accountId });

            if(!account) return res.status('404').send({ message: 'It is not possible to make the deposit. ' +
                    'Check that the account is valid'});

            if (!account.active) return res.status('403').send({ message: 'It is not possible to make the deposit. ' +
                    'Account is not active'});

            if (value <= 0) return res.status('403').send({ message: 'It is not possible to make the deposit. ' +
                    'Invalid value to deposit'});

            account.balance = account.balance + parseFloat(value);
            await account.save();

            const new_transaction = new transactionModel({accountId, value, typeTransaction: 'DEPOSIT'});
            new_transaction.amount = account.balance;
            await new_transaction.save();

            return res.status('200').send({ message: 'Deposit successful'});
        } catch (e) {
            next(e)
        }
    }

    async makeWithdraw(accountId, value, res, next) {
        try {
            const account = await accountModel.findOne( { _id: accountId });

            if(!account) return res.status('404').send({ message: 'It is not possible to make the withdraw. ' +
                    'Check that the account is valid'});

            if (!account.active) return res.status('403').send({ message: 'It is not possible to make the deposit. ' +
                    'Account is not active'});

            if (value <= 0) return res.status('401').send({ message: 'It is not possible to make the withdraw. ' +
                    'Invalid value'});

            if (value > account.limitWithdrawDaily) return res.status('403').send(
                { message: 'It is not possible to make the withdraw. Withdrawal limit exceeded' }
                );

            if (value > account.balance) return res.status('403').send(
                { message: 'It is not possible to make the withdraw. Insufficient balance' });

            account.balance = account.balance - parseFloat(value);
            account.limitWithdrawDaily = account.limitWithdrawDaily - parseFloat(value);
            await account.save();

            const new_transaction = new transactionModel({accountId, value, typeTransaction: 'WITHDRAW'});
            new_transaction.amount = account.balance;
            await new_transaction.save();

            return res.status('200').send({ message: 'Withdraw successful'});
        } catch (e) {
            next(e)
        }
    }
}

module.exports = TransactionController;
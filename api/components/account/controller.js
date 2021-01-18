import { model } from 'mongoose'
import TransactionController from '../transaction/controller'

const accountModel = model('Account')
const transactionModel = model('Transaction');

const transactionController = new TransactionController();

class AccountController {

    async index(req, res, next) {
        try {
            const accounts = await accountModel.find();
            return res.send({ accounts: accounts });
        } catch (e) {
            next(e)
        }
    };

    async createAccount(req, res, next) {
        try {
            const { personId, balance, limitWithdrawDaily, accountType } = req.body;
            const new_account = new accountModel({ personId, balance, limitWithdrawDaily, accountType });
            await new_account.save();
            return res.send({ message: 'Account successfully created', account: new_account}).status('201');
        } catch (e) {
            next(e)
        }
    };

    async makeDeposit(req, res, next) {
        try {
            const accountId = req.params.id;
            const { value } = req.body;
            return await transactionController.makeDeposit(accountId, value, res, next);
        } catch (e) {
            next(e)
        }
    };

    async getBalance(req, res, next) {
        try {
            const accountId = req.params.id;
            const account = await accountModel.findOne({_id: accountId});

            if (!account) return res.send({ message: 'It is not possible to make the deposit. ' +
                    'Check that the account is valid'}).status('404');

            return res.send({ Balance: 'US$ ' + account.balance.toFixed(2) });
        } catch (e) {
            next(e)
        }
    };

    async makeWithdraw(req, res, next) {
        try {
            const accountId = req.params.id;
            const { value } = req.body;
            return await transactionController.makeWithdraw(accountId, value, res, next);
        } catch (e) {
            next(e)
        }
    };

    async blockAccount(req, res, next) {
        try {
            const accountId = req.params.id;
            const account = await accountModel.findOne({_id: accountId});

            if (!account) return res.send({ message: 'It is not possible to make the deposit. ' +
                    'Check that the account is valid'}).status('404');

            if (account.active === false) return res.send({ message: 'Account already block'}).status('401');

            account.active = false;
            await account.save();
            return res.send({ messsage: 'Account block', account: account._id});
        } catch (e) {
            next(e)
        }
    };

    async getExtract(req, res, next) {
        try {

            const accountId = req.params.id;

            const trans = req.query.startDate !== undefined ?
                await AccountController.getExtractByQuery(accountId, req.query.startDate, req.query.endDate) :
                await AccountController.getExtract(accountId);
            if (!trans) return res.send({ message: 'You have no transactions for this account!' })

            return res.send({transactions: AccountController.formatterExtract(trans)});
        } catch (e) {
            next(e)
        }
    };

    static formatterExtract(transaction) {
        return transaction.map((trans) => {
            return {
                'Type Transaction: ': trans.typeTransaction,
                'Value: ': trans.value,
                'Account ID: ': trans.accountId._id,
                'Date: ': trans.dateOfTransaction.toUTCString(),
                'Balance / Amount: ': trans.amount
            };
        });
    };

    static async getExtractByQuery(accountId, startDate, endDate) {
        console.log('query')
        return transactionModel.find({
            accountId: accountId,
            dateOfTransaction: {
                $gte: new Date(startDate),
                $lt: new Date(endDate)
            }
        }).populate({path: 'accountId'}).sort({dateOfTransaction: 'asc'});
    };

    static async getExtract(accountId) {
        console.log('no query')
        return transactionModel.find({ accountId: accountId }).populate({ path: 'accountId' });
    }

}

module.exports = AccountController;
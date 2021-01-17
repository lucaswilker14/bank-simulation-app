import { model } from 'mongoose'
import TransactionController from '../transaction/controller'

const accountModel = model('Account')
const personModel = model('Person')
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
    }
}

module.exports = AccountController;
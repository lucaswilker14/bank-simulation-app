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
            const { person, balance, limitWithdraw, accountType } = req.body;
            const new_account = new accountModel({ person, balance, limitWithdraw, accountType });
            await new_account.save();
            return res.send({ message: 'Account successfully created', account: new_account});
        } catch (e) {
            next(e)
        }
    };

    async makeDeposit(req, res, next) {
        try {
            return await transactionController.makeDeposit(req, res, next);
        } catch (e) {
            next(e)
        }
    };
}

module.exports = AccountController;
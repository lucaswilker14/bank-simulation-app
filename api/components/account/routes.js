import { Router } from 'express';
import AccountController from './controller'

const router = Router();
const accountController = new AccountController();

router.get('/', accountController.index);
router.post('/signup', accountController.createAccount);
router.put('/deposit/:id', accountController.makeDeposit);
router.get('/balance/:id', accountController.getBalance);
router.put('/withdraw/:id', accountController.makeWithdraw);


module.exports = router;
import { Router } from 'express';
import AccountController from './controller'

const router = Router();
const accountController = new AccountController();

router.get('/', accountController.index);
router.post('/signup', accountController.createAccount);
router.put('/deposit', accountController.makeDeposit);


module.exports = router;
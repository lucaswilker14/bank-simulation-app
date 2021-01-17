import { Router } from 'express';
import accountRoutes from '../components/account/routes';
import personRoutes from '../components/person/routes';
import transactionRoutes from '../components/transaction/routes';


const router = Router();

router.use('/account', accountRoutes);
router.use('/person', personRoutes);
router.use('/transaction', transactionRoutes);

module.exports = router;
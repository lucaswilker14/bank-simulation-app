import { Router } from 'express';
import PersonController from './controller';


const router = Router();
const personController = new PersonController();

router.post('/', personController.createPerson);

module.exports = router;
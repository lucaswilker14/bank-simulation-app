import { Router } from 'express';
import PersonController from './controller';
import { createValidator} from "express-joi-validation";
import { createPerson } from './validation'

const router = Router();
const validator = createValidator({passError: true});
const personController = new PersonController();


router.post('/', validator.body(createPerson), personController.createPerson);

module.exports = router;
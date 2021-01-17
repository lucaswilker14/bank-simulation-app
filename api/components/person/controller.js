import { model } from 'mongoose';
const personModel = model('Person');

class PersonController {

    async createPerson(req, res, next) {
        try {
            const { name, CPF, dateOfBirth } = req.body;
            const new_person = new personModel({ name, CPF, dateOfBirth });
            await new_person.save();
            return res.send({ message: 'New person successfully created', person: new_person });
        } catch (e) {
            next(e)
        }
    };

}


module.exports = PersonController;
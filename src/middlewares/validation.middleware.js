import customersSchema from "../schemas/customers.schema.js";
import dayjs from "dayjs";

async function validationMiddleware (req, res, next){
    const currentDate = dayjs().format('DD-MM-YYYY');

    const currentDateParts=currentDate.split('-');
    const currentDay = currentDateParts[0];
    const currentMonth = currentDateParts[1];
    const currentYear = currentDateParts[2];

    const {birthday} = req.body;

    const birthdayParts = birthday.split('-');
    if(birthdayParts.length !== 3) return res.status(400);

    const birthdayDay = birthdayParts[0];
    const birthdayMonth = birthdayParts[1];
    const birthdayYear = birthdayParts[2];

    const age = currentYear - birthdayYear;

    if(age<=17) return res.status(400).send("Usuário menor de idade");

    if(age==18){
        if(currentMonth < birthdayMonth){
            return res.status(400).send("Usuário menor de idade");
        }
        if(currentMonth == birthdayMonth && currentDay<birthdayDay){
            return res.status(400).send("Usuário menor de idade");
        }
    }

    const validationSchema = customersSchema.validate(req.body);
    
    if(validationSchema.error) return res.sendStatus(400);
    
    res.locals = req.body;
    next();  
}

export default validationMiddleware;
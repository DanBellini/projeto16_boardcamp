import customersSchema from "../schemas/customers.schema.js";
import dayjs from "dayjs";

async function validationMiddleware (req, res, next){
    const currentDate = dayjs().format('YYYY-MM-DD');

    const currentDateArray=currentDate.split('-');
    const currentYear = currentDateArray[0];
    const currentMonth = currentDateArray[1];
    const currentDay = currentDateArray[2];

    const {birthday} = req.body;

    const birthdayArray = birthday.split('-');
        if(birthdayArray.length !== 3) return res.status(400);

    const birthdayYear = birthdayArray[0];
    const birthdayMonth = birthdayArray[1];
    const birthdayDay = birthdayArray[2];

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
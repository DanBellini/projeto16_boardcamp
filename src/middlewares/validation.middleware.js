import customersSchema from "../schemas/customers.schema.js";
import dayjs from "dayjs";

function validationMiddleware (req, res, next){
    const validationSchema = customersSchema.validate(req.body);    
        if(validationSchema.error) return res.sendStatus(400);

        const dateNow = dayjs().format('YYYY-MM-DD');
        const yearDiferrence = birthday.diff(dateNow, "year", true);
        if(yearDiferrence<18) return res.status(400).send("Usuário menor de idade");
    
    res.locals = req.body;
    next();  
}

export default validationMiddleware;
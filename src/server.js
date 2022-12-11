import express from 'express';
import cors from 'cors';
import categoriesRouter from './routes/categories.routers.js';
import customersRouter from './routes/customers.routers.js';
import gamesRouter from './routes/games.routers.js';
import rentalsRouter from './routes/rentals.routers.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use(categoriesRouter);
app.use(customersRouter);
app.use(gamesRouter);
app.use(rentalsRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));
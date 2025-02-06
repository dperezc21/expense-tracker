import express = require('express');
import routerExpense from './infrastructure/router-expense';
import routerCategory from './infrastructure/router-category';

process.loadEnvFile();

const app = express();
const PORT: number = Number(process.env["PORT"]);
app.use(express.json());

app.use('/expenses', routerExpense);
app.use('/categories', routerCategory);

app.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`);
});
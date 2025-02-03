import express = require('express');
import routerExpense from './infrastructure/router-expense';

process.loadEnvFile();

const app = express();
const PORT: number = Number(process.env["PORT"]);
app.use(express.json());

app.use('/expenses', routerExpense);

app.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`);
});
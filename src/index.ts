import express = require('express');

process.loadEnvFile();

const app = express();
const PORT: number = Number(process.env["PORT"]);

app.listen(PORT, () =>{
    console.log(`listening on http://localhost:${PORT}`);
});
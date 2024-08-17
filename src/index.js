import dotenv from "dotenv"
import db from './database/db.js';
dotenv.config({
    path: './.env'
})

import {app} from './app.js'
console.log(`${process.env.DB_NAME}`);

db()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log(" mongodb connection failed !!! ", err);
})
const express = require('express')
const morgan = require('morgan');
const mySqlPool = require('./config/db');


const app = express();
const cookie = require("cookie-parser");

app.use(express.json());

app.use(morgan("dev"));
//route
app.use('/api/v1/task', require('./routes/taskRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));


app.get("/test", (req, res) => {
   res.status(200).send('nodjjjjsqlj');
});
const PORT = 5000;





// conditional listen
mySqlPool.query('SELECT 1').then(() => {

    console.log('sql connected')
    app.listen(PORT, () => {
        console.log('server running');
    });
}).catch((error) => {
   console.log(error);
});


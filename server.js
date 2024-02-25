const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const EmployeeRoute = require('./routes/employee')

mongoose.connect('mongodb://localhost:27017/local'
//, {useNewUrlParse: true, useUnifiedTopology: true}
);
const db = mongoose.connection

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log('DB connected successfully');
});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

app.use('/api/employee', EmployeeRoute)
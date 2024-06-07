const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const userRoutes = require('./routes/routes');
const cors = require('cors'); // Import the cors package

const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use('/api', userRoutes);

db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    return db.sequelize.sync();
  })
  .then(() => {
    app.listen(8080, () => {
      console.log('Server is running on port 8080');
    });
  })
  .catch(error => {
    console.log('Error connecting to the database:', error);
  });

const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const userRoutes = require('./routes/routes');
const cors = require('cors'); 
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', userRoutes);
const port = process.env.PORT || 8080;

console.log('Database connection parameters:', {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  database: process.env.DB_NAME
});

db.sequelize.authenticate()
  .then(() => {
    console.log('Database connected successfully.');
    return db.sequelize.sync();
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(error => {
    console.log('Error connecting to the database:', error);
  });

const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = 3001;
const sequelize = require('./db.config');
const cors = require('cors');

app.use(cors({
  origin: '*',
}));
app.use(express.json());
app.use('/api', routes);

(async () => {
  try {
    await sequelize.sync();
    console.log('All models were synchronized successfully.');
  } catch (error) {
    console.error('Model synchronization error:', error.message);
  }
})();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

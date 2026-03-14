const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { loginHandler, registerHandler } = require('./lib/auth-handlers');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', registerHandler);
app.post('/login', loginHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});

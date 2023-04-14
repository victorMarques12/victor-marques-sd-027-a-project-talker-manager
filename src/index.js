const express = require('express');
const { talkerRouter } = require('./routes/talkerRouter');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/talker', talkerRouter);

app.listen(PORT, () => {
  console.log('Online');
});
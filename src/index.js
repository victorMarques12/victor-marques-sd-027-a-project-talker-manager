const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const rotaTalker = require('./routes/routerTalk');
const rotaLogin = require('./routes/routerLogin');

const HTTP_OK_STATUS = 200;
const PORT = '3000';

const app = express(); 
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/talker', async (_request, response) => {
  const contentPath = path.resolve(__dirname, 'talker.json');
  const data = await fs.readFile(contentPath, 'utf-8');
  const talkersData = JSON.parse(data);
  return response.status(HTTP_OK_STATUS).json(talkersData);
});

app.use('/search', rotaTalker);

 app.use('/login', rotaLogin);
 app.use('/talker', rotaTalker);
app.listen(PORT, () => {
  console.log('Online');
});
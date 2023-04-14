const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const { readTalkers } = require('./utils/utils');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/talker', async (_request, response) => {
  const contentPath = path.resolve(__dirname, 'talker.json');
  const data = await fs.readFile(contentPath, 'utf-8');
  const talkersData = JSON.parse(data);
  return response.status(HTTP_OK_STATUS).json(talkersData);
});

app.get('/talker/:id', async (req, res) => {
  const talkerID = await readTalkers();
  const listTalker = talkerID.find(({ id }) => id === Number(req.params.id));
  if (!listTalker) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  res.status(200).json(listTalker);
});

app.listen(PORT, () => {
  console.log('Online');
});

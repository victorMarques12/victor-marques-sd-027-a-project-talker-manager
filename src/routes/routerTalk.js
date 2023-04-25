const express = require('express');
const { readTalkers, getTalkerById, writeTalker } = require('../utils/utils');
const { validateToken, checkName,
  checkAge, checkTalk, checkTalkRate } = require('../middlewares/validaTalk');

const rotaTalker = express.Router();
const HTTP_OK = 200;
const HTTP_CREATED = 201;
const HTTP_INTERNAL_SV_ERROR = 500;

rotaTalker.get('/search', validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await readTalkers();
  if (!q) return res.status(HTTP_OK).json(talkers);
  const talker = talkers.filter((tk) => tk.name.includes(q));
  return res.status(HTTP_OK).json(talker);
});
rotaTalker.get('/', async (_req, res) => {
  try {
    const data = await readTalkers();
    res.status(HTTP_OK).json(data);
  } catch (err) {
    res.status(HTTP_INTERNAL_SV_ERROR).send({ message: err.message });
  }
});

rotaTalker.get('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const data = await getTalkerById(id);
    if (!data) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    res.status(HTTP_OK).json(data);
  } catch (err) {
    res.status(HTTP_INTERNAL_SV_ERROR).send({ message: err.message });
  }
});

rotaTalker.post('/', validateToken, checkName, checkAge,
  checkTalk, checkTalkRate, async (req, res) => {
    try {
      const talkers = await readTalkers();
      const newTalker = { id: talkers.length + 1, ...req.body };
      const newTalkersList = [...talkers, newTalker];
      await writeTalker(newTalkersList);
      res.status(HTTP_CREATED).json(newTalker);
    } catch (err) {
      res.status(HTTP_INTERNAL_SV_ERROR).send({ message: err.message });
    }
  });

rotaTalker.put('/:id', validateToken, checkName, checkAge,
  checkTalk, checkTalkRate, async (req, res) => {
    try {
      const talkers = await readTalkers();
      const id = Number(req.params.id);
      const index = talkers.findIndex((talker) => talker.id === id);
      if (index === -1) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
      const updatedTalker = { id, ...req.body };
      talkers.splice(index, 1, updatedTalker);
      await writeTalker(talkers);
      return res.status(HTTP_OK).json(updatedTalker);
    } catch (err) {
      res.status(HTTP_INTERNAL_SV_ERROR).send({ message: err.message });
    }
  });

rotaTalker.delete('/:id', validateToken, async (req, res) => {
  try {
    let talkers = await readTalkers();
    const id = Number(req.params.id);
    talkers = talkers.filter((talker) => talker.id !== id);
    await writeTalker(talkers);
    res.sendStatus(204);
  } catch (err) {
    res.status(HTTP_INTERNAL_SV_ERROR).send({ message: err.message });
  }
});

module.exports = rotaTalker;
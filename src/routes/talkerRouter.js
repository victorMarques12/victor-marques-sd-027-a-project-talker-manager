const express = require('express');

const { readTalkers } = require('../utils/utils');

const talkerRouter = express.Router();

  talkerRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readTalkers();
    const talkersById = talkers.find((talker) => talker.id === Number(id));
  
    if (talkersById) {
      res.status(200).json(talkersById);
    } else {
      res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
  });

  module.exports = {
    talkerRouter,
  };
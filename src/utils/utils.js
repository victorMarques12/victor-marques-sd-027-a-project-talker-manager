const fs = require('fs').promises;
const path = require('path');

const talkersArrPath = path.resolve(__dirname, '../talker.json');

const readTalkers = async () => {
    try {
        const data = await fs.readFile(talkersArrPath, 'utf-8');   
        return JSON.parse(data);
    } catch (error) {
        console.log(`Ocorreu um erro: ${error.message}`);
        return error;
    }
};

const writeTalker = async (newTalkersList) => {
    await fs.writeFile(talkersArrPath, JSON.stringify(newTalkersList));
};

const getTalkerById = async (id) => {
    try {
        const talkers = await fs.readFile(talkersArrPath, 'utf-8');
        const talkersJ = JSON.parse(talkers);
        const data = talkersJ.find((talker) => talker.id === id);
        return data;
    } catch (error) {
        return error;
    }
};

module.exports = { 
readTalkers,
getTalkerById,
writeTalker,
};
const { readFile } = require('fs/promises');
const path = require('path');

const filePath = path.resolve(__dirname, '.', 'talker.json');

const readId = async (id) => {
    const data = await readFile(filePath);
    const allItens = JSON.parse(data);
    const filtered = (allItens.find((e) => e.id === Number(id)));
    return filtered;
};

module.exports = {
    readId,
};
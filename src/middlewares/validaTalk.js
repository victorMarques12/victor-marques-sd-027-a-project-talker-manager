const HTTP_BAD_REQUEST = 400;
const HTTP_UNAUTHORIZED = 401;

const validateToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        return token.length === 16 && typeof token === 'string'
            ? next() : res.status(HTTP_UNAUTHORIZED).json({ message: 'Token inválido' });
    }
    return res.status(HTTP_UNAUTHORIZED).json({ message: 'Token não encontrado' });
};

const checkName = (req, res, next) => {
    const { name } = req.body;

    if (name) {
        return name.length >= 3 ? next() : res.status(HTTP_BAD_REQUEST).json({ 
            message: 'O "name" deve ter pelo menos 3 caracteres' });
    }
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "name" é obrigatório' });
};

const checkAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "age" é obrigatório' });
    }
    if (typeof age !== 'number') {
     return res.status(HTTP_BAD_REQUEST).json({ 
        message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    if (!Number.isInteger(age)) {
        return res.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    if (age < 18) {
        return res.status(HTTP_BAD_REQUEST).json({ 
            message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
    }
    next();
};

const checkTalk = (req, res, next) => {
    const { talk } = req.body;
    if (!talk) {
        return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "talk" é obrigatório' });
    }

    const { watchedAt } = talk;

    if (!watchedAt) {
        return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "watchedAt" é obrigatório' });
    }

    if (!watchedAt.match(/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/)) {
        return res.status(HTTP_BAD_REQUEST).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }

    next();
};

const checkTalkRate = (req, res, next) => {
    const { rate } = req.body.talk;
    if (rate < 1 || rate > 5) {
        return res.status(HTTP_BAD_REQUEST).json({ 
            message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }

    if (!rate) {
        return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "rate" é obrigatório' });
    }

    if (!Number.isInteger(rate)) {
        return res.status(HTTP_BAD_REQUEST).json({ 
            message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }

    next();
};

module.exports = {
    validateToken,
    checkName,
    checkAge,
    checkTalk,
    checkTalkRate,
};
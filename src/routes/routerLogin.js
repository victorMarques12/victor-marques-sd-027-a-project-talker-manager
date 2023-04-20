const express = require('express');

const { generateToken, validacaoEmail, 
    checkEmail, checkPw, validatePw } = require('../middlewares/validaLogin');

const loginRouter = express.Router();

const HTTP_OK = 200;
const HTTP_INTERNAL_SV_ERROR = 500;

loginRouter.post('/', checkEmail, validacaoEmail, checkPw, validatePw, async (_req, res) => {
    try {
        const token = generateToken();
        res.status(HTTP_OK).json({ token });
    } catch (err) {
        res.status(HTTP_INTERNAL_SV_ERROR).send({ message: err.message });
    }
});

module.exports = loginRouter;
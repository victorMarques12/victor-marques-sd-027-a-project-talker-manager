const re = /\S+@\S+\.\S+/;
const HTTP_BAD_REQUEST = 400;

const generateToken = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';

    for (let i = 0; i < 16; i += 1) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return token;
};
const validatePw = (req, res, next) => (req.body.password.length >= 6
    ? next() : res.status(HTTP_BAD_REQUEST).json({ 
        message: 'O "password" deve ter pelo menos 6 caracteres' }));

const checkPw = (req, res, next) => (
    'password' in req.body ? next() : res.status(HTTP_BAD_REQUEST).json({ 
        message: 'O campo "password" é obrigatório' })
);

const validacaoEmail = (req, res, next) => 
    (re.test(req.body.email) ? next() : res.status(HTTP_BAD_REQUEST).json({ 
        message: 'O "email" deve ter o formato "email@email.com"' }));

const checkEmail = (req, res, next) => 
    ('email' in req.body ? next() : res.status(HTTP_BAD_REQUEST).json({ 
        message: 'O campo "email" é obrigatório' }));

module.exports = {
    generateToken,
    validacaoEmail,
    validatePw,
    checkEmail,
    checkPw,
};
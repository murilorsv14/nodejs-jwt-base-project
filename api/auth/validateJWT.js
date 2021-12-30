const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = 'secretToken';

module.exports = async (req, res, next) => {
  const token = req.headers['authorization'];


  console.log(token);
  console.log(req.headers);

  token ? null : res.status(401).json({ error: 'Token não encontrado' });

  try {
    const decoded = jwt.verify(token, secret);

    const username = decoded.data.username

    const user = await User.findOne({ where: { username } });

    user ? null : res.status(401).json({ message: 'Erro ao procurar usuário do token.' });

    req.user = user;
    next();

  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

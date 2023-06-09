const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log(`middle-token: ${token}`)
    if (!token) {
      res.status(401).json({message: 'Нет авторизации'})
    }

    const decoded = jwt.decode(token, config.get('jwtSecret'))
    req.user = decoded
    next()

  } catch (e) {
    res.status(500).json({message: 'Чтото пошло не так, попробуйте снова'})
  }
}
const {Router} = require('express')
const shortid = require('shortid')
const config = require('config')
const Link = require('../models/Link')
const auth = require('../middleware/auth.middleware')
const router = Router()

router.post('/generate', auth, async (req, res) => {
  try {
    console.log(req.body)
    const {from} = req.body
    const double = await Link.findOne({from})
    if (double) {
      console.log('double')
      return res.json({link: double})
    }

    const code = shortid.generate()
    console.log(`code: ${code}`)
    const to = config.get('baseUrl') + /t/ + code
    console.log(`to: ${to}`)
    const owner = req.user.userId
    console.log(`owner: ${owner}`)

    const link = new Link({from, to, code, owner})
    await link.save()
    res.status(201).json({link})

  } catch (e) {
    res.status(500).json({message: 'Чтото пошло не так попробуйте снова'})
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const links = await Link.find({owner: req.user.userId})
    res.json(links)
  } catch (e) {
    res.status(500).json({message: 'Чтото пошло не так попробуйте снова'})
  }
})

router.get('/:id', auth, async (req, res) => {
  try {
    console.log(req.params.id)
    const link = await Link.findById(req.params.id)
    res.json(link)
  } catch (e) {
    res.status(500).json({message: 'Чтото пошло не так попробуйте снова'})
  }
})

module.exports = router
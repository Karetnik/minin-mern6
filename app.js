const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')
const app = express()


app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
    optionsSuccessStatus: 200
  })
);

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))

const PORT = process.env.PORT || config.get('port')



async function start() {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser:true,
      useUnifiedTopology:true
    })
    await app.listen(PORT, () => {
      console.log('Server has been started on port', PORT)
    })
  } catch (e) {
    console.log('Чтото пошло не так:', e.message)
    process.exit(1)
  }
}

start()



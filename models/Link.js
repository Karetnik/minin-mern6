const {model, Schema, Types} = require('mongoose')

const links = new Schema({
  from: {type: String, required:true},
  to: {type: String, required: true, unique: true},
  code: {type: String, required: true, unique: true},
  date: {type: Date, default: Date.now},
  clicks: {type: Number, default: 0},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Link', links)
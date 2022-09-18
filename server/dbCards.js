const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const cardSchema = new Schema(
    {
        name: String,
        imgUrl: String
    }
)

module.exports = mongoose.model('Cards', cardSchema)
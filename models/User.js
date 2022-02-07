const mongoose = require('mongoose')


const User = mongoose.model('Usuario',{
    nome:String,
    senha: String,
    peso: String,
    altura: String,
    idade: String,

})

module.exports = User
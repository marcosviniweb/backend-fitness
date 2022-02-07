// config

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors');

// forma de ler o json

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())
app.use(cors());
// rotas da api
const userRoute = require('./routes/userRoute')

app.use('/usuario', userRoute)

// rota inicial / endepoint

app.get('/', (req,res) => {
            
    // mostrar requisicao
    //mongodb+srv://fitness:fitness@123@cluster0.prddv.mongodb.net/bancofit?retryWrites=true&w=majority
    res.json({message: 'Olá Mundo!', nome: 'Marcos'})

         
})

// entregar uma porta
const user = 'fitness'
const senha = encodeURIComponent('fitness@123')
mongoose
.connect(
`mongodb+srv://${user}:${senha}@cluster0.prddv.mongodb.net/bancofit?retryWrites=true&w=majority`
)
.then(() =>{
    console.log("ihuuuu")
    app.listen(3000)
})
.catch((err) =>{
    console.log(err)
})

const router = require('express').Router()
const User = require('../models/User')

router.post('/', async (req, res) =>{
      
    //req.body

    const {nome, senha, peso, altura, idade} = req.body

    if(!nome){
        res.status(422).json({error: 'Não enviou o nome'}) 
    }
     
     const user = {
          nome,
          senha,
          peso,
          altura,
          idade
     } 

     // create

     try{
         //criando dados
          await User.create(user)

          res.status(201).json({message: 'Usuário Cadastrado com Sucesso!'})
     }catch(error){
         res.status(500).json({error:error})
     }

})

//// READ - Leitura dos dados

router.get('/', async (req, res) => {
    
    try{
        
        const users = await User.find()
        res.status(200).json(users)

    }catch(error){
        res.status(500).json({error:error})
    }
})

router.get('/:id', async (req, res) => {

        //extrair o dado da requisição, pela URL = rq.params
        const id = req.params.id

        try{
            
            const user = await User.findOne({_id: id})
            res.status(200).json(user)
        
        }catch(error){
            res.status(500).json({error:error})
        }
})

//// UPDATE - Atualização dos dados (PUT, PACTH)

router.patch('/:id', async (req, res) => {

    const id = req.params.id
    const {nome, senha, altura, peso, idade} = req.body
    const user = { 
        nome,
        senha,
        altura,
        peso,
        idade,
    }

    try{
            
        const updatedUser = await User.updateOne({_id: id}, user)
        if(updatedUser.matchedCount === 0){
            res.status(422).json({error: 'Não enviou o nome'})

        }
        res.status(200).json(user)
    
    }catch(error){
        res.status(500).json({error:error})
    }

})

//// DELETE - deletar dados
router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const user = await User.findOne({_id: id})

    if(!user){
        res.status(422).json({message: 'Usuario nao encontrado'})
        return
    }

    try{
        await User.deleteOne({_id: id})
        res.status(200).json({message: 'User removido'})
    }catch(error){
         res.status(500).json({error: error})
    }
})

module.exports = router
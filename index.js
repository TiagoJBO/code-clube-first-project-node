const express = require('express')
const uuid = require('uuid')

const port = 3004
const app = express()
app.use(express.json())
/* 
    -Query params =>meusate.com/users?name=tiago&age=39 //FILTROS
    -Query params =>/users/2        //DELETAR OU ATUALIZAR  ALGO ESPECÍFICO 
    -Request body =>{"name":"Tiago","age":}
   
    -GET          =>Buscar infomação no back-end
    -POST         => Criar  infomarção no back-end
    -PUT/PATCH    => Altera/Atualizar infomação no back-end
    -DELETE       => Deletar infotmção no back end
    -Middleware =>INTERCEPTADOR => Tem poder de parar ou alterar  dados de requisição
*/

const users = []
const checkUserId = (request, response, next) => {

    const { id } = request.params

    const index = users.findIndex(user => user.id === id)
    if (index < 0) {
        return response.status(404).json({ message: "User not found" })

    }
    request.userIndex = index
    request.userId = id

    next()

}

app.get('/users', (request, response) => {

    return response.json(users)
})

app.post('/users', (request, response) => {

    const { name, age } = request.body


    const user = { id: uuid.v4(), name, age }
    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex

    const id = request.userIdnpm

    const updatedUser = { id, name, age }

    users[index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {
    const index = request.userIndex

    users.splice(index, 1)
    return response.status(204).json()
})

























app.listen(port, () => {
    console.log(`🚀serve started on port ${port}`);
})


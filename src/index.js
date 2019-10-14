
const express = require('express')


const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


require('./db/mongoose')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
 


app.listen(port, () => {
    console.log('app listen in port' + port)
})

const jwt = require('jsonwebtoken')

const myFunction = async () => {
    const token = jwt.sign({ _id:'abc123'}, 'This is my site', { expiresIn: '7 days'})
    const data = jwt.verify(token, 'This is my site')

}

myFunction()
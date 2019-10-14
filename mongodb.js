// const mongodb = require('mongodb')
// const mongoClient = mongodb.MongoClient
// const ObjectId = mongodb.ObjectId

const { MongoClient, ObjectId} = require('mongodb')

const id = new ObjectId()


const connectionUrl = 'mongodb+srv://Muhammad:ShMqUn6eJcEFvgvA@cluster0-em95p.mongodb.net/admin?authSource=admin&ssl=true'

const databaseName = 'task-app'

MongoClient
.connect(connectionUrl, {useNewUrlParser: true, useUnifiedTopology: true})
.then(client => { 
    const db = client.db(databaseName) 
    db.collection('tasks').updateMany({
        compelet:false 

    }, {
        $set: {
            compelet:true
        }
    })
    .then(tasks => {
        console.log(tasks.modifiedCount)
    })
    .catch(err => {
        console.log(err)
    })
})
.catch(error => {
    console.log(error)
})
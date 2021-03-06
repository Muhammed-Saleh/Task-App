const express = require('express')
const Task = require('../models/task')
const router = new express.Router()


router.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    try {
        task.save()
        res.status(201).send(task)
    } catch (err) {
        res.status(400).send(err)
    }
    
})

router.get('/tasks', async(req, res) => {

    try {
        const tasks = await Task.find({})

        if (!tasks) {
            return res.status(404).send()
        }

        res.send(tasks)
    } catch (err) {
         res.status(500).send(err)
    }
    
})

router.get('/tasks/:id', async (req, res) => {
   const _id = req.params.id

   try {
       const task = await Task.findById(_id)

       if (!task) {
        return res.status(404).send() 
       } 

       res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ["description", "complete"]
    const isAllowed = updates.every(update => allowedUpdates.includes(update))

    if (!isAllowed) {
        return res.status(400).send({ 'error':'invalid update'})
    }

    try {
        const task = await Task.findById(req.params.id)

        updates.forEach(update => { task[update] = req.body[update] })

        await task.save()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)

    } catch (err) {
         res.status(400).send(err)
    }
})


router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task) {
            res.status(404).send()
        }

        res.send(task)

    } catch (err) {
        res.status(500).send(err)
    }
})


module.exports = router
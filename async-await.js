require('./src/db/mongoose')
const Task = require('./src/models/task')

const deleteAndCount = async (id, complete) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({complete})
    return count;
}

deleteAndCount("5d9f271498794f04449ffd2b", false)
.then(result => {
    console.log(result)
})
.catch(err => {
    console.log(err)
})
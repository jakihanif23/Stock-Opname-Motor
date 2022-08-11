const inputRouter = require('express').Router()
const { InputController } = require('../controller')

inputRouter.get('/', InputController.getAllInputs)

inputRouter.get('/delete/:id', InputController.deleteInput)

inputRouter.post('/add', InputController.addInput)

inputRouter.post('/update/:id', InputController.updateInput)



module.exports = inputRouter
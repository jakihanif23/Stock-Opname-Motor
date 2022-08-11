const outputRouter = require('express').Router()
const { OutputController } = require('../controller')

outputRouter.get('/', OutputController.getAllOutputs)

outputRouter.get('/delete/:id', OutputController.deleteOutput)

outputRouter.post('/add', OutputController.addOutput)

outputRouter.post('/update/:id', OutputController.updateOutput)



module.exports = outputRouter
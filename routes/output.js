const outputRouter = require('express').Router()
const { OutputController } = require('../controller')

outputRouter.get('/', OutputController.getAllOutputs)

outputRouter.get('/delete/:id', OutputController.deleteOutput)

outputRouter.get('/add/:id', OutputController.addOutputPage)
outputRouter.post('/add/:id', OutputController.addOutput)

outputRouter.post('/update/:id', OutputController.updateOutput)



module.exports = outputRouter
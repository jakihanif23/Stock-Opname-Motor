const categoryRouter = require('express').Router()
const { CategoryController } = require('../controller')

categoryRouter.get('/', CategoryController.getAllCategories)

categoryRouter.get('/delete/:id', CategoryController.deleteCategory)

categoryRouter.post('/add', CategoryController.addCategory)

categoryRouter.get('/update/:id', CategoryController.updateCategoryPage)
categoryRouter.post('/update/:id', CategoryController.updateCategory)



module.exports = categoryRouter
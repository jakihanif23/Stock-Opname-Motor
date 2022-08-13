const express = require('express')
const router = express.Router()
const app = express()

router.get('/', (req, res)=>{
    // res.json({
    //     message : 'Home Page'
    // })
    res.render('index.ejs')
})

const motorcycleRoute = require('./motorcycle')
const categoryRoute = require('./category')
const inputRoute = require('./input')
const outputRoute = require('./output')
const reportRoute = require('./report')

router.use('/motorcycles', motorcycleRoute)
router.use('/categories', categoryRoute)
router.use('/inputs', inputRoute)
router.use('/outputs', outputRoute)
router.use('/reports', reportRoute)

module.exports = router
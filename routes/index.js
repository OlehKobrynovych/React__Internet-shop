const shops = require('./shops')
const categories = require('./categories')
const products = require('./products')
const auth = require('./auth')

const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
    if (process.env.MODE === 'dev') 
        console.log(
            'Request:',
            'Time ' + new Date().toLocaleTimeString(),
            'Date ' + new Date().toLocaleDateString()
        )
    
    next()
})

router.use('/shops', shops)
router.use('/categories', categories)
router.use('/products', products)
router.use('/auth', auth)

module.exports = router
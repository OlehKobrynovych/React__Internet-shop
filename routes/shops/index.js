const auth = require('../../middlewares/auth')
const create_shops = require('./create_shops')
const update_by_id_shops = require('./update_shops')
const select_all_from_shops = require('./get_all_shops')
const select_by_id_shops = require('./get_shops')
const delete_by_id_shops = require('./delete_shops')

const express = require('express')
const router = express.Router()

router.post('/', auth, create_shops)
router.put('/:id', auth, update_by_id_shops)
router.get('/all', auth, select_all_from_shops)
router.get('/:id', auth, select_by_id_shops)
router.delete('/:id', auth, delete_by_id_shops)

module.exports = router
    
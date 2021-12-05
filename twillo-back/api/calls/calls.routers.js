const express = require('express')
const { getHistoryCalls,setHistoryCalls } = require('./calls.conroller')

const router = express.Router()

router.get('/calls', getHistoryCalls)
router.put('/calls', setHistoryCalls)

module.exports = router
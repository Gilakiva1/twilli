const callservices = require('./calls.service')
const logger = require('../../services/logger.service')

async function getHistoryCalls(req, res) {
    try {
        const calls = await callservices.getHistoryCalls()
        res.send(calls)
    } catch (err) {
        logger.error('Failed to get calls ' + err)
        res.status(401).send({ err: 'Failed to get Calls' })
    }
}
async function setHistoryCalls(req, res) {
    const calls = req.body
    console.log('calls', calls);
    try {
        const currCalls = await callservices.setHistoryCalls(calls)
        console.log('calls controller', currCalls);
        res.send(currCalls)
    } catch (err) {
        logger.error('Failed to get calls ' + err)
        res.status(401).send({ err: 'Failed to set Calls' })
    }
}


module.exports = {
    getHistoryCalls,
    setHistoryCalls
}
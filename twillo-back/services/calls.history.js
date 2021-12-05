const dbservices = require('./db.service')
const logger = require('./logger.service')


module.exports = {
    getCalls,
    setCalls

}

async function getCalls() {
    try {
        const collection = await dbservices.getCollection('history_db')
        const calls = await collection.find().toArray()
        return calls
    } catch (err) {
        logger.error(`while finding user ${calls}`, err)
        throw err
    }
}
async function setCalls(currCalls) {
    console.log(currCalls);
    try {

        const collection = await dbservices.getCollection('history_db')
        await collection.insert(currCalls)
        const calls = await collection.find().toArray()
        console.log('set calls',calls);
        return calls
    } catch (err) {
        logger.error(`while finding user ${calls}`, err)
        throw err
    }
}
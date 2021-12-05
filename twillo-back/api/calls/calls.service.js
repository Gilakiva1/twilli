const callsservices = require('../../services/calls.history')


async function getHistoryCalls(){
    const calls = await callsservices.getCalls()
    return calls
}
async function setHistoryCalls(currCalls){
    console.log(currCalls);
    const calls = await callsservices.setCalls(currCalls)
    return calls
}


module.exports = {
    getHistoryCalls,
    setHistoryCalls
}
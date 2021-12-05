import { httpService } from './http.service';
export const callService = {
    getCalls,
    setCalls
};

async function getCalls() {
    try {
        const calls = await httpService.get('calls/calls')
        return calls
    } catch (err) {
        console.log(err);
    }
}

async function setCalls(call) {
    const calls = await httpService.put('calls/calls', call)
    return calls
}
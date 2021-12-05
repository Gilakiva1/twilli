import { useEffect, useState } from "react";

import { AppHeader } from "./cmps/AppHeader";

import { HistoryCalls } from "./cmps/HistoryCall";
import { callService } from "./service/call.service";
import './assets/style.scss';


export const App = () => {


    const [isHistoryCall, setIsHistoryCall] = useState(false)
    const [toCall, setToCall] = useState('')
    const [calls, setCalls] = useState()

    useEffect(async () => {
        console.log('dasdadsd');
        if (!calls) {

            const currCalls = await callService.getCalls()
            setCalls(currCalls)
        }

    }, [])

    const OnHistoryCall = (phone) => {
        setToCall(phone)

    }

    const handleChange = () => {

    }
    const addToHistory = async (phone) => {
        if (!phone) return
        let dateNow = new Date();
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        dateNow = dateNow.toLocaleDateString('de-DE', options)
        let call = { phone, date: dateNow }
        console.log(call);
        const calls = await callService.setCalls(call)

        setCalls(calls)


    }

    if (!calls) return <div>Loading...</div>
    return (
        <div>
            <AppHeader />
            <main>
                <HistoryCalls calls={calls} OnHistoryCall={OnHistoryCall} />
                <div>

                    <label htmlFor='phone'>phone</label>
                    <input
                        id='phone'
                        type='phone'
                        pattern='^[0][5]\d{8}$'
                        maxLength='10'
                        name='phone'
                        value={toCall}
                        onChange={handleChange}
                    />
                    <button onClick={() => { addToHistory(toCall) }}>Call</button>
                </div>

            </main>
        </div>
    )

}
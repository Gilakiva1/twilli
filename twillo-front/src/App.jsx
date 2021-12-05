import { useEffect, useState } from "react";

import { AppHeader } from "./cmps/AppHeader";

import { HistoryCalls } from "./cmps/HistoryCall";
import { callService } from "./service/call.service";
import './assets/style.scss';


export const App = () => {

    const [isHistoryCall, setIsHistoryCall] = useState(false)
    const [toCall, setToCall] = useState('')
    const [calls, setCalls] = useState(null)

    useEffect(async () => {
        const currCalls = await callService.getCalls()
       
        setCalls(sortCalls(currCalls))
    }, [])

    const ToggleHistory = async () => {
        setIsHistoryCall(!isHistoryCall)
        const currCalls = await callService.getCalls()
        setCalls(sortCalls(currCalls))

    }
    const sortCalls = (currCalls) => {
        const tempCalls = currCalls
        tempCalls.sort((a, b) => {
            const currADate = new Date(a.date)
            const currBDate = new Date(b.date)
            if (currADate > currBDate) return -1
            else if (currADate < currBDate) return 1
        })
        return tempCalls
    }

    const OnHistoryCall = (phone) => {
        setToCall(phone)
    }

    const handleChange = ({ target }) => {
        setToCall(target.value)
    }

    const addToHistory = async (phone) => {

        let regex2 = /^[0][5]\d{8}$/
        const phoneValidate = regex2.test(phone);
        if (phoneValidate === false) return
        let dateNow = new Date();
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        dateNow = dateNow.toLocaleDateString('de-DE', options)
        let call = { phone, date: dateNow }
        const currCalls = await callService.setCalls(call)
        console.log(currCalls);
        setCalls(sortCalls(currCalls))
    }

    if (!calls) return <div>Loading...</div>
    return (
        <div>
            <AppHeader ToggleHistory={ToggleHistory} />
            <main>

                <div>
                    <label htmlFor='phone'>phone:</label>
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
                {isHistoryCall &&

                    <HistoryCalls calls={calls} OnHistoryCall={OnHistoryCall} />
                }

            </main>
        </div>
    )

}
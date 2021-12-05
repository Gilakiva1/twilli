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

        currCalls.sort((a, b) => {
            const currADate = new Date(a.date)
            const currBDate = new Date(b.date)
            console.log('currADate',currADate,'currBDate',currBDate);
            if (currADate > currBDate)return -1
            else if (currADate < currBDate) return 1
        })
        setCalls(currCalls)
        

    }, [])
    const ToggleHistory = async () => {
        setIsHistoryCall(!isHistoryCall)
        const currCalls = await callService.getCalls()

        currCalls.sort((a, b) => {
            const currADate = new Date(a.date)
            const currBDate = new Date(b.date)
            console.log('currADate',currADate,'currBDate',currBDate);
            if (currADate > currBDate)return -1
            else if (currADate < currBDate) return 1
        })
        setCalls(currCalls)
    }
    const OnHistoryCall = (phone) => {
        setToCall(phone)
    }

    const handleChange = () => {

    }
    const addToHistory = async (phone) => {
        console.log('sadsaads');
        let dateNow = new Date();
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        dateNow = dateNow.toLocaleDateString('de-DE', options)
        let call = { phone, date: Date.now() }
        const calls = await callService.setCalls(call)
        setCalls(calls)
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
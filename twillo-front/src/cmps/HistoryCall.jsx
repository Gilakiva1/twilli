import { useEffect, useState } from "react";

export const HistoryCalls = ({ calls, OnHistoryCall }) => {

    const [lastCalls, setCalls] = useState()
    useEffect(() => {
        if (calls) {
            const currCalls = calls.splice(0, 5)
            console.log('calls',currCalls);
            setCalls(currCalls)
        }
    }, [])
    if(!lastCalls) return <div>loading</div>
    return (
        <section className="call-list">
            {
                lastCalls.map((call, idx) => (
                    <div key={idx} className="call-history">
                        <span>{call.phone}</span>
                        <span>{call.date}</span>
                        <button onClick={() => { OnHistoryCall(call.phone) }}>Call</button>
                    </div>
                ))
            }
        </section>
    )
}
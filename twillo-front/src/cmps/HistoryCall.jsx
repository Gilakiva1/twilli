export const HistoryCalls = ({ calls, OnHistoryCall }) => {

    console.log('calls',calls);

    return (
        <section className="call-list">
            {
                calls.map((call, idx) => (
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
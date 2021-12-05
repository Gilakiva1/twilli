

export const AppHeader = ({ OnHistoryCall }) => {

    return (

        <header>
            <span>Twillio</span>
            <div>
                <button onClick={OnHistoryCall}>History Calls</button>
            </div>
        </header>
    )
}
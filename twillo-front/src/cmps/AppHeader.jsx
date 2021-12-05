

export const AppHeader = ({ ToggleHistory }) => {

    return (

        <header>
            <span>Twillio</span>
            <div>
                <button onClick={ToggleHistory}>History Calls</button>
            </div>
        </header>
    )
}
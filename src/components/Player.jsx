import { useState } from 'react'

const Player = ({ initialName, symbol, isActive, onNameUpdate }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)

    const handleEditClick = () => {
        setIsEditing((editing) => !editing)

        if (isEditing) {
            onNameUpdate(symbol, playerName)
        }
    }

    const handlePlayerNameChange = (event) => {
        setPlayerName(event.target.value)
    }

    let playerNameTag = <span className='player-name'>{playerName}</span>

    if (isEditing) {
        playerNameTag = (
            <input
                type='text'
                required
                defaultValue={playerName}
                onChange={handlePlayerNameChange}
            />
        )
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className='player'>
                {playerNameTag}
                <span className='player-symbol'>{symbol}</span>
            </span>
            <button onClick={handleEditClick}>
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </li>
    )
}

export default Player

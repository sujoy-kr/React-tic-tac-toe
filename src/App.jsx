import { useState } from 'react'
import GameBoard from './components/GameBoard'
import Player from './components/Player'
import Log from './components/Log'
import { winning_combos } from './winning-combo'
import GameOver from './components/GameOver'

const PLAYERS = {
    X: 'Player 1',
    O: 'Player 2',
}

const INITIAL_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]

const checkWinner = (gameBoard, playerNames) => {
    let winner = null

    for (const combo of winning_combos) {
        const firstSquareSymbol = gameBoard[combo[0].row][combo[0].column]
        const secondSquareSymbol = gameBoard[combo[1].row][combo[1].column]
        const thirdSquareSymbol = gameBoard[combo[2].row][combo[2].column]

        if (
            firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ) {
            winner = playerNames[firstSquareSymbol]
        }
    }

    return winner
}

const getActivePlayer = (gameTurns) => {
    let currentPlayer = 'X'
    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
        currentPlayer = 'O'
    }
    return currentPlayer
}

const getGameBoard = (gameTurns) => {
    const gameBoard = [...INITIAL_BOARD.map((row) => [...row])]

    for (const turn of gameTurns) {
        gameBoard[turn.square.row][turn.square.col] = turn.player
    }

    return gameBoard
}

function App() {
    const [gameTurns, setGameTurns] = useState([])
    const [playerNames, setPlayerNames] = useState(PLAYERS)

    const activePlayer = getActivePlayer(gameTurns)

    const gameBoard = getGameBoard(gameTurns)

    const winner = checkWinner(gameBoard, playerNames)

    const isDraw = gameTurns.length === 9 && !winner

    const updateActivePlayer = (rowIndex, colIndex) => {
        const activePlayer = getActivePlayer(gameTurns)

        setGameTurns((prevTurns) => {
            let currentPlayer = 'X'

            if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
                currentPlayer = 'O'
            }

            const updatedTurns = [
                {
                    square: { row: rowIndex, col: colIndex },
                    player: activePlayer,
                },
                ...prevTurns,
            ]

            return updatedTurns
        })
    }

    const updatePlayerName = (symbol, newName) => {
        setPlayerNames((prevPlayers) => {
            return {
                ...prevPlayers,
                [symbol]: newName,
            }
        })
    }

    const resetGame = () => {
        setGameTurns([])
    }

    return (
        <>
            <header>
                <img src='game-logo.png' alt='Game logo' />
                <h1>Tic-Tac-Toe</h1>
            </header>
            <main>
                <div id='game-container'>
                    <ol id='players' className='highlight-player'>
                        <Player
                            initialName={PLAYERS.X}
                            symbol='X'
                            isActive={activePlayer === 'X'}
                            onNameUpdate={updatePlayerName}
                        />
                        <Player
                            initialName={PLAYERS.O}
                            symbol='O'
                            isActive={activePlayer === 'O'}
                            onNameUpdate={updatePlayerName}
                        />
                    </ol>

                    {(winner || isDraw) && (
                        <GameOver winner={winner} onResetGame={resetGame} />
                    )}

                    <GameBoard
                        updateActivePlayer={updateActivePlayer}
                        currentSymbol={activePlayer}
                        board={gameBoard}
                    />
                </div>
                <Log turns={gameTurns} />
            </main>
        </>
    )
}

export default App

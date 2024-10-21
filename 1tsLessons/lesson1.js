const gameBoard = (() => {
    const board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];

    return {
        board,
    };
})();

// console.log(gameBoard.board);

const player = function (name, symbol) {
    return {
        name,
        symbol
    };
};

const gameActions = (() => {
    const game = {
        playerX: player('Игрок X', 'X'),
        playerO: player('Игрок O', 'O'),
        gameBoard,
        currentPlayer: null
    };

    const checkWin = () => {
        // Функция для проверки линии (горизонтальной, вертикальной или диагональной)
        const checkLine = (a, b, c) => {
            return (a !== null && a === b && b === c) ? a : null;
        };

        // Проверяем горизонтальные линии
        for (let i = 0; i < 3; i++) {
            const winner = checkLine(game.gameBoard.board[i][0], game.gameBoard.board[i][1], game.gameBoard.board[i][2]);
            if (winner) {
                console.log(`Победа игрка ${winner} по горизонтали`);
                return winner;
            }
        }

        // Проверяем вертикальные линии
        for (let j = 0; j < 3; j++) {
            const winner = checkLine(game.gameBoard.board[0][j], game.gameBoard.board[1][j], game.gameBoard.board[2][j]);
            if (winner) {
                console.log(`Победа игрока ${winner} по вертикали`);
                return winner;
            }
        }

        // Проверяем диагонали
        const winner1 = checkLine(game.gameBoard.board[0][0], game.gameBoard.board[1][1], game.gameBoard.board[2][2]);
        if (winner1) {
            console.log(`Победа игрока ${winner1} по диагонали (слева направо)`);
            return winner1;
        }

        const winner2 = checkLine(game.gameBoard.board[0][2], game.gameBoard.board[1][1], game.gameBoard.board[2][0]);
        if (winner2) {
            console.log(`Победа игрока ${winner2} по диагонали (справа налево)`);
            return winner2;
        }

        // Если ни одна из проверок не сработала, победителя нет
        // console.log('Ничья');
        return null;
    };

    const resetGame = () => {
        game.gameBoard.board = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
        game.currentPlayer = game.playerX;
        renderBoard();
    };

    const setCell = (row, col, value) => {
        if (game.gameBoard.board[row][col] === null) {
            game.gameBoard.board[row][col] = value;
            renderBoard();

            setTimeout(() => {
                const winner = checkWin();
                if (winner) {
                    alert(`Победа игрока ${game.currentPlayer.name}!`);
                } else if (isBoardFull()) {
                    alert('Ничья!');
                } else {
                    game.currentPlayer = game.currentPlayer === game.playerX ? game.playerO : game.playerX;
                }
            }, 50);
        } else {
            console.log('Ячейка уже занята');
        }
    };

    const isBoardFull = () => {
        return game.gameBoard.board.every(row => row.every(cell => cell !== null));
    };

    const renderBoard = () => {
        const cells = document.querySelectorAll('#field td');
        cells.forEach((cell, index) => {
            const row = Math.floor(index / 3);
            const col = index % 3;
            cell.textContent = game.gameBoard.board[row][col] || '';
        });
    };

    const initGame = () => {
        const cells = document.querySelectorAll('#field td');
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                const row = Math.floor(index / 3);
                const col = index % 3;
                setCell(row, col, game.currentPlayer.symbol);
            });
        });

        // Добавляем обработчик для кнопки reset
        const resetButton = document.querySelector('#reset');
        resetButton.addEventListener('click', resetGame);

        // Добавляем обработчики для ввода имен игроков
        const playerXInput = document.querySelector('#playerX');
        const playerOInput = document.querySelector('#playerO');

        playerXInput.addEventListener('change', (e) => {
            game.playerX.name = e.target.value || 'Игрок X';
        });

        playerOInput.addEventListener('change', (e) => {
            game.playerO.name = e.target.value || 'Игрок O';
        });

        // Устанавливаем начального игрока
        game.currentPlayer = game.playerX;
    };

    return {
        setCell,
        game,
        checkWin,
        resetGame,
        initGame,
    };
})();

// Инициализация игры
gameActions.initGame();

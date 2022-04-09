const gameBoard = (function() {

  // grid containing player's markers
  const board = [];

  // cache DOM
  const gridCellsEl = [...document.getElementsByClassName('cell')];
  const gameOutcomeEl = document.getElementById('outcome');
  const restartEl = document.getElementById('restart');


  function _reactivateCell(cell) {
    _deactivateCell(cell);
    cell.addEventListener('click', playTurn);
    cell.classList.add('cell--empty');
  }
  function _deactivateCell(cell) {
    cell.removeEventListener('click', playTurn);
    cell.classList.remove('cell--empty');
  }
  function _updateGrid(callback) {
    gridCellsEl.forEach(cell => callback(cell));
  }


  function _render() {
    gridCellsEl.forEach((cell, index) => {
      cell.textContent = board[index];
    })
  }

  function _setCellChar(char, index) {
    board[index] = char;
  }

  function putMarker(marker, index) {
    if (
      index < 9 
      && index >= 0
      && (marker == 'X' || marker == 'O')
      && board[index] == ''
    ) {
      _setCellChar(marker, index);
      return true;
    }
  }

  function clearBoard() {
    for (let i = 0; i < 9; i++) {
      _setCellChar('', i);
    }
    _updateGrid(_reactivateCell);
    _render();
  }


  function _checkLineCrossed() {
    const checkRows = () => {
      if (
        (
        (board[0] == board[1] && board[0] == board[2] && board[0] != '')
        || (board[3] == board[4] && board[3] == board[5] && board[3] != '')
        || (board[6] == board[7] && board[6] == board[8] && board[6] != '')
        )
    ) return true;
    }
    const checkColumns = () => {
      if (
        (
          (board[0] == board[3] && board[0] == board[6] && board[0] != '')
          || (board[1] == board[4] && board[1] == board[7] && board[1] != '')
          || (board[2] == board[5] && board[2] == board[8] && board[2] != '')
        )
      ) return true;
    }
    const checkDiagonals = () => {
      if (
        (
          (board[0] == board[4] && board[0] == board[8] && board[0] != '')
          || (board[2] == board[4] && board[2] == board[6] && board[2] != '')
        )
      ) return true;
    }
    
    return checkRows() || checkColumns() || checkDiagonals();
  }

  // check if game is over
  function _checkBoard() {
    if (_checkLineCrossed()) {
      gameOutcomeEl.textContent = `${gameFlow.getCurMarker()} is a winner`;
      _updateGrid(_deactivateCell);
    }
    else if (!board.includes('')) {
      gameOutcomeEl.textContent = `Draw`;
      _updateGrid(_deactivateCell);
    }
  }

  function playTurn(e) {
    if (!putMarker(gameFlow.getCurMarker(), e.target.dataset.index))
      return;

    _deactivateCell(e.target);
    _render();
    _checkBoard();
    gameFlow.changePlayer();
  }


  // grid initialization
  clearBoard();
  gridCellsEl.forEach(cell => _reactivateCell(cell));
  restartEl.addEventListener('click', () => {
    clearBoard();
    gameOutcomeEl.textContent = '';
  });
})();

const gameFlow = (function() {
  let curMarker = 'X';

  function changePlayer() {
    curMarker = curMarker == 'X' ? 'O' : 'X';
  }
  function getCurMarker() {
    return curMarker;
  }
  return {getCurMarker, changePlayer}
})();
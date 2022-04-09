const gameBoard = (function() {

  // grid containing player's markers
  const board = [];

  // cache DOM
  const gridCellsEl = [...document.getElementsByClassName('cell')];

  function bindEvents() {
    gridCellsEl.forEach(cell => cell.addEventListener('click', playTurn));
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
      gridCellsEl.forEach(cell => cell.classList.add('cell--empty'));
    }
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
    if (_checkLineCrossed())
      alert(`${gameFlow.getCurMarker()} is a winner`);
    else if (!board.includes(''))
      alert('draw');
  }

  function playTurn(e) {
    if (!putMarker(gameFlow.getCurMarker(), e.target.dataset.index))
      return;

    e.target.removeEventListener('click', playTurn);
    e.target.classList.remove('cell--empty');
    _render();
    _checkBoard();
    gameFlow.changePlayer();
  }


  clearBoard();
  bindEvents();

  return {clearBoard};
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
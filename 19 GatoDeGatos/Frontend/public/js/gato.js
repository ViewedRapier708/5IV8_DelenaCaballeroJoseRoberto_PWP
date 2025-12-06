// Estado del juego
let gameState = {
  partidaId: null,
  jugadorX: null,
  jugadorO: null,
  currentPlayer: 'X',
  miniBoards: Array(9).fill(null).map(() => Array(9).fill(null)),
  miniWinners: Array(9).fill(null),
  nextBoard: -1, // -1 indica libre elección
  gameOver: false
};

// Elementos DOM
const modalJugadores = document.getElementById('modalJugadores');
const formJugadores = document.getElementById('formJugadores');
const msgModal = document.getElementById('msgModal');
const areaJuego = document.getElementById('areaJuego');
const metaBoard = document.getElementById('metaBoard');
const nombreJugadorX = document.getElementById('nombreJugadorX');
const nombreJugadorO = document.getElementById('nombreJugadorO');
const turnoActual = document.getElementById('turnoActual');
const boardInfo = document.getElementById('boardInfo');
const btnReiniciar = document.getElementById('btnReiniciar');
const tablaPuntajes = document.querySelector('#tablaPuntajes tbody');

// Utilidades
const setMsg = (el, texto) => { el.textContent = texto; };
const clearMsg = (el) => { el.textContent = ''; };

async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const info = await res.json().catch(() => ({}));
    throw new Error(info.mensaje || 'Error en la petición');
  }
  return res.json();
}

// Verificar ganador en un mini-tablero
function checkWinner(board) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  
  for (let line of lines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  
  if (board.every(cell => cell !== null)) return 'EMPATE';
  return null;
}

// Verificar ganador del meta-tablero
function checkMetaWinner() {
  return checkWinner(gameState.miniWinners);
}

// Crear tablero visual
function createBoard() {
  metaBoard.innerHTML = '';
  metaBoard.className = 'meta-board';
  
  for (let boardIdx = 0; boardIdx < 9; boardIdx++) {
    const miniBoard = document.createElement('div');
    miniBoard.className = 'mini-board';
    miniBoard.dataset.board = boardIdx;
    
    const overlay = document.createElement('div');
    overlay.className = 'mini-board-overlay';
    miniBoard.appendChild(overlay);
    
    for (let cellIdx = 0; cellIdx < 9; cellIdx++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.board = boardIdx;
      cell.dataset.cell = cellIdx;
      
      cell.addEventListener('click', handleCellClick);
      miniBoard.appendChild(cell);
    }
    
    metaBoard.appendChild(miniBoard);
  }
  
  updateBoard();
}

// Actualizar tablero visual
function updateBoard() {
  for (let boardIdx = 0; boardIdx < 9; boardIdx++) {
    const miniBoard = document.querySelector(`.mini-board[data-board="${boardIdx}"]`);
    const cells = miniBoard.querySelectorAll('.cell');
    const overlay = miniBoard.querySelector('.mini-board-overlay');
    
    // Actualizar celdas
    cells.forEach((cell, cellIdx) => {
      const value = gameState.miniBoards[boardIdx][cellIdx];
      cell.textContent = value || '';
      cell.className = 'cell';
      if (value) {
        cell.classList.add('taken', value.toLowerCase());
      }
    });
    
    // Actualizar estado del mini-tablero
    const winner = gameState.miniWinners[boardIdx];
    miniBoard.classList.remove('active', 'won', 'won-x', 'won-o', 'disabled');
    
    if (winner) {
      miniBoard.classList.add('won');
      if (winner === 'X') {
        miniBoard.classList.add('won-x');
        overlay.textContent = 'X';
      } else if (winner === 'O') {
        miniBoard.classList.add('won-o');
        overlay.textContent = 'O';
      } else {
        overlay.textContent = '=';
      }
    } else {
      overlay.textContent = '';
      if (gameState.gameOver) {
        miniBoard.classList.add('disabled');
      } else if (gameState.nextBoard === -1 || gameState.nextBoard === boardIdx) {
        miniBoard.classList.add('active');
      } else {
        miniBoard.classList.add('disabled');
      }
    }
  }
  
  // Actualizar info de turno
  if (!gameState.gameOver) {
    const playerName = gameState.currentPlayer === 'X' ? gameState.jugadorX.nombre : gameState.jugadorO.nombre;
    turnoActual.textContent = `Turno de: ${playerName} (${gameState.currentPlayer})`;
    
    if (gameState.nextBoard === -1) {
      boardInfo.textContent = 'Puedes jugar en cualquier tablero disponible';
    } else {
      boardInfo.textContent = `Debes jugar en el tablero ${gameState.nextBoard + 1}`;
    }
  }
}

// Manejar click en celda
async function handleCellClick(e) {
  if (gameState.gameOver) return;
  
  const boardIdx = parseInt(e.target.dataset.board);
  const cellIdx = parseInt(e.target.dataset.cell);
  
  // Validar movimiento
  if (gameState.nextBoard !== -1 && gameState.nextBoard !== boardIdx) return;
  if (gameState.miniWinners[boardIdx]) return;
  if (gameState.miniBoards[boardIdx][cellIdx]) return;
  
  // Realizar movimiento
  gameState.miniBoards[boardIdx][cellIdx] = gameState.currentPlayer;
  
  // Verificar si ganó el mini-tablero
  const miniWinner = checkWinner(gameState.miniBoards[boardIdx]);
  if (miniWinner) {
    gameState.miniWinners[boardIdx] = miniWinner;
    
    // Verificar ganador del meta-tablero
    const metaWinner = checkMetaWinner();
    if (metaWinner) {
      gameState.gameOver = true;
      updateBoard();
      await finalizarPartida(metaWinner);
      return;
    }
  }
  
  // Determinar siguiente tablero
  // Si el tablero actual ya tiene ganador o está lleno, permitir elegir cualquier otro
  if (gameState.miniWinners[boardIdx] || gameState.miniBoards[boardIdx].every(c => c !== null)) {
    gameState.nextBoard = -1;
  } else {
    // Si no, el juego se queda en este tablero hasta que se termine
    gameState.nextBoard = boardIdx;
  }
  
  // Cambiar turno
  gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
  
  updateBoard();
}

// Registrar jugadores e iniciar partida
formJugadores.addEventListener('submit', async (e) => {
  e.preventDefault();
  clearMsg(msgModal);
  
  try {
    const nombreX = document.getElementById('nombreX').value.trim();
    const nombreO = document.getElementById('nombreO').value.trim();
    
    if (!nombreX || !nombreO) {
      setMsg(msgModal, 'Ambos nombres son requeridos');
      return;
    }
    
    if (nombreX === nombreO) {
      setMsg(msgModal, 'Los nombres deben ser diferentes');
      return;
    }
    
    // Crear jugadores
    const jugadorX = await fetchJSON('/api/jugadores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreX })
    });
    
    const jugadorO = await fetchJSON('/api/jugadores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre: nombreO })
    });
    
    // Crear partida
    const partida = await fetchJSON('/api/partidas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jugador_x_id: jugadorX.jugador.id,
        jugador_o_id: jugadorO.jugador.id
      })
    });
    
    // Inicializar juego
    gameState.partidaId = partida.partida.id;
    gameState.jugadorX = jugadorX.jugador;
    gameState.jugadorO = jugadorO.jugador;
    
    nombreJugadorX.textContent = nombreX;
    nombreJugadorO.textContent = nombreO;
    
    modalJugadores.classList.remove('active');
    areaJuego.classList.remove('hidden');
    
    createBoard();
    
  } catch (err) {
    setMsg(msgModal, err.message);
  }
});

// Finalizar partida
async function finalizarPartida(ganador) {
  try {
    await fetchJSON(`/api/partidas/${gameState.partidaId}/finalizar`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ganador })
    });
    
    let mensaje = '';
    if (ganador === 'X') {
      mensaje = `¡${gameState.jugadorX.nombre} (X) ha ganado!`;
    } else if (ganador === 'O') {
      mensaje = `¡${gameState.jugadorO.nombre} (O) ha ganado!`;
    } else {
      mensaje = '¡Empate!';
    }
    
    boardInfo.textContent = mensaje;
    turnoActual.textContent = 'Juego terminado';
    
    await cargarPuntajes();
    
  } catch (err) {
    console.error('Error al finalizar partida:', err);
  }
}

// Reiniciar juego
btnReiniciar.addEventListener('click', () => {
  location.reload();
});

// Cargar puntajes
async function cargarPuntajes() {
  try {
    const data = await fetchJSON('/api/partidas/puntajes');
    tablaPuntajes.innerHTML = '';
    data.forEach((p) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.nombre}</td>
        <td><strong>${p.puntaje ?? 0}</strong></td>
        <td>${p.partidas_ganadas ?? 0}</td>
        <td>${p.partidas_perdidas ?? 0}</td>
        <td>${p.partidas_empatadas ?? 0}</td>
        <td>${p.partidas_jugadas ?? 0}</td>`;
      tablaPuntajes.appendChild(tr);
    });
  } catch (err) {
    console.error('Error al cargar puntajes:', err);
  }
}

// Inicializar
cargarPuntajes();

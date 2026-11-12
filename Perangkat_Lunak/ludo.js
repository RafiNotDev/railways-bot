/*
-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-
 * © : 𝘾𝙧𝙚𝙖𝙩𝙤𝙧 : @rnzdzy_
 * © : 𝙒𝙝𝙖𝙩𝙨𝙖𝙥𝙥 : wa.me/6289531204240
 * © : 𝘾𝙝𝙖𝙣𝙣𝙚𝙡 : https://whatsapp.com/channel/0029Vb91zWW2UPBL81ZqwJ39
-_-_-_-_-_-( Jangan hapus Credit )_-_-_-_-_-_-_-
*/

let handler = async (m, { conn }) => {

  await conn.sendMessage(m.chat, { react: { text: "🎲", key: m.key } });

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>
*{box-sizing:border-box;margin:0;padding:0;-webkit-tap-highlight-color:transparent;user-select:none;touch-action:manipulation}
body{background:#0a0814;display:flex;justify-content:center;align-items:center;min-height:100vh;font-family:'Segoe UI',Arial,sans-serif;color:#eee;padding:6px}
.container{width:100%;max-width:480px;margin:auto}
.card{background:#12101e;border:1px solid rgba(180,120,255,.25);border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,.6),0 0 20px rgba(180,120,255,.12)}
.header{padding:10px 16px;border-bottom:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;align-items:center;background:#0a0814}
.header-left{display:flex;flex-direction:column}
.header-left .title{font-size:20px;font-weight:bold;color:#fff;letter-spacing:1px}
.header-left .sub{font-size:10px;color:#c084fc;font-weight:bold;letter-spacing:1.5px}
.header-right{text-align:right}
.header-right .turn{font-size:14px;font-weight:bold;color:#ffd32a}
.header-right .dice{font-size:28px;line-height:1}
.body{padding:8px;position:relative}
#board{width:100%;height:auto;aspect-ratio:1;background:#0d0b18;border:1px solid rgba(180,120,255,.22);border-radius:12px;display:block;touch-action:none}
.controls{display:flex;justify-content:space-between;align-items:center;margin-top:10px;gap:8px}
.controls button{background:linear-gradient(135deg,#6c3ce0,#a855f7);border:none;border-radius:30px;padding:12px 20px;font-weight:bold;font-size:16px;color:#fff;flex:1;box-shadow:0 4px 15px rgba(168,85,247,.4);cursor:pointer;transition:all .2s;letter-spacing:1px}
.controls button:active{transform:scale(.96);opacity:.8}
.controls button:disabled{opacity:.4;transform:none;box-shadow:none}
.status{text-align:center;margin-top:8px;font-size:13px;color:rgba(255,255,255,.7);min-height:20px}
.footer{text-align:center;padding:8px;font-size:9px;color:rgba(255,255,255,.25);border-top:1px solid rgba(255,255,255,.05)}
</style>
</head>
<body>
<div class="container">
<div class="card">
<div class="header">
  <div class="header-left">
    <div class="sub">conn AI GAME</div>
    <div class="title">🎲 LUDO KING</div>
  </div>
  <div class="header-right">
    <div class="dice" id="diceDisplay">⚀</div>
    <div class="turn" id="turnDisplay">Giliran: Kamu</div>
  </div>
</div>
<div class="body">
<canvas id="board" width="450" height="450"></canvas>
<div class="controls">
  <button id="rollBtn">🎲 Lempar Dadu</button>
  <button id="resetBtn" style="flex:0.4;background:#3b2b5a;">↺</button>
</div>
<div id="status" class="status">Klik dadu untuk mulai!</div>
</div>
<div class="footer">© conn-AI • Single Player vs AI</div>
</div>
</div>
<script>
// ========== KONFIGURASI ==========
const BOARD_SIZE = 15;
const CELL_SIZE = 450 / BOARD_SIZE;
const PLAYERS = [
  { id: 0, name: 'Kamu', color: '#ff4d9e', homePos: 0, startPos: 0, finishPos: 51, pos: -1, finished: false, atHome: true },
  { id: 1, name: 'AI Merah', color: '#ff4d4d', homePos: 13, startPos: 13, finishPos: 51, pos: -1, finished: false, atHome: true },
  { id: 2, name: 'AI Hijau', color: '#4dff88', homePos: 26, startPos: 26, finishPos: 51, pos: -1, finished: false, atHome: true },
  { id: 3, name: 'AI Biru', color: '#00bfff', homePos: 39, startPos: 39, finishPos: 51, pos: -1, finished: false, atHome: true }
];
let currentPlayer = 0;
let diceValue = 0;
let gameOver = false;
let rolling = false;

// ========== JALUR ==========
function buildPath() {
  const path = [];
  for (let c = 6; c <= 8; c++) path.push([0, c]);
  for (let r = 1; r <= 5; r++) path.push([r, 8]);
  for (let r = 6; r <= 8; r++) path.push([r, 8]);
  for (let c = 7; c >= 5; c--) path.push([8, c]);
  for (let r = 9; r <= 13; r++) path.push([r, 5]);
  for (let c = 4; c >= 2; c--) path.push([13, c]);
  for (let r = 12; r >= 10; r--) path.push([r, 2]);
  for (let c = 3; c <= 5; c++) path.push([10, c]);
  for (let r = 9; r >= 6; r--) path.push([r, 5]);
  for (let c = 6; c <= 8; c++) path.push([6, c]);
  for (let c = 9; c <= 13; c++) path.push([5, c]);
  return path;
}
const basePath = buildPath();
function getPathForPlayer(playerId) {
  const offset = playerId * 13;
  const result = [];
  for (let i = 0; i < basePath.length; i++) {
    const idx = (i + offset) % basePath.length;
    result.push(basePath[idx]);
  }
  return result;
}

// ========== STATE ==========
let board = [];
function initBoard() {
  board = [];
  for (let r = 0; r < BOARD_SIZE; r++) {
    board.push(new Array(BOARD_SIZE).fill(null));
  }
}

function resetGame() {
  PLAYERS.forEach(function(p) { p.pos = -1; p.finished = false; p.atHome = true; });
  currentPlayer = 0;
  diceValue = 0;
  gameOver = false;
  rolling = false;
  document.getElementById('diceDisplay').textContent = '⚀';
  document.getElementById('turnDisplay').textContent = 'Giliran: Kamu';
  document.getElementById('status').textContent = 'Klik dadu untuk mulai!';
  document.getElementById('rollBtn').disabled = false;
  drawBoard();
}

// ========== GAMBAR ==========
const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');

function drawBoard() {
  ctx.clearRect(0, 0, 450, 450);
  ctx.fillStyle = '#0d0b18';
  ctx.fillRect(0, 0, 450, 450);

  for (let r = 0; r < BOARD_SIZE; r++) {
    for (let c = 0; c < BOARD_SIZE; c++) {
      const x = c * CELL_SIZE, y = r * CELL_SIZE;
      let color = '#1a1a2e';
      if (r < 6 && c < 6) color = '#ff4d9e';
      else if (r < 6 && c > 8) color = '#ff4d4d';
      else if (r > 8 && c < 6) color = '#4dff88';
      else if (r > 8 && c > 8) color = '#00bfff';
      const isPath = isOnPath(r, c);
      if (isPath) color = '#2a2a4a';
      ctx.fillStyle = color;
      ctx.fillRect(x, y, CELL_SIZE, CELL_SIZE);
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, CELL_SIZE, CELL_SIZE);
    }
  }

  drawHome(2, 2, '#ff4d9e', 'Kamu');
  drawHome(2, 12, '#ff4d4d', 'AI Merah');
  drawHome(12, 2, '#4dff88', 'AI Hijau');
  drawHome(12, 12, '#00bfff', 'AI Biru');

  PLAYERS.forEach(function(p, idx) {
    if (p.finished) return;
    let pos = p.pos;
    if (pos === -1) {
      const homePositions = [[2,2], [2,12], [12,2], [12,12]];
      const hr = homePositions[idx][0], hc = homePositions[idx][1];
      drawPiece(hr, hc, p.color, p.atHome);
      return;
    }
    const path = getPathForPlayer(idx);
    if (pos >= path.length) return;
    const r = path[pos][0], c = path[pos][1];
    drawPiece(r, c, p.color, false);
  });

  ctx.font = 'bold 30px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fff';
  ctx.shadowColor = '#c084fc';
  ctx.shadowBlur = 15;
  const diceSymbols = ['⚀','⚁','⚂','⚃','⚄','⚅'];
  ctx.fillText(diceValue > 0 ? diceSymbols[diceValue-1] : '🎲', 225, 225);
  ctx.shadowBlur = 0;
}

function isOnPath(r, c) {
  if (r === 0 && c >= 6 && c <= 8) return true;
  if (r >= 1 && r <= 5 && c === 8) return true;
  if (r === 6 && c >= 6 && c <= 8) return true;
  if (r >= 7 && r <= 8 && c === 5) return true;
  if (r === 9 && c >= 2 && c <= 5) return true;
  if (r >= 10 && r <= 13 && c === 2) return true;
  if (r === 10 && c >= 3 && c <= 5) return true;
  if (r >= 6 && r <= 9 && c === 5) return true;
  if (r === 5 && c >= 6 && c <= 8) return true;
  if (r === 5 && c >= 9 && c <= 13) return true;
  return false;
}

function drawHome(row, col, color, label) {
  const x = col * CELL_SIZE, y = row * CELL_SIZE;
  ctx.fillStyle = color;
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.arc(x + CELL_SIZE/2, y + CELL_SIZE/2, CELL_SIZE*1.8, 0, Math.PI*2);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x + CELL_SIZE/2, y + CELL_SIZE/2, CELL_SIZE*1.5, 0, Math.PI*2);
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 10px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, x + CELL_SIZE/2, y + CELL_SIZE/2 - 10);
}

function drawPiece(row, col, color, isHome) {
  const x = col * CELL_SIZE + CELL_SIZE/2;
  const y = row * CELL_SIZE + CELL_SIZE/2;
  const radius = isHome ? CELL_SIZE*0.35 : CELL_SIZE*0.4;
  ctx.shadowColor = color;
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.globalAlpha = 0.5;
  ctx.beginPath();
  ctx.arc(x-3, y-3, 3, 0, Math.PI*2);
  ctx.fill();
  ctx.globalAlpha = 1;
}

// ========== LOGIKA ==========
function rollDice() {
  if (rolling || gameOver) return;
  if (currentPlayer !== 0) {
    document.getElementById('status').textContent = 'Tunggu giliran AI...';
    return;
  }
  rolling = true;
  document.getElementById('rollBtn').disabled = true;
  let count = 0;
  const interval = setInterval(function() {
    const val = Math.floor(Math.random() * 6) + 1;
    const symbols = ['⚀','⚁','⚂','⚃','⚄','⚅'];
    document.getElementById('diceDisplay').textContent = symbols[val-1];
    count++;
    if (count > 10) {
      clearInterval(interval);
      diceValue = Math.floor(Math.random() * 6) + 1;
      const symbols2 = ['⚀','⚁','⚂','⚃','⚄','⚅'];
      document.getElementById('diceDisplay').textContent = symbols2[diceValue-1];
      processTurn(0);
    }
  }, 80);
}

function processTurn(playerIdx) {
  const player = PLAYERS[playerIdx];
  if (player.finished) {
    nextTurn();
    return;
  }

  if (player.atHome && diceValue === 6) {
    player.atHome = false;
    player.pos = 0;
    document.getElementById('status').textContent = player.name + ' keluar rumah!';
    drawBoard();
    if (playerIdx === 0) {
      document.getElementById('status').textContent += ' Dapat giliran lagi!';
      rolling = false;
      document.getElementById('rollBtn').disabled = false;
      return;
    } else {
      setTimeout(function() { processTurn(playerIdx); }, 500);
      return;
    }
  }

  if (!player.atHome && player.pos >= 0) {
    const path = getPathForPlayer(playerIdx);
    const newPos = player.pos + diceValue;
    if (newPos >= path.length) {
      player.finished = true;
      player.pos = -1;
      document.getElementById('status').textContent = player.name + ' SELESAI! 🏆';
      drawBoard();
      if (playerIdx === 0) {
        gameOver = true;
        document.getElementById('status').textContent = '🎉 Kamu MENANG!';
        document.getElementById('rollBtn').disabled = true;
        return;
      }
      checkGameOver();
      nextTurn();
      return;
    }
    const nr = path[newPos][0], nc = path[newPos][1];
    let eaten = false;
    PLAYERS.forEach(function(other, idx) {
      if (idx === playerIdx || other.finished || other.atHome) return;
      const otherPath = getPathForPlayer(idx);
      if (other.pos >= 0 && other.pos < otherPath.length) {
        const or = otherPath[other.pos][0], oc = otherPath[other.pos][1];
        if (or === nr && oc === nc) {
          other.atHome = true;
          other.pos = -1;
          eaten = true;
          document.getElementById('status').textContent = player.name + ' memakan pion ' + other.name + '!';
        }
      }
    });
    player.pos = newPos;
    drawBoard();
    if (eaten) {
      if (playerIdx === 0) {
        document.getElementById('status').textContent += ' Dapat giliran lagi!';
        rolling = false;
        document.getElementById('rollBtn').disabled = false;
        return;
      } else {
        setTimeout(function() { processTurn(playerIdx); }, 500);
        return;
      }
    }
    if (diceValue === 6) {
      if (playerIdx === 0) {
        document.getElementById('status').textContent = 'Kamu dapat giliran lagi!';
        rolling = false;
        document.getElementById('rollBtn').disabled = false;
        return;
      } else {
        setTimeout(function() { processTurn(playerIdx); }, 500);
        return;
      }
    }
  }

  if (playerIdx === 0) {
    rolling = false;
    document.getElementById('rollBtn').disabled = false;
    document.getElementById('status').textContent = 'Giliran AI...';
    setTimeout(function() { aiTurn(); }, 600);
  } else {
    nextTurn();
  }
}

function aiTurn() {
  if (gameOver) return;
  let aiPlayers = [];
  PLAYERS.forEach(function(p, idx) {
    if (idx !== 0 && !p.finished) aiPlayers.push(idx);
  });
  if (aiPlayers.length === 0) {
    checkGameOver();
    return;
  }
  let idx = currentPlayer;
  if (idx === 0 || PLAYERS[idx].finished) {
    for (let i = 1; i <= 3; i++) {
      let n = (currentPlayer + i) % 4;
      if (n !== 0 && !PLAYERS[n].finished) { idx = n; break; }
    }
  }
  currentPlayer = idx;
  const player = PLAYERS[idx];
  document.getElementById('turnDisplay').textContent = 'Giliran: ' + player.name;
  diceValue = Math.floor(Math.random() * 6) + 1;
  const symbols = ['⚀','⚁','⚂','⚃','⚄','⚅'];
  document.getElementById('diceDisplay').textContent = symbols[diceValue-1];
  document.getElementById('status').textContent = player.name + ' melempar ' + diceValue;
  drawBoard();
  setTimeout(function() {
    processTurn(idx);
  }, 400);
}

function nextTurn() {
  if (gameOver) return;
  let next = (currentPlayer + 1) % 4;
  let attempts = 0;
  while (PLAYERS[next].finished && attempts < 4) {
    next = (next + 1) % 4;
    attempts++;
  }
  if (attempts >= 4) {
    checkGameOver();
    return;
  }
  currentPlayer = next;
  document.getElementById('turnDisplay').textContent = 'Giliran: ' + PLAYERS[next].name;
  if (next === 0) {
    rolling = false;
    document.getElementById('rollBtn').disabled = false;
    document.getElementById('status').textContent = 'Giliran kamu! Klik dadu.';
  } else {
    document.getElementById('rollBtn').disabled = true;
    document.getElementById('status').textContent = 'Giliran ' + PLAYERS[next].name + '...';
    setTimeout(function() { aiTurn(); }, 600);
  }
}

function checkGameOver() {
  const finished = PLAYERS.every(function(p) { return p.finished; });
  if (finished) {
    gameOver = true;
    document.getElementById('rollBtn').disabled = true;
    document.getElementById('status').textContent = '🏁 Permainan selesai! Semua selesai.';
  }
}

// ========== INISIALISASI ==========
resetGame();

document.getElementById('rollBtn').addEventListener('click', rollDice);
document.getElementById('resetBtn').addEventListener('click', resetGame);
</script>
</body>
</html>`;

  await conn.relayMessage(
    m.chat,
    {
      messageContextInfo: {
        deviceListMetadata: {},
        deviceListMetadataVersion: 2,
        botMetadata: {}
      },
      botForwardedMessage: {
        message: {
          richResponseMessage: {
            messageType: 1,
            submessages: [
              {
                messageType: 2,
                messageText: "🎲 Ludo King"
              }
            ],
            unifiedResponse: {
              data: Buffer.from(
                JSON.stringify({
                  response_id: "ludo-" + Date.now(),
                  sections: [
                    {
                      view_model: {
                        primitive: {
                          __typename: "GenAIaeacdsnwHtmlPrimitive",
                          payload: html,
                          trusted_sources: []
                        },
                        __typename: "GenAISingleLayoutViewModel"
                      }
                    }
                  ]
                })
              ).toString("base64")
            },
            contextInfo: {
              forwardingScore: 1,
              isForwarded: true,
              forwardedAiBotMessageInfo: {
                botJid: "867051314767696@bot"
              },
              forwardOrigin: 4
            }
          }
        }
      }
    },
    {}
  );
};

handler.command = ["ludo", "ludoking", "game_ludo"];
handler.help = ["ludo"];
handler.tags = ["game"];

export default handler
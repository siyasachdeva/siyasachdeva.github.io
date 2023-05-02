let selectedSquare = null;

function getSquareByRankAndFile(rank, file) {
  return document.querySelector(`.square[data-rank="${rank}"][data-file="${file}"]`);
}

function getRankAndFileBySquare(square) {
  return {
    rank: Number(square.getAttribute("data-rank")),
    file: Number(square.getAttribute("data-file")),
  };
}

function selectSquare(square) {
  if (selectedSquare) {
    selectedSquare.classList.remove("selected");
  }
  selectedSquare = square;
  selectedSquare.classList.add("selected");
}

function movePiece(fromSquare, toSquare) {
  const fromPiece = fromSquare.firstChild;
  const toPiece = toSquare.firstChild;
  if (fromPiece && (fromPiece != toPiece)) {
    toSquare.appendChild(fromPiece);
    if (toPiece) {
      toPiece.remove();
      if (toPiece.classList.contains("king")) {
        const winImg = document.querySelector('.win')
        winImg.classList.remove("hidden")
      }
    }
  }
}

function handleSquareClick(event) {
  const square = event.target.closest(".square");
  if (square) {
    if (selectedSquare) {
      movePiece(selectedSquare, square);
      selectedSquare.classList.remove("selected");
      selectedSquare = null;
    } else if (square.firstChild) {
      selectSquare(square);
    }
  }
}

document.querySelectorAll(".square").forEach((square) => {
  square.addEventListener("click", handleSquareClick);
});



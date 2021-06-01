// Si importás el script abajo de todo en el HTML no hace falta este listener
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const scoreDisplay = document.getElementById("score");
  const width = 8;
  const squares = [];
  let score = 0;

  const avengersLogo = [
    "url(../images/cap-logo.png)",
    "url(../images/hawkeye-logo.png)",
    "url(../images/hulk-logo.png)",
    "url(../images/iron-logo.png)",
    "url(../images/thor-logo.png)",
    "url(../images/widow-logo.png)",
  ];

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      const square = document.createElement("div");
      square.setAttribute("draggable", true);
      square.setAttribute("id", i);
      let randomLogo = Math.floor(Math.random() * avengersLogo.length);
      square.style.backgroundImage = avengersLogo[randomLogo];
      grid.appendChild(square);
      squares.push(square);
    }
  }
  createBoard();

  let logoBeingDragged;
  let logoBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  squares.forEach((square) => square.addEventListener("dragstart", dragStart));
  squares.forEach((square) => square.addEventListener("dragend", dragEnd));
  squares.forEach((square) => square.addEventListener("dragover", dragOver));
  squares.forEach((square) => square.addEventListener("dragenter", dragEnter));
  squares.forEach((square) => square.addEventListener("drageleave", dragLeave));
  squares.forEach((square) => square.addEventListener("drop", dragDrop));

  function dragStart() {
    logoBeingDragged = this.style.backgroundImage;
    squareIdBeingDragged = parseInt(this.id);
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
  }

  function dragLeave() {
    this.style.backgroundImage = "";
  }

  function dragDrop() {
    logoBeingReplaced = this.style.backgroundImage;
    squareIdBeingReplaced = parseInt(this.id);
    this.style.backgroundImage = logoBeingDragged;
    squares[squareIdBeingDragged].style.backgroundImage = logoBeingReplaced;
  }

  function dragEnd() {
    //Movimientos validos
    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width,
    ];
    let validMove = validMoves.includes(squareIdBeingReplaced);

    const isPointer = checkRowForThree();

    if (isPointer) {
      if (squareIdBeingReplaced && validMove) {
        squareIdBeingReplaced = null;
      } else if (squareIdBeingReplaced && !validMove) {
        squares[squareIdBeingReplaced].style.backgroundImage =
          logoBeingReplaced;
        squares[squareIdBeingDragged].style.backgroundImage = logoBeingDragged;
      } else
        squares[squareIdBeingDragged].style.backgroundImage = logoBeingDragged;
    }
  }

  //Dropear logos cuando desaparezcan
  function moveIntoSquareBelow() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style.backgroundImage === "") {
        squares[i + width].style.backgroundImage =
          squares[i].style.backgroundImage;
        squares[i].style.backgroundImage = "";
        const firstRow = [0, 1, 2, 3, 4, 5, 6, 7];
        const isFirstRow = firstRow.includes(i);
        if (isFirstRow && squares[i].style.backgroundImage === "") {
          let randomAvenger = Math.floor(Math.random() * avengersLogo.length);
          squares[i].style.backgroundImage = avengersLogo[randomAvenger];
        }
      }
    }
  }

  //Filas de 3
  function checkRowForThree() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedLogo = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55];
      if (notValid.includes(i)) continue;

      if (
        rowOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedLogo && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        rowOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkRowForThree();

  //Columnas de 3
  function checkColumnForThree() {
    for (i = 0; i < 47; i++) {
      let columnOfThree = [i, i + width, i + width * 2];
      let decidedLogo = squares[i].style.backgroundImage;
      const isBlank = squares[i].style.backgroundImage === "";

      if (
        columnOfThree.every(
          (index) =>
            squares[index].style.backgroundImage === decidedLogo && !isBlank
        )
      ) {
        score += 3;
        scoreDisplay.innerHTML = score;
        columnOfThree.forEach((index) => {
          squares[index].style.backgroundImage = "";
        });
      }
    }
  }
  checkColumnForThree();

  window.setInterval(function () {
    checkRowForThree();
    checkColumnForThree();
    moveIntoSquareBelow();
  }, 100);
});

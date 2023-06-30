import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    let canvas = document.getElementById("chess");
    let context = canvas.getContext("2d");
    let initialRowSquareWhite = 200;
    let initialRowSquareBlack = 200;
    let initialColumnSquare = 100;
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if ((row + col) % 2 === 0) {
          context.fillStyle = "white";
          context.fillRect(initialRowSquareWhite, initialColumnSquare, 50, 50);
        } else {
          context.fillStyle = "pink";
          context.fillRect(initialRowSquareBlack, initialColumnSquare, 50, 50);
        }
        initialRowSquareWhite = initialRowSquareWhite + 50;
        initialRowSquareBlack = initialRowSquareBlack + 50;
      }
      initialRowSquareWhite = 200;
      initialRowSquareBlack = 200;
      initialColumnSquare = initialColumnSquare + 50;
    }
  }, []);
  return <canvas id="chess" width="800" height="800"></canvas>;
}

export default App;

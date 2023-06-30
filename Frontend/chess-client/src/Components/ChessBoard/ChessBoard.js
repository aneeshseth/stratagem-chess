import React, { useEffect } from "react";
import axios from "axios";

function ChessBoard() {
  const createCanvas = () => {
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
  };
  const checkLogin = async () => {
    const res = await axios.get("http://localhost:3500/verify", {
      withCredentials: true,
    });
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await checkLogin();
      createCanvas();
    };
    fetchData();
  });
  return <canvas id="chess" width="800" height="800"></canvas>;
}

export default ChessBoard;

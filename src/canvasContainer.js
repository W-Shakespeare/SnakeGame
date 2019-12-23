import React from "react";
// import CanvasComponent from "./canvasComponent";
import apple from "./img/apple.jpg";
import snake from "./img/snake.jpg";
import e from './audio/track.mp3'
class CanvasContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snake: 2,
      allScore: [0],
      pause: false
    };
  }

  componentDidMount() {
    this.updateCanvas();
  }

  updateCanvas = () => {
    const ctx = this.refs.canvas.getContext("2d");
    let start = undefined;
    let canvasWidth = 600;
    let canvasHeight = 500;
    let blockSize = 10;
    let widthBlock = canvasWidth / blockSize;
    let heightBlock = canvasHeight / blockSize;
    let x = 250;
    let y = 250;
    let arrSnake = [{ x: 250, y: 250 }, { x: 260, y: 250 }, { x: 270, y: 250 }];
    let arrSnake2 = [
      { x: 150, y: 250 },
      { x: 160, y: 250 },
      { x: 170, y: 250 }
    ];
    let arrSnake3 = [
      { x: 350, y: 250 },
      { x: 360, y: 250 },
      { x: 370, y: 250 }
    ];
    let applePositionX = 100;
    let applePositionY = 100;
    let score = 0;
    let imageSnake = new Image();
    imageSnake.src = snake;
    let imageApple = new Image();
    imageApple.src = apple;

    imageSnake.onload = () => {
      imageApple.onload = () => {
        let speed = 30;
        let body = document.body;
        const snake = function(direction, nextDirection, arrSnake, id) {
          this.direction = direction;
          this.nextDirection = nextDirection;
          this.arrSnake = arrSnake;
          // this.scoreSnake = 0;
          this.id = id;
        };
        snake.prototype.gameOver = function(str) {
          clearInterval(start);
          alert("Game Over ");
          console.log("Game Over " + str);
        };
        snake.prototype.border = function(x, y) {
          if (x == 0 || x == 490 || y == 0 || y == 490) {
            this.gameOver("border");
            return true;
          }
        };
        snake.prototype.collision = function(arr) {
          arr.forEach((it, i, ar) => {
            if (i == 0) {
              return;
            }
            if (ar[0]["x"] == ar[i]["x"] && ar[0]["y"] == ar[i]["y"]) {
              this.gameOver("colision");
            } else {
              return false;
            }
          });
        };
        snake.prototype.newHead = function(x, y) {
          return { x: x, y: y };
        };
        snake.prototype.circle = function(x, y, snakeColor) {
          ctx.beginPath();
          ctx.lineWidth = "1";
          ctx.strokeStyle = snakeColor;
          // ctx.fillStyle = snakeColor;
          ctx.arc(x + 5, y + 5, blockSize / 2, 0, 3.14 * 2, false);
          // ctx.fill();
          ctx.stroke();
        };
        snake.prototype.newPosition = function(x, y, anyArrSnake, snakeColor) {
          anyArrSnake.unshift(this.newHead(x, y));
          anyArrSnake.pop();
          ctx.beginPath();
          anyArrSnake.forEach((it, i, ar) => {
            i == 0
              ? ctx.drawImage(
                  imageSnake,
                  ar[i]["x"],
                  anyArrSnake[i]["y"],
                  blockSize,
                  blockSize
                )
              : this.circle(ar[i]["x"], ar[i]["y"], snakeColor);
          });
        };
        snake.prototype.check = function(nextDirection, direction) {
          if (direction == "left" && nextDirection == "right") {
            return false;
          } else if (direction == "right" && nextDirection == "left") {
            return false;
          } else if (direction == "down" && nextDirection == "up") {
            return false;
          } else if (direction == "up" && nextDirection == "down") {
            return false;
          } else {
            return true;
          }
        };

        // let e = {0:0,1:0,2:0}
        // let id=1
        // e[id]f

        snake.prototype.score = id => {
          // debugger;
          // arrS[id].scoreSnake++;
          // this.setState({ allScore: scoreSnake });
        };
        snake.prototype.id = function() {
          return this.id;
        };
        snake.prototype.move = function(
          nextdirection,
          clever,
          x = this.arrSnake[0].x,
          y = this.arrSnake[0].y,
          anyArrSnake = this.arrSnake,
          snakeColor = "blue",
          xy,
          snake
        ) {
          if (clever == "clever") {
            cleverSnake(anyArrSnake, snakeColor, snake, xy);
          } else if (clever == "none") {
            if (this.border(x, y)) {
              return;
            }
            this.collision(anyArrSnake);
            if (this.check(nextdirection, this.direction)) {
              this.direction = nextdirection;
              if (this.direction == "left") {
                this.newPosition((x -= blockSize), y, anyArrSnake, snakeColor);
              } else if (this.direction == "right") {
                this.newPosition((x += blockSize), y, anyArrSnake, snakeColor);
              } else if (this.direction == "down") {
                this.newPosition(x, (y += blockSize), anyArrSnake, snakeColor);
              } else if (this.direction == "up") {
                this.newPosition(x, (y -= blockSize), anyArrSnake, snakeColor);
              }
            }
          }
          if (clever == "clever2") {
            this.direction = nextdirection;
            if (this.direction == "left") {
              this.newPosition((x -= blockSize), y, anyArrSnake, snakeColor);
            } else if (this.direction == "right") {
              this.newPosition((x += blockSize), y, anyArrSnake, snakeColor);
            } else if (this.direction == "down") {
              this.newPosition(x, (y += blockSize), anyArrSnake, snakeColor);
            } else if (this.direction == "up") {
              this.newPosition(x, (y -= blockSize), anyArrSnake, snakeColor);
            }
          }
        };
        function xdir(
          xSnake,
          ySnake,
          xApple,
          yApple,
          anyArrSnake,
          snakeColor,
          snake
        ) {
          xSnake == xApple
            ? ySnake > yApple
              ? snake.move(
                  "up",
                  "clever2",
                  anyArrSnake[0].x,
                  anyArrSnake[0].y,
                  anyArrSnake,
                  snakeColor
                )
              : snake.move(
                  "down",
                  "clever2",
                  anyArrSnake[0].x,
                  anyArrSnake[0].y,
                  anyArrSnake,
                  snakeColor
                )
            : xSnake < xApple
            ? snake.move(
                "right",
                "clever2",
                anyArrSnake[0].x,
                anyArrSnake[0].y,
                anyArrSnake,
                snakeColor
              )
            : snake.move(
                "left",
                "clever2",
                anyArrSnake[0].x,
                anyArrSnake[0].y,
                anyArrSnake,
                snakeColor
              );
        }
        function ydir(
          xSnake,
          ySnake,
          xApple,
          yApple,
          anyArrSnake,
          snakeColor,
          snake
        ) {
          ySnake == yApple
            ? xSnake > xApple
              ? snake.move(
                  "left",
                  "clever2",
                  anyArrSnake[0].x,
                  anyArrSnake[0].y,
                  anyArrSnake,
                  snakeColor
                )
              : snake.move(
                  "right",
                  "clever2",
                  anyArrSnake[0].x,
                  anyArrSnake[0].y,
                  anyArrSnake,
                  snakeColor
                )
            : ySnake < yApple
            ? snake.move(
                "down",
                "clever2",
                anyArrSnake[0].x,
                anyArrSnake[0].y,
                anyArrSnake,
                snakeColor
              )
            : snake.move(
                "up",
                "clever2",
                anyArrSnake[0].x,
                anyArrSnake[0].y,
                anyArrSnake,
                snakeColor
              );
        }
        function cleverSnake(anyArrSnake, snakeColor, snake, xy) {
          let xSnake = anyArrSnake[0].x;
          let ySnake = anyArrSnake[0].y;
          let xApple = applePositionX;
          let yApple = applePositionY;
          if (xy == "x") {
            xdir(
              xSnake,
              ySnake,
              xApple,
              yApple,
              anyArrSnake,
              snakeColor,
              snake
            );
          } else {
            ydir(
              xSnake,
              ySnake,
              xApple,
              yApple,
              anyArrSnake,
              snakeColor,
              snake
            );
          }

          apple(anyArrSnake, snake);
        }

        function renderLine() {
          canvasWidth = 500;
          let blockSize = 10;
          let y = 10;
          ctx.font = "20px Arial";
          ctx.fillStyle = "blue";
          ctx.textAlign = "left";
          // ctx.fillText(`Счет ${score}`, 500, 20);
          ctx.closePath();
          for (let i = 0; i < 49; i++) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            // ctx.strokeStyle = "lightblue";

            ctx.strokeStyle = "gray";
            //ctx.strokeStyle = "lightsteelblue";
            ctx.moveTo(10, blockSize);
            ctx.lineTo(canvasWidth - 10, blockSize);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(blockSize, 10);
            ctx.lineTo(blockSize, canvasHeight - 10);

            ctx.stroke();
            blockSize += 10;
          }
        }

        function field() {
          renderLine();
        }

        function compare(arr) {
          return applePositionX == arr[0]["x"] && applePositionY == arr[0]["y"]
            ? true
            : false;
        }

        let key = 37;
        body.onkeydown = function(event) {
          if (
            event.keyCode == 37 ||
            event.keyCode == 38 ||
            event.keyCode == 39 ||
            event.keyCode == 40
          ) {
            key = event.keyCode;
            console.log(key);
          }
        };
        let left = "left";
        // let snake1 = new snake(left, left, arrSnake);
        let snake2 = new snake(left, left, arrSnake2);
        // let snake3 = new snake(left, left, arrSnake3);
        // debugger;
        console.log(this.state.snake);
        let arrr = [];
        let o = this.state.snake;

        console.log(o);
        for (let i = 0; i < o; i++) {
          let snakeX = snakeNewPosition();
          let snakeY = snakeNewPosition();
          // if (i == 0) {
          //   let arrSnakez = [
          //     { x: 250, y: 250 },
          //     { x: 260, y: 250 },
          //     { x: 270, y: 250 }
          //   ];
          //   let snake4 = new snake(left, left, arrSnakez, i);
          //   arrr.push(snake4);
          // } else {
            let arrSnakez = [{ x: snakeX, y: snakeY }];
            console.log(arrSnakez);
            // debugger;
            let snake5 = new snake(left, left, arrSnakez, i);

            let t = snake5.id;
            console.log(t);
            arrr.push(snake5);
            
          // }
        }
        let scoreArr = [];
        for (let i = 0; i < o; i++) {
          let score = 0;
          scoreArr.push(score);
        }

        function getRandomSnakeColor() {
          let val = Math.round(Math.random() * (480 - 10) + 10);
          let color;

          return val < 50
            ? (color = "red")
            : val < 200
            ? (color = "green")
            : val < 300
            ? (color = "yellow")
            : val < 480
            ? (color = "pink")
            : false;
        }
        const Game = key => {
          console.log(key);
          let directionObj = { 38: "up", 37: "left", 40: "down", 39: "right" };
          field();

          arrr.forEach((s, i) => {
            // debugger;
            if (i == 0) {
              // s.move(directionObj[key], "none");
               s.move(
                  "left",
                  "clever",
                  undefined,
                  undefined,
                  undefined,
                  "red",
                  "x",
                  s
                );
            } else {
              // if (i % 2 == 0) {
                s.move(
                  "left",
                  "clever",
                  undefined,
                  undefined,
                  undefined,
                  "green",
                  "y",
                  s
                );
              // } else {
              //   s.move(
              //     "left",
              //     "clever",
              //     undefined,
              //     undefined,
              //     undefined,
              //     "green",
              //     "y",
              //     s
              //   );
              // }
            }
          });
          //

          apple(Object.values(arrr[0])[2], arrr[0]);
        };

        const apple = (arrSnake, snake) => {
          console.log(snake);

          if (compare(arrSnake)) {
            arrSnake.push({ x: applePositionX - 10, y: applePositionY - 10 });
            appleMove();

            let id = snake.id;
            // let n = this.state.allScore[0][id];

            scoreArr[id] = scoreArr[id] + 1;
            console.log(scoreArr);
            this.setState({
              allScore: scoreArr
            });
            // snake.score(snake.id());
            // score++;
          }

          ctx.drawImage(
            imageApple,
            applePositionX,
            applePositionY,
            blockSize,
            blockSize
          );
        };
        function snakeNewPosition() {
          let val = Math.round(Math.random() * (480 - 10) + 10);
          return Math.round(val / 10) * 10;
        }
        function appleNewPosition() {
          let val = Math.round(Math.random() * (480 - 10) + 10);
          return Math.round(val / 10) * 10;
        }
        function appleMove() {
          applePositionX = appleNewPosition();
          applePositionY = appleNewPosition();
        }

        //apple
        // otherFunc
        // body.addEventListener("click", function() {
        //   clearInterval(start);
        // });
        body.addEventListener("keydown", event => {
          if (event.code === "Space") {
            clearInterval(start);
            this.setState({ pause: true });
            // debugger;
            // ctx.clearRect(0, 0, 500, 500);
          }
        });
        body.addEventListener("keydown", event => {
          
          if (event.code == "KeyX" && event.ctrlKey) {
            this.setState({ pause: false });
            //debugger;
            clearInterval(start);
            speed -= 35;
            start = setInterval(() => {
              ctx.clearRect(0, 0, 600, 500);
              Game(key);
            }, speed);
          } else if (event.code == "KeyZ" && event.ctrlKey) {
            this.setState({ pause: false });
            clearInterval(start);
            speed += 35;
            start = setInterval(() => {
              ctx.clearRect(0, 0, 600, 500);
              Game(key);
            }, speed);
          } else if (event.code == "KeyQ" && event.ctrlKey) {
            // this.setState({ pause: false });
            clearInterval(start);
            start = setInterval(() => {
              ctx.clearRect(0, 0, 600, 500);
              Game(key);
            }, speed);
          }
        });

        start = setInterval(() => {
          ctx.clearRect(0, 0, 600, 500);
          Game(key);
        }, speed);
      };
    };
  };
  // }
  render() {
    const p = this.state.allScore.map((item, index) => (
      <p
        className="p_snake"
        style={{
          color: index === 0 ? "red" : index % 2 == 0 ? "red" : "green"
        }}
      >
        {item}
      </p>
    ));
    console.log(`RENDER ${this.state}`);
    console.log(this.state);
    let pause = this.state.pause;
    // console.log(this.state.allScore);
    return (
      <div className="content">
        {pause == true && <p className="p_pause">Pause</p>}
        <div className="content_p">{p}</div>
        {/* <embed loop="true" src="./audio/track.mp3" hidden="false" type="video/quicktime"></embed> */}
        {/* <audio autoplay="autoplay" loop='loop' ><source src={e} type="audio/mp3" /></audio> */}
        <canvas
          className="canvas"
          ref="canvas"
          width="500px"
          height="500px"
        ></canvas>
        ;
      </div>
    );
  }
}
export default CanvasContainer;

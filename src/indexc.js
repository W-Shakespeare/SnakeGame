import React from "react";
import ReactDOM from "react-dom";
import apple from "./img/apple.jpg";

class CanvasComponent extends React.Component {
  componentDidMount() {
    this.updateCanvas();
  }
  updateCanvas() {
    const ctx = this.refs.canvas.getContext("2d");
    let appleImage = new Image();
    appleImage.src = apple;
    appleImage.onload = () => {
      console.log(11111111);
      f();
    };
    function f() {
      ctx.drawImage(appleImage, 200, 200, 250, 250);
    }
    // appleImage.addEventListener(
    //   "load",
    //   function() {
    //     ctx.drawImage(appleImage, 200, 200, 250, 250);
    //     console.log("load");
    //   },
    //   false
    // );
  }
  render() {
    return <canvas ref="canvas" width="600px" height="500px"></canvas>;
  }
}
ReactDOM.render(<CanvasComponent />, document.getElementById("root"));

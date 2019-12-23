import React, { useState } from "react";
import ReactDOM from "react-dom";
// import apple from "./img/apple.jpg";
// // import apple from "./img/apple.jpg";
// import snake from "./img/snake.jpg";
// import Canvas from "./canvasComponent";
import "./css/index.css";
import CanvasContainer from "./canvasContainer";
import P from "./p";

class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: false
    };
    this.changeColorText();
  }

  changeColorText() {
    setTimeout(() => {
      debugger;
      this.setState({ change: true });
    }, 3000);
    setTimeout(() => {
      debugger;
      this.setState({ change: false });
    }, 8000);
  }

  render() {
    return (
      <div className="wrapper">
        <CanvasContainer />
        <P change={this.state.change} className="p_text">
          Чтобы разогнать змейку используй ctrl+x
        </P>
        <P className="p_text">Чтобы замедлить змейку используй ctrl+z</P>
        <P className="p_text">Чтобы поставить на паузу используй SPACE</P>
        <P className="p_text">
          Чтобы снять с паузы используй ctrl+x или ctrl+z
        </P>
      </div>
    );
  }
}

// function Wrapper() {
//   // let [number, setNumber] = useState(false);
//   return (
//     <div className="wrapper">
//       <CanvasContainer />
//       <P change={number} className="p_text">
//         Чтобы разогнать змейку используй ctrl+x
//       </P>
//       <P className="p_text">Чтобы замедлить змейку используй ctrl+z</P>
//       <P className="p_text">Чтобы поставить на паузу используй SPACE</P>
//       <P className="p_text">Чтобы снять с паузы используй ctrl+x или ctrl+z</P>
//     </div>
//   );
// }

ReactDOM.render(<Wrapper />, document.getElementById("root"));

// ReactDOM.render(<CanvasComponent />, document.getElementById("root"));

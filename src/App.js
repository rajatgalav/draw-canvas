import React from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.x = "";
    this.y = "";
    this.isPainting = "";
    this.canvas = "";
    this.context = ""
  }
  
  componentDidMount() {
    this.canvas = document.querySelector('canvas')
    this.context = this.canvas.getContext('2d')
    this.canvas.setAttribute('width', window.innerWidth)
    this.canvas.setAttribute('height', window.innerHeight)
    this.canvas.addEventListener('mousedown', this.startPaint)
    this.canvas.addEventListener('touchstart', this.startPaint)
    this.canvas.addEventListener("mousemove", this.paint);
    this.canvas.addEventListener("touchmove", this.paint);
    this.canvas.addEventListener("mouseup", this.exit);
    this.canvas.addEventListener("mouseleave", this.exit);
    this.canvas.addEventListener("touchend", this.exit);
  }

  getCoordinates = (event) => {
    // check to see if mobile or desktop
    if (["mousedown", "mousemove"].includes(event.type)) {
      // click events
      return [event.pageX - this.canvas.offsetLeft, event.pageY - this.canvas.offsetTop];
    } else {
      // touch coordinates
      return [
        event.touches[0].pageX - this.canvas.offsetLeft,
        event.touches[0].pageY - this.canvas.offsetTop
      ];
    }
  }

  startPaint = (e) => {
    // change the old coordinates to the new ones*
    this.isPainting = true;
    let coordinates = this.getCoordinates(e);
    this.x = coordinates[0];
    this.y = coordinates[1];
  }

  drawLine = (firstX, firstY, secondX, secondY) => {
    // set the attributes of the line
    this.context.strokeStyle = "black";
    this.context.lineJoin = "round";
    this.context.lineWidth = 5;
  
    this.context.beginPath();
    this.context.moveTo(secondX, secondY);
    this.context.lineTo(firstX, firstY);
    this.context.closePath();
  
    // actually draw the path*
    this.context.stroke();
  }
  
  paint = (e) => {
    if (this.isPainting) {
      let [newX, newY] = this.getCoordinates(e);
      this.drawLine(this.x, this.y, newX, newY);
  
      // Set x and y to our new coordinates
      this.x = newX;
      this.y = newY;
    }
  }

  exit = () => {
    this.isPainting = false;
  }

  render() {
    return (
      <div className="App">
        <canvas>

        </canvas>
      </div>
    );
  }
}

export default App;

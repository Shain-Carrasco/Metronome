import React from 'react';
import ReactDOM from 'react-dom';
import frogblock from '../../sounds/trimmed_frogblock.wav';
import woodblock from '../../sounds/trimmed_woodblock.wav';
import highWoodblock from '../../sounds/trimmed_highWoodblock.wav';
import $ from 'jquery';
/*      ../                 ../
to get out of src    to get out of client
*/
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempo: 60,
      playing: false,
      piece: '',
      oldTempo: null,
      oldPiece: ''
    };
    this.frogblock = new Audio(frogblock);
    this.frogblock.volume = 1;
    this.woodblock = new Audio(woodblock);
    this.highWoodblock = new Audio(highWoodblock);
    this.startStop = this.startStop.bind(this);
    this.playClick = this.playClick.bind(this);
    this.saveTempo = this.saveTempo.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.pieceChanger = this.pieceChanger.bind(this);
  }

 playClick() {
   this.frogblock.play()
 }

startStop() {
  if (this.state.playing){
    clearInterval(this.timer);
    this.setState({playing: false});
  } else {
    this.timer = setInterval(this.playClick,(60/this.state.tempo) * 1000);
    this.setState({playing: true}, this.playClick)
  }
  setTimeout( () => {console.log('This is the state: ', this.state)}, 0);
}
saveTempo(event) {
  event.preventDefault()
  if (this.state.playing){
    clearInterval(this.timer);
    this.timer = setInterval(this.playClick, (60/this.state.tempo)* 1000);
    this.setState(this.state, this.playClick);
   }
   fetch('/', {
     method: 'POST',
     headers: {
       Accept: 'application/json',
       'Content-Type': 'application/json'
     },
      body: JSON.stringify({piece: this.state.piece, tempo: this.state.tempo})
   }).then(response => {
     console.log('this is the fetch response: ', response);
   })
    .catch(error => {
      console.log(error)
    });

    $.ajax({
      url: "/get",
      type: "GET",
      success: (response, data) => {
        console.log('Successful GET request!! Here is the response: ', response);
        this.setState({oldPiece: response.piece, oldTempo: response.tempo });

        //console.log('This is the result from this.state: ', this.state);
      },
      error: (error) => {
        console.log('This is the error back from GET: ', error);
      }
    })
}

changeHandler (event) {
  const target = event.target;
  const value = target.value;
  // console.log('This is the value from changeHandler: ', value);
  const newState = Object.assign({}, this.state);
  newState.tempo = value;
  this.setState(newState);
}

pieceChanger (event) {
  const target = event.target;
  const value = target.value;
  // console.log('This is the value from pieceChanger: ', value);
  const newState = Object.assign({}, this.state);
  newState.piece = value;
  this.setState(newState);
}

componentDidMount(){
  $.ajax({
    url: "/get",
    type: "GET",
    success: (response, data) => {
      console.log('Successful GET request!! Here is the response: ', response);
      this.setState({oldPiece: response.piece, oldTempo: response.tempo });

      //console.log('This is the result from this.state: ', this.state);
    },
    error: (error) => {
      console.log('This is the error back from GET: ', error);
    }
  })
  // fetch('/get', {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //     'Data-Type': 'json'
  //   }
  // })
  // .then((res) => {
  //    console.log('this is the fetch res : ', res);
  //    return res.json()
  //  })
  //  .then(result => {
  //    console.log('This is the result (after res.json) from the fetch: ', result);
  //    console.log('this is result.tempo:', result.tempo, 'and this is result.piece: ', result.piece);
  //  },
  //   (error)=> {
  //     console.log('This is the fetch error:', error);
  //   })
}

  render(){

    return (
      <div>
        <h1>Metronome!!!</h1>
        <div>{`This is the tempo: ${this.state.tempo}`}</div>
        <br></br>
        <button onClick={this.startStop}>{this.state.playing ? 'Stop' : 'Start'}</button>
        <br></br>
        <form>
          <br></br>
          <label>Set a new tempo (between 20 - 250)    </label>
          <input name="inputTempo" type="number" min="20" max="250" onChange={this.changeHandler} value={this.state.tempo}></input>
          <br></br>
          <br></br>
          <label>Write the name of the piece you're practicing with this tempo   </label>
          <input name="piece" type="text" onChange={this.pieceChanger} value={this.state.piece}></input>
          <button type="button" name="button" onClick={()=>(this.saveTempo(event))}>Save tempo and piece name</button>
        </form>
        <br></br><br></br>
    <div className="oldInfo">{`This is the last saved piece: ${this.state.oldPiece}, and it's tempo: ${this.state.oldTempo}`}</div>
      </div>
    )
  }

}
const title = 'This is a test'
ReactDOM.render(<App/>, document.getElementById('app'));
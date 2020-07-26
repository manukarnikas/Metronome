import React, { Component } from 'react';
import './App.css';
import beats from './beats.wav';

class App extends Component {
   beatSound;
   interval;

  constructor(){
    super();
    this.state = {
      bpm: 60,
      playing: false
    }
    this.beatSound = new Audio(beats);
  }

  startStop(){
    if(this.state.playing){
      this.setState({
        playing: false
      },()=>{
        this.stopPlaying();
      });
    }
    else{
      this.setState({
        playing: true
      },()=>{
        this.startPlaying();
      });
    }
  }

  startPlaying(){
    /**clear previous interval */
    if(this.interval){
      clearInterval(this.interval)
    }
    /**set Interval */
    var ms = (Math.floor(60/this.state.bpm))*1000;
    this.interval = setInterval(()=>{
      this.beatSound.play();
    },ms)
  }

  stopPlaying(){
    /**clear current interval */
    if(this.interval){
      clearInterval(this.interval)
    }
  }

  add(){
    if(this.state.bpm<200){
      this.setState(prevState=>{
        return {
          bpm : Number(prevState.bpm) + 1
        }
      })
    }
  }


  reduce(){
    if(this.state.bpm>60){
      this.setState(prevState=>{
        return {
          bpm : Number(prevState.bpm) - 1
        }
      })
    }
  }
  

 handler(event){
   this.setState({
      bpm : event.target.value
    },()=>{
      if(this.state.playing){
        this.startPlaying();
      }
    });
  }

  render() {
    return (
      <div>
        <div className="card">
          <div className="card-header">
             Metronome
          </div>
          <div className="card-body">
            <div className="card-title">
              <label>{this.state.bpm} BPM</label>
              <span style={{float: 'right'}}>
                  <i style={{color:'grey'}} className={this.state.playing? 'fa fa-stop fa-2x' : 'fa fa-play fa-2x' } onClick={event=>{this.startStop()}} aria-hidden="true"></i>
              </span>
            </div>
            <div className="card-text">
              <div className="flexbox-container">
                  <div className="item"><i className="fa fa-minus fa-2x color" onClick={event=>{this.reduce()}} aria-hidden="true"></i></div>
                  <div className="item-slider"><input style={{width:'100%'}} type="range" min="60" max="200"  onChange={event=>{this.handler(event)}}/></div>
                  <div className="item"><i className="fa fa-plus fa-2x color" onClick={event=>{this.add()}} aria-hidden="true"></i></div>
              </div>
            </div>
          </div>
         </div>
      </div>
    );
  }
}

export default App;

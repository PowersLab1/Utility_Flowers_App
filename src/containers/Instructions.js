import React, { Component } from 'react';
import './Instructions.css';
import { Redirect } from "react-router-dom";
import { visualStim } from '../lib/Stim';

class Instructions extends Component {

    constructor(props) {
        super(props);
        this.state = {
          continue: false,
        }
      }

      keyFunction = (event) => {
        if(event.keyCode === 81) {
          this.setState((state, props) => ({
            continue: true
          }));
        }
      }

      componentDidMount(){
        document.addEventListener("keydown", this.keyFunction, false);
      }
      componentWillUnmount(){
        document.removeEventListener("keydown", this.keyFunction, false);
      }

      render() {

        if(this.state.continue === true){
          return <Redirect to="/Trial_P" />
        }

        return (
          <div className="Instructions">
            <input type="hidden"/>
            <header className="Instructions-header">
            <div className="text-container">
              <p className="Instructions-text">
                This is a vision test.
                <br /><br /> You will be presented with a small fixation square surrounded by continous white noise. Periodically, a central black dot will change color from black to blue. The presence of a blue dot will act as your cue to respond. 
                <br /><br /> On some occassions, shortly before the central dot changes color you will be briefly shown an image of a {visualStim.group_category[visualStim.group]}. The image will be presented at various levels of intensity, so it might sometimes be very hard to see.
                <br /><br /> Your job is to focus your eyes on the central dot and to indicate whether or not you saw a {visualStim.group_category[visualStim.group]} shortly before the central dot turned blue. 
                <br /><br /> Press  <font size="+2">  <b> "Q"/YES </b> </font> if you <b> DO </b> see a {visualStim.group_category[visualStim.group]}.
                <br /><br /> Press <font size="+2"> <b> "E"/NO </b> </font> if you <b> DO NOT </b> see a {visualStim.group_category[visualStim.group]}.
                <br /><br /> Please respond as <b> QUICKLY </b> and as <b> ACCURATELY </b> as you <b> POSSIBLY CAN </b>. 
                <br /><br /><br /> PRESS "Q"/YES TO BEGIN A SHORT PRACTICE SESSION
              </p>
            </div>
            </header>
          </div>
        );
      }
    }

export default Instructions;
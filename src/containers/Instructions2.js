import React, { Component } from 'react';
import './Instructions.css';
import { Redirect } from "react-router-dom";
import { visualStim } from '../lib/Stim';

class Instructions2 extends Component {

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
          return <Redirect to="/Trial_P_rating" />
        }

        return (
          <div className="Instructions">
            <input type="hidden"/>
            <header className="Instructions-header">
            <div className="text-container">
              <p className="Instructions-text">
              <br /><br /> NEW INSTRUCTIONS FOR PART 2/2
              <br /><br /> The first task is complete! Now you will perform a similar task in the second half part of the experiment with two important differences.
                <br /><br /> 1. From now on the central fixation dot will remain black throughout the experiment and you will instead hear an auditory tone (beep!), which will act as your cue to respond. On some occasions, when you hear the auditory tone you will see an image of a {visualStim.group_category[visualStim.group]}. You are asked to indicate whether or not you saw a {visualStim.group_category[visualStim.group]} when you hear the auditory tone. Only respond when you hear the tone.
                <br /><br /> 2. You will now see a rating screen after you respond indicating how confident/certain you are that you saw a {visualStim.group_category[visualStim.group]}.
                <br /><br /> Press and then hold the <b> "Q"/YES </b> button or <b> "E"/NO </b> button.
                <br /><br /> The longer you hold it down, the more certain you are of your choice.
                <br /><br /> If you hold <b> "Q"/YES </b>  button down for a long time, you are very confident/certain that you  <b> DO </b> see a {visualStim.group_category[visualStim.group]}.
                <br /><br /> If you hold <b> "E"/NO </b>  button down for a long time, you are very confident/certain that you <b> DO NOT </b> see a {visualStim.group_category[visualStim.group]}.
                <br /><br /> Please respond as <b> QUICKLY </b> and as <b> ACCURATELY </b> as you <b> POSSIBLY CAN </b>
                <br /><br /><br /> PRESS "Q"/YES TO BEGIN A SHORT PRACTICE SESSION
              </p>
            </div>
            </header>
          </div>
        );
      }
    }

export default Instructions2;

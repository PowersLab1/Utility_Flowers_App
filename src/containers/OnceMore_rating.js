import React, { Component } from 'react';
import './OnceMore_rating.css';
import { Redirect } from "react-router-dom";
import { visualStim } from "../lib/Stim";

class OnceMore_rating extends Component {

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
          <div className="OnceMore_rating">
            <input type="hidden"/>
            <header className="OnceMore_rating-header">
            <div className="text-container">
              <p className="OnceMore_rating-text">
                <br /><br /> Good job! Now let's practice once more. Remember, this time you are asked to indicate whether you saw a {visualStim.group_category[visualStim.group]} when you hear the auditory tone (beep!). The central fixation dot will not change color. Hold down your response in accordance with how certain you are. 
                <br /><br /> If you hold <b> "Q"/YES </b>  button down for a long time, you are very certain that you  <b> DO </b> see a {visualStim.group_category[visualStim.group]}.
                <br /><br /> If you hold <b> "E"/NO </b>  button down for a long time, you are very certain that you <b> DO NOT </b> see a {visualStim.group_category[visualStim.group]}.
                <br /><br /> Please respond as <b> QUICKLY </b> and as <b> ACCURATELY </b> as you <b> POSSIBLY CAN </b>
                <br /><br /><br /> PRESS "Q"/YES WHEN READY TO CONTINUE.                
              </p>
            </div>
            </header>
          </div>
        );
      }
    }

export default OnceMore_rating;
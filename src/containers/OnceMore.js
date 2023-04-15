import React, { Component } from 'react';
import './OnceMore.css';
import { Redirect } from "react-router-dom";
import { visualStim } from '../lib/Stim';

class OnceMore extends Component {

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
          <div className="OnceMore">
            <input type="hidden"/>
            <header className="OnceMore-header">
            <div className="text-container">
              <p className="OnceMore-text">
                <br /><br /> Good job! Let's do another practice session. 
                <br /><br /> Remember, an image of a {visualStim.group_category[visualStim.group]} might appear inside the white noise shortly before the central dot changes to blue.
                <br /><br /> Press  <font size="+2">  <b> "Q"/YES </b> </font> if you <b> DO </b> see an image of a {visualStim.group_category[visualStim.group]} .
                <br /><br /> Press <font size="+2"> <b> "E"/NO </b> </font> if you <b> DO NOT </b> see an image of a {visualStim.group_category[visualStim.group]}.
                <br /><br /> Only respond after the fixation cross has changed from black to blue. 
                <br /><br /> Please respond as <b> QUICKLY </b> and as <b> ACCURATELY </b> as you <b> POSSIBLY CAN </b>
                <br /><br /><br /> PRESS "Q"/YES TO BEGIN A SHORT PRACTICE SESSION

              </p>
            </div>
            </header>
          </div>
        );
      }
    }

export default OnceMore;

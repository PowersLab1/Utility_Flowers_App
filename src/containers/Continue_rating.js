import React, { Component } from 'react';
import './Continue_rating.css';
import { Redirect } from "react-router-dom";
import { visualStim } from '../lib/Stim';

class Continue_rating extends Component {

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
          return <Redirect to="/Trial_TT_1" />
        }

      return (
        <div className="Continue_rating">
          <header className="Continue_rating-header">
          <div className="text-container">
            <p className="Continue_rating-text">
              Great!
              <br /><br /> You have successfully completed the practice trials. Now you will complete the second half of the experiment.
              <br /><br /> Once again, it is important to note that in the practice session the images were shown in a way that it would be very obvious to see whether they were there or not.
              <br /><br /> In the remainder of the experiment it may be very difficult to see whether there is a {visualStim.group_category[visualStim.group]} or not so you will have to look very hard.
              <br /><br /> Sometimes it might be difficult to answer, but if you do not know, please make your best guess.
              <br /><br /> If you hold <b> "Q"/YES </b>  button down for a long time, you are very certain that you  <b> DO </b> see a {visualStim.group_category[visualStim.group]}.
              <br /><br /> If you hold <b> "E"/NO </b>  button down for a long time, you are very certain that you <b> DO NOT </b> see a {visualStim.group_category[visualStim.group]}.
              <br /><br /> Please respond as <b> QUICKLY </b> and as <b> ACCURATELY </b> as you <b> POSSIBLY CAN </b>
              <br /><br /> The next part of the experiment will consist of four shorter experimental sessions of approximately six minutes. You will be able to take a break between any of these four sessions, but please do not take a break unless instructed.
              <br /><br /><br /> PRESS "Q"/YES TO BEGIN THE EXPERIMENT.
            </p>
          </div>
          </header>
        </div>
      );
    }
}

export default Continue_rating;

import React, { Component } from 'react';
import './Break.css';
import { Redirect } from "react-router-dom";

class Break1 extends Component {
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
          return <Redirect to="/Instructions2" />
        }

        return (
          <div className="Break">
            <input type="hidden"/>
            <header className="Break-header">
            <div className="text-container">
              <p className="Break-text">
               Well done!
                <br /><br /> You have now completed the first part of the task. Take a quick break to have a rest and indicate when you are ready to carry on.
                <br /><br /><br /> PRESS "Q"/YES TO CONTINUE WITH THE NEXT PART
              </p>
            </div>
            </header>
          </div>
        );
      }
    }

export default Break1;

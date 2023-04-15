import React, { Component } from 'react';

import './TrialQ.css';
import { Redirect } from "react-router-dom";
import Trial from './Trial';

import { create_blocks_singleton } from '../lib/tt_blocks';
import { setQuestData, processAndStoreData, getProcessedData } from '../store';

import { visualStim } from "../lib/Stim.js";


var questlib = require('questlib');
const config = require('../config');


class TrialQ extends Component {
  constructor(props) {
    super(props);

    // initial states
    this.startTimestamp = new Date().getTime();
    this.state = {
      contrasts: [],
      images: [],
    };

    ////initialize data arrays for handling
    this.QuestData = {
      0: [],
      1: [],
      2: [],
      3: [],
      4: [],
      5: []
    };

    // Initializing QUEST
    // NOTE: Modify your quest parameters here! ////Assumes that the mean and standard deviation of initial guess are equal for all images. 
    //// Can make separate guesses for each image through initializing different values.
    let tGuessM,
      tGuessSd = 0.2,
      pThreshold = 0.75,
      beta = 3,
      delta = 0.01,
      gamma = 0.01,
      grain = 0.001,
      dim = 1000, // Never used? what??
      range = 20;

    ////Calculate distinct priors for detection thresholds from piloting data (flowers stronger than spiders)
    if (visualStim.group == 0){
      tGuessM = Math.log(0.6)
    }
    else if (visualStim.group == 1){
      tGuessM = Math.log(0.6);
    }
    this.tGuessM = tGuessM;////To make value available for generate_contrast() function.

    // NOTE: Specify how many trials to run for each staircase here.
    // E.g., numTrialsPerStaircase = 40 means 80 trials total,
    // 40 per staircase.
    this.numTrialsPerStaircase = config.debug ? 4 : 40; ////currently 40 making 240 trials total. can adjust accordingly if needed.
    this.numImages = 6;
    // Final bit of initialization
    this.index = 0;
    this.maxIndex = (this.numTrialsPerStaircase * this.numImages);

    this.q = {};
    this.q[1] = new questlib.Quest(tGuessM, tGuessSd, pThreshold, beta, delta, gamma, grain, range);
    this.q[2] = new questlib.Quest(tGuessM, tGuessSd, pThreshold, beta, delta, gamma, grain, range);
    this.q[3] = new questlib.Quest(tGuessM, tGuessSd, pThreshold, beta, delta, gamma, grain, range);
    this.q[4] = new questlib.Quest(tGuessM, tGuessSd, pThreshold, beta, delta, gamma, grain, range);
    this.q[5] = new questlib.Quest(tGuessM, tGuessSd, pThreshold, beta, delta, gamma, grain, range);
    this.q[6] = new questlib.Quest(tGuessM, tGuessSd, pThreshold, beta, delta, gamma, grain, range);



    this.state = {
      contrasts: [Math.pow(10, tGuessM)], //// Initialize staircase with with random image at Quest guess estimate.
      images: [Math.floor(Math.random() * 6 + 1)],
    };
    this.responseTime = [];
  }

  pushContrast(contrast) {
    this.setState({ contrasts: [...this.state.contrasts, contrast] });
  }

  pushImage(image_number) {
    this.setState({ images: [...this.state.images, image_number] });
  }

  generate_contrast = () => {
    ////Count the number of times that a given image class has been shown (e.g. in [5,1,2,2], counts[2] = 2, counts[5] = 1)
    let counts = {};
    for (const num of this.state.images) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    let pseudo_random = Math.floor(Math.random() * this.numImages + 1); ////Draw random number from 1-6 to select next image
    
    if (counts[pseudo_random] == undefined) { ////If image has not yet been shown (i.e. counts are undefined), then use initial Quest guess 
      this.pushContrast(Math.pow(10, (this.tGuessM)));
      this.pushImage(pseudo_random);
    } else if (counts[pseudo_random] < this.numTrialsPerStaircase) { ////If image has been shown (and less than 40 times) then use the guess derived from its Quest staircase
      this.pushContrast(Math.pow(10, this.q[pseudo_random].quantile()));
      this.pushImage(pseudo_random);
    } else {////If image has been shown 40 or more times, then select another random number until it finds another staircase with < 40 trials.
      let count_sum = Object.values(counts).reduce((a, b) => a + b, 0); ////Sum of frequencies for all staircases
      if (count_sum < this.numImages * this.numTrialsPerStaircase) { ////While sum is less than 40 per staircase, sample another random number.
        this.generate_contrast();
      }
      else {
        return ////Return when all staircases have 40 or more. 
    }
  }
}

  responseHandler = (response, responseTime) => { ////now adjusted to receive response times here as an input
    //// Check whether trial number exceeds some predefined limit. 
    if (this.index >= this.maxIndex) {
      this.index++;
      return
    }
    else {
      //// Get a response to current trial. check which image was shown, update the q1, randomly choose image class for next trial and then push a new contrast and image to the end.
      this.q[this.state.images[this.index]].update(Math.log10(this.state.contrasts[this.index]), response);
      this.QuestData[this.state.images[this.index] - 1].push([this.index, this.state.images[this.index], this.state.contrasts[this.index], response, responseTime[this.index]]);
      //// generate random number for showing image and contrast of next trial
    }
    this.generate_contrast();
    this.index++;
  }

  trialCompleteRenderer = () => {
    return <Redirect to="/Break1" />;
  }

  dataHandler = (ratings, ratingsRaw, timestamps) => {
    ////initialize data handlers
    let indexQuest = [[], [], [], [], [], []],
      imagesQuest = [[], [], [], [], [], []],
      contrastsQuest = [[], [], [], [], [], []],
      responseQuest = [[], [], [], [], [], []],
      responseTimeQuest = [[], [], [], [], [], []];

    for (let k = 0; k < this.numImages; k++) {
      for (let i = 0; i < this.QuestData[k].length; i++) {
        indexQuest[k][i] = this.QuestData[k][i][0];
        imagesQuest[k][i] = this.QuestData[k][i][1];
        contrastsQuest[k][i] = this.QuestData[k][i][2];
        responseQuest[k][i] = this.QuestData[k][i][3];
        responseTimeQuest[k][i] = this.QuestData[k][i][4];
      }
    }

    const image_number = visualStim.group_category[visualStim.group];

    // Save staircase data
    setQuestData(
      this.q,
      indexQuest,
      contrastsQuest,
      imagesQuest,
      responseQuest,
      responseTimeQuest,
      this.timestamps,
      this.startTimestamp,
      image_number
    );

    // Process data
    processAndStoreData(this.q);
    const QuestOutput = getProcessedData();

    // Also, generate TT blocks singleton here for later use.//generate 6 ones reflecting the different images
    const intensities = [[[], [], [], [], [], []], [[], [], [], [], [], []], [[], [], [], [], [], []]];
    for (let i = 0; i < this.numImages; i++) {
      intensities[0][i] = Math.pow(10, QuestOutput[i].intensities.c25);
      intensities[1][i] = Math.pow(10, QuestOutput[i].intensities.c50);
      intensities[2][i] = Math.pow(10, QuestOutput[i].intensities.c75);
    }
    create_blocks_singleton(intensities);

  }
  render() {
    return (
      <Trial
        contrasts={this.state.contrasts}
        shouldRecordRatings={false}
        trialCompleteRenderer={this.trialCompleteRenderer}
        dataHandler={this.dataHandler}
        responseHandler={this.responseHandler}
        images={this.state.images}
      />
    );

  } // end render
} // end class

export default TrialQ;
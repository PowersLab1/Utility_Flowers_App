import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {visualStim, patch, stimulus_blank, createGabor} from "../lib/Stim.js";
import RATINGS_1_SRC from "../media/rating_keydown_1.png";
import RATINGS_2_SRC from "../media/rating_keydown_2.png";
import RATINGS_3_SRC from "../media/rating_keydown_3.png";
import RATINGS_4_SRC from "../media/rating_keydown_4.png";
import RATINGS_5_SRC from "../media/rating_keydown_5.png";
import './Trial.css';

var _ = require('lodash');
var SimplexNoise = require('simplex-noise');

const IMG_SRC = "https://raw.githubusercontent.com/PowersLab1/VCH_APP_SMITH/master/src/media/fix_cross.png";
const CANVAS_LENGTH = 256;

const ratingToImgSrc = {
  0: "", // Default
  1: RATINGS_1_SRC,
  2: RATINGS_2_SRC,
  3: RATINGS_3_SRC,
  4: RATINGS_4_SRC,
  5: RATINGS_5_SRC,
}

class VisualStimulus extends Component {
  constructor(props) {
    super(props);
    this.animationFrameId = undefined;
}

  startAnimation() {
    var simplex = new SimplexNoise(),
      canvas = document.getElementById('c'),
      ctx = canvas.getContext('2d'),
      imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height),
      data = imgdata.data,
      t = 0; // t is used to generate noise over time


    var stimulus = undefined;
    var that = this;
    var c = visualStim.alpha * stimulus_blank[0];

    function nextFrame() {
      for (var x = 0; x < CANVAS_LENGTH; x++) {
        for (var y = 0; y < CANVAS_LENGTH; y++) {
          if (that.props.showContrast && that.props.contrast !== 0) {
            // Populate stimulus data if we don't have it already
            if (_.isUndefined(stimulus)) {
              // If the gabor layer has been precomputed for us, th
              if (that.props.precomputedGabor) {
                stimulus = that.props.precomputedGabor;
              } else {
                // Otherwise, we create it ourselves
                stimulus = createGabor(patch, that.props.contrast, that.props.image_number); ////
              }
            }

            const r = simplex.noise3D(x / 8, y / 8, t / 5) * 0.5 + 0.5;

            data[(x + y * CANVAS_LENGTH) * 4 + 0] = visualStim.alpha * stimulus[(x + y * CANVAS_LENGTH) * 4 + 0] + (1 - visualStim.alpha) * r * 250;
            data[(x + y * CANVAS_LENGTH) * 4 + 1] = visualStim.alpha * stimulus[(x + y * CANVAS_LENGTH) * 4 + 1] + (1 - visualStim.alpha) * r * 250;
            data[(x + y * CANVAS_LENGTH) * 4 + 2] = visualStim.alpha * stimulus[(x + y * CANVAS_LENGTH) * 4 + 2] + (1 - visualStim.alpha) * r * 250;
            data[(x + y * CANVAS_LENGTH) * 4 + 3] = 255;
          } else {
            // Technically we only need reset this once, but it's relatively inexpensive
            // and convenient so we do it here.
            stimulus = undefined;

            const r = simplex.noise3D(x / 8, y / 8, t / 5) * 0.5 + 0.5;

            const val = c + (1 - visualStim.alpha) * r * 250;
            data[(x + y * CANVAS_LENGTH) * 4 + 0] = val;
            data[(x + y * CANVAS_LENGTH) * 4 + 1] = val;
            data[(x + y * CANVAS_LENGTH) * 4 + 2] = val;
            data[(x + y * CANVAS_LENGTH) * 4 + 3] = 255;
          }
        }
      }

      ctx.putImageData(imgdata, 0, 0);

      // Render next frame
      that.animationFrameId = window.requestAnimationFrame(nextFrame);

      // Bump t to generate shifting noise
      t = (t + 1) % (1 << 31);
    }
    nextFrame();
  }

  componentDidMount() {
    this.startAnimation();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationFrameId);
  }

  render() {
    return (
      <div>
        <img src={ratingToImgSrc[this.props.currentRating]} width={CANVAS_LENGTH} height={CANVAS_LENGTH} className="center"
        style={
          {
            zIndex: 1000,
            width: '80vh',
            height: '40vh',
            backgroundColor: "#000000",
            visibility: this.props.showRatings ? 'visible' : 'hidden',
          }
         }
        />
        <div style={
          {
            zIndex:999,
            backgroundColor: "#000000",
            width: "100%",
            height: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            visibility: this.props.showRatings ? 'visible' : 'hidden',
          }
         }
        ></div>
        <canvas id="c" width={CANVAS_LENGTH} height={CANVAS_LENGTH} className="center clip-circle"
          style={
            {
              zIndex:80,
              width: '100vh',
              height: '100vh',
            }
          }></canvas>
        <div className="center cross-1" style={{zIndex: 102}}></div>
        <div className="center cross-2" style={{zIndex: 103, backgroundColor: this.props.cross_color}}></div>
        <div className="center radial-gradient"
          style={
            {
              zIndex: 101,
              width: '100vh',
              height: '100vh',
            }}></div>

      </div>
    );
  } // end render
} // end class


VisualStimulus.defaultProps = {
  showContrast: false,
  showRatings: false,
  contrast: 0,
  precomputedGabor: undefined,
  image_number: 2,
  cross_color: 'black',
}

VisualStimulus.propTypes = {
  showContrast: PropTypes.bool.isRequired,
  showRatings: PropTypes.bool,
  currentRating: PropTypes.number,
  contrast: PropTypes.number,
  precomputedGabor: PropTypes.array,
  image_number: PropTypes.number,
  cross_color: PropTypes.string,
}

export default VisualStimulus;
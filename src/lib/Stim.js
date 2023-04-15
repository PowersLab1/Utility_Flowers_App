//Edited images contrast corrected, gray background, alpha = pixel
import SPIDERSARRAY from "../media/spiders_array_6.json";
import FLOWERSARRAY from "../media/flowers_array_6.json";
var _ = require('lodash');

//Edited images contrast corrected, gray background, alpha = 255 opaque
//import SPIDERSARRAY from "../media/spiders_array_opaque.json";
//import FLOWERSARRAY from "../media/flowers_array_opaque.json";


//Original images contrast uncorrected, background white
//import SPIDERSARRAY from "../media/spiders_array_original.json";
//import FLOWERSARRAY from "../media/flowers_array_original.json";

export const visualStim = createVisualStim();
export const patch = createPatch(visualStim);
export const stimulus_blank = createGabor(patch, 0, 1);

export const auditoryStim = createAuditoryStim();

/*****************************
 *                           *
 *      Visual stimulus      *
 *                           *
 *****************************/

// Creates a stimulus structure
export function createVisualStim() {
  var stim = {
    group_category: {0: "flower", 1: "spider"},////Add attribute for group selection (0 = flowers, 1 = spiders)
    background: 255 / 2,
    angle: Math.floor(Math.random() * 135) + 45,   // returns a random integer from 45 to 135
    imsize: 256,
    initcontrast: 0.5,                  // initial contrast
    threshold: 0.2,                  // moch treshold
    phases: [0, 0.25],                   // phases either 0 and 0.25
    phase: 0,
    alpha: 0.5,
    ppd: 80,
    frequency: 0,                  // gabor spatial frequency
  };

  stim.group = 1;////Equation to randomly determine group selection for participant
  stim.phase = stim.phases[Math.round(Math.random())];
  stim.frequency = 2 / stim.ppd;

  return stim;
};

////New function to replace previous createGabor (below)
export function createGabor(patch, contrast, image_number) {
  var new_patch = patch[image_number - 1];
  var grating = new_patch.map((x) => visualStim.background + (((x/128) -1) * visualStim.background * contrast));//// x was -1 - +1, now 0 - 255. 128 should be 0/ 128 0 - 2, and then - 1, to get -1 to 1.  
  return grating;
}

/*
// Creates the gabor layer to be overlaid the noise
export function createGabor(patch, contrast) {
  var grating = patch.map((x) => visualStim.background + (x * visualStim.background * contrast));
  return grating;
}
*/

////New function to replace previous createPatch (below)
export function createPatch(stim) {
  var patch = [];

  if (stim.group == 0) {
    for (let i = 0; i < 6; i++) {
      const string = JSON.stringify(FLOWERSARRAY)
      const parseJsonFlowerData = JSON.parse(string);
      var patch = [];
      for (let i = 0; i < 6; i++) {
        patch[i] = Object.values(parseJsonFlowerData[`${i}`]);
    }
  }
} else if (stim.group == 1) {
    for (let i = 0; i < 6; i++) {
      const string = JSON.stringify(SPIDERSARRAY)
      const parseJsonSpiderData = JSON.parse(string);
      var patch = [];
      for (let i = 0; i < 6; i++) {
        patch[i] = Object.values(parseJsonSpiderData[`${i}`]);
      }
    }
  }
  return patch;
}

export function practiceData() {
  ////Initial contrasts
  let practice_data = _.shuffle([[2, 2], [2, 3], [2, 4], [2, 5], [2, 6], 
   [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
   [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]]);
  let first_trial = [2,1];  
  
  let full_array = first_trial.concat(practice_data);

  let initial_images = [];
  let initial_contrasts = [];
  
  const flat = _.flatten(full_array);  

   for (let i = 0; i < flat.length; i += 2) {
     initial_contrasts.push(flat[i]);
   }
   for (let i = 1; i < flat.length; i += 2) {
     initial_images.push(flat[i]);
   }
   
   console.log(initial_contrasts, initial_images);

   return [initial_contrasts, initial_images]
   }

/*function createPatch(stim) {
  var xs = [];
  var ys = [];

  for (var x = 1; x < stim.imsize + 1; x++) {
    for (var y = 1; y < stim.imsize + 1; y++) {
      xs[((x -1) + (y - 1) * stim.imsize) * 4 + 0] = x - ((stim.imsize + 1) / 2);
      xs[((x -1) + (y - 1) * stim.imsize) * 4 + 1] = x - ((stim.imsize + 1) / 2);
      xs[((x -1) + (y - 1) * stim.imsize) * 4 + 2] = x - ((stim.imsize + 1) / 2);
      xs[((x -1) + (y - 1) * stim.imsize) * 4 + 3] = x - ((stim.imsize + 1) / 2);

      ys[((x -1) + (y - 1) * stim.imsize) * 4 + 0] = y - ((stim.imsize + 1) / 2);
      ys[((x -1) + (y - 1) * stim.imsize) * 4 + 1] = y - ((stim.imsize + 1) / 2);
      ys[((x -1) + (y - 1) * stim.imsize) * 4 + 2] = y - ((stim.imsize + 1) / 2);
      ys[((x -1) + (y - 1) * stim.imsize) * 4 + 3] = y - ((stim.imsize + 1) / 2);
    }
  }

  var patch = [];
  for (var i = 0; i < xs.length && i < ys.length; i++) {
    patch[i] = 0.5 * Math.cos(
      2 * Math.PI * (stim.frequency * (Math.sin(
        Math.PI / 180 * stim.angle
      ) * xs[i] + Math.cos(
        Math.PI / 180 * stim.angle
      ) * ys[i]
    ) + stim.phase));
  }

  return patch;
}
*/

/*****************************
 *                           *
 *     Auditory stimulus     *
 *                           *
 *****************************/
export function createAuditoryStim() {
  var stim = {
    duration: 300, // in ms
    amp: 15,
    frequency: 500,
  };

  return stim;
};

export function playAuditoryStimulus(stim, audioContext) {
  beep(stim.amp, stim.frequency, stim.duration, audioContext);
}

//amp:0..100, freq in Hz, ms
export function beep(amp, freq, ms, audioContext) {
  if (!audioContext) return;
  var osc = audioContext.createOscillator();
  var gain = audioContext.createGain();
  osc.connect(gain);
  osc.frequency.value = freq;
  gain.connect(audioContext.destination);
  gain.gain.value = amp / 100;////changed audio volume for previewing was 100
  osc.start(audioContext.currentTime);
  osc.stop(audioContext.currentTime + ms / 1000);
}
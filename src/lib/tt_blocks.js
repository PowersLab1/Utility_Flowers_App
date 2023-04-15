import { getProcessedData } from '../store';

var _ = require('lodash');
const config = require('../config');

////Changed now to simply output an array of contrasts and images to test staircasing. 
////Currently one block of 30 trials (each image at 75% intensity 4 times, as well as 6 no-image trials).

export function create_blocks(c25, c50, c75) { //// takes in a vector of QUEST intensity values for 25%, 50%, and 75% probability of detection.
  // Creates arrays in the form of:
  //  [0,...,0,c25,...,c25,c50,...,c50,c75,...,c75]
  // where the number of each values is passed in as an arg.
  // An array to hold the remaining numbers that haven't been drawn yet. Only intialized once as it can be reused.
  let remainingNumbers = [1, 2, 3, 4, 5, 6];
  
  ////Create images and contrasts for first half of block 1
  let block1_images = [];
  let block1_length = 15;
  // Loop to fill up the vector with multiples of 1-6 as much as possible
  for (let i = 0; i < Math.floor(block1_length / 6); i++) {
    for (let j = 1; j <= 6; j++) {
      block1_images.push(j);
    }
  }
  // The number of remaining spots in the vector
  let remainingBlock1 = block1_length % 6;
  // Loop to fill up the remaining spots in the vector with random remaining numbers
  for (let i = 0; i < remainingBlock1; i++) {
    // Select a random number from the remaining numbers
    let randomIndex = Math.floor(Math.random() * remainingNumbers.length);
    // Add the selected number to the vector
    block1_images.push(remainingNumbers[randomIndex]);
    // Remove the selected number from the remaining numbers array
    remainingNumbers.splice(randomIndex, 1);
  }

  function create_block(num_zero, num_c25, num_c50, num_c75) {
    
    // Initialize an empty array to hold the vector
    let images0 = [];
    // Loop to fill up the vector with multiples of 1-6 as much as possible
    for (let i = 0; i < Math.floor(num_zero / 6); i++) {
      for (let j = 1; j <= 6; j++) {
        images0.push(j);
      }
    }
    // The number of remaining spots in the vector
    let remaining0 = num_zero % 6;
    // An array to hold the numbers that were previously drawn for this block if numbers are reinitialized
    let previouslyDrawn0 = [];
    // Loop to fill up the remaining spots in the vector with random remaining numbers
    for (let i = 0; i < remaining0; i++) {
      if (remainingNumbers.length === 0) {
        remainingNumbers = [1, 2, 3, 4, 5, 6];//Reintialize numbers
        for (let j = 0; j < previouslyDrawn0.length; j++){
        remainingNumbers.splice(remainingNumbers[j],1);
        }
      }
        // Select a random number from the remaining numbers
        let randomIndex = Math.floor(Math.random() * remainingNumbers.length);
        // Add the selected number to the vector
        images0.push(remainingNumbers[randomIndex]);
        // Add number to previously drawn array
        previouslyDrawn0.push(remainingNumbers[randomIndex]);
        // Remove the selected number from the remaining numbers array
        remainingNumbers.splice(randomIndex, 1);
    }

    // Initialize an empty array to hold the vector
    let images25 = [];
    // Loop to fill up the vector with multiples of 1-6 as much as possible
    for (let i = 0; i < Math.floor(num_c25 / 6); i++) {
      for (let j = 1; j <= 6; j++) {
        images25.push(j);
      }
    }
    // The number of remaining spots in the vector
    let remaining25 = num_c25 % 6;
    // An array to hold the numbers that were previously drawn for this block if numbers are reinitialized
    let previouslyDrawn25 = [];
    // Loop to fill up the remaining spots in the vector with random remaining numbers
    for (let i = 0; i < remaining25; i++) {
      if (remainingNumbers.length === 0) {
        remainingNumbers = [1, 2, 3, 4, 5, 6];//Reintialize numbers
        for (let j = 0; j < previouslyDrawn25.length; j++){
        remainingNumbers.splice(remainingNumbers[j],1);
        }
      }
        // Select a random number from the remaining numbers
        let randomIndex = Math.floor(Math.random() * remainingNumbers.length);
        // Add the selected number to the vector
        images25.push(remainingNumbers[randomIndex]);
        // Remove the selected number from the remaining numbers array
        remainingNumbers.splice(randomIndex, 1);
    }
    // Initialize an empty array to hold the vector

    // Initialize an empty array to hold the vector
    let images50 = [];
    // Loop to fill up the vector with multiples of 1-6 as much as possible
    for (let i = 0; i < Math.floor(num_c50 / 6); i++) {
      for (let j = 1; j <= 6; j++) {
        images50.push(j);
      }
    }
    // The number of remaining spots in the vector
    let remaining50 = num_c50 % 6;
    // An array to hold the numbers that were previously drawn for this block if numbers are reinitialized
    let previouslyDrawn50 = [];
    // Loop to fill up the remaining spots in the vector with random remaining numbers
    for (let i = 0; i < remaining50; i++) {
      if (remainingNumbers.length === 0) {
        remainingNumbers = [1, 2, 3, 4, 5, 6];//Reintialize numbers
        for (let j = 0; j < previouslyDrawn50.length; j++){
        remainingNumbers.splice(remainingNumbers[j],1);
        }
      }
        // Select a random number from the remaining numbers
        let randomIndex = Math.floor(Math.random() * remainingNumbers.length);
        // Add the selected number to the vector
        images50.push(remainingNumbers[randomIndex]);
        // Remove the selected number from the remaining numbers array
        remainingNumbers.splice(randomIndex, 1);
    }
    // Initialize an empty array to hold the vector
    let images75 = [];
    // Loop to fill up the vector with multiples of 1-6 as much as possible
    for (let i = 0; i < Math.floor(num_c75 / 6); i++) {
      for (let j = 1; j <= 6; j++) {
        images75.push(j);
      }
    }
    // The number of remaining spots in the vector
    let remaining75 = num_c75 % 6;
    // An array to hold the numbers that were previously drawn for this block if numbers are reinitialized
    let previouslyDrawn75 = [];
    // Loop to fill up the remaining spots in the vector with random remaining numbers
    for (let i = 0; i < remaining75; i++) {
      if (remainingNumbers.length === 0) {
        remainingNumbers = [1, 2, 3, 4, 5, 6];//Reintialize numbers
        for (let j = 0; j < previouslyDrawn75.length; j++){
        remainingNumbers.splice(remainingNumbers[j],1);
        }
      }
        // Select a random number from the remaining numbers
        let randomIndex = Math.floor(Math.random() * remainingNumbers.length);
        // Add the selected number to the vector
        images75.push(remainingNumbers[randomIndex]);
        // Remove the selected number from the remaining numbers array
        remainingNumbers.splice(randomIndex, 1);
    }

    ////Flatten arrays together into single block
    let images_array = _.flatten([images0, images25, images50, images75]);

    ////Create vectors for corresponding identities. intensities0 is all 0 since the stimulus is blank.
    let intensities0 = _.fill(Array(num_zero), 0);
    let intensities25 = [];
    let intensities50 = [];
    let intensities75 = [];

    ////Uses the image number in above arrays to fetch the corresponding intensity values determined by QUEST
    for (let i = 0; i < images25.length; i++) { intensities25.push(c25[images25[i] - 1]); }
    for (let i = 0; i < images50.length; i++) { intensities50.push(c50[images50[i] - 1]); }
    for (let i = 0; i < images75.length; i++) { intensities75.push(c75[images75[i] - 1]); }
    let contrasts_array = _.flatten([intensities0, intensities25, intensities50, intensities75]);

    ////Returns two arrays to user reflecting the contrasts and images to be shown.
    return [contrasts_array, images_array]
  }

  let blocks;

  if (config.debug) {
    blocks = [
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0),
      create_block(1, 1, 1, 0)
    ];
  } else {
    blocks = [
      // First block has first 15 fixed at c75 (code two paragraphs below
      create_block(2, 1, 1, 11), ///Second half of first block
      create_block(8, 4, 4, 14),
      create_block(11, 5, 6, 8),
      create_block(12, 7, 6, 5),
      create_block(13, 7, 6, 4),
      create_block(14, 7, 6, 3),
      create_block(14, 7, 7, 2),
      create_block(14, 7, 7, 2),
      create_block(14, 7, 7, 2),
      create_block(14, 7, 7, 2),
      create_block(14, 7, 7, 2),
      create_block(14, 7, 7, 2)
    ];
  }

  ////Pair images and contrasts together to maintain relations when shuffling
  var new_shuffle = [];
  for (let i = 0; i < blocks.length; i++) {
    var combined = blocks[i][0].map((item, index) => { return [item, blocks[i][1][index]] });
    new_shuffle.push(_.shuffle(combined));
  }

  ////Shuffle first 15 trials for block 1 to randomize image order
  const block1_images_shuffled = _.shuffle(block1_images);

  let block1_intensities = [];
  for (let i = 0; i < block1_images_shuffled.length; i++) { block1_intensities.push(c75[block1_images_shuffled[i] - 1]); } ////Fetch contrasts for images at c75
  const combined1 = block1_intensities.map((item, index) => { return [item, block1_images_shuffled[index]] });

  new_shuffle.unshift(combined1); ////Add first block in front of rest of blocks

  ////Flatten arrays into one
  const flat2 = _.flatten(new_shuffle);
  const flat = _.flatten(flat2);

  let single_block_contrasts = [];
  let single_block_images = [];

  ////Every first element is contrast, every second is image
  for (let i = 0; i < flat.length; i += 2) {
    single_block_contrasts.push(flat[i]);
  }
  for (let i = 1; i < flat.length; i += 2) {
    single_block_images.push(flat[i]);
  }

  let thirty_block_contrasts = [];
  let thirty_block_images = [];

  while (single_block_contrasts.length) {
    thirty_block_contrasts.push(single_block_contrasts.splice(0, 30));
  }
  while (single_block_images.length) {
    thirty_block_images.push(single_block_images.splice(0, 30));
  }

  let final = { thirty_block_contrasts, thirty_block_images };

  return [final.thirty_block_contrasts, final.thirty_block_images];
}


// Keeps a singleton list of blocks so that we don't recompute each time
export function create_blocks_singleton(intensities) {
  if (_.isUndefined(create_blocks_singleton.blocks)) {
    if (arguments.length == 1) {
      create_blocks_singleton.blocks = create_blocks(intensities[0], intensities[1], intensities[2]);
    } else {
      throw "Must first populate blocks singleton";
    }
  }

  return create_blocks_singleton.blocks;
}

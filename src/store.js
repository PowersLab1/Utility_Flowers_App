import {canUseLocalStorage, encryptWithPublicKey} from "./lib/utils";
import {visualStim, auditoryStim} from "./lib/Stim";

const config = require('./config');
const _ = require('lodash');
var questlib = require('questlib');

// Global store for setting and getting task data.
// Simpler than redux and suits our needs.

// CONSTANTS
export const ENCRYPTED_METADATA_KEY = 'encrypted_metadata';
export const SURVEY_URL_KEY = 'survey_url';

export const QUEST_KEY = 'quest';
export const Q1_KEY = 'q1';
export const Q2_KEY = 'q2';
export const Q3_KEY = 'q3';
export const Q4_KEY = 'q4';
export const Q5_KEY = 'q5';
export const Q6_KEY = 'q6';

export const PROCESSED_DATA_KEY_1 = 'processedData_1';
export const PROCESSED_DATA_KEY_2 = 'processedData_2';
export const PROCESSED_DATA_KEY_3 = 'processedData_3';
export const PROCESSED_DATA_KEY_4 = 'processedData_4';
export const PROCESSED_DATA_KEY_5 = 'processedData_5';
export const PROCESSED_DATA_KEY_6 = 'processedData_6';
export const COMPONENT_KEY_PREFIX = 'component_';

export const INDEX_KEY = 'index';
export const CONTRASTS_KEY = 'contrasts';
export const IMAGES_KEY = 'images';
export const RESPONSE_KEY = 'response';
export const RESPONSE_TIME_KEY = 'responseTime';
export const RATINGS_KEY = 'ratings';
export const RATINGS_RAW_KEY = 'ratingsRaw';
export const TIMESTAMPS_KEY = 'timestamps';
export const START_TIMESTAMP_KEY = 'startTimestamp';
export const IMAGE_CLASS_KEY = 'image class';

export const DATA_SENT_KEY = 'dataSent';
export const STORAGE_KEY = config.taskName;
export const TASK_NAME_KEY = 'taskName';

const questParamsToKeep = [
  'updatePdf',
  'warnPdf',
  'normalizePdf',
  'tGuess',
  'tGuessSd',
  'pThreshold',
  'xThreshold',
  'beta',
  'delta',
  'gamma',
  'grain',
  'dim',
  'quantileOrder'
];


export function setQuestData(
  q,
  indexQuest,
  contrastsQuest,
  imagesQuest,
  responseQuest,
  responseTimeQuest,
  timestamps,
  startTimestamp,
  image_class) {

  const store = LocalStorageBackedStore.store;

  // set up objects
  store[QUEST_KEY] = {};
  store[QUEST_KEY][Q1_KEY] = {};
  store[QUEST_KEY][Q2_KEY] = {};
  store[QUEST_KEY][Q3_KEY] = {};
  store[QUEST_KEY][Q4_KEY] = {};
  store[QUEST_KEY][Q5_KEY] = {};
  store[QUEST_KEY][Q6_KEY] = {};


  store[QUEST_KEY][Q1_KEY][INDEX_KEY] = indexQuest[0];
  store[QUEST_KEY][Q1_KEY][CONTRASTS_KEY] = contrastsQuest[0];
  store[QUEST_KEY][Q1_KEY][IMAGES_KEY] = imagesQuest[0];
  store[QUEST_KEY][Q1_KEY][RESPONSE_KEY] = responseQuest[0];
  store[QUEST_KEY][Q1_KEY][RESPONSE_TIME_KEY] = responseTimeQuest[0];
  store[QUEST_KEY][Q1_KEY]["params"] = _.pick(q[1].params, questParamsToKeep);
  
  store[QUEST_KEY][Q2_KEY][INDEX_KEY] = indexQuest[1];
  store[QUEST_KEY][Q2_KEY][CONTRASTS_KEY] = contrastsQuest[1];
  store[QUEST_KEY][Q2_KEY][IMAGES_KEY] = imagesQuest[1];
  store[QUEST_KEY][Q2_KEY][RESPONSE_KEY] = responseQuest[1];
  store[QUEST_KEY][Q2_KEY][RESPONSE_TIME_KEY] = responseQuest[1];
  store[QUEST_KEY][Q2_KEY]["params"] = _.pick(q[2].params, questParamsToKeep);
  
  store[QUEST_KEY][Q3_KEY][INDEX_KEY] = indexQuest[2];
  store[QUEST_KEY][Q3_KEY][CONTRASTS_KEY] = contrastsQuest[2];
  store[QUEST_KEY][Q3_KEY][IMAGES_KEY] = imagesQuest[2];
  store[QUEST_KEY][Q3_KEY][RESPONSE_KEY] = responseQuest[2];
  store[QUEST_KEY][Q3_KEY][RESPONSE_TIME_KEY] = responseQuest[2];
  store[QUEST_KEY][Q3_KEY]["params"] = _.pick(q[3].params, questParamsToKeep);
  
  store[QUEST_KEY][Q4_KEY][INDEX_KEY] = indexQuest[3];
  store[QUEST_KEY][Q4_KEY][CONTRASTS_KEY] = contrastsQuest[3];
  store[QUEST_KEY][Q4_KEY][IMAGES_KEY] = imagesQuest[3];
  store[QUEST_KEY][Q4_KEY][RESPONSE_KEY] = responseQuest[3];
  store[QUEST_KEY][Q4_KEY][RESPONSE_TIME_KEY] = responseQuest[3];
  store[QUEST_KEY][Q4_KEY]["params"] = _.pick(q[4].params, questParamsToKeep);
  
  store[QUEST_KEY][Q5_KEY][INDEX_KEY] = indexQuest[4];
  store[QUEST_KEY][Q5_KEY][CONTRASTS_KEY] = contrastsQuest[4];
  store[QUEST_KEY][Q5_KEY][IMAGES_KEY] = imagesQuest[4];
  store[QUEST_KEY][Q5_KEY][RESPONSE_KEY] = responseQuest[4];
  store[QUEST_KEY][Q5_KEY][RESPONSE_TIME_KEY] = responseQuest[4];
  store[QUEST_KEY][Q5_KEY]["params"] = _.pick(q[5].params, questParamsToKeep);
  
  store[QUEST_KEY][Q6_KEY][INDEX_KEY] = indexQuest[5];
  store[QUEST_KEY][Q6_KEY][CONTRASTS_KEY] = contrastsQuest[5];
  store[QUEST_KEY][Q6_KEY][IMAGES_KEY] = imagesQuest[5];
  store[QUEST_KEY][Q6_KEY][RESPONSE_KEY] = responseQuest[5];
  store[QUEST_KEY][Q6_KEY][RESPONSE_TIME_KEY] = responseQuest[5];
  store[QUEST_KEY][Q6_KEY]["params"] = _.pick(q[6].params, questParamsToKeep);
  
  store[QUEST_KEY][TIMESTAMPS_KEY] = timestamps;
  store[QUEST_KEY][START_TIMESTAMP_KEY] = startTimestamp;
  store[QUEST_KEY][IMAGE_CLASS_KEY] = image_class;

  LocalStorageBackedStore.save();
}

export function getQuestData() {
  return LocalStorageBackedStore.store[QUEST_KEY];
}

export function processAndStoreData(q) {
  const store = LocalStorageBackedStore.store;
  store[PROCESSED_DATA_KEY_1] = questlib.ProcessQuestData(q[1],q[1]); ////Before double staircases, here using single. Takes mean of two, so identical if one is placed. Done for ease of adaptation of code.
  store[PROCESSED_DATA_KEY_2] = questlib.ProcessQuestData(q[2],q[2]);
  store[PROCESSED_DATA_KEY_3] = questlib.ProcessQuestData(q[3],q[3]);
  store[PROCESSED_DATA_KEY_4] = questlib.ProcessQuestData(q[4],q[4]);
  store[PROCESSED_DATA_KEY_5] = questlib.ProcessQuestData(q[5],q[5]);
  store[PROCESSED_DATA_KEY_5] = questlib.ProcessQuestData(q[6],q[6]);

  LocalStorageBackedStore.save();
}

export function getProcessedData() {
  return [LocalStorageBackedStore.store[PROCESSED_DATA_KEY_1], LocalStorageBackedStore.store[PROCESSED_DATA_KEY_2], LocalStorageBackedStore.store[PROCESSED_DATA_KEY_3], LocalStorageBackedStore.store[PROCESSED_DATA_KEY_4], LocalStorageBackedStore.store[PROCESSED_DATA_KEY_5], LocalStorageBackedStore.store[PROCESSED_DATA_KEY_3], LocalStorageBackedStore.store[PROCESSED_DATA_KEY_4], LocalStorageBackedStore.store[PROCESSED_DATA_KEY_6]];
  ;
}

function getComponentKey(componentNum) {
  return COMPONENT_KEY_PREFIX + componentNum;
}

export function setComponentData(componentNum, contrasts, images, response, responseTime, ratings, ratingsRaw, timestamps, startTimestamp, image_class) {
  const store = LocalStorageBackedStore.store;
  const key = getComponentKey(componentNum);

  store[key] = {};
  store[key][CONTRASTS_KEY] = contrasts;
  store[key][IMAGES_KEY] = images;
  store[key][RESPONSE_KEY] = response;
  store[key][RESPONSE_TIME_KEY] = responseTime;
  if (!_.isUndefined(ratings)) {
    store[key][RATINGS_KEY] = ratings;
  }
  if (!_.isUndefined(ratingsRaw)) {
    store[key][RATINGS_RAW_KEY] = ratingsRaw;
  }
  store[key][TIMESTAMPS_KEY] = timestamps;
  store[key][START_TIMESTAMP_KEY] = startTimestamp;
  store[key][IMAGE_CLASS_KEY] = image_class;

  LocalStorageBackedStore.save();
}

export function getComponentData(componentNum) {
  return LocalStorageBackedStore.store[getComponentKey(componentNum)];
}

export function setEncryptedMetadata(encryptedMetadata) {
  if (encryptedMetadata !== LocalStorageBackedStore.store[ENCRYPTED_METADATA_KEY]) {
    // Reset state
    LocalStorageBackedStore.clear();

    // Update id and save store
    LocalStorageBackedStore.store[ENCRYPTED_METADATA_KEY] = encryptedMetadata;
    LocalStorageBackedStore.save();
  }
}

export function getEncryptedMetadata() {
  return LocalStorageBackedStore.store[ENCRYPTED_METADATA_KEY];
}

export function setSurveyUrl(url) {
  LocalStorageBackedStore.store[SURVEY_URL_KEY] = url;
  LocalStorageBackedStore.save();
}

export function getSurveyUrl() {
  return LocalStorageBackedStore.store[SURVEY_URL_KEY];
}

export function getDataSent() {
  return LocalStorageBackedStore.store[DATA_SENT_KEY];
}

export function setDataSent(dataSent) {
  LocalStorageBackedStore.store[DATA_SENT_KEY] = dataSent;
  LocalStorageBackedStore.save();
}

// Export data
export function getStoreExport() {
  // Inject task type and name before encrypting store
  const dataToExport = _.clone(LocalStorageBackedStore.store);
  dataToExport[TASK_NAME_KEY] = config.taskName;
  dataToExport["taskVersion"] = config.taskVersion;

  // Inject stim data
  dataToExport["visualStim"] = visualStim;
  dataToExport["auditoryStim"] = auditoryStim;

  return JSON.stringify(dataToExport);
}

// Helper function that checks whether store is ready to be
// sent out.
export function isStoreComplete() {
  // Store should have encrypted id
  if (_.isUndefined(getEncryptedMetadata())) {
    return false;
  }

  // Make sure we have quest task data
  if (_.isUndefined(getQuestData())) {
    return false;
  }

  // Make sure we have data from four TTs
  // If we're debugging though, we don't want to check these
  if (!config.debug) {
      if (_.isUndefined(getComponentData(1))) { //// changed to 1 because we only have one block here. was previously a loop of integers up to 4.
        return false;
    }
  }

  // It looks like we have all the data we need.
  // The store is complete
  return true;
}

/********************************
 *                              *
 *          Store defn          *
 *                              *
 ********************************/

const LocalStorageBackedStore = {
   get store() {
    if (_.isUndefined(this._store)) {
      if (canUseLocalStorage()) {
        const savedStore = JSON.parse(localStorage.getItem(STORAGE_KEY));
        this._store = savedStore ? savedStore : {};
      } else {
        this._store = {};
      }
    }

    return this._store;
  },

  save() {
    if (canUseLocalStorage()) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.store));
      if (config.debug) {
        console.log("saved: " + localStorage.getItem(STORAGE_KEY));
      }
    }
  },

  clear() {
    if (config.debug) {
      console.log('cleared');
    }

    this._store = undefined;

    if (canUseLocalStorage()) {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}

// Expose store functions
export function getStore() {
  return LocalStorageBackedStore.store;
}

export function clearStore() {
  LocalStorageBackedStore.clear();
}

// Clear only task data; that is, keep metadata and dataSent flag.
export function clearTaskData() {
  // Save data we want to keep
  const encryptedMetadata = getEncryptedMetadata();
  const dataSent = getDataSent();
  const surveyUrl = getSurveyUrl();

  // Clear storage
  LocalStorageBackedStore.clear();

  // Set data without using setters so we don't trip unwanted logic
  LocalStorageBackedStore.store[ENCRYPTED_METADATA_KEY] = encryptedMetadata;
  LocalStorageBackedStore.store[DATA_SENT_KEY] = dataSent;
  LocalStorageBackedStore.store[SURVEY_URL_KEY] = surveyUrl;

  // Remember to persist
  LocalStorageBackedStore.save();
}
import EventEmitter from "events";
import fs from "fs";
import { getCurrentDate } from "./formatDate";
import path from 'path';
import config from '../config';

const eventEmitter = new EventEmitter();
const filePath = path.join(__dirname, "../logs/", config.logFile);

function addLog(message: string) {
  fs.appendFile(filePath,`${getCurrentDate()} - ${message};\n`, (err) => {
    if (err) {
      throw new Error(err.message);
    }
  });
}

eventEmitter.on("fileUploadStart", () => {
  addLog('File upload has started');
});

eventEmitter.on("fileUploadEnd", () => {
  addLog('File has been uploaded');
});

eventEmitter.on("fileUploadFailed", (err) => {
  addLog(`Error occurred, file upload was failed; ${err.message}`);
});

export default eventEmitter;

import EventEmitter from "events";
import fs from "fs";
import { getCurrentDate } from "./formatDate.js";
import { fileURLToPath } from "url";
import path from 'path';

const eventEmitter = new EventEmitter();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, "../filesUpload.log");

function addLog(message) {
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

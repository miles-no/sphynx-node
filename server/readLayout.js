import fs from 'fs';
import path from 'path';

function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, {encoding: 'utf-8'}, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export default function (layout) {
  const fileName = path.join('./layouts', layout);
  return readFile(fileName);
}

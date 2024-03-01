const fs = require('fs');
const path = require('path');

const testRecordFolder = './stress-test/records';

async function writeTestRecord(result) {
  const currentTime = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  const fileName = `result_${currentTime}.json`;
  await fs.mkdir(
    testRecordFolder,
    { recursive: true },
    (e) => e && console.log(e)
  );
  const filePath = path.join(process.cwd(), testRecordFolder, fileName);
  await fs.writeFile(filePath, result, (e) => e && console.log(e));
  return [fileName, filePath];
}

async function updateLatestPoint(fileName) {
  const latestPoint = path.join(process.cwd(), './stress-test/latest');
  await fs.writeFileSync(latestPoint, fileName);
}

module.exports = {
  writeTestRecord,
  updateLatestPoint,
};

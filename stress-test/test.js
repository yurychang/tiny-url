const autocannon = require('autocannon');
const { writeTestRecord, updateLatestPoint } = require('./utils');

async function main() {
  const result = await testRedirect();
  const [recordFile] = await writeTestRecord(JSON.stringify(result));
  updateLatestPoint(recordFile);
}

main();

async function testCreateUrl() {
  const result = await autocannon({
    url: 'http://localhost:8080/create-url',
    connections: 1000,
    pipelining: 1,
    duration: 10,
    method: 'POST',
    body: JSON.stringify({
      url: 'https://google.com',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return result;
}

async function testRedirect() {
  const result = await autocannon({
    url: `http://localhost:8080/FuYiIpr`,
    connections: 10,
    pipelining: 1,
    duration: 1,
  });
  return result;
}

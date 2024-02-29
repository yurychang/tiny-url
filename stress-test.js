const autocannon = require('autocannon');

// async/await
// async function createUrl() {
//   const result = await autocannon({
//     url: 'http://localhost:8080/create-url',
//     connections: 1000, //default
//     pipelining: 1, // default
//     duration: 10, // default
//     method: 'POST',
//     body: JSON.stringify({
//       url: 'https://google.com',
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
//   console.log(result);
// }
// createUrl();

const urlList = [
  'vCsCblk',
  'FuYiIpr',
  'ubzJSR8',
  'I1RIeIt',
  'xAxw31T',
  'DzVO25c',
];

async function redirect() {
  const result = await autocannon({
    url: `http://localhost:8080/FuYiIpr`,
    connections: 1000, //default
    pipelining: 1, // default
    duration: 10, // default
  });
  console.log(result);
}
redirect();

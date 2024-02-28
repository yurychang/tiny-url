process.on('uncaughtException', (err) => {
  console.log(err);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.log(reason);
});

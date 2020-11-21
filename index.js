// every two hour::  */2 * * * *

require("node-schedule").scheduleJob("*/2 * * * *", async function (fireDate) {
  await require("./database/Prune")();
  require("./database/Log")("expired list checked and pruned");
});

require("./server");
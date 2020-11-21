const dgram = require("dgram"),
  server = dgram.createSocket("udp4"),
  DHCPMessage = require("./dhcp/DHCPMessage"),
  Device = require("./database/Device"),
  log = require("./database/Log");
let MAClock = [];
server.on("message", async (msg, rinfo) => {
  let client_message = new DHCPMessage(msg);
  if (MAClock.includes(client_message.MAC)) return 0;

  MAClock.push(client_message.MAC);
  log(client_message);
  //console.log(client_message.msg.xid);
  const device = await new Device(client_message.MAC);

  let answer_type = {
    [DHCPMessage.TYPES.DISCOVER]: DHCPMessage.TYPES.OFFER,
    [DHCPMessage.TYPES.REQUEST]: DHCPMessage.TYPES.ACK,
    [DHCPMessage.TYPES.RELEASE]: 0,
  }[client_message.type];
  if (!answer_type) return 0;

  let server_response = new DHCPMessage();
  server_response.make(device, client_message.transID, answer_type);
  server.send(server_response.toBuffer(), 68, server_response.broadcastIP);
  MAClock = [];
  log(server_response);
  //console.log(server_response.msg.xid);
});

server.bind(67, "0.0.0.0", () => {
  server.setBroadcast(true);
  log("___Listen on  0.0.0.0:67___");
});

const { parse, format } = require("dhcp/lib/protocol"),
  env = require("../database/Enviroments");

class DHCPMessage {
  constructor(msg) {
    if (msg instanceof Buffer) this.msg = parse(msg);
    else if (msg instanceof Object) this.msg = msg;
    else this.msg = require("./Template");
  }

  make(device, transactionID, type) {
    this.msg.chaddr = device.MAC;
    this.msg.xid = transactionID;
    this.msg.yiaddr = device.IP;
    this.msg.siaddr = env.dhcpserver_ip;
    this.msg.options = {
      1: env.subnet_mask,
      3: device.RouterList,
      6: device.DnsList,
      28: env.broadcast_ip,
      53: type,
      51: device.LeaseTime,
      54: env.dhcpserver_ip,
    };
  }

  get type() {
    return this.msg.options[53];
  }

  get broadcastIP() {
    return this.msg.options[28];
  }

  get MAC() {
    return this.msg.chaddr;
  }
  get transID() {
    return this.msg.xid;
  }

  get IP(){
    return this.msg.yiaddr;
  }

  toBuffer() {
    let formatter_output = format(this.msg);
    return formatter_output._data.slice(0, formatter_output._w);
  }
}

DHCPMessage.TYPES = {
  DISCOVER: 1,
  OFFER: 2,
  REQUEST: 3,
  DECLINE: 4,
  ACK: 5,
  NAK: 6,
  RELEASE: 7,
  INFORM: 8,
};

module.exports = DHCPMessage;

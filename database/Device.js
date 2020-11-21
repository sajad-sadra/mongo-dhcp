const env = require("./Enviroments");
const devdb = require("./MongoDB/device");

async function new_device(mac) {}

class Device {
  constructor(MACAdress) {
    return (async () => {
      let deviceObj = await devdb.getByMAC(MACAdress);
      if (deviceObj.length === 0)
        deviceObj = [
          await devdb.saveNew(MACAdress, await require("./NewIP")(), {
            DNS: env.dns_list,
            ExpireTime: env.lease_time,
            Router: env.router_ip,
          }),
        ];
      this.dev = deviceObj[0];
      return this;
    })();
  }

  get IP() {
    return this.dev.IP;
  }
  get RouterList() {
    return [this.dev.Options.Router];
  }
  get DnsList() {
    return this.dev.Options.DNS;
  }
  get LeaseTime() {
    return this.dev.Options.ExpireTime;
  }
  get MAC() {
    return this.dev.MAC;
  }
}

module.exports = Device;

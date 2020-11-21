const db = require("./MongoDB/device"),
  time = require("./GetTime");

module.exports = async () => {
  let devices = await db.getAll();
  let expiredIP = [];
  let itaratedMac = [];
  devices.forEach((element) => {
    if (
      time.decimal - element.ReserveTime > element.Options.ExpireTime &&
      !element.Static
    )
      expiredIP.push(element.IP);

    if (!itaratedMac.includes(element.MAC)) {
      itaratedMac.push(element.MAC);
      let speDevice = devices.filter(({ MAC }) => MAC === element.MAC);
      if (speDevice.length > 1)
        speDevice
          .slice(0, speDevice.length - 1)
          .forEach((e) => expiredIP.push(e.IP));
    }
  });

  expiredIP.forEach(async (ip) => {
    await db.removeByIP(ip);
  });
};

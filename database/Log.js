const Time = require("./GetTime"),
  dhmsg = require("../dhcp/DHCPMessage"),
  logDB = require("./MongoDB/log");

function getType(value) {
  return Object.keys(dhmsg.TYPES).find((key) => dhmsg.TYPES[key] === value);
}

function log(msg_string) {
  console.log(Time.string + "::=> " + msg_string);
  if (require("./Enviroments").database_log_flag)
    logDB.store(Time.day, Time.time, msg_string);
}

module.exports = (message) => {
  //console.log(message.constructor.name);
  if (message instanceof dhmsg)
    log(
      `${
        [dhmsg.TYPES.OFFER, dhmsg.TYPES.ACK].includes(message.type)
          ? "server"
          : message.MAC
      } sends ${getType(message.type)}. ContexIP: ${message.IP}`
    );
  else if (typeof message === "string") log(message);
  else log("Invalid log type");
};

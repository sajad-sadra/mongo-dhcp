const randomIP = require("random-ip");
const devdb = require("./MongoDB/device");
const env = require("./Enviroments");

function subnet_convert(mask) {
  var maskNodes = mask.match(/(\d+)/g);
  var cidr = 0;
  for (var i in maskNodes) {
    cidr += ((maskNodes[i] >>> 0).toString(2).match(/1/g) || []).length;
  }
  return cidr;
}

module.exports = async () => {
  let db_search, ans;
  while (!db_search) {
    ans = randomIP(env.dhcpserver_ip, subnet_convert(env.subnet_mask));
    db_search = await devdb.getByIP(ans);
  }
  return ans;
};

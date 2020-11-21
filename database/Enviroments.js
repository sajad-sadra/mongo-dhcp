require("dotenv").config();

module.exports = {
  database_address: process.env.DB,
  get database_log_flag() {
    return ["Yes", "YES", "yes", "y", "Y"].includes(process.env.DB_LOG);
  },
  subnet_mask: process.env.NETMASK,
  dhcpserver_ip: process.env.SERVER,
  router_ip: process.env.ROUTER,
  broadcast_ip: process.env.BROADCAST,
  get dns_list() {
    return [process.env.DNS1, process.env.DNS2].filter((e) => e);
  },
  get lease_time() {
    return process.env.LEASE * 1000;
  },
};

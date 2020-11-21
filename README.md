# **Mongo DHCP**
Basic dhcp server that writen in nodejs and save user's data and configurations on mongo database.

# Deploy
Very easy:)
+ Expose port `67`
+ Clone
```
git clone https://github.com/sajad-sadra/mongo-dhcp.git
```
+ Go to directory
```
cd mongo-dhcp/
```
+ Edit [enviroments variables](https://github.com/sajad-sadra/mongo-dhcp#enviroments) to your proper values.
+ Run
```
npm start
```

# Enviroments
Enviroment variables that use in deploy procedure and placed in `.env` file.
| Variable   |   Description      |
|----------|:-------------:|
| DB | Url of mongodb server |
| DB_LOG | if it was `no` the logs just print in console. if `yes` the logs also add in database |
| SERVER | local ip address of this dhcp server |
| ROUTER | default address of network gateway |
| NETMASK | subnet mask of address |
| BROADCAST | local network broadcast ip adress(same netword part and broadcast host part-255-)|
| DNS1,DNS2 | default dns server address(you can leave DNS2 blank) |
| LEASE | default lease time |

# Database schema

Device
-------
DHCP-server save data and config of every device that connect to network in this schema on mongoDB.
```
{
  MAC: String,
  IP: String,
  Name: String,
  Static: Boolean,
  ReserveTime: Number,
  Options: {
    DNS: Array,
    ExpireTime: Number,
    Router: String,
  },
}
```
If you change these properties in database(for example with tools like [mongoCompass](https://www.mongodb.com/products/compass)) new value will applied for next request of device with no need to restart server.


| Variable   |   Description      |
|----------|:-------------:|
| MAC |  physical network address of device |
| IP |   IP-address that dhcp gave to this device    |
| Name | name or commnent just for ٰdetect or search easily in documents(the first one is automatically generated according to day and time but you should edit it) |
| Static | if it is `false` the document removed after lease time ended but if it is `true` this dockument never removed automatically |
| ReserveTime | code of time that this document generated (don't change it)|
| DNS  | array of dns server that must be passed to clients during dhcp-ack |
| Router  | IP address of network gateway that must be passed to client during dhcp-ack |


Log
----
Every dhcp message that device send and server replies have been logged in this part with time and date(if enviroment `DB_LOG=yes`).
```
{
  Day: String,
  Time: String,
  Contex: String,
}
```
*Day* and *Time* variable get from server system time and date.
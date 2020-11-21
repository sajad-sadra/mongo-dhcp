# **Mongo DHCP**
The basic DHCP server is written in node js and saves user's data and configurations on the mongo database.

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
+ Edit [enviroments variables](https://github.com/sajad-sadra/mongo-dhcp#enviroments) on your proper values.
+ Run
```
npm start
```

# Enviroments
Enviroment variables that use in the deploy procedure and placed in `.env` file.
| Variable   |   Description      |
|----------|:-------------:|
| DB | URL of mongodb server |
| DB_LOG | if it was `no` then logs just print in the console. if `yes` then logs also add to the database |
| SERVER | local IP address of this dhcp server |
| ROUTER | default address of network gateway |
| NETMASK | subnet mask of IP address |
| BROADCAST | local network broadcast IP adress(same netword part with broadcast host part-255-)|
| DNS1,DNS2 | default nameservers(you can leave DNS2 blank) |
| LEASE | default lease time |

# Database schema

Device
-------
DHCP-server saves data and config of every device that connects to the network in this schema on MongoDB.
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
If you change these properties in the database(for example with tools like [mongoCompass](https://www.mongodb.com/products/compass)) new value will applied for next request of device with no need to restart server.


| Variable   |   Description      |
|----------|:-------------:|
| MAC |  physical network address of device |
| IP |   IP-address that DHCP gave to this device    |
| Name | name or comment just to ٰdetect or search easily in documents (the first one is automatically generated according to day and time but you should edit it)  ) |
| Static | if it is `false` the document will be removed after lease time ended but if it is`true` this document will never be removed automatically |
| ReserveTime | code of time this document generated (don't change it)|
| DNS  | array of nameserver  that must be passed to clients during DHCP-ack |
| Router  | network gateway that must be passed to client during DHCP-ack |


Log
----
Every DHCP message that the device sends and server replies have been logged in this part with time and date (if environment `DB_LOG=yes`).
```
{
  Day: String,
  Time: String,
  Contex: String,
}
```
*Day* and *Time* variable getten from server system time and date.

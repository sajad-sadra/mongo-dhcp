module.exports = {
  get day() {
    const date_ob = new Date();
    const date = ("0" + date_ob.getDate()).slice(-2);
    const month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    const year = date_ob.getFullYear();
    return year + "/" + month + "/" + date;
  },
  get time() {
    const date_ob = new Date();
    const hours = date_ob.getHours();
    const minutes = date_ob.getMinutes();
    const seconds = date_ob.getSeconds();
    return hours + ":" + minutes + ":" + seconds;
  },
  get decimal() {
    return Date.now();
  },
  get string() {
    return this.day + " - " + this.time;
  },
};

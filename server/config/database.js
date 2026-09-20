const mongoose = require('mongoose');
require("dotenv").config();
const dns = require('dns');

try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) { }
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("DB Connected Successfully"))
    .catch( (error) => {
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    } )
};

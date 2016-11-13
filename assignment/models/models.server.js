module.exports = function () {


    var mongoose = require("mongoose");

//    var connectionString = 'mongodb://localhost/erp';
    var connectionString = 'mongodb://heroku_jrb41ckz:o8j8hia90nsm7o4vtuoe235qbb@ds151697.mlab.com:51697/heroku_jrb41ckz';


    if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
        connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
            process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
            process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
            process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
            process.env.OPENSHIFT_APP_NAME;
    }

    mongoose.Promise = global.Promise;

   var db_assignment =  mongoose.createConnection(connectionString);


    var models = {
        userModel: require("./user/user.model.server.js")(db_assignment),
        websiteModel: require("./website/website.model.server")(db_assignment),
        pageModel: require("./page/page.model.server")(db_assignment),
        orderModel: require("./order/order.model.server")(db_assignment),
    }

    return models;
}
const {MongoClient} = require('mongodb');

let dbConnection

module.exports = {
    connectDB: (cb) => {
        MongoClient.connect('mongodb://localhost:27017/Profile')
        .then((client) => {
            dbConnection = client.db()
            return cb()
        })
        .catch((err) => {
            console.error(err)
            return cb(err)
        })
    },
    getDB: () => dbConnection
};
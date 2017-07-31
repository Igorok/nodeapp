module.exports = {
    prod:false,
    app: {
        expireTokenDay: 7,
        port: 3000,
    },
    mongo:{
        host: "localhost",
        port: 27017,
        db: "chat_db",
        auth: false,
        user: "",
        password: "",
        opts: {
            auto_reconnect: true,
            poolSize: 40
        }
    }
};
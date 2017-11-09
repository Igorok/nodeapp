module.exports = {
    prod:true,
    app: {
        expireTokenDay: 7,
        port: 8080,
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

const fs = require('fs');
const server = require(__dirname + '/../../server.js');
let httpServer = null;

const cfgStr = `module.exports = {
        prod:false,
        app: {
            expireTokenDay: 7,
            port: 8080,
        },
        mongo:{
            host: "localhost",
            port: 27017,
            db: "test_db",
            auth: false,
            user: "",
            password: "",
            opts: {
                auto_reconnect: true,
                poolSize: 40
            }
        }
    };`;

module.exports.writeConfig = () => {
    return new Promise((resolve, reject) => {
        fs.writeFile(__dirname + '/../../local-config.js', cfgStr, 'utf8', (e, r) => {
            if (e) {
                return reject(e);
            }
            resolve(r);
        });
    });
};

module.exports.unlinkConfig = () => {
    return new Promise((resolve, reject) => {
        fs.unlink(__dirname + '/../../local-config.js', (e, r) => {
            if (e) {
                return reject(e);
            }
            resolve(r);
        });
    });
};

module.exports.launchServer = async () => {
    return await server.launch();
};

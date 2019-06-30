
const request = require('request');

const helper = require(__dirname + '/helpers/helper.js');


let cfg = null;
let webUrl = null;
let server = null;

describe('Test node application', async () => {
    // write test configuration, and get config
    describe('Create test configuration', async () => {
        it('write config', async (done) => {
            try {
                const writeConfig = await helper.writeConfig();
                expect(writeConfig).toBe(undefined);

                cfg = require(__dirname + '/../local-config.js');
                webUrl = `http://localhost:${cfg.app.port}/`;

                done();
            } catch (e) {
                done(e);
            }
        });
    });

    // launch http
    describe('Launch web application', async () => {
        it('listen server', async (done) => {
            try {
                server = await helper.launchServer();
                expect(server).not.toEqual(undefined);
                done();
            } catch (e) {
                done(e);
            }

        });
    });

    // check http connection
    describe(`GET ${ webUrl }`, () => {
        it('Web is launched', (done) => {
            request.get(webUrl, (error, response, body) => {
                expect(error).toBe(null);
                expect(response ? response.statusCode : null).toBe(200);
                done();
            });
        });
    });

    // stop http
    describe('Stop http server', () => {
        it('stop', (done) => {
            try {
                server.close(done);
            } catch (e) {
                done(e);
            }

        });
    });

     // remove config
     describe('Remove test configuration', () => {
        it('inlink', async (done) => {
            try {
                const unlinkConfig = await helper.unlinkConfig();
                expect(unlinkConfig).toBe(undefined);
                done();
            } catch (e) {
                done(e);
            }

        });
    });
});

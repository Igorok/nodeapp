const request = require('request');
const helper = require(__dirname + '/helpers/helper.js');
let cfg = null;
let webUrl = null;
let server = null;


describe('Test node application', async () => {
    describe('Create test configuration', async () => {
        it('write config', async (done) => {
            try {
                const writeConfig = await helper.writeConfig();
                expect(writeConfig).toBe(undefined);

                cfg = require(__dirname + '/../test-config.js');
                webUrl = `http://localhost:${cfg.app.port}/`;

                done();
            } catch (e) {
                done(e);
            }
        });
    });

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

    describe(`GET ${ webUrl }`, () => {
        it('Web is launched', (done) => {
            request.get(webUrl, (error, response, body) => {
                expect(error).toBe(null);
                expect(response ? response.statusCode : null).toBe(200);
                done();
            });
        });
    });

    describe('Check registration', () => {
        it('Send registration request', (done) => {
            let p = {
                method: 'POST',
                body: JSON.stringify({
                    fetch: 'user.registration',
                    login: 'test',
                    password: 'test',
                    email: 'test@test.com'
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            request.post(webUrl + 'fetch', p, (error, response, body) => {
                expect(error).toBe(null);
                expect(response ? response.statusCode : null).toBe(200);
                done();
            });
        });
    });

    describe('Stop http server', () => {
        it('Stop http server', (done) => {
            try {
                server.close(done);
            } catch (e) {
                done(e);
            }

        });
    });

    describe('Drop database after testing', () => {
        it('Drop database', async (done) => {
            try {
                let dropRes = await helper.dropTestDataBase();
                expect(dropRes).toBe(true);
                done();
            } catch (e) {
                done(e);
            }

        });
    });

     describe('Remove test configuration', () => {
        it('Configuration file unlink', async (done) => {
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

let express = require('express');
let router = express.Router();
var jwt = require('jsonwebtoken');


router.get('/', function(req, res, next) {
    res.render('test');
});
router.post('/jwtlogin', function(req, res, next) {
    let t = jwt.sign({ login: req.body.login}, 'secret', { algorithm:'HS256', expiresIn: '5m'});

    console.log(
        'login', req.body.login,
        'password', req.body.password,
        'token', t
    );
    /*
    login 123
    password 123 token
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IjEyMyIsImlhdCI6MTU2MzM2MzM4NywiZXhwIjoxNTYzMzYzNjg3fQ.TT6x48DaSuBmfFVKWgLsaJxSp-yyDpwxUzBgq1TG4tA
    */
    res.render('test', {token: t});
});
router.post('/jwtcheck', function(req, res, next) {


    var verify = jwt.verify(req.body.token, 'secret');

    console.log(
        'token', req.body.token,
        'verify', verify
    );

    /*

    token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IjEyMyIsImlhdCI6MTU2MzM2MzM4NywiZXhwIjoxNTYzMzYzNjg3fQ.TT6x48DaSuBmfFVKWgLsaJxSp-yyDpwxUzBgq1TG4tA verify { login: '123', iat: 1563363387, exp: 1563363687 }

    */

    res.render('test');
});

module.exports = router;

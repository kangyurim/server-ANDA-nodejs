module.exports = function(app){
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const controlelr = require('./pointController');
    
    //1. 포인트 적립
    // app.post('/app/point', jwtMiddleware, controlelr.postPoint);
}
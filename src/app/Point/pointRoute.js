module.exports = function(app){
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const controller = require('./pointController');
    
    //1. 포인트 적립
    // app.post('/app/point', jwtMiddleware, controlelr.postPoint);

    //2. 추천인 조회
    app.get('/app/point/recommend', controller.getRecommend);
}
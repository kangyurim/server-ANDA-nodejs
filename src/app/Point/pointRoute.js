const adminKeyCheck = require('../../../config/adminKeyCheck');
const jwtMiddleware = require('../../../config/jwtMiddleware');
const controller = require('./pointController');

module.exports = function(app){
    //1. 포인트 적립
    app.post('/app/point/invite', adminKeyCheck.checkAdmin, controller.postPoint);

    //2. 추천인 조회
    app.get('/app/point/recommend', controller.getRecommend);
}
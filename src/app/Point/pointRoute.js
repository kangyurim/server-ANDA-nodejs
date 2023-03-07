const adminKeyCheck = require('../../../config/adminKeyCheck');
const jwtMiddleware = require('../../../config/jwtMiddleware');
const controller = require('./pointController');

module.exports = function(app){
    //1. 포인트 적립
    app.post('/app/point/invite', adminKeyCheck.checkAdmin, controller.postInvitePoint);

    //2. 추천인 조회
    app.get('/app/point/recommend', controller.getRecommend);

    //3. 포인트 내역 조회
    app.get('/app/point/history',jwtMiddleware.jwtMiddleware, controller.getPointHistory);
}
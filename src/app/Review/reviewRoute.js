module.exports = function(app){
    const review = require('./reviewController');
    const jwt = require('../../../config/jwtMiddleware');
    const {imageUploader} = require('./s3ImgUploader');

    //1. 리뷰 남기기
    app.post('/app/review/post/', jwt.jwtMiddleware, imageUploader.any('images'), review.postReview);

    //2. 병원 리뷰 보기
    app.post('/app/review/view/simple', review.getReviewSimple);

    //3. 병원 리뷰 지역 카테고리로 보기
    app.post('/app/review/view/area', review.getReviewArea);

    //4. 분야별 리뷰 별점 Top 9 가져오기
    app.post('/app/review/rank/top9', review.getTop9);

    //5. 병원 아이디 입력시 간단 리뷰 가져오기
    app.post('/app/review/view/simple', review.getDetatilReview);

    //6. 리뷰 상세 보기
    app.post('/app/review/view/detail', review.getDetatilReview);

    //7. 리뷰 수정 하기
    //app.patch('/app/review/:reviewIdx', review.updateReview);

    //8. 리뷰 삭제 하기
    app.patch('/app/review/:reviewId/status', review.deleteReview);


}
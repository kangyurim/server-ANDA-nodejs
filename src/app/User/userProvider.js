const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const secret_config = require("../../../config/secret");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const userDao = require("./userDao");
const userProvider = require("./userProvider");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const {connect} = require("http2");
const res = require("express/lib/response");

const timeZone_options = { timeZone: 'Asia/Seoul' };

exports.emailDuplicateCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectUserEmail(connection, email);
  let resultMsg = '';
  connection.release();

  resultTemp = new Object;
  if(emailCheckResult[0].userCount==0) {
    resultTemp.isUsable = true;
    resultTemp.resultMsg = '사용 가능한 이메일입니다.';
  }
  else {
    resultTemp.isUsable = false;
    resultTemp.resultMsg = '이미 가입된 이메일입니다.';
  }
  return response(baseResponse.SUCCESS, resultTemp);
}

exports.doctorEmailDuplicateCheck = async function (email) {
  const connection = await pool.getConnection(async (conn) => conn);
  const emailCheckResult = await userDao.selectDoctorUserEmail(connection, email);

  result = new Object;

  if(emailCheckResult[0].userCount==0) {
    result.isUsable = true;
    result.resultMsg = '사용 가능한 이메일입니다.';
  }
  else{
    result.isUsable = false;
    result.resultMsg = '이미 가입된 이메일입니다.';
  } 
  connection.release();

  return response(baseResponse.SUCCESS, result);
}

exports.nicknameDuplicateCheck = async function (nickname){
  const connection = await pool.getConnection(async (conn) => conn);
  const nicknameCheckResult = await userDao.selectUserNickname(connection, nickname);
  connection.release();
  
  resultTemp = new Object;

  if(nicknameCheckResult[0].userCount==0) {
    resultTemp.isUsable = true;
    resultTemp.resultMsg = '사용 가능한 닉네임입니다.';
  }
  else if(nicknameCheckResult[0].userCount>=1){
    resultTemp.isUsable = false;
    resultTemp.resultMsg = '이미 사용중인 닉네임입니다.';
  } 

  return response(baseResponse.SUCCESS, resultTemp);
}

exports.jwtCheck = async function (token){
    let checkTokenResult = new Object();
    
    const jwtExpireDate = new Date(token.exp * 1000); // multiply by 1000 to convert from seconds to milliseconds
    const seoulExpireDate = jwtExpireDate.toLocaleString('en-US', timeZone_options); // convert the date to Seoul timezone

    checkTokenResult.result = "available";
    checkTokenResult.exp = seoulExpireDate;
    checkTokenResult.id = token.id;
    checkTokenResult.email = token.email;
    checkTokenResult.nickname = token.nickname;

    logger.info("jwtCheck - 사용자 자동 로그인됨 : " + token.email);
    return response(baseResponse.SUCCESS, checkTokenResult);
}

// refresh token으로 access, refresh token 재발급 하기
exports.updateAccessToken = async function (email, token){
  let result = new Object();
  const connection = await pool.getConnection(async (conn) => conn);
  
  try{
    connection.beginTransaction();
    const updateAccessTokenResult = await userDao.checkRefreshToken(connection, email, token);

    if(updateAccessTokenResult[0].IS_EXIST == 1){
      const userSignInResult = await userDao.findUserByRefreshToken(connection, token);
      let AccessToken = await jwt.sign(
        {
          id: userSignInResult.id,
          createAt: userSignInResult.createdAt,
          nickname: userSignInResult.nickname,
          email: userSignInResult.email,
          recommendUserCode: userSignInResult.recommendUserId,
        }, // 토큰의 내용(payload)
        secret_config.ACCESSjwtsecret, // 비밀키
        {
          expiresIn: "3h",
          subject: "userInfo",
        } // 유효 기간 3시간
      );

      let RefreshToken = await jwt.sign(
        {
          id: userSignInResult.id,
          createAt: userSignInResult.createdAt,
          nickName: userSignInResult.nickName,
          email: userSignInResult.email,
          recommendUserCode: userSignInResult.recommendUserId,
        }, // 토큰의 내용(payload)
        secret_config.REFRESHjwtsecret, // 비밀키
        {
          expiresIn: "2w",
          subject: "userInfo",
        } // 유효 기간 2주
      );
      
      const updateRefreshToken = await userDao.updateRefreshToken(connection, [RefreshToken, email]);

      result.accesToken = AccessToken;
      result.refreshToken = RefreshToken;
      connection.commit();
      logger.info(`App - updateAccessToken Service info\n: ${email} 유저 토큰 갱신 완료`)
      return response(baseResponse.SUCCESS, result);
    }
    else{
      connection.rollback();
      logger.info(`App - updateAccessToken Service info\n: ${email} 유저 토큰 갱신 실패`);
      return response(baseResponse.TOKEN_NOT_EXIST);
    }
  } catch (err) {
    logger.error(`App - updateAccessToken Service error\n: ${err.message}`);
    return errResponse(baseResponse.DB_ERROR);
  } finally {
    connection.release();
  }
}


//유저 리뷰 조회
exports.userReviewList = async function(userId) {
  const connection = await pool.getConnection(async (conn) => conn);
  let response;
  try{
      await connection.beginTransaction();
      const userReviewListResult = await userDao.userRivewList(connection, userId);
      await connection.commit();
      response = userReviewListResult;
  } catch(err){
      await connection.rollback();
      response = errResponse(baseResponse.DB_ERROR);
  } finally{
      connection.release();
      return response;
  }
}

//추천인 코드 존재 확인
exports.isExistRecommendCode = async function (recommendCode){
  const connection = await pool.getConnection(async (conn) => conn);

  try{
    const isExistRecommendCodeResult = await userDao.isExistRecommendCode(connection, recommendCode);
    connection.release();
    if(isExistRecommendCodeResult[0].userCount == 0){
    return response(baseResponse.SUCCESS, isExistRecommendCodeResult);
  }} catch(err){
    connection.release();
    return errResponse(baseResponse.DB_ERROR);
  }

}
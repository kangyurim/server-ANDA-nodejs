const userService = require("./userService");
const userProvider = require("./userProvider");

const {response, errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponseStatus = require("../../../config/baseResponseStatus");
const {integerCode} = require("./codeHasher");
var url = require('url');
require("dotenv").config();

let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

/**
 * 1. 회원가입 API
 * @param {json} req 
 * @param {json} res 
 */
exports.postUsers = async function (req, res) {
    const {email, password, nickname, recommendUserId, isOverAge, isTermsOfUseAgree, isPrivacyPolicyAgree, isMarketingInfoAgree} = req.body;

    let recommendUser;

    if(!email)
        return res.send(response(baseResponse.SIGNUP_EMAIL_EMPTY));
    if(regex.test(email) == false) 
        return res.send(baseResponse.SIGNUP_EMAIL_ERROR_TYPE);
    if(!password)
        return res.send(response(baseResponse.SIGNUP_PASSWORD_EMPTY));
    if(!nickname)
        return res.send(response(baseResponse.SIGNUP_NICKNAME_EMPTY));
    if(!isOverAge == null)
        return res.send(response(baseResponse.SIGNUP_IS_OVER_AGE_EMPTY));
    if(!isTermsOfUseAgree == null)
        return res.send(response(baseResponse.SIGNUP_IS_TERMS_OF_USE_AGREE_EMPTY));
    if(!isPrivacyPolicyAgree == null)
        return res.send(response(baseResponse.SIGNUP_IS_PRIVACY_POLICY_AGREE_EMPTY));
    if(isMarketingInfoAgree == null)
        return res.send(response(baseResponse.SIGNUP_IS_MARKETING_INFO_AGREE_EMPTY));

    if(typeof(isOverAge) != 'boolean')
        return res.send(response(baseResponse.SIGNUP_IS_OVER_AGE_TYPE_ERROR));
    if(typeof(isTermsOfUseAgree) != 'boolean')
        return res.send(response(baseResponse.SIGNUP_IS_TERMS_OF_USE_AGREE_TYPE_ERROR));
    if(typeof(isPrivacyPolicyAgree) != 'boolean')
        return res.send(response(baseResponse.SIGNUP_IS_PRIVACY_POLICY_AGREE_TYPE_ERROR));
    if(typeof(isMarketingInfoAgree) != 'boolean')
        return res.send(response(baseResponse.SIGNUP_IS_MARKETING_INFO_AGREE_TYPE_ERROR));
    
    if(!recommendUserId) recommendUser = 'nothing';

    const signupUserResponse = await userService.creteUser(
        email,
        password,
        nickname,
        isOverAge,
        isTermsOfUseAgree,
        isPrivacyPolicyAgree,
        isMarketingInfoAgree,
        recommendUserId
    )

    return res.send(signupUserResponse);
}

/**
 * 2. 로그인 API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.signinUser = async function (req, res){
    const {email, password} = req.body;

    if(!email)
        return res.send(response.response(baseResponse.SIGNIN_EMAIL_EMPTY))
    if(regex.test(email) == false) 
        return res.send(baseResponse.SIGNUP_EMAIL_ERROR_TYPE);
    if(!password)
        return res.send(response.response(baseResponse.SIGNIN_PASSWORD_EMPTY))

    const signinUserResponse = await userService.signinUser(
        email,
        password
    ) 

    return res.send(signinUserResponse);
}

/**
 * 의사 로그인 API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 exports.signinDoctorUser = async function (req, res){
    const {email, password} = req.body;

    if(!email)
        return res.send(response.response(baseResponse.SIGNIN_EMAIL_EMPTY))
    if(!password)
        return res.send(response.response(baseResponse.SIGNIN_PASSWORD_EMPTY))

    const signinUserResponse = await userService.signinDoctorUser(
        email,
        password
    ) 

    return res.send(signinUserResponse);
}

/**
 * 이메일로 중복 유저 확인하기
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.isDuplicateEmailUser = async function(req, res){
    email = req.query.email; 
    if(!email) return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));

    const isDuplicateUserResponse = await userProvider.emailDuplicateCheck(email);

    return res.send(isDuplicateUserResponse);    
}

/**
 * 이메일로 중복 의사 유저 확인하기
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
 exports.isDuplicateEmailUserDoctor = async function(req, res){
    email = req.query.email; 
    if(!email) return res.send(errResponse(baseResponse.SIGNIN_EMAIL_EMPTY));

    const isDuplicateUserResponse = await userProvider.doctorEmailDuplicateCheck(integerCode);

    return res.send(isDuplicateUserResponse);    
}

/**
 * 닉네임 중복 확인
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.isDuplicateNicknameUser = async function(req, res){
    nickname = req.query.nickname;
    if(!nickname) return res.send(errResponse(baseResponse.SIGNIN_NICKNAME_EMPTY));

    const isDuplicateUserResponse = await userProvider.nicknameDuplicateCheck(nickname);

    return res.send(isDuplicateUserResponse)
}



/**
 * JWT Token verify
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.jwtCheck = async function(req, res){
    const accessToken = req.verifiedToken;

    if(!accessToken) return res.send(response.response(baseResponse.EMPTY_TOKEN))

    const tokenVerifyRes = await userProvider.jwtCheck(accessToken);
    
    return res.send(tokenVerifyRes);
}

/**
 * 이메일인증하기
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.verifyEmail = async function(req, res){
    const {email} = req.body;

    if(!email) return res.send(baseResponse.SIGNUP_EMAIL_EMPTY);
    if(regex.test(email) == false) return res.send(baseResponse.SIGNUP_EMAIL_ERROR_TYPE);
    
    const emailVerifyRes = await userService.verifyEmail(email, integerCode(email));

    return res.send(emailVerifyRes);
}

/**
 * 이메일 코드 인증하기
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.verifyEmailCode = async function(req, res){
    const {email, code} = req.query;

    if(!email) return res.send(baseResponse.SIGNUP_EMAIL_EMPTY);
    if(!code) return res.send(baseResponse.SIGNUP_EMAIL_CODE_EMPTY);
    if(regex.test(email) == false) return res.send(baseResponse.SIGNUP_EMAIL_ERROR_TYPE);

    const codeVerifyRes = await userService.verifyEmailCode(email, code);

    return res.send(codeVerifyRes);
}

/**
 * 의사 회원가입
 * @param {*} req
 *  @param {*} res
 */
exports.postDoctor = async function(req, res){
    const {nickname, email, password, phone, hospitalName, recommendUserId} = req.body;

    if(!email)
        return res.send(baseResponse.SIGNUP_EMAIL_EMPTY);
    if(!password)
        return res.send(baseResponse.SIGNUP_PASSWORD_EMPTY);
    if(!nickname)
        return res.send(baseResponse.SIGNUP_NICKNAME_EMPTY);
    if(!phone)
        return res.send(baseResponse.SIGNUP_PHONE_EMPTY);
    if(!hospitalName)
        return res.send(baseResponse.SIGNUP_HOSPITALNAME_EMPTY);

    const signupDoctorResponse = await userService.creteDoctorUser(
        nickname, 
        email, 
        password, 
        phone, 
        hospitalName, 
        recommendUserId
    )

    return res.send(signupDoctorResponse);
}

/**
 * 핸드폰 번호로 아이디 찾기 API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.findId = async function(req, res){
    const phone = req.body.phone;
    const userType = req.body.userType;

    if(!userType) return res.send(baseResponse.CHECK_USER_TYPE_EMPTY);
    if(!phone) return res.send(baseResponse.CHECK_PHONENUMBER_EMPTY);

    const findIdResponse = await userService.findId(phone, userType);

    return res.send(findIdResponse);
}

/**
 * 회원 비밀번호 업데이트 API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updatePassword = async function(req, res){
    const userType = req.body.userType;
    const email = req.body.email;
    const password = req.body.password;

    if(!userType) return res.send(baseResponse.CHECK_USER_TYPE_EMPTY);
    if(!email) return res.send(baseResponse.SIGNUP_EMAIL_EMPTY);
    if(!password) return res.send(baseResponse.SIGNUP_PASSWORD_EMPTY);

    if(userType != 'user' && userType != 'doctor') return res.send(baseResponse.CHECK_USER_TYPE);
    const updatePasswordResponse = await userService.updatePassword(userType, email, password);

    return res.send(updatePasswordResponse);
}

/*
* 유저 아이디로 리뷰 조회 API
* @param {json} req 
* @param {json} res 
*/
exports.getUserReviews = async function(req, res){
   /*
       Body: userId
   */

    const {userId} = req.body;
    
   if(!userId) return res.send(response(baseResponse.USER_ID_NOT_EXIST));

   const userReviewListResult = await userProvider.userReviewList(userId);

   return res.send(response(baseResponse.SUCCESS, userReviewListResult));
}

exports.updateAccessToken = async function(req, res){
    const {email, refreshToken} = req.body;

    if(!email) 
        return res.send(baseResponse.SIGNUP_EMAIL_EMPTY);
    if(!refreshToken)
        return res.send(baseResponse.TOKEN_EMPTY);

    const refreshTokenResponse = await userProvider.updateAccessToken(email, refreshToken);

    return res.send(refreshTokenResponse);
}
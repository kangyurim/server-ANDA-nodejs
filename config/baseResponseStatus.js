module.exports = {

    // 단순 API SUCCESS
    SUCCESS : { "isSuccess": true, "code": 1000, "message":"성공" },

    // User -> 회원가입 관련 Error 코드
    SIGNUP_EMAIL_EMPTY : { "isSuccess": false, "code": 2001, "message":"이메일을 입력해주세요."},
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2002, "message":"별명을 입력해주세요."},
    SIGNUP_PASSWORD_EMPTY : { "isSuccess": false, "code": 2003, "message":"비밀번호를 입력해주세요."},
    SIGNUP_NICKNAME_EMPTY : { "isSuccess": false, "code": 2004, "message":"닉네임을 입력해주세요."},
    SIGNUP_PASSWORD_ENCRYPTION_ERROR : { "isSuccess": false, "code": 2005, "message":"비밀번호 암호화에 실패했습니다."},

    SIGNUP_PHONE_EMPTY : { "isSuccess": false, "code": 2501, "message":"핸드폰 번호를 입력해주세요."},
    SIGNUP_HOSPITALNAME_EMPTY : { "isSuccess": false, "code": 2502, "message":"병원 이름을 입력해주세요."},
    SIGNUP_EMAIL_CODE_EMPTY: {"isSuccess": false, "code": 2503, "message":"이메일 인증코드를 입력해주세요."},
    SIGNUP_EMAIL_ERROR_TYPE: {"isSuccess": false, "code": 2504, "message":"이메일 형식이 올바르지 않습니다."},
    EMAIL_CODE_MATCH: {"isSuccess": true, "code": 2505, "message":"이메일 인증이 완료되었습니다."},
    EMAIL_CODE_NOT_MATCH: {"isSuccess": false, "code": 2506, "message":"이메일 인증코드가 일치하지 않습니다."},
    
    SIGNUP_IS_OVER_AGE_EMPTY: {"isSuccess": false, "code": 2507, "message":"14세 이상 동의 여부를 입력해주세요(isOverAge: true/false)"},
    SIGNUP_IS_TERMS_OF_USE_AGREE_EMPTY: {"isSuccess": false, "code": 2508, "message":"이용약관 동의 여부를 입력해주세요(isTermsOfUseAgree: true/false)"},
    SIGNUP_IS_PRIVACY_POLICY_AGREE_EMPTY: {"isSuccess": false, "code": 2509, "message":"개인정보 수집 및 이용 동의 여부를 입력해주세요(isPrivacyPolicyAgree: true/false)"},
    SIGNUP_IS_OVER_AGE_TYPE_ERROR: {"isSuccess": false, "code": 2510, "message":"14세 이상 동의 여부(isOverAge)는 boolean 타입입니다."},
    SIGNUP_IS_TERMS_OF_USE_AGREE_TYPE_ERROR: {"isSuccess": false, "code": 2511, "message":"이용약관 동의 여부(isTermsOfUseAgree)는 boolean 타입입니다."},
    SIGNUP_IS_PRIVACY_POLICY_AGREE_TYPE_ERROR: {"isSuccess": false, "code": 2512, "message":"개인정보 수집 및 이용 동의 여부(isPrivacyPolicyAgree)는 boolean 타입입니다."},
    SIGNUP_IS_MARKETING_INFO_AGREE_EMPTY: {"isSuccess": false, "code": 2513, "message":"마케팅 정보 수신 동의 여부를 입력해주세요(isMarketingInfoAgree: true/false)"},
    SIGNUP_IS_MARKETING_INFO_AGREE_TYPE_ERROR: {"isSuccess": false, "code": 2514, "message":"마케팅 정보 수신 동의 여부(isMarketingInfoAgree)는 boolean 타입입니다."},

    SIGNUP_EMAIL_DUPLICATED : { "isSuccess": false, "code": 2005, "message":"이미 가입된 회원입니다."},
    SIGNUP_CODE_EMPTY : { "isSuccess": false, "code": 2006, "message":"인증코드를 입력해주세요."},
    BODY_EMPTY : { "isSuccess": false, "code": 2006, "message":"요청된 body가 없습니다."},

    // User -> 로그인 관련 Error 코드
    SIGNIN_EMAIL_EMPTY : { "isSuccess": false, "code": 2101, "message":"이메일을 입력해주세요." },
    SIGNIN_PASSWORD_EMPTY : { "isSuccess": false, "code": 2102, "message":"비밀번호를 입력해주세요." },
    SIGNIN_NICKNAME_EMPTY : { "isSuccess": false, "code": 2103, "message":"닉네임을 입력해주세요." },
    SIGNIN_FAILED : { "isSuccess": false, "code": 2104, "message":"이메일/비밀번호를 확인해주세요."},

    // User -> 회원정보 관련 Error 코드
    CHECK_PHONENUMBER_EMPTY : {"isSuccess": false, "code": 2201, "message":"핸드폰 번호를 입력해주세요."},
    USER_ID_NOT_EXIST : {"isSuccess": false, "code": 2202, "message":"존재하지 않는 회원입니다."},
    CHECK_USER_TYPE_EMPTY: {"isSuccess": false, "code": 2203, "message":"회원 타입을 입력해주세요."},
    CHECK_USER_TYPE: {"isSuccess": false, "code": 2204, "message":"회원 타입을 확인해주세요.(user 혹은 doctor)"},

    // Guestbook -> 방명록 관련 Error 코드
    GUESTBOOK_WRITER_EMPTY : {"isSuccess": false, "code": 3001, "message":"닉네임을 입력해주세요."},
    GUESTBOOK_CONTENT_EMPTY : {"isSuccess": false, "code": 3001, "message":"방명록 내용을 입력해주세요."},

    //POINT 관련 Error 코드
    RECOMMEND_CODE_EMPTY : { "isSuccess": false, "code": 3101, "message":"추천인 코드를 입력해주세요."},
    RECOMMEND_CODE_NOT_EXIST : { "isSuccess": false, "code": 3102, "message":"존재하지 않는 추천인 코드입니다."},
    
    // Review -> 리뷰 관련 Error 코드
    //REVIEW_POSTIMGURLS_EMPTY
    REVIEW_CONTENT_LENGTH : { "isSuccess": false, "code": 4001, "message":"최소 20자 이상 작성해주세요." },
    REVIEW_SCORE_EMPTY : { "isSuccess": false, "code": 4002, "message":"점수 키가 존재하지 않습니다." },
    REVIEW_OPHTHALMOLOHYID_EMPTY : { "isSuccess": false, "code": 4003, "message":"병원id를 입력해주세요." },
    REVIEW_OPHTHALMOLOHYID_LENGTH : { "isSuccess": false, "code": 4004, "message":"병원id는 0보다 큰 값으로 입력해주세요." },
    REVIEW_OPHTHALMOLOHYID_TYPE_ERROR : { "isSuccess": false, "code": 4005, "message":"병원id는 숫자로 입력해주세요." },
    REVIEW_TYPE_EMPTY : { "isSuccess": false, "code": 4006, "message":"리뷰 타입을 입력해주세요(normal, lasic, lasec, smile-lasic, lens-insert." },
    REVIEW_TYPE_INVALIED : { "isSuccess": false, "code": 4007, "message":"리뷰 타입을 정확히 입력해주세요(normal, lasic, lasec, smile-lasic, lens-insert, cataract)" },
    REVIEW_LOCATION_EMPTY : { "isSuccess": false, "code": 4008, "message":"리뷰를 확인할 안과의 위치를 지정해주세요." },
    REVIEW_LOCATION_INVALIED : { "isSuccess": false, "code": 4009, "message":"location 형식은 Array입니다. 예시: ['마포구', '송파구']" },
    REVIEW_CATEGORY_INVALIED: {"isSuccress": false, "code": 4010, "message": "진료 타입을 정확히 입력해주세요(lasic, lasec, smile-lasic, lens-insert, cataract, diagnosis)"},
    REVIEW_CATEGORY_EMPTY: {"isSuccress": false, "code": 4011, "message": "진료 타입을 입력해주세요(lasic, lasec, smile-lasic, lens-insert, cataract, diagnosis)"},
    REVIEW_SCORE_TYPE_ERROR: {"isSuccress": false, "code": 4012, "message": `점수는 json으로 입력해주세요. 예시: {"friendlyScore": 1, "waitScore" : 0, "priceScore" : 2, "infoScore": 0, "recommendScore": 2}`},
    REVIEW_EXPENSECONTENT_EMPTY: {"isSuccess": false, "code": 4013, "message": "비용리뷰 내용을 입력해주세요."},
    REVIEW_EXPENSEAMOUNT_EMPTY: {"isSuccess": false, "code": 4014, "message": "비용리뷰 금액을 입력해주세요."},
    REVIEW_HOSPITALID_EMPTY: {"isSuccess": false, "code": 4015, "message": "병원id를 입력해주세요."},
    REVIEW_REVIEWID_EMPTY: {"isSuccess": false, "code": 4016, "message": "리뷰id를 입력해주세요.(reviewId : nnnn)"},
    
    //DB ERROR
    DB_ERROR : {"isSuccess": false, "code": 5001, "message":"DB관련 에러"},
    TRANSACTION_ERROR : {"isSuccess": false, "code": 5002, "message":"트랜젝션중 에러가 발생했습니다. 다시 요청해주세요."},

    //TOEKN 관련 Error
    TOKEN_EMPTY : { "isSuccess": false, "code": 5101, "message":"토큰이 없습니다."},
    TOKEN_EMAIL_EMPTY: { "isSuccess": false, "code": 5102, "message":"이메일이 없습니다."},
    TOKEN_VERIFICATION_FAILURE: { "isSuccess": false, "code": 5103, "message":"토큰 해독 에러"},
    TOKEN_NOT_EXIST: { "isSuccess": false, "code": 5104, "message":"일치하는 토큰이 존재하지 않습니다."},
}
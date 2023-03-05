const {response} = require("../../../config/response");
const {logger} = require("../../../config/winston");

const pointProvider = require("./pointProvider");
const pointService = require("./pointService");

const baseResponse = require("../../../config/baseResponseStatus");

/**
 * 2. 추천인 조회 API
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getRecommend = async function(req, res){
    const code = req.query.code;

    if(!code) return res.send(response(baseResponse.RECOMMEND_CODE_EMPTY));
    if(code.length != 8) return res.send(response(baseResponse.RECOMMEND_CODE_LENGTH));

    const result = await pointProvider.getRecommend(code);
    
    return res.send(result);
}
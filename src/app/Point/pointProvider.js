const {logger} = require("../../../config/winston");
const {pool} = require("../../../config/database");
const baseResponse = require("../../../config/baseResponseStatus");
const {response} = require("../../../config/response");
const {errResponse} = require("../../../config/response");

const pointDao = require("./pointDao");


//2. 추천인 아이디 조회
exports.getRecommend = async function(code){
    const connection = await pool.getConnection(async (conn) => conn);
    
    try{
        const result = await pointDao.getRecommend(connection, code);

        if(result === 1) {
            logger.info(`App - getRecommend Service success. recommend Code: ${code}`);
            return response(baseResponse.SUCCESS);
        }
        else{
            logger.info(`App - getRecommend Service failed. recommend Code: ${code}`);
            return response(baseResponse.RECOMMEND_CODE_NOT_EXIST);
        }
    }catch (err){
        logger.error(`App - getRecommend Service error\n: ${err.message}`);
        return errResponse(baseResponse.DB_ERROR);
    } finally {
        connection.release();
    }
}
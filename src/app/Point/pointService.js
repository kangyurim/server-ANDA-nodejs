const {pool} = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {response, errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const dao = require("./pointDao");
const crypto = require("crypto");
require("dotenv").config();

exports.postPoint = async function (code){
    const connection = await pool.getConnection(async (conn) => conn);
    let pointCode;

    try{
        connection.beginTransaction();
        insertUserId = await dao.findUserIdByCode(connection, code);
    
        try{
            pointCode = await crypto
                .createHash("sha256", process.env.POINT_ENC_KEY)
                .update(code+randomInt(0, 10000) + randomInt(0, 10000))
                .digest("hex");
        } catch(error){
            return errResponse(baseResponse.POINT_ENCRYPTION_ERROR);
        }

        pointCode = pointCode.substring(0, 20);

        pointInsertResult = await dao.recommendPointInsert(connection, code);
        
        insertUserPoint = await dao.insertPointUser(connection, insertUserId, pointCode);

        connection.commit();
        if(pointInsertResult == 0 || insertUserPoint == 0){
            return errResponse(baseResponse.POINT_INSERT_ERROR);
        }

        if(insertUserPoint == 1){
            return response(baseResponse.SUCCESS);
        }

    } catch(error){
        logger.error(`postPoint - DB Connection error\n: ${error.message}`);
        connection.rollback();

        return errResponse(baseResponse.TRANSACTION_ERROR);
    } finally{
        connection.release();
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
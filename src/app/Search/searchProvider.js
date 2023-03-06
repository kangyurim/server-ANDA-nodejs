const dao = require("./searchDao");

const {pool} = require("../../../config/database");
const { logger } = require("../../../config/winston");
const {response, errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponseStatus = require("../../../config/baseResponseStatus");
require("dotenv").config();

exports.searchHospital = async function (hospitalName) {
    const connection = await pool.getConnection(async (conn) => conn);

    try{
        const result = await dao.searchHospital(connection, hospitalName);

        return response(baseResponse.SUCCESS, result);
    } catch (error){
        logger.error(`searchHospital - DB Connection error\n: ${error.message}`);
        return errResponse(baseResponse.DB_ERROR);
    }finally{
        connection.release();
    }
}
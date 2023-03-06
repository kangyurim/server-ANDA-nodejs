const service = require("./searchService");
const provider = require("./searchProvider");

const { logger } = require("../../../config/winston");
const {response, errResponse} = require("../../../config/response");
const baseResponse = require("../../../config/baseResponseStatus");
const baseResponseStatus = require("../../../config/baseResponseStatus");
require("dotenv").config();


exports.searchHospital = async function (req, res) {
    
    try{
        const hospitalName = req.query.name;

        if(!hospitalName)
            return res.send(response(baseResponse.SEARCH_HOSPITAL_EMPTY));
        if(hospitalName.length <= 2)
            return res.send(response(baseResponse.SEARCH_HOSPITAL_LENGTH));
    
        logger.info(`searchHospital - hospitalName : ${hospitalName}`);
    
        const result = await provider.searchHospital(hospitalName);
    
        return res.send(result);
    } catch (error){
        logger.error(`searchHospital - error\n: ${error.message}`);
        return res.send(errResponse(baseResponse.SEARCH_HOSPITAL_EMPTY));
    }
   
}
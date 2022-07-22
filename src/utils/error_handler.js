const logger = require('../utils/logger')
const constants = require('../common/constants')

module.exports = {

    /**
     * @name ErrorHandler
     * @description Logging when error occurs and handle status code
     * @param {Error} error Http Error
     * @param {Request} req Http Request object
     * @param {Response} res Http Response object
     * @param {next} next Http next callback
     * */

    ErrorHandler: function(error, req, res, next){
        logger.error(`${error.source_path} error : ${error.message}`)
        if(!error.error_code){
            res.status(500)
            error.error_code = constants.ERROR_CODE_UNKNOWN
        }else{
            switch (error.error_code){
                case constants.ERROR_CODE_EMPTY:
                    res.status(400);
                    break;
                case constants.ERROR_CODE_NOT_FOUND:
                case constants.ERROR_CODE_TOKEN_EXPIRED:
                case constants.ERROR_CODE_NOT_MATCH:
                    res.status(401)
                    break;

            }
        }
        res.json({
            error_code: error.error_code,
            message: error.message
        })
    },

}
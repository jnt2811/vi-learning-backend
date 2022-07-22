const databaseService = require('../services/databaseService')
const common = require('../../common/common_function')
const constants = require('../../common/constants')
const logger = require("../../utils/logger")

function Resource(){
    this.initDatabase = initDatabase;
}

async function initDatabase(req,res,next){
    try {
        // common.check_data(req.body, ["database_name"], constants.ERROR_CODE_EMPTY)
        res.json(databaseService.initDatabase(req.body))
    } catch (error) {
        next(error)
    }
}

module.exports = new Resource;
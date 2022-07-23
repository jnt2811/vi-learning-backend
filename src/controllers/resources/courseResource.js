const courseService = require('../services/courseService')
const common = require('../../common/common_function')
const constants = require('../../common/constants')

function Resource(){
    this.getAllCourse = getAllCourse;
    this.getCourse = getCourse;
    this.addNewCourse = addNewCourse;
    this.updateCourse = updateCourse;
}

async function addNewCourse(req, res, next){
    try {
        common.check_data(req.body, ["data"], constants.ERROR_CODE_EMPTY)
        res.json(await courseService.addNewCourse(req.body));
    } catch (err) {
        next(err)
    }
}

async function getAllCourse(req, res, next){
    let returnProps = {
        ID: "",
        courseName: "",
        description: "",
        privacy: "",
        thumbnail: ""
    }

    try {
        let userInfo = await courseService.getAllCourse(req.query)
        if(userInfo.result && userInfo.result.length){
            common.pickReturnProperties(userInfo.result, returnProps)
        }
        res.json(userInfo);
    } catch (err) {
        next(err)
    }
}

async function getCourse(req, res, next){
    let returnProps = {
        ID: "",
        courseName: "",
        description: "",
        privacy: "",
        thumbnail: ""
    }

    try {
        common.check_data(req.query, ["courseID"], constants.ERROR_CODE_EMPTY)
        let userInfo = await courseService.getCourse(req.query)
        if(userInfo.result && userInfo.result.length){
            common.pickReturnProperties(userInfo.result, returnProps)
        }
        res.json(userInfo);
    } catch (err) {
        next(err)
    }
}

async function updateCourse(req, res, next){
    try {
        res.json(await courseService.updateCourse(req.body));
    } catch (err) {
        next(err)
    }
}


module.exports = new Resource;
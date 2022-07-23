const lessonService = require('../services/lessonService')
const common = require('../../common/common_function')
const constants = require('../../common/constants')
const axios = require('axios')
function Resource(){
    this.getLesson = getLesson;
    this.addNewLesson = addNewLesson;
    this.updateLesson = updateLesson;

    this.test = test;
}

async function addNewLesson(req, res, next){
    try {
        common.check_data(req.body, ["data"], constants.ERROR_CODE_EMPTY)
        res.json(await lessonService.addNewLesson(req.body));
    } catch (err) {
        next(err)
    }
}

async function getLesson(req, res, next){
    let returnProps = {
        ID: "",
        lessonName: "",
        courseID: "",
        videoLink: "",
        description: ""
    }

    try {
        common.check_data(req.query, ["courseID"], constants.ERROR_CODE_EMPTY)
        let userInfo = await lessonService.getLesson(req.query)
        if(userInfo.result && userInfo.result.length){
            common.pickReturnProperties(userInfo.result, returnProps)
        }
        res.json(userInfo);
    } catch (err) {
        next(err)
    }
}

async function updateLesson(req, res, next){
    try {
        res.json(await lessonService.updateLesson(req.body));
    } catch (err) {
        next(err)
    }
}

async function test(req, res, next){
    let config = {

    }

    let url = 'https://726b-123-16-146-8.ap.ngrok.io/api/resources/users/getUserInformation?userID=thanh'
    try{
        let axiosCli = axios.create({
            baseURL: "https://726b-123-16-146-8.ap.ngrok.io",
            headers: {
                "Content-type": ""
            }

        })
        console.log(result)
    }catch (err) {
        next(err)
    }
}


module.exports = new Resource;
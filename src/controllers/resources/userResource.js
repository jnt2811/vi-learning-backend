const userService = require('../services/userService')
const common = require('../../common/common_function')
const constants = require('../../common/constants')

function Resource(){
    this.login = login;

    this.getAllUser = getAllUser;
    this.getUserInformation = getUserInformation;
    this.addNewUser = addNewUser;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
}

async function addNewUser(req, res, next){
    try {
        common.check_data(req.body, ["data"], constants.ERROR_CODE_EMPTY)
        res.json(await userService.addNewUser(req.body));
    } catch (err) {
        next(err)
    }
}

async function getAllUser(req, res, next){
    let returnProps = {
        ID: "",
        firstName: "",
        lastName: "",
        role: "",
        phoneNumber: "",
        address: "",
        class: ""
    }

    try {
        let userInfo = await userService.getAllUser(req.query)
        if(userInfo.result && userInfo.result.length){
            common.pickReturnProperties(userInfo.result, returnProps)
        }
        res.json(userInfo);
    } catch (err) {
        next(err)
    }
}

async function getUserInformation(req, res, next){
    let returnProps = {
        ID: "",
        firstName: "",
        lastName: "",
        role: "",
        phoneNumber: "",
        address: "",
        class: ""
    }

    try {
        common.check_data(req.query, ["userID"], constants.ERROR_CODE_EMPTY)
        let userInfo = await userService.getUserInformation(req.query)
        if(userInfo.result && userInfo.result.length){
            common.pickReturnProperties(userInfo.result, returnProps)
        }
        res.json(userInfo);
    } catch (err) {
        next(err)
    }
}

async function updateUser(req, res, next){
    try {
        res.json(await userService.updateUser(req.body));
    } catch (err) {
        next(err)
    }
}

async function login(req, res, next){
    let returnProps = {
        ID: "",
        firstName: "",
        lastName: "",
        role: "",
        phoneNumber: "",
        address: "",
        class: ""
    }

    try {
        common.check_data(req.body, ["username", "password"], constants.ERROR_CODE_EMPTY)
        let result = await userService.login(req.body);
        if(result.user){
            result.user = common.pickReturnProperties(result.user, returnProps)
        }
        res.json(result)
    }catch(error){
        next(error)
    }
}

async function deleteUser(req, res, next){
    try {
        common.check_data(req.query, ["userID"], constants.ERROR_CODE_EMPTY)
        res.json(await userService.deleteUser(req.query))
    }catch(error){
        next(error)
    }
}

async function refreshToken(req, res, next){
    try {
        common.check_data(req.body, ["refreshToken"], constants.ERROR_CODE_EMPTY)
        res.json(await userService.refreshToken(req.body))
    }catch(error){
        next(error)
    }
}

module.exports = new Resource;
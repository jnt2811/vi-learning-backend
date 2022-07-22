const userRepository = require('../repositories/userRepository')
const constants = require('../../common/constants')
const common = require('../../common/common_function')
const {createTokens, refreshTokens} = require('../../middlewares/authMiddleware')

function Service(){
    this.login = login;
    this.refreshToken = refreshToken;

    this.getAllUser = getAllUser;
    this.addNewUser = addNewUser;
    this.updateUser = updateUser;
    this.getUserInformation = getUserInformation;
    this.deleteUser = deleteUser;
}

async function getAllUser(input){
    return await userRepository.getUserInformation(input)
}

async function getUserInformation(input){
    try {
        return await userRepository.getUserInformation(input)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

async function addNewUser(input){
    let {data} = input;

    let standardInput = {
        ID: "*",
        firstName: "*",
        lastName: "*",
        username: "*",
        password: "*",
        role: "",
        phoneNumber: "",
        address: "",
        class: "",
        created_date: "",
        updated_date: ""
    }

    data = data.map(c => {
        return {
            ID: common.genID("",20),
            ...c,
            created_date: (new Date()).getTime(),
            updated_date: (new Date()).getTime()
        }
    })

    try {
        let standardData = await common.validFragment(data, standardInput)
        return await userRepository.addNewUser(standardData)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }

}

async function updateUser(input){
    let standardInput = {
        ID: "* removeAfterValid",
        firstName: "",
        lastName: "",
        username: "",
        password: "",
        role: "",
        phoneNumber: "",
        address: "",
        class: "",
        created_date: "",
        updated_date: ""
    }

    input.updated_date = (new Date()).getTime()

    try {
        let standardData = await common.validFragment([input], standardInput)
        return await userRepository.updateUser({data: standardData, condition: {ID: input.ID}})
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

async function login(input){
    let {username, password} = input;

    try {
        let userResult = await userRepository.getUserInformation({username: username})
        if(!userResult.result || !userResult.result.length) throw {error_code: constants.ERROR_CODE_NOT_FOUND, message: "User not found!"}

        let user = userResult.result[0];
        if(user.password !== password) throw {error_code: constants.ERROR_CODE_NOT_MATCH, message: "Password not match!"}

        let [token, refreshToken] = await createTokens(user)
        return {user: user, token: token, refreshToken: refreshToken}
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

async function deleteUser(input){
    try {
        return await userRepository.deleteUser(input)
    }catch(error){
        throw error
    }
}

async function refreshToken(input){
    let {refreshToken} = input;

    try {
        return await refreshTokens(refreshToken)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

module.exports = new Service;
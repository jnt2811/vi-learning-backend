const TABLE_NAME = require('../../config/table_names')
const common = require('../../common/common_function')

function Repository(){
    this.getUserInformation = getUserInformation;
    this.addNewUser = addNewUser;
    this.updateUser = updateUser;
    this.deleteUser = deleteUser;
}

async function getUserInformation(input){
    let {username, userID, role} = input;
    let expandCondition = ""

    if(username){
        expandCondition += ` and username = '${username}' `
    }

    if(role){
        expandCondition += ` and role = '${role}' `
    }

    if(userID){
        expandCondition += ` and ID = '${userID}' `
    }

    let sql = `
        select * 
        from ${TABLE_NAME.USER}
        where true ${expandCondition}
    `

    try {
        let [result,] = await common.query(sql)
        return {result: result}
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

async function addNewUser(input){
    let arrProps = Object.keys(input[0])

    let sql = common.genInsertQuery(TABLE_NAME.USER,arrProps,input)

    try {
        await common.query(sql)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

async function updateUser(input){
    let {data, condition} = input;

    let sql = common.genUpdateQuery(TABLE_NAME.USER, data[0], condition)

    try {
        await common.query(sql)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

async function deleteUser(input){
    let {userID} = input
    let sql = `
        delete from ${TABLE_NAME.USER}
        where ID = '${userID}';
    `

    try {
        await common.query(sql)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}
module.exports = new Repository;
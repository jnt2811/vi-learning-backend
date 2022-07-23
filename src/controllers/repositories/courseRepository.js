const TABLE_NAME = require('../../config/table_names')
const common = require('../../common/common_function')

function Repository(){
    this.addNewCourse = addNewCourse;
    this.updateCourse = updateCourse;
    this.getCourse = getCourse;
}

async function getCourse(input){
    let {lessonID, search_string} = input;
    let expandCondition = ""

    if(lessonID){
        expandCondition += ` and ID = '${lessonID}'`
    }

    if(search_string && search_string.trim()){
        expandCondition += ` and lower(lessonName) like '%${search_string.trim().toLowerCase()}%' `
    }

    let sql = `
        select * 
        from ${TABLE_NAME.LESSON}
        where state ${expandCondition}
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

async function addNewCourse(input){
    let arrProps = Object.keys(input[0])

    let sql = common.genInsertQuery(TABLE_NAME.COURSE,arrProps,input)

    try {
        await common.query(sql)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

async function updateCourse(input){
    let {data, condition} = input;

    let sql = common.genUpdateQuery(TABLE_NAME.COURSE, data[0], condition)

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
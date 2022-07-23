const TABLE_NAME = require('../../config/table_names')
const common = require('../../common/common_function')

function Repository(){
    this.getLesson = getLesson;
    this.addNewLesson = addNewLesson;
    this.updateLesson = updateLesson;
}

async function getLesson(input){
    let {courseID, search_string} = input;
    let expandCondition = ""

    if(courseID){
        expandCondition += ` and ID = '${courseID}' `
    }

    if(search_string && search_string.trim()){
        expandCondition += ` and lower(courseName) like '%${search_string.trim().toLowerCase()}%' `
    }

    let sql = `
        select * 
        from ${TABLE_NAME.COURSE}
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

async function addNewLesson(input){
    let arrProps = Object.keys(input[0])

    let sql = common.genInsertQuery(TABLE_NAME.LESSON,arrProps,input)

    try {
        await common.query(sql)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

async function updateLesson(input){
    let {data, condition} = input;

    let sql = common.genUpdateQuery(TABLE_NAME.LESSON, data[0], condition)

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
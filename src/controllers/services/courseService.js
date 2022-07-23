const courseRepository = require('../repositories/courseRepository')
const constants = require('../../common/constants')
const common = require('../../common/common_function')

function Service(){
    this.getAllCourse = getAllCourse;
    this.getCourse = getCourse;
    this.addNewCourse = addNewCourse;
    this.updateCourse = updateCourse;
}

async function getAllCourse(input){
    return await courseRepository.getCourse(input)
}

async function getCourse(input){
    try {
        return await courseRepository.getCourse(input)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

async function addNewCourse(input){
    let {data} = input;

    let standardInput = {
        ID: "*",
        courseName: "",
        description: "",
        privacy: "",
        thumbnail: "",
        created_date: "",
        updated_date: ""
    }

    data = data.map(c => {
        return {
            ID: common.genID("C",20),
            ...c,
            created_date: (new Date()).getTime(),
            updated_date: (new Date()).getTime()
        }
    })

    try {
        let standardData = await common.validFragment(data, standardInput)
        return await courseRepository.addNewCourse(standardData)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}


async function updateCourse(input){
    let standardInput = {
        ID: "* removeAfterValid",
        courseName: "",
        description: "",
        privacy: "",
        thumbnail: "",
        updated_date: "",
        state: ""
    }

    input.updated_date = (new Date()).getTime()

    try {
        let standardData = await common.validFragment([input], standardInput)
        return await courseRepository.updateCourse({data: standardData, condition: {ID: input.ID}})
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

module.exports = new Service;
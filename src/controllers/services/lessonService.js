const lessonRepository = require('../repositories/lessonRepository')
const constants = require('../../common/constants')
const common = require('../../common/common_function')

function Service(){
    this.getLesson = getLesson;
    this.addNewLesson = addNewLesson;
    this.updateLesson = updateLesson;
}

async function getLesson(input){
    try {
        return await lessonRepository.getLesson(input)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

async function addNewLesson(input){
    let {data} = input;

    let standardInput = {
        ID: "*",
        lessonName: "",
        courseID: "*",
        videoLink: "",
        description: "",
        created_date: "",
        updated_date: ""
    }

    data = data.map(c => {
        return {
            ID: common.genID("L",20),
            ...c,
            created_date: (new Date()).getTime(),
            updated_date: (new Date()).getTime()
        }
    })

    try {
        let standardData = await common.validFragment(data, standardInput)
        return await lessonRepository.addNewLesson(standardData)
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}


async function updateLesson(input){
    let standardInput = {
        ID: "* removeAfterValid",
        lessonName: "",
        courseID: "",
        videoLink: "",
        description: "",
        updated_date: "",
        state: ""
    }

    input.updated_date = (new Date()).getTime()

    try {
        let standardData = await common.validFragment([input], standardInput)
        return await lessonRepository.updateLesson({data: standardData, condition: {ID: input.ID}})
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

module.exports = new Service;
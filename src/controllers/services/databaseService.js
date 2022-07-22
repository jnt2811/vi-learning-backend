const databaseRepository = require('../repositories/databaseRespository')

function Service(){
    this.initDatabase = initDatabase;
}

async function initDatabase(input){
    try {
        return await databaseRepository.initDatabase((input))
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

module.exports = new Service;
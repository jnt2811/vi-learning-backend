let connection = require("../../config/db_conn")
const script_db = require("../../config/script_db");

function Repository(){
    this.initDatabase = initDatabase;
}

/**
 * @name initDatabase
 * @method POST
 * @description init new database
 * @param {*} input
 */

async function initDatabase(input) {
    let result;
    // return partner_script_db;
    let string_script = script_db;
    string_script = string_script.replace(/\t/g, ' ');
    console.log(string_script);

    try {
        const [rows, fields] = await connection.query(string_script);
        result = rows
        return result;
    }catch(error){
        if(!error.source_path){
            error.source_path = `${arguments.callee.name} ${__dirname}`
        }
        throw error
    }
}

module.exports = new Repository;
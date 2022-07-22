const logger = require("../utils/logger");
const _ = require("lodash");
(function () {
    const db_connection = require("../config/db_conn")
    const constants = require("../common/constants")
    const logger = require("../utils/logger")

    module.exports = {

        /**
         * @name genID
         * @description generate string id
         * @param {*} prefix
         * @param {number} maxSize
         */
        genID: function (prefix,  maxSize = 45) {
            if (prefix) {
                maxSize = maxSize - prefix.length - 1;
            }
            let current_time = new Date().getTime();
            let rand = Math.floor(Math.random() * (Math.floor(Math.random() * 1000) - Math.floor(Math.random() * 100) + 600) + Math.floor(Math.random() * 100));
            var s = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" + (current_time * rand);
            let result;
            var str = Array(maxSize).join().split(',').map(function () { return s.charAt(Math.floor(Math.random() * s.length)); }).join('');
            if (!!prefix) {
                result = `${prefix.toLocaleUpperCase()}-${str}`;
            } else {
                result = `${str}`;
            }
            return result;
        },

        /**
         * @name query
         * @description common function: execute any with string query
         * @param {*} str_sql
         */
        query: async function (str_sql) {
            console.log(str_sql)
            try {
                const [rows, fields] = await db_connection.query(str_sql);
                return [rows, fields];
            } catch (error) {
                throw {  message : `${error.message}. ${error.sqlMessage}` }
            }
        },

        /**
         * @name return_connection
         * @description return database connection
         */
        return_connection: async function (){
            return db_connection.getConnection();
        },

        /**
         * @name convert_null
         * @description convert null value to space
         */
        convert_null: async function (arr){
            arr.forEach((item) => {
                Object.keys(item).forEach(function(key) {
                    if(item[key] === null) {
                        item[key] = '';
                    }
                })
            });
        },

        /**
         *
         * @param {string} tableName
         * @param {array<String>} arrProps property insert to database, ["Smt","Smt2"]
         * @param {array<Object>} data data insert to database
         * @param {*} is_IGNORE insert ignore
         */
        genInsertQuery: function (tableName, arrProps, data, is_IGNORE = null) {
            let data_insert = [];
            let sql = "";

            for (let item of data) {
                let str_val_item = "(";
                for (var key in item) {
                    if (item.hasOwnProperty(key)) {
                        let data_type = typeof item[key];
                        switch (data_type) {
                            case "string":
                                str_val_item += "'" + item[key] + "',";
                                break;
                            case "number": case "boolean":
                                str_val_item += item[key] + ",";
                                break;
                            default:
                                str_val_item += "null,";
                                break;
                        }

                    }
                };
                str_val_item = str_val_item.substring(0, str_val_item.length - 1);
                str_val_item += ")";
                data_insert.push(str_val_item)
            }

            if (data_insert.length > 0) {
                sql = `INSERT ${is_IGNORE ? 'IGNORE':''} INTO ${tableName} (${arrProps.join()}) VALUES ${data_insert.join()};`;
                // console.log(sql)
            }
            return sql;
        },

        /**
         * @param {String} tableName
         * @param {Array<String>} arrProps property insert to database, ["Smt","Smt2"]
         * @param {Array<Object>} data data insert to database
         * @param {Array<String>} columnReplace replace column
         */
        genInsertQueryUpdate: function (tableName, arrProps, data, columnReplace) {

            let sql = "";
            let replacement = "";
            let values = []

            let str_val_item = "(";
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    let data_type = typeof data[key];
                    switch (data_type) {
                        case "string":
                            str_val_item += "'" + data[key] + "',";
                            break;
                        case "number": case "boolean":
                            str_val_item += data[key] + ",";
                            break;
                        default:
                            str_val_item += "null,";
                            break;
                    }
                }
            };

            str_val_item = str_val_item.substring(0, str_val_item.length - 1);
            str_val_item += ")";

            replacement += this.genInsertQueryUpdateHelper(data, replacement, columnReplace)
            sql = `INSERT INTO ${tableName} (${arrProps.join()}) VALUES ${str_val_item} ${replacement};`;
            return sql;
        },

        genInsertQueryUpdateHelper: function(data, replacement, columnReplace){
            columnReplace.map((item, index) => {
                if(index === 0){
                    replacement += "ON DUPLICATE KEY UPDATE "
                }
                let replaceStr = ""
                let data_type = typeof data[`${item}`];
                switch (data_type) {
                    case "string":
                        replaceStr = "'" + data[`${item}`] + "',";
                        break;
                    case "number": case "boolean":
                        replaceStr = data[`${item}`] + ",";
                        break;
                    default:
                        replaceStr = "null,";
                        break;
                }
                replacement += `${item} = ${replaceStr}`
            })
            replacement = replacement.substring(0, replacement.length - 1);
            return replacement;
        },
        /**
         *
         * @param {Array<Object>} data Source data to be checked
         * @param {Array<String>} check_field Field to be checked ["field3","field5"]
         * @param {String} rule custom error code or field return
         */
        check_data : function(data, check_field, rule){
           rule = !rule? constants.ERROR_CODE_EMPTY : rule;

           switch(rule){
               case constants.ERROR_CODE_EMPTY:
                   if(!data[0]){
                       data = [data]
                   }
                    for (let item of data){
                        for(let field of check_field){
                            if(!item[`${field}`] || item[`${field}`] === "" || item[`${field}`] === 0 && typeof item !== "boolean"){
                                throw {field: field, error_code: constants.ERROR_CODE_EMPTY, message: `${field} is empty`}
                            }
                        }
                    }
                   break;
           }
        },

        /**
         * @name pickReturnProperties
         * @description pick field return to client
         * @param {Array<object>, Object} data raw data
         * @param {object} pickObject properties to pick
         */

        pickReturnProperties: function(data, pickObject){
            if(!data || !data[0]){
                data = _.pick(data, Object.keys(pickObject))
                return data
            }else{
                for (let i=0;i<data.length;i++){
                    data[i] = _.pick(data[i], Object.keys(pickObject))
                }
                return data
            }
        },



        /**
         * @name validFragment
         * @description pick properties for insert input data into database
         * @param {Array<Object>} data raw data
         * @param {Object} columnStandard Object {"NHANSU_ID": "* removeAfterValid"}
         * param {* required require} {removeAfterValid}
         */

        validFragment: async function(data, columnStandard){
            try {
                let columnRequired = [];
                let columnOmit = [];
                for (let [keys, values] of Object.entries(columnStandard)){
                    if(values){
                        if(values.toString().includes('required') || values.toString().includes('require') || values.toString().includes('*')) {
                            columnRequired.push(keys)
                        }
                        if(values.includes('removeAfterValid')){
                            columnOmit.push(keys)
                        }
                    }
                }

                this.check_data(data, columnRequired, constants.ERROR_CODE_EMPTY)
                for (let i=0;i<data.length;i++){
                    data[i] = _.pick(data[i], Object.keys(columnStandard))
                    if(columnOmit.length){
                        data[i] = _.omit(data[i], columnOmit)
                    }
                }

                return data
            }catch (error) {
                logger.error(`${arguments.callee.name} error : ${error.message}`)
                throw {status : "KO", ...error, message : error.message}
            }
        },
        /**
         *
         * @param {*} tableName Ten banr
         * @param {*} data {column:"Value"}
         * @param {*} condition {column:"value"}
         * @returns
         */
        genUpdateQuery: function(tableName,data,condition){
            let sql = `update ${tableName} set `
            for (var key in data){
                let column,value
                column = key
                value = data[key]
                if (typeof value != "undefined" && value != null) {
                    sql +=`${key} = '${value}',`
                }
            }
            let conditionArr = []
            for (var con in condition){
                let column,value
                column = con
                value = condition[con]
                conditionArr.push(` ${column} = '${value}' `)
            }
            sql = sql.slice(0, sql.length -1)
            sql += ` where ${conditionArr.join("AND")};`
            if (data == {}) return ""
            return sql
        },

    };
})();

//---- Dependencies
    import { Sequelize } from "sequelize"

//---- Config
    import { db_name, db_user, db_password, db_host, db_url, db_environment } from './env.js'

    
//---- Config of database
if(db_environment === "dev") console.log('DEV ENVIRONMENT');
    export const sequelize = (db_environment === "dev") 
        ? new Sequelize(db_name, db_user, db_password,{
            host:db_host,
            dialect:'mysql'
        }) 
        : new Sequelize(db_url)





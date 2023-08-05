//---- Dependencies
    import { Sequelize } from "sequelize"

//---- Config
    import { db_name, db_user, db_password, db_host, db_url, db_environment } from './env.js'

    if(db_environment === "dev"){ console.log('DEV MODE') }

//---- Config of database
    export const sequelize = (db_environment === "dev") 
        ? new Sequelize(db_name, db_user, db_password,{
            host:db_host,
            dialect:'mysql'
        }) 
        : new Sequelize(db_url,{ 
            logging:false, // This desables the echo of queries to the database
            pool: {
                max: 5, // Max number of connections in the pool
                min: 0, // Min number of connections in the pool
                acquire: 30000, // Max waiting time in miliseconds for getting a connection of the pool (30 seconds)
                idle: 15000, // Max idle time to automatically close the connection (15 seconds)
              },
        })





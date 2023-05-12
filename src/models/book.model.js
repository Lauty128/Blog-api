//-------- dependencies
    import { sequelize } from '../config/sequelize.js';
    import { DataTypes } from 'sequelize';


//---- Utils
    import { createPassword } from '../utils/password.js'


export const Book = sequelize.define('books',{
    id:{
        type: DataTypes.STRING(24),
        defaultValue: createPassword(24),
        primaryKey: true
    },
    name: DataTypes.STRING,
    author: DataTypes.STRING,
    src: DataTypes.STRING,
})
//-------- dependencies
    import { sequelize } from '../config/sequelize.js';
    import { DataTypes } from 'sequelize';

//---- Utils
    import { createPassword } from '../utils/password.js'


export const Article = sequelize.define('articles',{
    id:{
        type: DataTypes.STRING(24),
        defaultValue: createPassword(24),
        primaryKey: true
    },
    title: DataTypes.STRING(80),
    createdBy:DataTypes.STRING(24),
    image:DataTypes.STRING,
    imageContribution:{
        type:DataTypes.STRING,
        defaultValue: null
    },
    category:DataTypes.STRING(40),
    content:DataTypes.TEXT,
    views:{
        type: DataTypes.INTEGER,
        defaultValue:0
    }
})
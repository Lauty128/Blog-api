//---- dependencies
    import { sequelize } from '../config/sequelize.js';
    import { DataTypes } from 'sequelize';

//---- Models
import { Article } from './article.model.js';

//---- Utils
    import { createPassword } from '../utils/password.js'


export const Writer = sequelize.define('writers',{
    id:{
        type: DataTypes.STRING(24),
        defaultValue: createPassword(24),
        primaryKey: true
    },
    name: DataTypes.STRING(50),
    age: DataTypes.INTEGER(3),
    email: DataTypes.STRING,
    phone:{
        type: DataTypes.STRING,
        defaultValue: null
    },
    instagram:{
        type: DataTypes.STRING,
        defaultValue: null
    },
    image:{
        type: DataTypes.STRING,
        defaultValue: null
    }
})

//---- Refs
Writer.hasMany(Article, { foreignKey: 'createdBy' })

Article.belongsTo(Writer, { foreignKey: 'createdBy' })
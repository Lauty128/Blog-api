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
    category_id:{
        type: DataTypes.STRING(12),
        defaultValue: createPassword(12)
    },
    content:DataTypes.TEXT,
    views:{
        type: DataTypes.INTEGER,
        defaultValue:0
    }
})

export const Category = sequelize.define('category',{
    id:{
        type: DataTypes.STRING(12),
        defaultValue: createPassword(12),
        primaryKey: true
    },
    name: DataTypes.STRING(30)
})

Category.hasMany(Article)
Article.belongsTo(Category)
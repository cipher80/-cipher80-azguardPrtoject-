const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const TodoItem = sequelize.define("TodoItem",{
    
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("pending", "completed"),
        allowNull: false,
        defaultValue: "pending",
      },

});


TodoItem.sync()
    .then(() => {
        console.log('User table created successfully');
    })
    .catch((error) => {
        console.error('Error creating User table:', error);
    });

module.exports = TodoItem;


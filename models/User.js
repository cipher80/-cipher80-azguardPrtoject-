const { DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const User = sequelize.define("User",{

  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false, 
  }
  ,
  email:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true 
  }
  ,
  phoneNumber:{
    type:DataTypes.STRING,
    allowNull:false, 
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verificationCode:{
    type:DataTypes.STRING,
  }
  ,
  isVerified:{
    type:DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue: false
  }
  ,
  role:{
    type:DataTypes.ENUM('Admin', 'User'),
    allowNull: false,
    defaultValue: 'User'
  }

 },
 {
    modelName: 'User',
    freezeTableName: true,
    timestamps: true    
});

User.sync()
    .then(() => {
        console.log('User table created successfully');
    })
    .catch((error) => {
        console.error('Error creating User table:', error);
    });

    module.exports = User;
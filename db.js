const { error } = require('console');
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize("todolist","root","",{
           host:"localhost",    
           dialect:"mysql",
           logging: console.log ,
           
            pool: {
                max: 10, 
                min: 0,
                acquire: 30000, 
                idle: 10000 
            }
});

sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
})
.catch((error) => {
    if (error.original) {
        switch (error.original.code) {
            case 'ESOCKET':
            case 'ECONNRESET':
            case 'EPIPE':
            case 'PROTOCOL_CONNECTION_LOST':
                console.error('Connection to the database was lost:', error.original.message);
                break;
            default:
                console.error('Database connection error:', error);
        }
    } else {
        console.error('Sequelize error:', error);
    }

});

sequelize.sync()
.then(()=>{
    console.log('Models synced with Database  ');
})
.catch(()=>{
    console.log('Error in Sync Model with Database ',error);
})

module.exports= sequelize;
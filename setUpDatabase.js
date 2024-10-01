const mysql=require('mysql2/promise');
async function createDatabase(){

    const connection=await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'Lohit@2001',
    });

try{

    await connection.query('CREATE DATABASE IF NOT EXISTS college_portal');
    console.log('Database Created or already exits');

}
catch(error){
    console.log('Error creating database',error);

}finally{
    connection.end();
}
}

createDatabase();
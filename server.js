const app = require('./src/app'); // Import your app module

const port = process.env.PORT || 3000; // Set the port

const start= async()=>{
    try{
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
          });
    }
    catch(error){
        console.log("Error");
    }
};

start();
//*********************************************
//Puerto
//*********************************************

process.env.PORT = process.env.PORT || 3000;


//*********************************************
//Entorno
//*********************************************

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//*********************************************
//Base de Datos
//*********************************************

let urlDB;

if (process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/cafe';
    //urlDB = 'mongodb+srv://juanmacias54:ne8Mtw123SzVCSKS@cluster0.dphbs.mongodb.net/cafe';
}
else{
    urlDB = process.env.MONGO_URI;
   // urlDB = 'mongodb+srv://juanmacias54:ne8Mtw123SzVCSKS@cluster0.dphbs.mongodb.net/cafe';
}

process.env.URLDB = urlDB;
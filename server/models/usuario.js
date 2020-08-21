const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
let Schema = mongoose.Schema;


let rolesValidos = {
    values: ['ADMIN_ROLE','USER_ROLE'],
    message : '{VALUE} no es un role valido'
};

usuarioSchemma= new Schema({
    name : {
        type : String,
        required : [true,'El nombre es requerido']
    },
    email : {
        type : String,
        unique : true,
        required : [true,'El Email es requerido']
    },
    password : {
        type : String,
        required : [true,'El password  es obligatorio']
    },
    img : {
        type : String,
        required : false
    },
    role : {
        type : String,
        default: 'USER_ROLE',
            enum : rolesValidos
    },
    estado : {
        type : Boolean,
        default: true
    },
    Google : {
        type : Boolean,
        default: false
    }
});

 usuarioSchemma.methods.toJSON = function() {
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;

    return userObjet;
}

usuarioSchemma.plugin(uniqueValidator, {message: '{PATH} Debe ser Unico'});

module.exports = mongoose.model('Usuario',usuarioSchemma);
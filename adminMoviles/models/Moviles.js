var mongoose= require('mongoose');

let Moviles= new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
        unique:false
    },
    publicador:{
        type:String,
        required:true,
        unique:false
    },
    fechaPublicacion:{
        type:Date,
        required:true,
        unique:false
    },
});

module.exports=mongoose.model('movil',Moviles);
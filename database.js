const mongoose=require('mongoose');
const validator= require('validator');
mongoose.connect('mongodb+srv://name:password@cluster0.2s17q.mongodb.net/datastimulator?retryWrites=true&w=majority',{useUnifiedTopology:true,useNewUrlParser:true});
const Schema=mongoose.Schema
const userSchema = new Schema({
    first_name:{
        type:String,
        require:false,
    },
    last_name:{
        type:String,
        require:false,
    },
    company:{
        type:String,
        require:false,
    },
    dob:{
        type:Date,
        require:false,
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('It Should be an email')
        }
    },
    phone_number:{
        type:String,
        required:true,
        minlength:10,
    }
});

const User = mongoose.model('User',userSchema);


module.exports=User;
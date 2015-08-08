var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/*<><><><><><><><><><><><><><><><>*/
/*<><><><><>Schemas<><><><><><><>*/
 var userSchema = mongoose.Schema({
   name: {type: String, required: true, unique: true},
   password:{type: String, required: true, minlength: 6},
   active:{type: Boolean, default: true},
   visualization_ids:[],
 });

 var user = mongoose.model('user', userSchema);

 var visualizationSchema = mongoose.Schema({
   name: {type: String, required: true, unique: true},
   dataURL: {type: String, required: true, unique: true},
   description:{type: String, required: true, unique: true},
   user_id:{type:Number}, //NOTE: took out required: true here  FIXME??!!??!!??!!
   dataset:[{ name: String, type: String}] //maybe so that later we can use multiple datasets?
 });

 var visualization = mongoose.model('visualization', visualizationSchema);

  module.exports = {
    user: user,
    visualization: visualization
  };

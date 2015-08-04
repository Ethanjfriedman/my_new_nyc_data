var mongoose = require('mongoose'),
    Schema = mongoose.Schema;



/*<><><><><><><><><><>*/
 /*<><><><><>Schemas<><><><><><><>*/
 var userSchema = mongoose.Schema({
   name: {type: String, required: true, unique: true},
   password_digest:{type: String, required: true, unique: true},
   active:{type: Boolean, default: true},
   visualization_ids:[],
 });

 var user = mongoose.model('user', userSchema);

 var visualizationSchema = mongoose.Schema({
   name: {type: String, required: true, unique: true},
   description:{type: String, required: true, unique: true},
   user_id:{type:Number, required:true},
   dataset:[{ name: String, type: String}] //maybe so that later we can use multiple datasets?
 });

 var visualization = mongoose.model('visualization', visualizationSchema);

  module.exports = {
    user: user,
    visualization: visualization
  };
/*
var newOrder = new OrderItem();
newOrder.items.push(new MenuItem());*/

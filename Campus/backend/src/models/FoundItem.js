import mongoose from 'mongoose';

const FoundItemSchema=new mongoose.Schema({
  title:{type:String,required:true},
  description:{type:String},
  category:{type:String,required:true},
  location:{type:String,required:true},
  date:{type:Date,required:true},
  contactEmail:{type:String,required:true},
  imageUrl:{type:String},
  resolved:{type:Boolean,default:false}
},{timestamps:true});

export default mongoose.model('FoundItem',FoundItemSchema,'founditems');

import LostItem from '../models/LostItem.js';
import FoundItem from '../models/FoundItem.js';

function getModel(type){
  if(type==='lost')return LostItem;
  if(type==='found')return FoundItem;
  return null;
}

export async function createItem(req,res){
  try{
    const {type}=req.query;
    const Model=getModel(type);
    if(!Model)return res.status(400).json({error:'Invalid type'});
    const {title,description,category,location,date,contactEmail,imageUrl}=req.body;
    const doc=await Model.create({title,description,category,location,date,contactEmail,imageUrl});
    res.status(201).json(doc);
  }catch(e){res.status(500).json({error:'Server error'})}
}

export async function searchItems(req,res){
  try{
    const {type,search='',category=''}=req.query;
    const Model=getModel(type);
    if(!Model)return res.status(400).json({error:'Invalid type'});
    const q={};
    if(category)q.category=category;
    if(search){
      q.$or=[
        {title:{$regex:search,$options:'i'}},
        {description:{$regex:search,$options:'i'}},
        {location:{$regex:search,$options:'i'}}
      ];
    }
    const items=await Model.find(q).sort({createdAt:-1}).limit(200);
    res.json(items);
  }catch(e){res.status(500).json({error:'Server error'})}
}

export async function resolveItem(req,res){
  try{
    const {type}=req.query;const {id}=req.params;
    const Model=getModel(type);
    if(!Model)return res.status(400).json({error:'Invalid type'});
    const item=await Model.findByIdAndUpdate(id,{resolved:true},{new:true});
    if(!item)return res.status(404).json({error:'Not found'});
    res.json(item);
  }catch(e){res.status(500).json({error:'Server error'})}
}

export async function contactPublisher(req,res){
  try{
    const {type}=req.query;const {id}=req.params;
    const Model=getModel(type);
    if(!Model)return res.status(400).json({error:'Invalid type'});
    const item=await Model.findById(id);
    if(!item)return res.status(404).json({error:'Not found'});
    const {message,from}=req.body||{};
    res.json({ok:true,delivered:false,info:'Configure email provider',to:item.contactEmail,message,from});
  }catch(e){res.status(500).json({error:'Server error'})}
}

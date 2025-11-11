const itemsEl=document.getElementById('items');
const searchEl=document.getElementById('search');
const categoryEl=document.getElementById('category');
const typeEl=document.getElementById('type');
const form=document.getElementById('reportForm');
const imageInput=document.getElementById('image');
const preview=document.getElementById('preview');
const modal=document.getElementById('contactModal');
const closeModal=document.getElementById('closeModal');
const contactInfo=document.getElementById('contactInfo');
let data=[];
async function load(){
  const res=await fetch('sample-data.json');
  data=await res.json();
  render();
}
function matches(item){
  const q=searchEl.value.trim().toLowerCase();
  const cat=categoryEl.value;
  const t=typeEl.value;
  if(t&&item.type!==t)return false;
  if(cat&&item.category!==cat)return false;
  if(!q)return true;
  return [item.title,item.description,item.location].some(v=>String(v||'').toLowerCase().includes(q));
}
function card(item){
  const div=document.createElement('div');
  div.className='card';
  const img=document.createElement('img');
  img.src=item.imageUrl||'';
  img.alt='';
  const meta=document.createElement('div');
  meta.className='meta';
  const title=document.createElement('div');
  title.textContent=item.title;
  const meta2=document.createElement('div');
  meta2.innerHTML=`<span class="badge">${item.category}</span> • ${item.location} • ${new Date(item.date).toLocaleDateString()}`;
  const btn=document.createElement('button');
  btn.textContent='Contact';
  btn.onclick=()=>{
    contactInfo.textContent=`Email: ${item.contactEmail}`;
    modal.classList.remove('hidden');
  };
  meta.append(title,meta2,btn);
  div.append(img,meta);
  return div;
}
function render(){
  itemsEl.innerHTML='';
  data.filter(matches).forEach(i=>itemsEl.appendChild(card(i)));
}
searchEl.oninput=render;
categoryEl.onchange=render;
typeEl.onchange=render;
imageInput.onchange=(e)=>{
  const f=e.target.files[0];
  if(!f){preview.style.display='none';return}
  const r=new FileReader();
  r.onload=()=>{preview.src=r.result;preview.style.display='block'};
  r.readAsDataURL(f);
};
form.onsubmit=(e)=>{
  e.preventDefault();
  const fd=new FormData(form);
  const item={
    type:fd.get('type'),
    title:fd.get('title'),
    description:fd.get('description'),
    category:fd.get('category'),
    location:fd.get('location'),
    date:fd.get('date'),
    contactEmail:fd.get('contactEmail'),
    imageUrl:preview.src||''
  };
  data.unshift(item);
  form.reset();
  preview.src='';
  preview.style.display='none';
  render();
};
closeModal.onclick=()=>modal.classList.add('hidden');
window.onclick=(e)=>{if(e.target===modal)modal.classList.add('hidden')};
load();

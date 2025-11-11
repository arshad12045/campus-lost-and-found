const base=import.meta.env.VITE_API||'http://localhost:4000/api'
export const api={
  async list({type,search='',category=''}){
    const url=new URL(base+'/items')
    url.searchParams.set('type',type)
    if(search)url.searchParams.set('search',search)
    if(category)url.searchParams.set('category',category)
    const r=await fetch(url)
    return r.json()
  },
  async create({type,...body}){
    const r=await fetch(base+`/items?type=${type}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})
    return r.json()
  },
  async resolve({type,id}){
    const r=await fetch(base+`/items/${id}/resolve?type=${type}`,{method:'PATCH'})
    return r.json()
  },
  async contact({type,id,from,message}){
    const r=await fetch(base+`/items/${id}/contact?type=${type}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({from,message})})
    return r.json()
  }
}

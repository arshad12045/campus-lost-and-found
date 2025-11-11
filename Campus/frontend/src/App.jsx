import { useEffect, useMemo, useState } from 'react'
import ItemCard from './components/ItemCard.jsx'
import ReportForm from './components/ReportForm.jsx'
import SearchFilter from './components/SearchFilter.jsx'
import ContactModal from './components/ContactModal.jsx'
import { api } from './api.js'

export default function App(){
  const [type,setType]=useState('found')
  const [category,setCategory]=useState('')
  const [search,setSearch]=useState('')
  const [items,setItems]=useState([])
  const [contactItem,setContactItem]=useState(null)

  async function load(){
    const res=await api.list({type,search,category})
    setItems(res)
  }
  useEffect(()=>{load()},[type,category,search])

  const filtered=useMemo(()=>items, [items])

  async function submitItem(values){
    await api.create({type:values.type,...values})
    if(values.type===type) await load()
  }
  async function resolve(id){
    await api.resolve({type,id})
    await load()
  }

  return (
    <div className="container">
      <header>
        <h1>Campus Lost & Found</h1>
        <div className="controls">
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search items..." />
          <select value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="">All Categories</option>
            <option>Electronics</option>
            <option>Books</option>
            <option>Clothing</option>
            <option>Accessories</option>
            <option>Other</option>
          </select>
          <select value={type} onChange={e=>setType(e.target.value)}>
            <option value="found">Found</option>
            <option value="lost">Lost</option>
          </select>
        </div>
      </header>

      <main className="grid">
        <section>
          <div className="card-grid">
            {filtered.map(it=>
              <ItemCard key={it._id} item={it} onContact={()=>setContactItem(it)} onResolve={()=>resolve(it._id)} />
            )}
          </div>
        </section>
        <aside className="form-panel">
          <h2>Report Item</h2>
          <ReportForm onSubmit={submitItem} />
        </aside>
      </main>

      <ContactModal open={!!contactItem} onClose={()=>setContactItem(null)} item={contactItem} type={type} />
    </div>
  )
}

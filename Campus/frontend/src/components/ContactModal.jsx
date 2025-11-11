import { useState } from 'react'
import { api } from '../api.js'

export default function ContactModal({open,onClose,item,type}){
  const [message,setMessage]=useState('')
  const [email,setEmail]=useState('')
  if(!open||!item) return null
  async function send(){
    await api.contact({type,id:item._id,from:email,message})
    onClose()
  }
  return (
    <div className="modal" onClick={(e)=>{if(e.target===e.currentTarget)onClose()}}>
      <div className="modal-content">
        <h3>Contact Publisher</h3>
        <p>Item: {item.title}</p>
        <input placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} />
        <textarea placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} rows={4} />
        <div style={{display:'flex',gap:8,marginTop:8}}>
          <button onClick={send}>Send</button>
          <button className="secondary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}

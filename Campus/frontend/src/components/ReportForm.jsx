import { useRef, useState } from 'react'

export default function ReportForm({onSubmit}){
  const [preview,setPreview]=useState('')
  const fileRef=useRef(null)
  const [values,setValues]=useState({type:'found',title:'',description:'',category:'Electronics',location:'',date:'',contactEmail:'',imageUrl:''})
  function change(e){
    const {name,value}=e.target
    setValues(v=>({...v,[name]:value}))
  }
  function selectFile(e){
    const f=e.target.files?.[0]
    if(!f){setPreview('');setValues(v=>({...v,imageUrl:''}));return}
    const r=new FileReader()
    r.onload=()=>{setPreview(r.result);setValues(v=>({...v,imageUrl:r.result}))}
    r.readAsDataURL(f)
  }
  function submit(e){
    e.preventDefault()
    onSubmit(values)
    setValues({type:'found',title:'',description:'',category:'Electronics',location:'',date:'',contactEmail:'',imageUrl:''})
    setPreview('')
    if(fileRef.current) fileRef.current.value=''
  }
  return (
    <form onSubmit={submit}>
      <div className="row">
        <label>Type</label>
        <select name="type" value={values.type} onChange={change}>
          <option value="found">Found</option>
          <option value="lost">Lost</option>
        </select>
      </div>
      <div className="row">
        <label>Title</label>
        <input name="title" value={values.title} onChange={change} required />
      </div>
      <div className="row">
        <label>Description</label>
        <textarea name="description" value={values.description} onChange={change} rows={3} />
      </div>
      <div className="row">
        <label>Category</label>
        <select name="category" value={values.category} onChange={change}>
          <option>Electronics</option>
          <option>Books</option>
          <option>Clothing</option>
          <option>Accessories</option>
          <option>Other</option>
        </select>
      </div>
      <div className="row">
        <label>Location</label>
        <input name="location" value={values.location} onChange={change} required />
      </div>
      <div className="row">
        <label>Date</label>
        <input type="date" name="date" value={values.date} onChange={change} required />
      </div>
      <div className="row">
        <label>Contact Email</label>
        <input type="email" name="contactEmail" value={values.contactEmail} onChange={change} required />
      </div>
      <div className="row">
        <label>Image</label>
        <input ref={fileRef} type="file" accept="image/*" onChange={selectFile} />
        {preview && <img src={preview} alt="" className="preview" />}
      </div>
      <button type="submit">Submit</button>
    </form>
  )
}

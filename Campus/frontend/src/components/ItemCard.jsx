export default function ItemCard({item,onContact,onResolve}){
  return (
    <div className="card">
      <img src={item.imageUrl||''} alt="" />
      <div className="meta">
        <div>{item.title}</div>
        <div><span className="badge">{item.category}</span> • {item.location} • {new Date(item.date).toLocaleDateString()}</div>
        <div style={{display:'flex',gap:8}}>
          <button onClick={onContact}>Contact</button>
          {!item.resolved && <button className="secondary" onClick={onResolve}>Mark Resolved</button>}
        </div>
      </div>
    </div>
  )
}

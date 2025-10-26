import React from 'react'
export default function ShoppingItem({ item, onToggle, onInc, onDec, onRemove }){
  return (
    <div className="item">
      <input type="checkbox" checked={!!item.isChecked} onChange={()=>onToggle(item)} />
      <div className="name">
        <strong style={{textDecoration: item.isChecked ? 'line-through' : 'none'}}>{item.productName}</strong>
        {(item.quantity ?? 1) > 1 && <span className="badge">x{item.quantity}</span>}
      </div>
      <div className="row">
        <button className="btn outline" onClick={()=>onDec(item)}>-</button>
        <button className="btn outline" onClick={()=>onInc(item)}>+</button>
        <button className="btn danger" onClick={()=>onRemove(item)}>✕</button>
      </div>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import { getPurchaseSuggestions } from '../services/firestoreService'
export default function Suggestions({ onAddQuick }){
  const [items, setItems] = useState([])
  useEffect(() => { (async () => setItems(await getPurchaseSuggestions()))() }, [])
  if(!items.length) return null
  return (
    <div className="card" style={{marginTop:12}}>
      <h3>Suggesties</h3>
      {items.map((s,i) => (
        <div key={i} className="item">
          <div className="name">
            <strong>{s.productName}</strong>
            <span className="badge">{s.daysSince} d geleden · Ø {s.average} d</span>
          </div>
          <button className="btn" onClick={()=>onAddQuick(s.productName)}>Snel toevoegen</button>
        </div>
      ))}
    </div>
  )
}

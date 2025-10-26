import React, { useState } from 'react'
import { useShoppingList } from '../hooks/useShoppingList'
import ShoppingItem from './ShoppingItem.jsx'
import Suggestions from './Suggestions.jsx'
const labels = {
  nl:{header:'Boodschappen',add:'Item toevoegen',name:'Naam',qty:'Aantal',hide:'Verberg afgevinkte',show:'Toon afgevinkte',logout:'Uitloggen',stats:(t,c,u)=>`Totaal: ${t} · Gekocht: ${c} · Open: ${u}`},
  en:{header:'Shopping',add:'Add item',name:'Name',qty:'Qty',hide:'Hide checked',show:'Show checked',logout:'Logout',stats:(t,c,u)=>`Total: ${t} · Checked: ${c} · Open: ${u}`},
  fr:{header:'Courses',add:'Ajouter',name:'Nom',qty:'Qté',hide:'Masquer cochés',show:'Afficher cochés',logout:'Se déconnecter',stats:(t,c,u)=>`Total: ${t} · Cochés: ${c} · Ouverts: ${u}`},
  de:{header:'Einkauf',add:'Hinzufügen',name:'Name',qty:'Menge',hide:'Abgehakte verbergen',show:'Abgehakte zeigen',logout:'Abmelden',stats:(t,c,u)=>`Gesamt: ${t} · Abgehakt: ${c} · Offen: ${u}`},
}
export default function ShoppingList({ user, onLogout, lang='nl' }){
  const t = labels[lang] || labels.nl
  const { items, addItem, toggleChecked, inc, dec, remove, hideChecked, toggleHideChecked, stats } = useShoppingList(user)
  const [name, setName] = useState('')
  const [qty, setQty] = useState(1)
  async function handleAdd(e){
    e.preventDefault()
    if(!name.trim()) return
    await addItem(name.trim(), Math.max(1, Number(qty)||1))
    setName(''); setQty(1)
  }
  return (
    <div className="card">
      <div className="header">
        <h2>{t.header}</h2>
        <div className="row">
          <button className="btn outline" onClick={toggleHideChecked}>{hideChecked ? t.show : t.hide}</button>
          <button className="btn" onClick={onLogout}>{t.logout}</button>
        </div>
      </div>
      <form className="row split" onSubmit={handleAdd}>
        <input placeholder={t.name} value={name} onChange={e=>setName(e.target.value)} />
        <input style={{maxWidth:120}} type="number" min="1" placeholder={t.qty} value={qty} onChange={e=>setQty(e.target.value)} />
        <button className="btn" type="submit">{t.add}</button>
      </form>
      <div className="list">
        {items.map(it => (
          <ShoppingItem key={it.id} item={it} onToggle={toggleChecked} onInc={inc} onDec={dec} onRemove={remove} />
        ))}
      </div>
      <div className="footer-stats">{t.stats(stats.total, stats.checked, stats.unchecked)}</div>
      <Suggestions onAddQuick={(p)=>addItem(p,1)} />
    </div>
  )
}

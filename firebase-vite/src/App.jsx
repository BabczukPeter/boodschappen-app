import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import AuthForms from './components/AuthForms.jsx'
import ShoppingList from './components/ShoppingList.jsx'
import { logoutUser } from './services/authService.js'
const ui = {
  nl:{ title:'Boodschappen App (Firebase)', welcome:'Welkom', lang:'Taal' },
  en:{ title:'Shopping App (Firebase)', welcome:'Welcome', lang:'Language' },
  fr:{ title:'Appli Courses (Firebase)', welcome:'Bienvenue', lang:'Langue' },
  de:{ title:'Einkaufs-App (Firebase)', welcome:'Willkommen', lang:'Sprache' }
}
function Shell(){
  const { user, loading } = useAuth()
  const [lang, setLang] = useState('nl')
  const t = ui[lang] || ui.nl
  if(loading){ return <div className="center"><div className="card"><h3>Loading…</h3></div></div> }
  return (
    <div className="app-shell">
      <div className="header">
        <h1 style={{color:'#fff'}}>{t.title}</h1>
        <select className="lang-select" value={lang} onChange={e=>setLang(e.target.value)}>
          <option value="nl">NL</option><option value="en">EN</option><option value="fr">FR</option><option value="de">DE</option>
        </select>
      </div>
      {user ? <ShoppingList user={user} onLogout={logoutUser} lang={lang} /> : <AuthForms lang={lang} />}
    </div>
  )
}
export default function App(){ return <AuthProvider><Shell /></AuthProvider> }

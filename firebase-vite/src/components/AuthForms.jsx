import React, { useState } from 'react'
import { loginUser, registerUser } from '../services/authService'
const labels = {
  nl:{login:'Inloggen',register:'Registreren',email:'E-mail',pass:'Wachtwoord',name:'Gebruikersnaam',switchToReg:'Nog geen account? Registreren',switchToLogin:'Heb je al een account? Inloggen',submit:'Versturen'},
  en:{login:'Log in',register:'Register',email:'Email',pass:'Password',name:'Username',switchToReg:'No account? Register',switchToLogin:'Already have an account? Log in',submit:'Submit'},
  fr:{login:'Connexion',register:"S’inscrire",email:'E-mail',pass:'Mot de passe',name:"Nom d’utilisateur",switchToReg:"Pas de compte ? S’inscrire",switchToLogin:'Déjà un compte ? Connexion',submit:'Envoyer'},
  de:{login:'Anmelden',register:'Registrieren',email:'E-Mail',pass:'Passwort',name:'Benutzername',switchToReg:'Kein Konto? Registrieren',switchToLogin:'Schon ein Konto? Anmelden',submit:'Senden'}
}
export default function AuthForms({ lang='nl' }){
  const t = labels[lang] || labels.nl
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e){
    e.preventDefault(); setLoading(true); setError('')
    try{ mode==='login' ? await loginUser(email, password) : await registerUser(email, password, username) }
    catch(err){ setError(err.message || String(err)) }
    finally{ setLoading(false) }
  }
  return (<div className="card" style={{maxWidth:520, margin:'0 auto'}}>
    <h2>{mode==='login'?t.login:t.register}</h2>
    <form className="row" onSubmit={handleSubmit}>
      {mode==='register' && (<input required placeholder={t.name} value={username} onChange={e=>setUsername(e.target.value)} />)}
      <input required type="email" placeholder={t.email} value={email} onChange={e=>setEmail(e.target.value)} />
      <input required type="password" placeholder={t.pass} value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="btn" disabled={loading} type="submit">{t.submit}</button>
    </form>
    {error && <p className="small" style={{color:'var(--error)'}}>{error}</p>}
    <div style={{marginTop:8}}>
      {mode==='login' ? (
        <button type="button" className="btn outline" onClick={()=>setMode('register')}>{t.switchToReg}</button>
      ) : (
        <button type="button" className="btn outline" onClick={()=>setMode('login')}>{t.switchToLogin}</button>
      )}
    </div>
  </div>)
}

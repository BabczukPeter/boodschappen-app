import { db } from '../firebase.config'
import { collection, doc, addDoc, setDoc, getDoc, updateDoc, deleteDoc, query, where, onSnapshot, serverTimestamp, orderBy } from 'firebase/firestore'
export async function ensureDefaultList(userId){
  const listId = `${userId}-default`
  const ref = doc(db, 'shoppingLists', listId)
  const snap = await getDoc(ref)
  if(!snap.exists()){
    await setDoc(ref, { userId, name: 'Mijn lijst', createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
  }
  return listId
}
export function subscribeToItems(listId, cb){
  const q = query(collection(db, 'shoppingItems'), where('listId', '==', listId), orderBy('createdAt','asc'))
  return onSnapshot(q, (snap) => {
    const items = []; snap.forEach(d => items.push({ id: d.id, ...d.data() })); cb(items)
  })
}
export async function addItemToList(listId, item){
  return addDoc(collection(db, 'shoppingItems'), {
    listId, productName: item.productName, quantity: item.quantity ?? 1, unit: item.unit ?? '', category: item.category ?? '',
    isChecked:false, isHidden:false, notes:item.notes ?? '', createdAt: serverTimestamp(), updatedAt: serverTimestamp()
  })
}
export async function updateItem(itemId, updates){ return updateDoc(doc(db, 'shoppingItems', itemId), { ...updates, updatedAt: serverTimestamp() }) }
export async function deleteItem(itemId){ return deleteDoc(doc(db, 'shoppingItems', itemId)) }
export async function getPurchaseSuggestions(){ return [{ productName:'Melk', daysSince:6, average:7 }, { productName:'Brood', daysSince:1, average:2 }] }

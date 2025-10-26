import { useEffect, useMemo, useState } from 'react'
import { addItemToList, ensureDefaultList, subscribeToItems, updateItem, deleteItem } from '../services/firestoreService'
export function useShoppingList(user){
  const [listId, setListId] = useState(null)
  const [items, setItems] = useState([])
  const [hideChecked, setHideChecked] = useState(false)
  useEffect(() => {
    if(!user) return
    let unsub = () => {}
    ;(async () => {
      const id = await ensureDefaultList(user.uid); setListId(id)
      unsub = subscribeToItems(id, setItems)
    })()
    return () => unsub()
  }, [user])
  const visibleItems = useMemo(() => hideChecked ? items.filter(i => !i.isChecked || !i.isHidden) : items, [items, hideChecked])
  async function addItem(name, qty){ if(!listId) return; await addItemToList(listId, { productName: name, quantity: qty }) }
  async function toggleChecked(item){ await updateItem(item.id, { isChecked: !item.isChecked }) }
  async function inc(item){ await updateItem(item.id, { quantity: (item.quantity ?? 1) + 1 }) }
  async function dec(item){ const q = Math.max(1, (item.quantity ?? 1) - 1); await updateItem(item.id, { quantity: q }) }
  async function remove(item){ await deleteItem(item.id) }
  function toggleHideChecked(){ setHideChecked(v => !v) }
  const stats = useMemo(() => { const total = items.length; const checked = items.filter(i => i.isChecked).length; return { total, checked, unchecked: total - checked } }, [items])
  return { listId, items: visibleItems, rawItems: items, addItem, toggleChecked, inc, dec, remove, hideChecked, toggleHideChecked, stats }
}

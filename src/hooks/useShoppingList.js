import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { createShoppingList, subscribeToLists, subscribeToItems, addItemToList, updateItem, deleteItem, getPurchaseSuggestions } from '../services/firestoreService';

export const useShoppingList = () => {
  const { user } = useAuth();
  const [lists, setLists] = useState([]);
  const [currentList, setCurrentList] = useState(null);
  const [items, setItems] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLists([]);
      setCurrentList(null);
      setItems([]);
      setLoading(false);
      return;
    }
    const unsub = subscribeToLists(user.uid, (data) => {
      setLists(data);
      if (data.length > 0 && !currentList) setCurrentList(data[0].id);
      setLoading(false);
    });
    return unsub;
  }, [user]);

  useEffect(() => {
    if (!currentList) return;
    const unsub = subscribeToItems(currentList, setItems);
    return unsub;
  }, [currentList]);

  const createList = async (name) => {
    if (!user) return { success: false };
    const res = await createShoppingList(user.uid, name);
    if (res.success) setCurrentList(res.listId);
    return res;
  };

  const addItem = async (data) => {
    if (!currentList) return { success: false };
    return await addItemToList(currentList, data);
  };

  const toggleItemChecked = async (id, checked) => {
    return await updateItem(id, { isChecked: checked });
  };

  const updateQuantity = async (id, qty) => {
    return await updateItem(id, { quantity: qty });
  };

  const removeItem = async (id) => {
    return await deleteItem(id);
  };

  const loadSuggestions = async () => {
    if (!user) return;
    const res = await getPurchaseSuggestions(user.uid);
    if (res.success) setSuggestions(res.suggestions);
  };

  const visibleItems = items.filter(i => !i.isHidden);

  return { lists, currentList, items, visibleItems, suggestions, loading, createList, setCurrentList, addItem, toggleItemChecked, updateQuantity, removeItem, loadSuggestions };
};

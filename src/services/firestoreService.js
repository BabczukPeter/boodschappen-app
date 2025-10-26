import firebase from '../firebase.config';

const db = firebase.firestore();

export const createShoppingList = async (userId, listName) => {
  try {
    const ref = await db.collection('shoppingLists').add({
      userId,
      name: listName || 'Mijn Lijst',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { success: true, listId: ref.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const subscribeToLists = (userId, callback) => {
  return db.collection('shoppingLists')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .onSnapshot((snap) => {
      const lists = [];
      snap.forEach((doc) => lists.push({ id: doc.id, ...doc.data() }));
      callback(lists);
    });
};

export const addItemToList = async (listId, itemData) => {
  try {
    await db.collection('shoppingItems').add({
      listId,
      productName: itemData.productName,
      quantity: itemData.quantity || 1,
      isChecked: false,
      isHidden: false,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const subscribeToItems = (listId, callback) => {
  return db.collection('shoppingItems')
    .where('listId', '==', listId)
    .orderBy('createdAt', 'desc')
    .onSnapshot((snap) => {
      const items = [];
      snap.forEach((doc) => items.push({ id: doc.id, ...doc.data() }));
      callback(items);
    });
};

export const updateItem = async (itemId, updates) => {
  try {
    await db.collection('shoppingItems').doc(itemId).update(updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const deleteItem = async (itemId) => {
  try {
    await db.collection('shoppingItems').doc(itemId).delete();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getPurchaseSuggestions = async () => {
  return { success: true, suggestions: [] };
};

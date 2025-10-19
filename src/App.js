import React, { useState } from 'react';
import { AutofillInput } from './components/AutofillInput';
import { useLocalStorage } from './hooks/useLocalStorage';
import './App.css';

function App() {
  const [language, setLanguage] = useLocalStorage('app-language', 'nl');
  const [items, setItems] = useLocalStorage('shopping-list', []);

  const addItem = (productName) => {
    const newItem = {
      id: Date.now(),
      name: productName,
      checked: false,
      addedAt: new Date().toISOString(),
    };
    setItems([...items, newItem]);
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clearChecked = () => {
    setItems(items.filter((item) => !item.checked));
  };

  const clearAll = () => {
    if (window.confirm(
      language === 'nl' ? 'Weet je zeker dat je alles wilt verwijderen?' :
      language === 'en' ? 'Are you sure you want to clear everything?' :
      language === 'fr' ? 'Êtes-vous sûr de vouloir tout effacer ?' :
      'Möchten Sie wirklich alles löschen?'
    )) {
      setItems([]);
    }
  };

  const uncheckedCount = items.filter((item) => !item.checked).length;
  const checkedCount = items.filter((item) => item.checked).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              🛒 {
                language === 'nl' ? 'Boodschappenlijst' :
                language === 'en' ? 'Shopping List' :
                language === 'fr' ? 'Liste de Courses' :
                'Einkaufsliste'
              }
            </h1>
            
            <div className="flex gap-2">
              {['nl', 'en', 'fr', 'de'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    language === lang
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 text-sm text-gray-600">
            <div>
              <span className="font-semibold">{uncheckedCount}</span>{' '}
              {language === 'nl' ? 'te koop' :
               language === 'en' ? 'to buy' :
               language === 'fr' ? 'à acheter' :
               'zu kaufen'}
            </div>
            <div>
              <span className="font-semibold">{checkedCount}</span>{' '}
              {language === 'nl' ? 'gekocht' :
               language === 'en' ? 'bought' :
               language === 'fr' ? 'acheté' :
               'gekauft'}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <AutofillInput language={language} onAdd={addItem} />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          {items.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-lg">
                {language === 'nl' ? 'Je lijst is leeg' :
                 language === 'en' ? 'Your list is empty' :
                 language === 'fr' ? 'Votre liste est vide' :
                 'Deine Liste ist leer'}
              </p>
            </div>
          ) : (
            <div>
              <div className="space-y-2 mb-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      item.checked
                        ? 'bg-gray-50 opacity-60'
                        : 'bg-blue-50 hover:bg-blue-100'
                    }`}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`flex-shrink-0 w-6 h-6 rounded border-2 transition-all ${
                        item.checked
                          ? 'bg-green-500 border-green-500'
                          : 'border-gray-300 hover:border-blue-500'
                      }`}
                    >
                      {item.checked && (
                        <svg
                          className="w-full h-full text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </button>

                    <span
                      className={`flex-1 text-lg ${
                        item.checked
                          ? 'line-through text-gray-500'
                          : 'text-gray-800'
                      }`}
                    >
                      {item.name}
                    </span>

                    <button
                      onClick={() => deleteItem(item.id)}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 pt-4 border-t">
                {checkedCount > 0 && (
                  <button
                    onClick={clearChecked}
                    className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    {language === 'nl' ? `${checkedCount} gekochte verwijderen` :
                     language === 'en' ? `Remove ${checkedCount} bought` :
                     language === 'fr' ? `Supprimer ${checkedCount} achetés` :
                     `${checkedCount} gekaufte entfernen`}
                  </button>
                )}
                <button
                  onClick={clearAll}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                >
                  {language === 'nl' ? 'Alles wissen' :
                   language === 'en' ? 'Clear all' :
                   language === 'fr' ? 'Tout effacer' :
                   'Alles löschen'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

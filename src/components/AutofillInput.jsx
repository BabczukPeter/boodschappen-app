import React, { useState, useEffect, useRef } from 'react';
import { searchProducts } from '../data/products';

export const AutofillInput = ({ language, onAdd }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (input.length >= 1) {
      const results = searchProducts(input, language);
      setSuggestions(results);
      setShowDropdown(results.length > 0);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowDropdown(false);
    }
  }, [input, language]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAdd = (productName) => {
    if (productName.trim()) {
      onAdd(productName);
      setInput('');
      setSuggestions([]);
      setShowDropdown(false);
      if (inputRef.current) inputRef.current.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) {
      if (e.key === 'Enter' && input.trim()) {
        handleAdd(input);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleAdd(suggestions[selectedIndex].name);
        } else if (input.trim()) {
          handleAdd(input);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setSelectedIndex(-1);
        break;
      default:
        break;
    }
  };

  return (
    <div className="relative w-full">
      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={
            language === 'nl' ? 'Voeg product toe...' :
            language === 'en' ? 'Add product...' :
            language === 'fr' ? 'Ajouter un produit...' :
            'Produkt hinzufügen...'
          }
          className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
        />
        <button
          onClick={() => handleAdd(input)}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          {language === 'nl' ? 'Toevoegen' :
           language === 'en' ? 'Add' :
           language === 'fr' ? 'Ajouter' :
           'Hinzufügen'}
        </button>
      </div>

      {showDropdown && suggestions.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
        >
          {suggestions.map((product, index) => (
            <button
              key={product.id}
              onClick={() => handleAdd(product.name)}
              className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors ${
                index === selectedIndex ? 'bg-blue-100' : ''
              }`}
            >
              <div className="font-medium">{product.name}</div>
              <div className="text-sm text-gray-500 capitalize">{product.category}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

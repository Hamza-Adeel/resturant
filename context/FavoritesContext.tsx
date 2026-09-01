'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from './ToastContext';

interface FavoritesContextType {
  favorites: string[]; // dish IDs
  toggleFavorite: (dishId: string, dishName?: string) => void;
  isFavorite: (dishId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('mirch_masala_favorites');
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading favorites', e);
    }
  }, []);

  const toggleFavorite = (dishId: string, dishName?: string) => {
    let wasFavorited = false;
    setFavorites((prev) => {
      let updated: string[];
      if (prev.includes(dishId)) {
        wasFavorited = true;
        updated = prev.filter((id) => id !== dishId);
      } else {
        wasFavorited = false;
        updated = [...prev, dishId];
      }
      try {
        localStorage.setItem('mirch_masala_favorites', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving favorites', e);
      }
      return updated;
    });

    if (wasFavorited) {
      showToast('Removed from Favorites', dishName ? `${dishName} was removed from your favorites.` : 'Item removed.', 'info');
    } else {
      showToast('Added to Favorites ❤️', dishName ? `${dishName} has been saved to your favorites.` : 'Item saved.', 'success');
    }
  };

  const isFavorite = (dishId: string) => favorites.includes(dishId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

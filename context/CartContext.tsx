'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, MenuItem, SpiceLevel } from '../lib/types';
import { useToast } from './ToastContext';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  orderType: 'delivery' | 'pickup';
  tip: number;
  promoCode: string;
  discountAmount: number;
  appliedPromo: string | null;
  deliveryFee: number;
  freeDeliveryThreshold: number;
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
  setIsOpen: (open: boolean) => void;
  setOrderType: (type: 'delivery' | 'pickup') => void;
  setTip: (amount: number) => void;
  addItem: (dish: MenuItem, quantity?: number, spiceLevel?: SpiceLevel, instructions?: string) => void;
  updateQuantity: (dishId: string, quantity: number) => void;
  removeItem: (dishId: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_DELIVERY_THRESHOLD = 2500;
const STANDARD_DELIVERY_FEE = 150;
const TAX_RATE = 0.10; // 10% tax

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [tip, setTip] = useState(0);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);
  const { showToast } = useToast();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('mirch_masala_cart');
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedType = localStorage.getItem('mirch_masala_order_type');
      if (savedType === 'delivery' || savedType === 'pickup') {
        setOrderType(savedType);
      }
    } catch (e) {
      console.error('Error loading cart from storage', e);
    }
  }, []);

  // Save to localStorage
  const saveCartToStorage = (newItems: CartItem[]) => {
    try {
      localStorage.setItem('mirch_masala_cart', JSON.stringify(newItems));
    } catch (e) {
      console.error('Error saving cart to storage', e);
    }
  };

  const addItem = (
    dish: MenuItem,
    quantity: number = 1,
    spiceLevel?: SpiceLevel,
    instructions?: string
  ) => {
    let updated: CartItem[] = [];
    setItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.dish.id === dish.id && item.selectedSpiceLevel === (spiceLevel ?? dish.spiceLevel)
      );

      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex].quantity += quantity;
        if (instructions) {
          updated[existingIndex].specialInstructions = instructions;
        }
      } else {
        updated = [
          ...prev,
          {
            dish,
            quantity,
            selectedSpiceLevel: spiceLevel ?? dish.spiceLevel,
            specialInstructions: instructions || ''
          }
        ];
      }

      saveCartToStorage(updated);
      return updated;
    });
    showToast('Added to Order 🍛', `${dish.name} (x${quantity}) added to your feast.`, 'success');
  };

  const updateQuantity = (dishId: string, quantity: number) => {
    setItems((prev) => {
      let updated: CartItem[];
      if (quantity <= 0) {
        updated = prev.filter((item) => item.dish.id !== dishId);
      } else {
        updated = prev.map((item) =>
          item.dish.id === dishId ? { ...item, quantity } : item
        );
      }
      saveCartToStorage(updated);
      return updated;
    });
    if (quantity <= 0) {
      showToast('Item Removed', 'The item was removed from your cart.', 'info');
    }
  };

  const removeItem = (dishId: string) => {
    setItems((prev) => {
      const updated = prev.filter((item) => item.dish.id !== dishId);
      saveCartToStorage(updated);
      return updated;
    });
    showToast('Item Removed', 'Item has been removed from your cart.', 'info');
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
    setDiscountAmount(0);
    setTip(0);
    try {
      localStorage.removeItem('mirch_masala_cart');
    } catch (e) {
      console.error('Error clearing cart', e);
    }
  };

  // Subtotal Calculation
  const subtotal = items.reduce(
    (sum, item) => sum + item.dish.price * item.quantity,
    0
  );

  // Delivery Fee Calculation
  const deliveryFee = orderType === 'pickup' ? 0 : subtotal >= FREE_DELIVERY_THRESHOLD || subtotal === 0 ? 0 : STANDARD_DELIVERY_FEE;

  // Promo Code Validation
  const applyPromoCode = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'MIRCH10') {
      const discount = Math.round(subtotal * 0.10);
      setAppliedPromo('MIRCH10 (10% OFF)');
      setDiscountAmount(discount);
      showToast('Promo Code Applied! 🎉', '10% discount applied to your order.', 'success');
      return true;
    } else if (cleanCode === 'FEAST500') {
      if (subtotal < 3000) {
        showToast('Offer Ineligible', 'FEAST500 requires a minimum order of Rs. 3,000.', 'error');
        return false;
      }
      setAppliedPromo('FEAST500 (Rs. 500 OFF)');
      setDiscountAmount(500);
      showToast('Promo Code Applied! 🎉', 'Rs. 500 discount applied to your feast.', 'success');
      return true;
    } else if (cleanCode === 'SWEETFREE') {
      setAppliedPromo('SWEETFREE (Free Gulab Jamun Included)');
      setDiscountAmount(0);
      showToast('Sweet Gift Applied! 🍨', 'Complimentary Gulab Jamun added to your kitchen ticket.', 'success');
      return true;
    } else {
      showToast('Invalid Promo Code', 'Please check the code and try again.', 'error');
      return false;
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setDiscountAmount(0);
    setPromoCode('');
    showToast('Promo Removed', 'Discount coupon removed.', 'info');
  };

  // Tax and Total
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(discountedSubtotal * TAX_RATE);
  const total = subtotal === 0 ? 0 : Math.max(0, discountedSubtotal + deliveryFee + tax + tip);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        orderType,
        tip,
        promoCode,
        discountAmount,
        appliedPromo,
        deliveryFee,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        subtotal,
        tax,
        total,
        itemCount,
        setIsOpen,
        setOrderType,
        setTip,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyPromoCode,
        removePromoCode
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

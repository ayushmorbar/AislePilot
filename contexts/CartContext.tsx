"use client"

import type React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import type { Product } from "@/utils/semanticSearch"

interface CartItem {
  product: Product
  scannedAt: Date
  stockLevel: string
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalValue: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; stockLevel: string } }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "CLEAR_CART" }

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalValue: 0,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM":
      const newItem: CartItem = {
        product: action.payload.product,
        scannedAt: new Date(),
        stockLevel: action.payload.stockLevel,
      }

      const newItems = [...state.items, newItem]
      const totalValue = newItems.reduce((sum, item) => sum + item.product.price, 0)

      return {
        items: newItems,
        totalItems: newItems.length,
        totalValue,
      }

    case "REMOVE_ITEM":
      const filteredItems = state.items.filter((item) => item.product.id !== action.payload)
      const newTotalValue = filteredItems.reduce((sum, item) => sum + item.product.price, 0)

      return {
        items: filteredItems,
        totalItems: filteredItems.length,
        totalValue: newTotalValue,
      }

    case "CLEAR_CART":
      return initialState

    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

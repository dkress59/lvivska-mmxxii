import React, { PropsWithChildren, useState } from 'react'

import { CartItem, StateSetter } from './types'

interface CartContextDefinition {
	cartItems: CartItem[]
	setCartItems: StateSetter<CartItem[]>
}

export const CartContext = React.createContext<CartContextDefinition>({
	cartItems: [],
	setCartItems: () => null,
})

export function CartContextProvider({ children }: PropsWithChildren) {
	const [cartItems, setCartItems] = useState<CartItem[]>([])

	return (
		<CartContext.Provider value={{ cartItems, setCartItems }}>
			{children}
		</CartContext.Provider>
	)
}

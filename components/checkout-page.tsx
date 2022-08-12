import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { CheckoutForm } from '../components/checkout-form'
import { NEXT_PUBLIC_STRIPE_PUBLIC_KEY } from '../util/constants'
import { useCart } from '../util/hooks'
import { WPProduct } from '../util/types'

export function CheckoutPage({ products }: { products: WPProduct[] }) {
	const { clientSecret } = useCart(products)
	const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

	return (
		!!clientSecret && (
			<Elements
				options={{
					clientSecret,
					appearance: {
						theme: 'night',
					},
				}}
				stripe={stripePromise}
			>
				<CheckoutForm />
			</Elements>
		)
	)
}

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { CheckoutForm } from '../components/checkout-form'
import { NEXT_PUBLIC_STRIPE_PUBLIC_KEY } from '../util/constants'
import { useCart } from '../util/hooks'
import { WPProduct } from '../util/types'

export function CheckoutPage({ products }: { products: WPProduct[] }) {
	const { clientSecret } = useCart(products)
	const stripePromise = loadStripe(NEXT_PUBLIC_STRIPE_PUBLIC_KEY, {
		betas: ['process_order_beta_1'],
		apiVersion: '2022-08-01; orders_beta=v4',
	})

	return (
		<article id="checkout">
			<h1>Checkout</h1>
			<p>Wählen Sie Ihre Zahlungsmethode:</p>
			<br />
			{!!clientSecret && (
				<Elements
					options={{
						clientSecret,
						appearance: {
							theme: 'stripe',
						},
						locale: 'de',
					}}
					stripe={stripePromise}
				>
					<CheckoutForm />
				</Elements>
			)}
		</article>
	)
}

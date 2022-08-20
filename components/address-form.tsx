import React, { useEffect, useState } from 'react'

import { AddressFromProps } from '../util/types'

const states: { label: string; value: string }[] = [
	{
		label: 'Baden-Württemberg ',
		value: 'BW',
	},
	{
		label: 'Bayern ',
		value: 'BY',
	},
	{
		label: 'Berlin ',
		value: 'BE',
	},
	{
		label: 'Brandenburg ',
		value: 'BB',
	},
	{
		label: 'Bremen ',
		value: 'HB',
	},
	{
		label: 'Hamburg ',
		value: 'HH',
	},
	{
		label: 'Hessen ',
		value: 'HE',
	},
	{
		label: 'Mecklenburg-Vorpommern ',
		value: 'MV',
	},
	{
		label: 'Niedersachsen ',
		value: 'NI',
	},
	{
		label: 'Nordrhein-Westfalen ',
		value: 'NW',
	},
	{
		label: 'Rheinland-Pfalz ',
		value: 'RP',
	},
	{
		label: 'Saarland ',
		value: 'SL',
	},
	{
		label: 'Sachsen ',
		value: 'SN',
	},
	{
		label: 'Sachsen-Anhalt ',
		value: 'ST',
	},
	{
		label: 'Schleswig-Holstein ',
		value: 'SH',
	},
	{
		label: 'Thüringen',
		value: 'TH',
	},
]

export function AddressForm({
	forBilling = false,
	setAddressState,
}: AddressFromProps) {
	const [city, setCity] = useState('')
	const [line1, setLine1] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [state, setState] = useState('')
	const [email, setEmail] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [phone, setPhone] = useState('')

	useEffect(() => {
		if (!city) return setAddressState(null)
		if (!line1) return setAddressState(null)
		if (!postalCode) return setAddressState(null)
		if (!state) return setAddressState(null)
		if (!email) return setAddressState(null)
		if (!firstName) return setAddressState(null)
		if (!lastName) return setAddressState(null)
		if (!phone) return setAddressState(null)

		setAddressState({
			city,
			line1,
			postalCode,
			state,
			email,
			firstName,
			lastName,
			phone,
		})
	}, [
		city,
		line1,
		postalCode,
		state,
		email,
		firstName,
		lastName,
		phone,
		setAddressState,
	])

	return (
		<section className={`${forBilling ? 'billing' : 'shipping'} address`}>
			<h2 className="fill">
				{forBilling ? 'Rechnungsadresse' : 'Lieferadresse'}
			</h2>
			<input
				name="firstName"
				value={firstName}
				onChange={event => setFirstName(event.target.value)}
				placeholder="Vorname"
				required
			/>
			<input
				name="lastName"
				value={lastName}
				onChange={event => setLastName(event.target.value)}
				placeholder="Nachname"
				required
			/>
			<input
				name="email"
				value={email}
				onChange={event => setEmail(event.target.value)}
				placeholder="E-Mail"
				required
			/>
			<input
				name="phone"
				value={phone}
				onChange={event => setPhone(event.target.value)}
				placeholder="Telefonnummer"
				required
			/>
			<input
				className="fill"
				name="streetAndNumber"
				value={line1}
				onChange={event => setLine1(event.target.value)}
				placeholder="Straße + Hausnummer"
				required
			/>
			<input
				name="postalCode"
				value={postalCode}
				onChange={event => setPostalCode(event.target.value)}
				placeholder="PLZ"
				required
			/>
			<input
				name="city"
				value={city}
				onChange={event => setCity(event.target.value)}
				placeholder="Stadt"
				required
			/>
			<select
				name="state"
				value={state}
				onChange={event => setState(event.target.value)}
				placeholder="Bundesland"
			>
				<option value="" disabled>
					Bundesland
				</option>
				{states.map(({ label, value }) => (
					<option key={value} value={value}>
						{label}
					</option>
				))}
			</select>
			<input name="country" value="Deutschland" disabled />
		</section>
	)
}

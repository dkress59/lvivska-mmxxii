import React, { useEffect, useRef, useState } from 'react'

import { StateSetter } from '../util/types'

export function DateInput({
	name,
	state,
	setState,
}: {
	name: string
	state: string
	setState: StateSetter<string>
}) {
	const [isFocused, setIsFocused] = useState(false)
	const [day, setDay] = useState(state.split('.')[0] || '')
	const [month, setMonth] = useState(state.split('.')[1] || '')
	const [year, setYear] = useState(state.split('.')[2] || '')

	const placeholderRef = useRef<null | HTMLSpanElement>(null)
	const dayInputRef = useRef<null | HTMLInputElement>(null)
	const monthInputRef = useRef<null | HTMLInputElement>(null)
	const yearInputRef = useRef<null | HTMLInputElement>(null)

	useEffect(() => {
		const currentPlaceholder = placeholderRef.current
		const focusEvent = () => setIsFocused(true)
		currentPlaceholder?.addEventListener('focus', focusEvent)

		return () =>
			currentPlaceholder?.removeEventListener('focus', focusEvent)
	})

	useEffect(() => {
		if (isFocused) dayInputRef.current!.focus()
	}, [isFocused])

	useEffect(() => {
		if (day.length === 2) monthInputRef.current!.focus()
	}, [day])

	useEffect(() => {
		if (month.length === 2) yearInputRef.current!.focus()
	}, [month])

	useEffect(() => {
		if (year.length === 4) yearInputRef.current!.blur()
	}, [year])

	useEffect(() => {
		if (day.length === 2 && month.length === 2 && year.length === 4) {
			setState(`${day}.${month}.${year}`)
		} else {
			setState('')
		}
	}, [day, month, year])

	return (
		<div
			className="date-input"
			data-testid={name}
			onClick={() => {
				setIsFocused(true)
			}}
			onKeyDown={event => {
				if (event.key.toLowerCase() === 'enter') setIsFocused(true)
			}}
			onBlur={() => {
				if (!day && !month && !year) setIsFocused(false)
			}}
		>
			{!state && !isFocused ? (
				<span ref={placeholderRef} tabIndex={0}>
					Geburtsdatum
				</span>
			) : (
				<>
					<input
						onChange={event => setDay(event.target.value)}
						pattern="[0-9]*"
						placeholder="TT"
						ref={dayInputRef}
						type="numeric"
						value={day}
					/>
					.
					<input
						onChange={event => setMonth(event.target.value)}
						pattern="[0-9]*"
						placeholder="MM"
						ref={monthInputRef}
						type="numeric"
						value={month}
					/>
					.
					<input
						onChange={event => setYear(event.target.value)}
						pattern="[0-9]*"
						placeholder="JJJJ"
						ref={yearInputRef}
						type="numeric"
						value={year}
					/>
				</>
			)}
		</div>
	)
}

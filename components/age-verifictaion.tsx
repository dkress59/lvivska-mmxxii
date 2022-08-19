import moment from 'moment'
import React, { useEffect, useState } from 'react'

import {
	LOCAL_STORAGE,
	localDateFormat,
	YEAR_IN_MILLISECONDS,
} from '../util/constants'
import { StateSetter } from '../util/types'
import { DateInput } from './date-input'

function is18orOlder(birthday: string): boolean {
	const age =
		moment(new Date()).diff(moment(birthday, localDateFormat)) /
		YEAR_IN_MILLISECONDS
	return Math.floor(age) > 17
}

export function AgeVerification({
	active,
	setAgeVerified,
}: {
	active: boolean
	setAgeVerified: StateSetter<boolean>
}) {
	const [birthday, setBirthday] = useState('')

	useEffect(() => {
		if (is18orOlder(birthday)) {
			localStorage.setItem(LOCAL_STORAGE.AGE_VERIFIED, 'true')
			localStorage.setItem(
				LOCAL_STORAGE.DATE_AGE_VERIFIED,
				moment(new Date()).format(localDateFormat),
			)
			setAgeVerified(true)
		}
	}, [birthday])

	return (
		<article
			id="age-verification"
			className={active ? 'active' : undefined}
		>
			<h1 className="logo">LVIVSKA</h1>
			<h2>
				Altersbestätigung
				<br />
				<small>Zugang ab 18 Jahren</small>
			</h2>
			<DateInput
				name="birthday"
				state={birthday}
				setState={setBirthday}
			/>
		</article>
	)
}

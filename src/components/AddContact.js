import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddContact = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const contacts = useSelector((state) => state)
	const dispatchContact = useDispatch()

	const history = useNavigate()

	const handleAddContact = (e) => {
		e.preventDefault()

		const checkDuplicateEmail = contacts.find(
			(contact) => contact.email === email && contact
		)

		const checkDuplicatePhoneNumber = contacts.find(
			(contact) => contact.phoneNumber === phoneNumber && contact
		)

		if (!name || !email || !phoneNumber) {
			return toast.warning('Please Fill all the Fields')
		}

		if (checkDuplicateEmail) {
			return toast.error('Email have been used')
		}

		if (checkDuplicatePhoneNumber) {
			return toast.error('Phone number have been used')
		}

		let id = contacts.length + 1

		const data = {
			id: id.toString(),
			name,
			email,
			phoneNumber,
		}

		dispatchContact({ type: 'ADD_CONTACT', payload: data })

		toast.success('Contact added succefully')

		history('/')
	}

	return (
		<div className='container'>
			<div className='row'>
				<h1 className='display-3 text-center'>Add Contact</h1>
				<div className='col-md-6 shadow mx-auto p-5'>
					<form onSubmit={handleAddContact}>
						<div className='mb-3'>
							<input
								type='text'
								name=''
								id=''
								placeholder='name'
								className='form-control'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className='mb-3'>
							<input
								type='email'
								name=''
								id=''
								placeholder='email'
								className='form-control'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
						<div className='mb-3'>
							<input
								type='number'
								name=''
								id=''
								placeholder='phone number'
								className='form-control'
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
							/>
						</div>
						<div className='d-grid'>
							<input
								type='submit'
								name=''
								id=''
								value='Add Contact'
								className='btn btn-dark'
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

export default AddContact

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const EditContact = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phoneNumber, setPhoneNumber] = useState('')

	const { id } = useParams()

	const contacts = useSelector((state) => state)

	const currentContacts = contacts.find((contact) => contact.id === id)

	useEffect(() => {
		if (currentContacts) {
			setName(currentContacts.name)
			setEmail(currentContacts.email)
			setPhoneNumber(currentContacts.phoneNumber)
		}
	}, [currentContacts])

	const dispatchContact = useDispatch()

	const history = useNavigate()

	const handleEditContact = (e) => {
		e.preventDefault()

		const checkDuplicateEmail = contacts.find(
			(contact) => contact.id !== id && contact.email === email
		)

		const checkDuplicatePhoneNumber = contacts.find(
			(contact) =>
				contact.id !== id && contact.phoneNumber === phoneNumber
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

		const data = {
			id,
			name,
			email,
			phoneNumber,
		}

		dispatchContact({ type: 'UPDATE_CONTACT', payload: data })

		toast.success('Contact updated succefully')

		history('/')
	}

	return (
		<div className='container'>
			{currentContacts && (
				<>
					<h1 className='display-3 text-center'>Edit Contact</h1>
					<div className='row'>
						<div className='col-md-6 shadow mx-auto p-5'>
							<form onSubmit={handleEditContact}>
								<div className='mb-3'>
									<input
										type='text'
										name=''
										id=''
										placeholder='name'
										className='form-control'
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
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
										onChange={(e) =>
											setEmail(e.target.value)
										}
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
										onChange={(e) =>
											setPhoneNumber(e.target.value)
										}
									/>
								</div>
								<div className='d-grid gap-2 d-md-block'>
									<input
										type='submit'
										name=''
										id=''
										value='Update Contact'
										className='btn btn-dark'
									/>
									<Link
										to='/'
										className='btn btn-danger ms-3'
									>
										Cancel
									</Link>
								</div>
							</form>
						</div>
					</div>
				</>
			)}
			{!currentContacts && (
				<>
					<h1 className='display-3 text-center'>Contact Not Found</h1>
				</>
			)}
		</div>
	)
}

export default EditContact

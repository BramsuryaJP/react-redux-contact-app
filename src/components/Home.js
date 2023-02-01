import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const Home = () => {
	const contacts = useSelector((state) => state)

	const dispatchContact = useDispatch()

	const deleteContact = (id) => {
		dispatchContact({ type: 'DELETE_CONTACT', payload: id })
		toast.success('Contact Deleted Successfully')
	}

	console.log(contacts)
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-md-12 my-5 text-end'>
					<Link to='/add' className='btn btn-outline-dark'>
						Add Contact
					</Link>
				</div>
				{contacts.length <= 0 ? (
					<h1>No Contact Found</h1>
				) : (
					<div className='col-md-10 mx-auto'>
						<table className='table table-hover'>
							<thead className='text-white bg-dark text-center'>
								<tr>
									<th scope='col'>ID</th>
									<th scope='col'>Name</th>
									<th scope='col'>Email</th>
									<th scope='col'>Phone Number</th>
									<th scope='col'>Action</th>
								</tr>
							</thead>
							<tbody>
								{contacts.map((contact, id) => (
									<tr key={id}>
										<td className='text-center'>
											{id + 1}
										</td>
										<td className='text-center'>
											{contact.name}
										</td>
										<td className='text-center'>
											{contact.email}
										</td>
										<td className='text-center'>
											{contact.phoneNumber}
										</td>
										<td className='text-center'>
											<Link
												to={`/edit/${contact.id}`}
												className='btn btn-small btn-primary me-2'
											>
												Edit
											</Link>
											<button
												type='button'
												className='btn btn-small btn-danger'
												onClick={() =>
													deleteContact(contact.id)
												}
											>
												Delete
											</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	)
}

export default Home

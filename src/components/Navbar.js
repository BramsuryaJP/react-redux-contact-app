import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark py-4'>
			<Link to='/' className='navbar-brand px-5'>
				React Redux Contact App
			</Link>
		</nav>
	)
}

export default Navbar

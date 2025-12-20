import React from 'react'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
	return (
		<>
			<div className="w-[25%] min-h-screen bg-black">
				<div className="px-5 py-10">
					{/*<img src={logo} alt="" className="w-[60%]" />*/}
					<p className="uppercase">sope adelaja</p>
				</div>
				<ul className="text-white">
					<NavLink to="/admin/home">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							home
						</li>
					</NavLink>
					<NavLink to="/admin/create">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							create a blog post
						</li>
					</NavLink>
					<NavLink to="/admin/blog">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							blogs
						</li>
					</NavLink>
					<NavLink to='/admin/upload-product'>
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							upload product
						</li>
					</NavLink>
					<NavLink to="/admin/portfolio-title">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							portfolio title
						</li>
					</NavLink>
					<NavLink to='/admin/upload-to-portfolio'>
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							upload image to portolios
						</li>
					</NavLink>
					<NavLink to='/admin/exhibition-title'>
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							exhibition title
						</li>
					</NavLink>
					<NavLink to='/admin/upload-to-exhibition'>
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							upload image to exhibitions
						</li>
					</NavLink>
					<NavLink to="/admin/on-set/">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							on set
						</li>
					</NavLink>
					<NavLink to="/admin/homepage-upload/">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							homepage
						</li>
					</NavLink>
					<NavLink to="/admin/contact">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							contact form
						</li>
					</NavLink>
					<NavLink to="/admin/academy">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							academy form
						</li>
					</NavLink>
					<NavLink to="/admin/subscribers">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							subscribers
						</li>
					</NavLink>
					<NavLink to="/admin/orders">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							orders
						</li>
					</NavLink>
					<NavLink to="/admin/users">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							users
						</li>
					</NavLink>
					<NavLink to="/admin/about">
						<li className="uppercase text-md px-5 py-4 border-t-[0.5px] hover:bg-gray-900" style={{fontFamily: "Muli"}}>
							about
						</li>
					</NavLink>
				</ul>
			</div>
		</>
	)
}

export default Sidebar
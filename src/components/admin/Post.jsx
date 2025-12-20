import React from 'react'
import { Link } from 'react-router-dom'
import {format} from 'date-fns'

const Post = ({ _id, name, summary, content, coverImage, date, createdAt, onDelete }) => {
	const formatDate = format(new Date(createdAt), 'MMM d, yyyy HH:mm')
	return (
		<>
			<div className="p-4 gap-4">
				<div>
					<Link to={`/admin/edit/${_id}`}>
						<img src={coverImage} alt="blog" className="w-[50%]" />
					</Link>
				</div>
				<div className="pt-5">
					<Link to={`/admin/blog/${_id}`}>
						<h2 className="capitalize text-2xl font-semibold">{name}</h2>
					</Link>
					<p style={{fontFamily: "Muli"}}>{date}</p>
					<p className="mb-4" style={{fontFamily: "Muli"}}>{name}</p>
				</div>
				<div>
					<button 
                        style={{fontFamily: "Muli"}}
                        className="bg-red-500 py-2 px-5 text-white font-semibold uppercase"
                        onClick={() => onDelete(_id)}>
                        Delete
					</button>
				</div>
			</div>
		</>
	)
}

export default Post
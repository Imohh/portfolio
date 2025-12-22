import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Helmet} from "react-helmet";
// import Preloader from '../components/Pre';

const BlogList = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Optional loading state
  const [error, setError] = useState(null);

	const fetchProducts = async () => {
	    try {
	      // const response = await fetch('https://sope-backend.vercel.app/post');
	      const response = await fetch('http://localhost:4000/post');
	      console.log('Response status:', response.status)
	      if (response.ok) {
	        const data = await response.json();
	        setProducts(data);
	        console.log(data)
	        
	      } else {
	        console.error('Error fetching products');
	        setError('Failed to fetch blog posts');
	      }
	    } catch (error) {
	      console.error('Error fetching products:', error);
	      setError('An error occurred while fetching blog posts');
	    } finally {
      setLoading(false);
    }
	};

	useEffect(() => {
	    fetchProducts();
	}, []);

	useEffect(() => {
    // Simulate a network request or loading process
    const timer = setTimeout(() => setLoading(false), 3000); // Adjust duration as needed
    return () => clearTimeout(timer);
  }, []);

	// if (loading) {
  //   return <Preloader />;
  // }

  if (error) {
    return <p>{error}</p>;
  }

	return (
		<>
			<Helmet>
		        <title>Imoh Precious| Frontend Developer - Software Developer</title>
		        <meta name="description" content="developer, frontend, full-stack, coding" />
		    </Helmet>
				

			
			<section className="pb-24 bg-[#252525] xl:px-[240px] lg:px-[240px] px-[30px] xl:py-4 md:py-4">
		        <div className="mx-auto w-full">
		          <div className="py-4 px-2 xl:px-0 lg:px-0 md:px-0 mb-6">
								<h2 className="uppercase text-[#b7a78b] xl:text-2xl text-lg font-semibold tracking-[.11em]" 
								>sope adelaja's blog</h2>
						  </div>
						  {products.length === 0 ? (
				        <div className="flex justify-center items-center h-64">
					        <p className="text-center text-[#d5c9b4] text-lg">
					          No blog posts found.
					        </p>
					      </div>
				      ) : (
			          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 lg:gap-y-0 gap-x-5 mb-14 justify-center">
				      	{products.map((post) => (
				      		<div key={post.id}>
					      		<Link to={`/thoughts/${post.slug}`}>
				  						<div className="group cursor-pointer w-full p-3 transition-all duration-300 transform hover:scale-105 hover:bg-[#252525] hover:shadow-lg relative">
				    
										    {/* Image Wrapper */}
		    								<div className="relative overflow-hidden h-64">
		    								  <img 
			        							src={post.coverImage} 
			        							alt="Post cover" 
			        							className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
			      							/>

		      								{/* Hover Overlay */}
		    								  <div className="absolute  inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
		    								    <span className="text-white uppercase text-lg font-semibold bg-[#7f7564] bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2 rounded"
		    								    style={{fontFamily: "BIZ UDPMincho"}}>Open Post</span>
		    								  </div>
		  								  </div>

		    								{/* Post Details */}
		    								<div className="block text-center mt-4">
		    								  <h4 className="text-[#c6b495] xl:text-[17px] lg:text-[17px] md:text-[17px] text-[15px] leading-8 mb-2 
		    								  	capitalize group-hover:text-white transition-colors duration-300"
		    								  	style={{fontFamily: "BIZ UDPMincho"}}>
		    								    {post.name}
		    								  </h4>
		    								  <div className="flex items-center justify-center font-medium">
		    								    <span className="text-[13px] text-[#7f7564] capitalize">{post.date}</span>
		        								<span className="px-2 text-[#7f7564]">//</span>
		        								<h6 className="text-[13px] text-[#7f7564] group-hover:text-gray-400 transition-colors duration-300 capitalize">
		        								  {post.author}
		    								    </h6>
		    								  </div>
		    								</div>

		  								</div>
										</Link>

			            </div>
			            ))}
			          </div>
		          	)}
		            

		            {/*
		          <a href="javascript:;" 
		          	className="cursor-pointer border border-[#b7a78b]
		          		shadow-sm py-3.5 px-7 w-52 flex justify-center items-center 
		          		text-white font-semibold mx-auto transition-all duration-300 
		          		hover:bg-[#b7a78b] hover:text-black">View All</a>*/}
		        </div>
		    </section>

		</>
	)
}

export default BlogList
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const BlogPost = () => {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        console.log("Fetching post:", slug);

        const response = await fetch(`http://localhost:4000/post/${slug}`);

        if (!response.ok) {
          throw new Error("Post not found");
        }

        const data = await response.json();
        console.log("Post data:", data);

        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#252525] text-white">
        Loading post...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#252525] text-red-400">
        {error}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.name} | Sope Adelaja</title>
        <meta name="description" content={post.excerpt || post.name} />
      </Helmet>

      <section className="bg-[#252525] min-h-screen px-[30px] xl:px-[240px] lg:px-[240px] py-16">
        <div className="max-w-4xl mx-auto">
          
          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-10">
              <img
                src={post.coverImage}
                alt={post.name}
                className="w-full h-[420px] object-cover rounded-lg"
              />
            </div>
          )}

          {/* Title */}
          <h1
            className="text-[#c6b495] text-3xl xl:text-4xl mb-4 capitalize"
            style={{ fontFamily: "BIZ UDPMincho" }}
          >
            {post.name}
          </h1>

          {/* Meta */}
          <div className="flex items-center text-sm text-[#7f7564] mb-8">
            <span>{post.date}</span>
            <span className="px-2">//</span>
            <span className="capitalize">{post.author}</span>
          </div>

          {/* Content */}
          <article
            className="text-[#d5c9b4] leading-8 text-[16px] space-y-6"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </>
  );
};

export default BlogPost;
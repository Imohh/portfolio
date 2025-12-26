import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet";

const BlogList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://portfolio-backend-wheat-three.vercel.app/post');
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

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        color: "#ffffff",
        fontSize: "1.125rem",
        fontWeight: "300",
        letterSpacing: "0.05em"
      }}>
        Loading blog posts...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        color: "#ff6b6b",
        fontSize: "1.125rem"
      }}>
        {error}
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Imoh Precious | Frontend Developer - Software Developer</title>
        <meta name="description" content="developer, frontend, full-stack, coding" />
      </Helmet>

      <section style={{
        paddingBottom: "6rem",
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: "absolute",
          top: "-100px",
          right: "-100px",
          width: "400px",
          height: "400px",
          background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute",
          bottom: "-150px",
          left: "-150px",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none"
        }} />

        <div style={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "1rem 1.875rem",
          position: "relative",
          zIndex: 1
        }}>
          {/* Header */}
          <div style={{
            padding: "3rem 0",
            marginBottom: "3rem",
            borderBottom: "1px solid rgba(139, 92, 246, 0.2)"
          }}>
            <h2 style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              color: "#a78bfa",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              textAlign: "center",
              marginBottom: "0.5rem",
              textShadow: "0 2px 10px rgba(139, 92, 246, 0.4)"
            }}>
              Imoh's thoughts
            </h2>
            <div style={{
              width: "80px",
              height: "3px",
              background: "linear-gradient(90deg, transparent 0%, #8b5cf6 50%, transparent 100%)",
              margin: "1rem auto 0"
            }} />
          </div>

          {products.length === 0 ? (
            <div style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "400px"
            }}>
              <div style={{
                textAlign: "center",
                padding: "3rem",
                background: "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                border: "1px solid rgba(139, 92, 246, 0.2)"
              }}>
                <p style={{
                  color: "#999999",
                  fontSize: "1.125rem",
                  fontWeight: "300",
                  letterSpacing: "0.05em"
                }}>
                  No blog posts found.
                </p>
              </div>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2rem",
              marginBottom: "3.5rem"
            }}>
              {products.map((post) => (
                <Link 
                  key={post.id}
                  to={`/thoughts/${post.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit"
                  }}
                >
                  <div style={{
                    cursor: "pointer",
                    width: "100%",
                    background: "rgba(30, 30, 30, 0.4)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid rgba(255, 255, 255, 0.05)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-8px)";
                    e.currentTarget.style.boxShadow = "0 20px 40px rgba(139, 92, 246, 0.3)";
                    e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.5)";
                    e.currentTarget.style.background = "rgba(30, 30, 30, 0.7)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                    e.currentTarget.style.background = "rgba(30, 30, 30, 0.4)";
                  }}
                  >
                    {/* Image Container */}
                    <div style={{
                      position: "relative",
                      height: "280px",
                      overflow: "hidden"
                    }}>
                      <img 
                        src={post.coverImage} 
                        alt="Post cover" 
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "scale(1.15)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "scale(1)";
                        }}
                      />

                      {/* Gradient Overlay */}
                      <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "100%",
                        background: "linear-gradient(to top, rgba(26, 26, 26, 0.95) 0%, rgba(26, 26, 26, 0.3) 50%, transparent 100%)",
                        pointerEvents: "none"
                      }} />

                      {/* Hover Overlay with Button */}
                      <div 
                        className="hover-overlay"
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "rgba(0, 0, 0, 0.7)",
                          backdropFilter: "blur(5px)",
                          opacity: 0,
                          transition: "opacity 0.4s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "0";
                        }}
                      >
                        <span style={{
                          color: "#ffffff",
                          fontSize: "1rem",
                          fontWeight: "700",
                          background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                          padding: "0.875rem 2rem",
                          borderRadius: "8px",
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          boxShadow: "0 4px 20px rgba(139, 92, 246, 0.5)",
                          fontFamily: "BIZ UDPMincho, serif"
                        }}>
                          Read Article
                        </span>
                      </div>
                    </div>

                    {/* Post Details */}
                    <div style={{
                      padding: "1.75rem",
                      textAlign: "center"
                    }}>
                      <h4 style={{
                        color: "#a78bfa",
                        fontSize: "1.25rem",
                        lineHeight: "1.6",
                        marginBottom: "1rem",
                        textTransform: "capitalize",
                        fontWeight: "600",
                        transition: "color 0.3s ease",
                        fontFamily: "BIZ UDPMincho, serif",
                        minHeight: "3.2rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "#c4b5fd";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "#a78bfa";
                      }}
                      >
                        {post.name}
                      </h4>
                      
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.75rem",
                        fontSize: "0.875rem",
                        color: "#999999",
                        fontWeight: "400"
                      }}>
                        <span style={{
                          textTransform: "capitalize"
                        }}>
                          {post.date}
                        </span>
                        <span style={{
                          color: "#8b5cf6",
                          fontSize: "0.7rem"
                        }}>
                          •
                        </span>
                        <span style={{
                          textTransform: "capitalize",
                          transition: "color 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = "#cccccc";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = "#999999";
                        }}
                        >
                          {post.author}
                        </span>
                      </div>

                      {/* Decorative bottom accent */}
                      <div style={{
                        width: "40px",
                        height: "2px",
                        background: "linear-gradient(90deg, transparent 0%, #8b5cf6 50%, transparent 100%)",
                        margin: "1.25rem auto 0",
                        opacity: 0,
                        transition: "opacity 0.3s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = "1";
                      }}
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogList;
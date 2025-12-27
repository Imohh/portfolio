import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { useBlogPost } from "../../hooks/useBlogPost"; // Adjust import path

const BlogPost = () => {
  const { slug } = useParams();
  const { post, comments, loading, error, addComment } = useBlogPost(slug);

  const [showShareOptions, setShowShareOptions] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [newComment, setNewComment] = useState("");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const postUrl = encodeURIComponent(window.location.href);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !newComment) {
      alert("Name, email and comment are required");
      return;
    }

    // Basic email validation (matches backend regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email format");
      return;
    }

    try {
      await addComment({ name, email, website, text: newComment });
      setName("");
      setEmail("");
      setWebsite("");
      setNewComment("");
    } catch (err) {
      alert(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!post) return <div>Post not found</div>;

  return (
    <>
      <Helmet>
        <title style={{
          textTransform: "capitalize"
        }}>{post.name} | Imoh Precious</title>
        <meta name="description" content={post.excerpt || post.name} />
      </Helmet>

      <section
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
          minHeight: "100vh",
          padding: isMobile ? "4rem 1rem" : "8rem 1.25rem",
          position: "relative",
        }}
      >
        <div
          style={{
            maxWidth: isMobile ? "100%" : "900px",
            margin: "0 auto",
          }}
        >
          {/* SHARE BUTTON */}
          <div
            style={{
              position: isMobile ? "fixed" : "absolute",
              top: isMobile ? "auto" : "8rem",
              bottom: isMobile ? "2rem" : "auto",
              right: isMobile ? "1rem" : "2rem",
              zIndex: 10,
            }}
          >
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              style={{
                padding: isMobile ? "0.75rem" : "0.875rem",
                background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                color: "#ffffff",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: isMobile ? "1rem" : "1.125rem",
              }}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "scale(1.1)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(139, 92, 246, 0.6)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(139, 92, 246, 0.4)";
                }
              }}
            >
              <FaShareAlt />
            </button>

            {showShareOptions && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  marginTop: isMobile ? "0" : "0.75rem",
                  marginBottom: isMobile ? "0.75rem" : "0",
                  width: isMobile ? "200px" : "220px",
                  background: "rgba(30, 30, 30, 0.98)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "12px",
                  padding: "0.75rem",
                  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                }}
              >
                {[
                  {
                    icon: FaFacebook,
                    label: "Facebook",
                    color: "#1877f2",
                    url: `https://www.facebook.com/sharer/sharer.php?u=${postUrl}`,
                  },
                  {
                    icon: FaTwitter,
                    label: "Twitter",
                    color: "#1da1f2",
                    url: `https://twitter.com/intent/tweet?url=${postUrl}&text=${post.name}`,
                  },
                  {
                    icon: FaWhatsapp,
                    label: "WhatsApp",
                    color: "#25d366",
                    url: `https://api.whatsapp.com/send?text=${post.name} ${postUrl}`,
                  },
                  {
                    icon: FaEnvelope,
                    label: "Email",
                    color: "#ea4335",
                    url: `mailto:?subject=${post.name}&body=${postUrl}`,
                  },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target={social.label !== "Email" ? "_blank" : undefined}
                    rel={social.label !== "Email" ? "noreferrer" : undefined}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      padding: "0.75rem",
                      color: "#ffffff",
                      textDecoration: "none",
                      borderRadius: "8px",
                      transition: "all 0.2s ease",
                      fontSize: isMobile ? "0.9rem" : "0.95rem",
                      fontWeight: "500",
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background =
                          "rgba(139, 92, 246, 0.15)";
                        e.currentTarget.style.transform = "translateX(5px)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.transform = "translateX(0)";
                      }
                    }}
                  >
                    <social.icon
                      style={{ color: social.color, fontSize: "1.25rem" }}
                    />
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* COVER IMAGE */}
          {post.coverImage && (
            <div
              style={{
                width: "100%",
                height: isMobile ? "300px" : "500px",
                borderRadius: "16px",
                overflow: "hidden",
                marginBottom: isMobile ? "2rem" : "3rem",
                boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
                position: "relative",
              }}
            >
              <img
                src={post.coverImage}
                alt={post.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) e.currentTarget.style.transform = "scale(1)";
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "150px",
                  background:
                    "linear-gradient(to top, rgba(26, 26, 26, 0.9) 0%, transparent 100%)",
                }}
              />
            </div>
          )}

          {/* TITLE */}
          <h1
            style={{
              color: "#a78bfa",
              fontSize: isMobile ? "2rem" : "3rem",
              marginBottom: "1rem",
              textTransform: "capitalize",
              fontWeight: "700",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 10px rgba(139, 92, 246, 0.3)",
            }}
          >
            {post.name}
          </h1>

          {/* META */}
          <div
            style={{
              fontSize: isMobile ? "0.85rem" : "0.95rem",
              color: "#999999",
              marginBottom: isMobile ? "2rem" : "3rem",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              borderLeft: "3px solid #8b5cf6",
              paddingLeft: "1rem",
              fontWeight: "300",
            }}
          >
            <span>{post.date}</span>
            <span style={{ color: "#8b5cf6" }}>•</span>
            <span style={{ textTransform: "capitalize" }}>{post.author}</span>
          </div>

          {/* CONTENT BLOCKS */}
          <div
            style={{
              color: "#e0e0e0",
              lineHeight: "1.9",
              fontSize: isMobile ? "1rem" : "1.125rem",
              fontWeight: "300",
            }}
          >
            {post.content?.map((block, index) => {
              if (block.text || block.content) {
                return (
                  <p
                    key={index}
                    style={{
                      marginBottom: isMobile ? "1.25rem" : "1.75rem",
                      textAlign: "justify",
                    }}
                  >
                    {block.text || block.content}
                  </p>
                );
              }

              if (block.src) {
                return (
                  <div
                    key={index}
                    style={{ marginBottom: isMobile ? "1.5rem" : "2.5rem" }}
                  >
                    <div
                      style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                      }}
                    >
                      <img
                        src={block.src}
                        alt=""
                        style={{
                          width: "100%",
                          display: "block",
                          transition: "transform 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          if (!isMobile)
                            e.currentTarget.style.transform = "scale(1.02)";
                        }}
                        onMouseLeave={(e) => {
                          if (!isMobile)
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                      />
                    </div>
                    {block.caption && (
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: isMobile ? "0.8rem" : "0.9rem",
                          fontStyle: "italic",
                          marginTop: "0.75rem",
                          color: "#999999",
                        }}
                      >
                        {block.caption}
                      </p>
                    )}
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* COMMENTS SECTION */}
          <div
            style={{
              marginTop: isMobile ? "3rem" : "5rem",
              paddingTop: isMobile ? "2rem" : "3rem",
              borderTop: "1px solid rgba(139, 92, 246, 0.2)",
            }}
          >
            <h2
              style={{
                fontSize: isMobile ? "1.5rem" : "2rem",
                color: "#a78bfa",
                marginBottom: isMobile ? "1.5rem" : "2.5rem",
                fontWeight: "600",
                letterSpacing: "0.05em",
              }}
            >
              Comments ({comments.length})
            </h2>

            {comments.length ? (
              <div style={{ marginBottom: isMobile ? "2rem" : "3rem" }}>
                {comments.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "1.5rem",
                      padding: isMobile ? "1rem" : "1.5rem",
                      background: "rgba(30, 30, 30, 0.6)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background =
                          "rgba(30, 30, 30, 0.8)";
                        e.currentTarget.style.borderColor =
                          "rgba(139, 92, 246, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isMobile) {
                        e.currentTarget.style.background =
                          "rgba(30, 30, 30, 0.6)";
                        e.currentTarget.style.borderColor =
                          "rgba(255, 255, 255, 0.05)";
                      }
                    }}
                  >
                    <p
                      style={{
                        fontWeight: "600",
                        textTransform: "capitalize",
                        color: "#a78bfa",
                        marginBottom: "0.5rem",
                        fontSize: isMobile ? "1rem" : "1.05rem",
                      }}
                    >
                      {c.name}
                    </p>
                    <p
                      style={{
                        color: "#cccccc",
                        lineHeight: "1.7",
                        fontSize: isMobile ? "0.95rem" : "1rem",
                      }}
                    >
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p
                style={{
                  color: "#999999",
                  fontStyle: "italic",
                  marginBottom: isMobile ? "2rem" : "3rem",
                  fontSize: isMobile ? "0.95rem" : "1rem",
                }}
              >
                No comments yet. Be the first to share your thoughts!
              </p>
            )}

            {/* COMMENT FORM */}
            <form onSubmit={handleCommentSubmit}>
              <h3
                style={{
                  fontSize: isMobile ? "1.25rem" : "1.5rem",
                  color: "#ffffff",
                  marginBottom: "1.5rem",
                  fontWeight: "500",
                }}
              >
                Leave a Comment
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <input
                  placeholder="Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
                    background: "rgba(30, 30, 30, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#8b5cf6";
                    e.target.style.background = "rgba(30, 30, 30, 0.8)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.background = "rgba(30, 30, 30, 0.6)";
                  }}
                />
                <input
                  placeholder="Email*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
                    background: "rgba(30, 30, 30, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#8b5cf6";
                    e.target.style.background = "rgba(30, 30, 30, 0.8)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.background = "rgba(30, 30, 30, 0.6)";
                  }}
                />
                <input
                  placeholder="Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  style={{
                    padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
                    background: "rgba(30, 30, 30, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: isMobile ? "0.95rem" : "1rem",
                    outline: "none",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#8b5cf6";
                    e.target.style.background = "rgba(30, 30, 30, 0.8)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.background = "rgba(30, 30, 30, 0.6)";
                  }}
                />
              </div>

              <textarea
                rows="5"
                placeholder="Your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                style={{
                  width: "100%",
                  padding: isMobile ? "0.875rem 1rem" : "1rem 1.25rem",
                  background: "rgba(30, 30, 30, 0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  color: "#ffffff",
                  fontSize: isMobile ? "0.95rem" : "1rem",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  marginBottom: "1.5rem",
                  transition: "all 0.3s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#8b5cf6";
                  e.target.style.background = "rgba(30, 30, 30, 0.8)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.background = "rgba(30, 30, 30, 0.6)";
                }}
              />

              <button
                type="submit"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
                  color: "#ffffff",
                  padding: isMobile ? "0.75rem 2rem" : "0.875rem 2.5rem",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: "600",
                  fontSize: isMobile ? "0.95rem" : "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow =
                      "0 6px 20px rgba(139, 92, 246, 0.6)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 15px rgba(139, 92, 246, 0.4)";
                  }
                }}
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPost;
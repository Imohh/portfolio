import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaEnvelope,
} from "react-icons/fa";
import { useBlogPost } from "../../hooks/useBlogPost";

const BlogPost = () => {
  const { slug } = useParams();
  const { post, comments, loading, error, addComment } = useBlogPost(slug);

  const [showShareOptions, setShowShareOptions] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [newComment, setNewComment] = useState("");

  const postUrl = encodeURIComponent(window.location.href);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !newComment) {
      alert("Name, email and comment are required");
      return;
    }

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
        <title>{post.name} | Imoh Precious</title>
        <meta name="description" content={post.excerpt || post.name} />
      </Helmet>

      <section style={{
        background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        minHeight: "100vh",
        padding: "8rem 1.25rem",
        position: "relative",
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto"
        }}>
          {/* SHARE BUTTON */}
          <div style={{
            position: "absolute",
            top: "8rem",
            right: "2rem",
            zIndex: 10
          }}>
            <button
              onClick={() => setShowShareOptions(!showShareOptions)}
              style={{
                padding: "0.875rem",
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
                fontSize: "1.125rem"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.1)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(139, 92, 246, 0.4)";
              }}
            >
              <FaShareAlt />
            </button>

            {showShareOptions && (
              <div style={{
                position: "absolute",
                right: 0,
                marginTop: "0.75rem",
                width: "220px",
                background: "rgba(30, 30, 30, 0.98)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                padding: "0.75rem",
                boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
                border: "1px solid rgba(139, 92, 246, 0.3)"
              }}>
                {[
                  { icon: FaFacebook, label: "Facebook", color: "#1877f2", url: `https://www.facebook.com/sharer/sharer.php?u=${postUrl}` },
                  { icon: FaTwitter, label: "Twitter", color: "#1da1f2", url: `https://twitter.com/intent/tweet?url=${postUrl}&text=${post.name}` },
                  { icon: FaWhatsapp, label: "WhatsApp", color: "#25d366", url: `https://api.whatsapp.com/send?text=${post.name} ${postUrl}` },
                  { icon: FaEnvelope, label: "Email", color: "#ea4335", url: `mailto:?subject=${post.name}&body=${postUrl}` }
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
                      fontSize: "0.95rem",
                      fontWeight: "500"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(139, 92, 246, 0.15)";
                      e.currentTarget.style.transform = "translateX(5px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.transform = "translateX(0)";
                    }}
                  >
                    <social.icon style={{ color: social.color, fontSize: "1.25rem" }} />
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* TITLE AND DATE */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: "2rem",
            gap: "2rem",
            flexWrap: "wrap"
          }}>
            <h1 style={{
              color: "#a78bfa",
              fontSize: "3rem",
              margin: 0,
              textTransform: "capitalize",
              fontWeight: "700",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
              textShadow: "0 2px 10px rgba(139, 92, 246, 0.3)",
              flex: "1 1 auto"
            }}>
              {post.name}
            </h1>

            <div style={{
              fontSize: "0.95rem",
              color: "#999999",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: "0.5rem",
              fontWeight: "300",
              paddingTop: "0.5rem"
            }}>
              <span>{post.date}</span>
              <span style={{ textTransform: "capitalize", color: "#8b5cf6" }}>
                {post.author}
              </span>
            </div>
          </div>

          {/* COVER IMAGE */}
          {post.coverImage && (
            <div style={{
              width: "100%",
              height: "500px",
              borderRadius: "16px",
              overflow: "hidden",
              marginBottom: "3rem",
              boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
              position: "relative"
            }}>
              <img
                src={post.coverImage}
                alt={post.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.3s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
              <div style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "150px",
                background: "linear-gradient(to top, rgba(26, 26, 26, 0.9) 0%, transparent 100%)"
              }} />
            </div>
          )}

          {/* CONTENT BLOCKS */}
          <div style={{
            color: "#e0e0e0",
            lineHeight: "1.9",
            fontSize: "1.125rem",
            fontWeight: "300"
          }}>
            {post.content?.map((block, index) => {
              if (block.text || block.content) {
                return (
                  <p key={index} style={{
                    marginBottom: "1.75rem",
                    textAlign: "justify"
                  }}>
                    {block.text || block.content}
                  </p>
                );
              }

              if (block.src) {
                return (
                  <div key={index} style={{ marginBottom: "2.5rem" }}>
                    <div style={{
                      borderRadius: "12px",
                      overflow: "hidden",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)"
                    }}>
                      <img
                        src={block.src}
                        alt=""
                        style={{
                          width: "100%",
                          display: "block",
                          transition: "transform 0.3s ease"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.02)"}
                        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                    {block.caption && (
                      <p style={{
                        textAlign: "center",
                        fontSize: "0.9rem",
                        fontStyle: "italic",
                        marginTop: "0.75rem",
                        color: "#999999"
                      }}>
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
          <div style={{
            marginTop: "5rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(139, 92, 246, 0.2)"
          }}>
            <h2 style={{
              fontSize: "2rem",
              color: "#a78bfa",
              marginBottom: "2.5rem",
              fontWeight: "600",
              letterSpacing: "0.05em"
            }}>
              Comments ({comments.length})
            </h2>

            {comments.length ? (
              <div style={{ marginBottom: "3rem" }}>
                {comments.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: "1.5rem",
                      padding: "1.5rem",
                      background: "rgba(30, 30, 30, 0.6)",
                      backdropFilter: "blur(10px)",
                      borderRadius: "12px",
                      border: "1px solid rgba(255, 255, 255, 0.05)",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(30, 30, 30, 0.8)";
                      e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(30, 30, 30, 0.6)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.05)";
                    }}
                  >
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "0.75rem",
                      flexWrap: "wrap",
                      gap: "0.5rem"
                    }}>
                      <p style={{
                        fontWeight: "600",
                        textTransform: "capitalize",
                        color: "#a78bfa",
                        margin: 0,
                        fontSize: "1.05rem"
                      }}>
                        {c.name}
                      </p>
                      {c.date && (
                        <span style={{
                          fontSize: "0.85rem",
                          color: "#999999",
                          fontWeight: "300"
                        }}>
                          {c.date}
                        </span>
                      )}
                    </div>
                    <p style={{
                      color: "#cccccc",
                      lineHeight: "1.7",
                      fontSize: "1rem",
                      margin: 0
                    }}>
                      {c.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{
                color: "#999999",
                fontStyle: "italic",
                marginBottom: "3rem",
                fontSize: "1rem"
              }}>
                No comments yet. Be the first to share your thoughts!
              </p>
            )}

            {/* COMMENT FORM */}
            <form onSubmit={handleCommentSubmit}>
              <h3 style={{
                fontSize: "1.5rem",
                color: "#ffffff",
                marginBottom: "1.5rem",
                fontWeight: "500"
              }}>
                Leave a Comment
              </h3>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1rem",
                marginBottom: "1rem"
              }}>
                <input
                  placeholder="Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    padding: "1rem 1.25rem",
                    background: "rgba(30, 30, 30, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease"
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
                    padding: "1rem 1.25rem",
                    background: "rgba(30, 30, 30, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease"
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
                    padding: "1rem 1.25rem",
                    background: "rgba(30, 30, 30, 0.6)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "10px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    outline: "none",
                    transition: "all 0.3s ease"
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
                  padding: "1rem 1.25rem",
                  background: "rgba(30, 30, 30, 0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                  color: "#ffffff",
                  fontSize: "1rem",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                  marginBottom: "1.5rem",
                  transition: "all 0.3s ease"
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
                  padding: "0.875rem 2.5rem",
                  borderRadius: "10px",
                  border: "none",
                  fontWeight: "600",
                  fontSize: "1rem",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
                  transition: "all 0.3s ease",
                  letterSpacing: "0.05em"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(139, 92, 246, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 15px rgba(139, 92, 246, 0.4)";
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
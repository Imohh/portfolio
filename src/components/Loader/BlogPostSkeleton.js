import React, { useState, useEffect } from "react";

const BlogPostSkeleton = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  return (
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
        {/* SHARE BUTTON SKELETON */}
        <div
          style={{
            position: isMobile ? "fixed" : "absolute",
            top: isMobile ? "auto" : "8rem",
            bottom: isMobile ? "2rem" : "auto",
            right: isMobile ? "1rem" : "2rem",
            zIndex: 10,
          }}
        >
          <div
            style={{
              width: isMobile ? "48px" : "54px",
              height: isMobile ? "48px" : "54px",
              background: "linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.5) 50%, rgba(139, 92, 246, 0.3) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              borderRadius: "50%",
              boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
            }}
          />
        </div>

        {/* COVER IMAGE SKELETON */}
        <div
          style={{
            width: "100%",
            height: isMobile ? "250px" : "500px",
            borderRadius: "16px",
            overflow: "hidden",
            marginBottom: isMobile ? "2rem" : "3rem",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.5)",
            position: "relative",
            background: "linear-gradient(90deg, rgba(50, 50, 50, 0.3) 0%, rgba(70, 70, 70, 0.4) 50%, rgba(50, 50, 50, 0.3) 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: isMobile ? "100px" : "150px",
              background:
                "linear-gradient(to top, rgba(26, 26, 26, 0.9) 0%, transparent 100%)",
            }}
          />
        </div>

        {/* TITLE SKELETON */}
        <div
          style={{
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              height: isMobile ? "2rem" : "3rem",
              width: "85%",
              background: "linear-gradient(90deg, rgba(167, 139, 250, 0.2) 0%, rgba(167, 139, 250, 0.35) 50%, rgba(167, 139, 250, 0.2) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              borderRadius: "8px",
              marginBottom: "0.75rem",
            }}
          />
          <div
            style={{
              height: isMobile ? "2rem" : "3rem",
              width: "60%",
              background: "linear-gradient(90deg, rgba(167, 139, 250, 0.2) 0%, rgba(167, 139, 250, 0.35) 50%, rgba(167, 139, 250, 0.2) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              borderRadius: "8px",
            }}
          />
        </div>

        {/* META SKELETON */}
        <div
          style={{
            marginBottom: isMobile ? "2rem" : "3rem",
            borderLeft: "3px solid rgba(139, 92, 246, 0.3)",
            paddingLeft: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              height: isMobile ? "0.85rem" : "0.95rem",
              width: "100px",
              background: "linear-gradient(90deg, rgba(153, 153, 153, 0.2) 0%, rgba(153, 153, 153, 0.3) 50%, rgba(153, 153, 153, 0.2) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              borderRadius: "4px",
            }}
          />
          <span style={{ color: "#8b5cf6" }}>•</span>
          <div
            style={{
              height: isMobile ? "0.85rem" : "0.95rem",
              width: "120px",
              background: "linear-gradient(90deg, rgba(153, 153, 153, 0.2) 0%, rgba(153, 153, 153, 0.3) 50%, rgba(153, 153, 153, 0.2) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* CONTENT BLOCKS SKELETON */}
        <div>
          {/* Paragraph 1 */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`p1-${i}`}
              style={{
                height: isMobile ? "1rem" : "1.125rem",
                width: i === 3 ? "70%" : "100%",
                background: "linear-gradient(90deg, rgba(224, 224, 224, 0.15) 0%, rgba(224, 224, 224, 0.25) 50%, rgba(224, 224, 224, 0.15) 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: "4px",
                marginBottom: "0.75rem",
              }}
            />
          ))}

          <div style={{ marginBottom: isMobile ? "1.25rem" : "1.75rem" }} />

          {/* Paragraph 2 */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`p2-${i}`}
              style={{
                height: isMobile ? "1rem" : "1.125rem",
                width: i === 4 ? "85%" : "100%",
                background: "linear-gradient(90deg, rgba(224, 224, 224, 0.15) 0%, rgba(224, 224, 224, 0.25) 50%, rgba(224, 224, 224, 0.15) 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: "4px",
                marginBottom: "0.75rem",
              }}
            />
          ))}

          <div style={{ marginBottom: isMobile ? "1.5rem" : "2.5rem" }} />

          {/* Image Block Skeleton */}
          <div
            style={{
              width: "100%",
              height: isMobile ? "200px" : "400px",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
              background: "linear-gradient(90deg, rgba(50, 50, 50, 0.3) 0%, rgba(70, 70, 70, 0.4) 50%, rgba(50, 50, 50, 0.3) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              marginBottom: "0.75rem",
            }}
          />
          {/* Caption Skeleton */}
          <div
            style={{
              height: isMobile ? "0.8rem" : "0.9rem",
              width: "200px",
              margin: "0 auto",
              background: "linear-gradient(90deg, rgba(153, 153, 153, 0.2) 0%, rgba(153, 153, 153, 0.3) 50%, rgba(153, 153, 153, 0.2) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              borderRadius: "4px",
            }}
          />

          <div style={{ marginBottom: isMobile ? "1.5rem" : "2.5rem" }} />

          {/* Paragraph 3 */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`p3-${i}`}
              style={{
                height: isMobile ? "1rem" : "1.125rem",
                width: i === 5 ? "60%" : "100%",
                background: "linear-gradient(90deg, rgba(224, 224, 224, 0.15) 0%, rgba(224, 224, 224, 0.25) 50%, rgba(224, 224, 224, 0.15) 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite",
                borderRadius: "4px",
                marginBottom: "0.75rem",
              }}
            />
          ))}
        </div>

        {/* COMMENTS SECTION SKELETON */}
        <div
          style={{
            marginTop: isMobile ? "3rem" : "5rem",
            paddingTop: isMobile ? "2rem" : "3rem",
            borderTop: "1px solid rgba(139, 92, 246, 0.2)",
          }}
        >
          {/* Comments Title */}
          <div
            style={{
              height: isMobile ? "1.5rem" : "2rem",
              width: "180px",
              background: "linear-gradient(90deg, rgba(167, 139, 250, 0.2) 0%, rgba(167, 139, 250, 0.35) 50%, rgba(167, 139, 250, 0.2) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              borderRadius: "6px",
              marginBottom: isMobile ? "1.5rem" : "2.5rem",
            }}
          />

          {/* Comment Items */}
          {[...Array(2)].map((_, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "1.5rem",
                padding: isMobile ? "1rem" : "1.5rem",
                background: "rgba(30, 30, 30, 0.6)",
                backdropFilter: "blur(10px)",
                borderRadius: "12px",
                border: "1px solid rgba(255, 255, 255, 0.05)",
              }}
            >
              <div
                style={{
                  height: isMobile ? "1rem" : "1.05rem",
                  width: "150px",
                  background: "linear-gradient(90deg, rgba(167, 139, 250, 0.2) 0%, rgba(167, 139, 250, 0.3) 50%, rgba(167, 139, 250, 0.2) 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  borderRadius: "4px",
                  marginBottom: "0.5rem",
                }}
              />
              <div
                style={{
                  height: isMobile ? "0.95rem" : "1rem",
                  width: "100%",
                  background: "linear-gradient(90deg, rgba(204, 204, 204, 0.15) 0%, rgba(204, 204, 204, 0.25) 50%, rgba(204, 204, 204, 0.15) 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  borderRadius: "4px",
                  marginBottom: "0.5rem",
                }}
              />
              <div
                style={{
                  height: isMobile ? "0.95rem" : "1rem",
                  width: "80%",
                  background: "linear-gradient(90deg, rgba(204, 204, 204, 0.15) 0%, rgba(204, 204, 204, 0.25) 50%, rgba(204, 204, 204, 0.15) 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  borderRadius: "4px",
                }}
              />
            </div>
          ))}

          {/* Comment Form Title */}
          <div
            style={{
              height: isMobile ? "1.25rem" : "1.5rem",
              width: "200px",
              background: "linear-gradient(90deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.25) 50%, rgba(255, 255, 255, 0.15) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              borderRadius: "6px",
              marginTop: isMobile ? "2rem" : "3rem",
              marginBottom: "1.5rem",
            }}
          />

          {/* Form Inputs */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
              marginBottom: "1rem",
            }}
          >
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                style={{
                  height: isMobile ? "48px" : "56px",
                  background: "linear-gradient(90deg, rgba(30, 30, 30, 0.6) 0%, rgba(40, 40, 40, 0.7) 50%, rgba(30, 30, 30, 0.6) 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "10px",
                }}
              />
            ))}
          </div>

          {/* Textarea */}
          <div
            style={{
              height: "120px",
              background: "linear-gradient(90deg, rgba(30, 30, 30, 0.6) 0%, rgba(40, 40, 40, 0.7) 50%, rgba(30, 30, 30, 0.6) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "10px",
              marginBottom: "1.5rem",
            }}
          />

          {/* Submit Button */}
          <div
            style={{
              width: isMobile ? "180px" : "200px",
              height: isMobile ? "44px" : "50px",
              background: "linear-gradient(90deg, rgba(139, 92, 246, 0.3) 0%, rgba(139, 92, 246, 0.5) 50%, rgba(139, 92, 246, 0.3) 100%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 2s infinite",
              borderRadius: "10px",
              boxShadow: "0 4px 15px rgba(139, 92, 246, 0.4)",
            }}
          />
        </div>
      </div>

      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
        `}
      </style>
    </section>
  );
};

export default BlogPostSkeleton;
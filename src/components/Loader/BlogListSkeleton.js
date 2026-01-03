import React, { useState, useEffect } from "react";

const BlogListSkeleton = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const skeletonCards = Array.from({ length: 6 }, (_, i) => i);

  return (
    <section style={{
      paddingBottom: isMobile ? "4rem" : "6rem",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative background elements */}
      <div style={{
        position: "absolute",
        top: isMobile ? "-50px" : "-100px",
        right: isMobile ? "-50px" : "-100px",
        width: isMobile ? "200px" : "400px",
        height: isMobile ? "200px" : "400px",
        background: "radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: isMobile ? "-75px" : "-150px",
        left: isMobile ? "-75px" : "-150px",
        width: isMobile ? "250px" : "500px",
        height: isMobile ? "250px" : "500px",
        background: "radial-gradient(circle, rgba(168, 85, 247, 0.12) 0%, transparent 70%)",
        borderRadius: "50%",
        pointerEvents: "none"
      }} />

      <div style={{
        maxWidth: isMobile ? "100%" : "1400px",
        margin: "0 auto",
        padding: isMobile ? "1rem" : "1rem 1.875rem",
        position: "relative",
        zIndex: 1
      }}>
        {/* Header Skeleton */}
        <div style={{
          padding: isMobile ? "2rem 0" : "3rem 0",
          marginTop: isMobile ? "4rem" : "3rem",
          marginBottom: isMobile ? "2rem" : "3rem",
          borderBottom: "1px solid rgba(139, 92, 246, 0.2)"
        }}>
          <div style={{
            height: isMobile ? "1.8rem" : "2.5rem",
            width: "300px",
            maxWidth: "80%",
            margin: "0 auto",
            background: "linear-gradient(90deg, rgba(167, 139, 250, 0.1) 0%, rgba(167, 139, 250, 0.2) 50%, rgba(167, 139, 250, 0.1) 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s infinite",
            borderRadius: "8px",
            marginBottom: "0.5rem"
          }} />
          <div style={{
            width: "80px",
            height: "3px",
            background: "linear-gradient(90deg, transparent 0%, rgba(139, 92, 246, 0.3) 50%, transparent 100%)",
            margin: "1rem auto 0"
          }} />
        </div>

        {/* Cards Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: isMobile ? "1.5rem" : "2rem",
          marginBottom: isMobile ? "2.5rem" : "3.5rem"
        }}>
          {skeletonCards.map((index) => (
            <div 
              key={index}
              style={{
                width: "100%",
                background: "rgba(30, 30, 30, 0.4)",
                backdropFilter: "blur(10px)",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid rgba(255, 255, 255, 0.05)"
              }}
            >
              {/* Image Skeleton */}
              <div style={{
                position: "relative",
                height: isMobile ? "220px" : "280px",
                background: "linear-gradient(90deg, rgba(50, 50, 50, 0.3) 0%, rgba(70, 70, 70, 0.4) 50%, rgba(50, 50, 50, 0.3) 100%)",
                backgroundSize: "200% 100%",
                animation: "shimmer 2s infinite"
              }}>
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
              </div>

              {/* Content Skeleton */}
              <div style={{
                padding: isMobile ? "1.25rem" : "1.75rem",
                textAlign: "center"
              }}>
                {/* Title Skeleton */}
                <div style={{
                  height: isMobile ? "1.1rem" : "1.25rem",
                  width: "85%",
                  margin: "0 auto 0.5rem",
                  background: "linear-gradient(90deg, rgba(167, 139, 250, 0.15) 0%, rgba(167, 139, 250, 0.25) 50%, rgba(167, 139, 250, 0.15) 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  borderRadius: "4px"
                }} />
                <div style={{
                  height: isMobile ? "1.1rem" : "1.25rem",
                  width: "65%",
                  margin: "0 auto 1rem",
                  background: "linear-gradient(90deg, rgba(167, 139, 250, 0.15) 0%, rgba(167, 139, 250, 0.25) 50%, rgba(167, 139, 250, 0.15) 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                  borderRadius: "4px"
                }} />
                
                {/* Meta Info Skeleton */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  marginTop: "1rem"
                }}>
                  <div style={{
                    height: isMobile ? "0.8rem" : "0.875rem",
                    width: "80px",
                    background: "linear-gradient(90deg, rgba(153, 153, 153, 0.2) 0%, rgba(153, 153, 153, 0.3) 50%, rgba(153, 153, 153, 0.2) 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s infinite",
                    borderRadius: "4px"
                  }} />
                  <span style={{
                    color: "#8b5cf6",
                    fontSize: "0.7rem"
                  }}>
                    •
                  </span>
                  <div style={{
                    height: isMobile ? "0.8rem" : "0.875rem",
                    width: "100px",
                    background: "linear-gradient(90deg, rgba(153, 153, 153, 0.2) 0%, rgba(153, 153, 153, 0.3) 50%, rgba(153, 153, 153, 0.2) 100%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 2s infinite",
                    borderRadius: "4px"
                  }} />
                </div>
              </div>
            </div>
          ))}
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

export default BlogListSkeleton;
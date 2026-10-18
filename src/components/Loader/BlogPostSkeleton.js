/** Placeholder while an article loads — mirrors the real layout. */
const BlogPostSkeleton = () => (
  <article className="pf-post" aria-busy="true" aria-label="Loading article">
    <div className="pf-post__inner">
      <div className="pf-skel" style={{ height: 12, width: 120, marginBottom: "clamp(36px, 5vw, 64px)" }} />
      <div className="pf-skel" style={{ height: 12, width: 260, marginBottom: 26 }} />
      <div className="pf-skel" style={{ height: "clamp(40px, 6.4vw, 108px)", width: "85%", marginBottom: 14 }} />
      <div className="pf-skel" style={{ height: "clamp(40px, 6.4vw, 108px)", width: "55%" }} />
      <div className="pf-skel" style={{ aspectRatio: "16 / 9", margin: "clamp(48px, 7vw, 100px) 0", borderRadius: 14 }} />
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {[100, 96, 88, 100, 72].map((w, i) => (
          <div key={i} className="pf-skel" style={{ height: 16, width: `${w}%`, marginBottom: 16 }} />
        ))}
      </div>
    </div>
  </article>
);

export default BlogPostSkeleton;

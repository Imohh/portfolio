/** Placeholder while the Thoughts list loads — mirrors the real rows. */
const BlogListSkeleton = () => (
  <section className="pf-thoughts pf-section" aria-busy="true" aria-label="Loading thoughts">
    <div className="pf-wrap">
      <div className="pf-label pf-sec-label">
        <span>06</span><i /><span>Thoughts</span>
      </div>
      <div className="pf-thoughts__head">
        <div style={{ width: "min(720px, 90%)" }}>
          <div className="pf-skel" style={{ height: "clamp(40px, 6.6vw, 112px)", marginBottom: 14 }} />
          <div className="pf-skel" style={{ height: "clamp(40px, 6.6vw, 112px)", width: "70%" }} />
        </div>
        <div className="pf-skel" style={{ width: 300, maxWidth: "80%", height: 60 }} />
      </div>
    </div>
    <div>
      {[0, 1, 2, 3].map((i) => (
        <div className="pf-skel-row" key={i}>
          <div className="pf-skel" style={{ height: 12, width: 24 }} />
          <div className="pf-skel" style={{ height: "clamp(30px, 5vw, 70px)", width: `${70 - i * 9}%` }} />
          <div className="pf-skel" style={{ height: 34 }} />
          <div className="pf-skel" style={{ height: 50, width: 50, borderRadius: "50%", justifySelf: "end" }} />
        </div>
      ))}
    </div>
  </section>
);

export default BlogListSkeleton;

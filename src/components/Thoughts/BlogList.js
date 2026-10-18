import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BsArrowUpRight } from "react-icons/bs";
import { gsap, ScrollTrigger, isFinePointer } from "../../lib/smooth";
import Split from "../fx/Split";
import Roll from "../fx/Roll";
import Magnetic from "../fx/Magnetic";
import WorkGL from "../work/WorkGL";
import { Label } from "../../sections/Bits";
import BlogListSkeleton from "../Loader/BlogListSkeleton";

/** Post titles are often stored in lowercase — show them in sentence case. */
export const sentence = (s) => { const t = String(s ?? "").trim(); return t.charAt(0).toUpperCase() + t.slice(1); };

/** Roll each word separately so long titles wrap between words (never mid-word). */
const RollWords = ({ text }) => (
  <span className="pf-roll-words" aria-label={text}>
    {text.split(" ").map((w, i) => (
      <span key={i} aria-hidden="true">{i > 0 && " "}<Roll>{w}</Roll></span>
    ))}
  </span>
);

const yearOf = (date) => String(date ?? "").match(/\b(19|20)\d{2}\b/)?.[0] ?? "";

/** Thoughts index — the same numbered rows + hover preview as "Selected work". */
const BlogList = () => {
  const root = useRef(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const fine = useMemo(() => isFinePointer(), []);
  const images = useMemo(() => posts.map((p) => p.coverImage).filter(Boolean), [posts]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/post`);
        if (!res.ok) throw new Error("Failed to fetch blog posts");
        const data = await res.json();
        if (!cancelled) setPosts(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setError("Couldn't load the thoughts right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // the floating preview follows the cursor; any scroll means "moving on" (same as Work)
  useEffect(() => {
    const clear = () => setActive(null);
    window.addEventListener("scroll", clear, { passive: true });
    return () => window.removeEventListener("scroll", clear);
  }, []);

  // rows draw their rule and slide their contents up as they enter
  useLayoutEffect(() => {
    if (loading || !root.current) return undefined;
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".pf-row").forEach((row) => {
        const line = row.querySelector(".pf-row__line");
        const items = row.querySelectorAll(".pf-row__in");
        gsap.set(line, { scaleX: 0 });
        gsap.set(items, { yPercent: 110 });
        gsap.timeline({ scrollTrigger: { trigger: row, start: "top 92%", once: true } })
          .to(line, { scaleX: 1, duration: 1.4, ease: "expo.out" }, 0)
          .to(items, { yPercent: 0, duration: 1.1, ease: "expo.out", stagger: 0.05 }, 0.1);
      });
    }, root);
    // content height changed after loading — let ScrollTrigger (and the footer reveal) re-measure
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [loading, posts]);

  if (loading) return <BlogListSkeleton />;

  // only rows with a cover take part in the WebGL preview; map row index → image index
  let imageIndex = -1;
  const previewIndex = posts.map((p) => (p.coverImage ? ++imageIndex : null));

  return (
    <>
      <Helmet>
        <title>Thoughts | Imoh Precious</title>
        <meta name="description" content="Notes by Imoh Precious on frontend development, building products and the craft of shipping software." />
      </Helmet>

      <section ref={root} className="pf-thoughts pf-section">
        <div className="pf-wrap">
          <Label n="06">Thoughts</Label>
          <div className="pf-thoughts__head">
            <Split as="h1" text="Notes on *code, craft* and shipping things." className="pf-h2" />
            <p className="pf-thoughts__intro">
              <span className="pf-label">({String(posts.length).padStart(2, "0")}) entries {fine && posts.length > 0 ? "— hover to preview" : ""}</span>
              Things I&rsquo;ve learned building for the web, written down so I don&rsquo;t forget them.
            </p>
          </div>

          {error && (
            <div className="pf-thoughts__state">
              <p>{error} <span className="pf-em">Give it a moment</span> and try again.</p>
              <Magnetic>
                <button className="pf-btn" onClick={() => window.location.reload()}>
                  Retry <span className="pf-btn__ico"><BsArrowUpRight /></span>
                </button>
              </Magnetic>
            </div>
          )}
          {!error && posts.length === 0 && (
            <div className="pf-thoughts__state">
              <p>Nothing here yet — <span className="pf-em">the first entry</span> is on its way.</p>
            </div>
          )}
        </div>

        {posts.length > 0 && (
          <ul className="pf-rows" onMouseLeave={() => setActive(null)}>
            {posts.map((post, i) => (
              <li key={post.id ?? post.slug}>
                <Link
                  className="pf-row pf-hov"
                  to={`/thoughts/${post.slug}`}
                  onMouseEnter={() => fine && setActive(previewIndex[i])}
                  onFocus={() => fine && setActive(previewIndex[i])}
                  onBlur={() => setActive(null)}
                >
                  <span className="pf-row__line" />
                  <span className="pf-mask pf-row__n"><span className="pf-row__in pf-label">{String(i + 1).padStart(2, "0")}</span></span>
                  <span className="pf-mask pf-row__title"><span className="pf-row__in"><RollWords text={sentence(post.name)} /></span></span>
                  <span className="pf-mask pf-row__tag">
                    <span className="pf-row__in">
                      <b>{post.date}</b>
                      <small>{post.author ? `By ${post.author}` : "Article"}</small>
                    </span>
                  </span>
                  <span className="pf-mask pf-row__year"><span className="pf-row__in pf-label">{yearOf(post.date)}</span></span>
                  <span className="pf-row__arrow"><BsArrowUpRight /></span>
                  {post.coverImage && <img className="pf-row__thumb" src={post.coverImage} alt="" loading="lazy" />}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {fine && images.length > 0 && <WorkGL images={images} active={active} />}
      </section>
    </>
  );
};

export default BlogList;

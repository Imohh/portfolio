import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { BsArrowLeft, BsArrowUpRight } from "react-icons/bs";
import { FaFacebookF, FaWhatsapp, FaEnvelope, FaLinkedinIn, FaLink, FaTwitter } from "react-icons/fa";
import { useBlogPost } from "../../hooks/useBlogPost";
import { toast, useToast } from "../ui/toast";
import { gsap, ScrollTrigger } from "../../lib/smooth";
import Split from "../fx/Split";
import Roll from "../fx/Roll";
import Magnetic from "../fx/Magnetic";
import { Label } from "../../sections/Bits";
import BlogPostSkeleton from "../Loader/BlogPostSkeleton";
import { sentence } from "./BlogList";

function Toaster() {
  const { toasts } = useToast();
  return (
    <div className="pf-toasts" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className="pf-toast" style={{ opacity: t.open ? 1 : 0, transform: t.open ? "none" : "translateY(12px)" }}>
          <i />
          <span>{t.content}</span>
          <button onClick={() => t.dismiss()} aria-label="Dismiss">×</button>
        </div>
      ))}
    </div>
  );
}

const textOf = (block) => block?.text || block?.content || "";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BlogPost = () => {
  const { slug } = useParams();
  const { post, comments, loading, error, addComment } = useBlogPost(slug);
  const root = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", website: "", text: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // keep the article from being casually copied (images, right-click, save/copy shortcuts)
  useEffect(() => {
    if (loading) return undefined;
    const preventContextMenu = (e) => e.preventDefault();
    const preventDragStart = (e) => { if (e.target.tagName === "IMG") e.preventDefault(); };
    const preventKeyboardShortcuts = (e) => {
      // still allow normal typing/copy inside the comment form
      if (e.target.closest?.(".pf-form")) return;
      if ((e.ctrlKey || e.metaKey) && ["s", "c", "a", "p", "u"].includes(e.key.toLowerCase())) e.preventDefault();
      if (e.keyCode === 123) e.preventDefault();
    };
    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("dragstart", preventDragStart);
    document.addEventListener("keydown", preventKeyboardShortcuts);
    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("dragstart", preventDragStart);
      document.removeEventListener("keydown", preventKeyboardShortcuts);
    };
  }, [loading]);

  // cover eases out of its zoom as it scrolls; body + comments rise in
  useLayoutEffect(() => {
    if (loading || !post || !root.current) return undefined;
    const ctx = gsap.context(() => {
      const cover = root.current.querySelector(".pf-post__cover img");
      if (cover) {
        gsap.to(cover, { scale: 1, ease: "none", scrollTrigger: { trigger: cover.parentNode, start: "top bottom", end: "bottom top", scrub: true } });
      }
      gsap.utils.toArray(".pf-rise").forEach((el) => {
        gsap.from(el, { y: 40, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 92%", once: true } });
      });
    }, root);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [loading, post]);

  // comments arriving changes the page height
  useEffect(() => { ScrollTrigger.refresh(); }, [comments.length]);

  const readMinutes = useMemo(() => {
    const words = (post?.content ?? []).map(textOf).join(" ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 220));
  }, [post]);

  if (loading) return <BlogPostSkeleton />;

  if (error || !post) {
    return (
      <section className="pf-thoughts pf-section">
        <div className="pf-wrap">
          <Label n="404">Thoughts</Label>
          <div className="pf-thoughts__state">
            <p>{error && !/not found/i.test(error) ? "This thought couldn’t load right now" : "That thought doesn’t exist"} — <span className="pf-em">try the archive</span> instead.</p>
            <Magnetic>
              <Link to="/thoughts" className="pf-btn">
                All thoughts <span className="pf-btn__ico"><BsArrowUpRight /></span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </section>
    );
  }

  const url = window.location.href;
  const enc = encodeURIComponent;
  const shares = [
    { label: "Share on WhatsApp", icon: <FaWhatsapp />, href: `https://api.whatsapp.com/send?text=${enc(`${post.name} ${url}`)}` },
    { label: "Share on X", icon: <FaTwitter />, href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(post.name)}` },
    { label: "Share on LinkedIn", icon: <FaLinkedinIn />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "Share on Facebook", icon: <FaFacebookF />, href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "Share by email", icon: <FaEnvelope />, href: `mailto:?subject=${enc(post.name)}&body=${enc(url)}` },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast({ content: "Couldn’t copy — copy the address from your browser instead." });
    }
  };

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(({ [k]: _drop, ...rest }) => rest);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Your name, please";
    if (!form.email.trim()) next.email = "Needed (never shown)";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "That email looks off";
    if (!form.text.trim()) next.text = "Write something first";
    setErrors(next);
    if (Object.keys(next).length) return;

    setIsSubmitting(true);
    try {
      await addComment({ name: form.name.trim(), email: form.email.trim(), website: form.website.trim(), text: form.text.trim() });
      setForm({ name: "", email: "", website: "", text: "" });
      toast({ content: "Thanks — your comment is up." });
    } catch (err) {
      toast({ content: err.message || "Couldn’t post your comment. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const ShareButtons = (
    <div className="pf-share">
      {shares.map((s) => (
        <a key={s.label} className="pf-round" href={s.href} target={s.href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={s.label} title={s.label}>
          {s.icon}
        </a>
      ))}
      <button className="pf-round" onClick={copyLink} aria-label="Copy link" title="Copy link">
        <FaLink />
      </button>
    </div>
  );

  return (
    <>
      <Helmet>
        <title>{`${sentence(post.name)} | Imoh Precious`}</title>
        <meta name="description" content={post.excerpt || post.name} />
      </Helmet>

      <article ref={root} className="pf-post">
        <div className="pf-post__inner">
          <Link to="/thoughts" className="pf-label pf-post__back pf-hov">
            <BsArrowLeft /> <Roll>All thoughts</Roll>
          </Link>

          <div className="pf-label pf-post__meta">
            <span>{post.date}</span>
            {post.author && <span>By {post.author}</span>}
            <span>{readMinutes} min read</span>
          </div>
          <Split as="h1" text={sentence(post.name).replace(/\*/g, "")} className="pf-post__title" stagger={0.03} />

          {post.coverImage && (
            <figure className="pf-post__cover">
              <img src={post.coverImage} alt={post.name} draggable="false" onContextMenu={(e) => e.preventDefault()} />
            </figure>
          )}

          <div className="pf-post__layout">
            <aside className="pf-post__aside">
              <span className="pf-label">{copied ? <span className="pf-share__copied">Link copied ✓</span> : "Share"}</span>
              {ShareButtons}
            </aside>

            <div className="pf-post__body">
              {post.content?.map((block, index) => {
                if (textOf(block)) return <p key={index}>{textOf(block)}</p>;
                if (block.src) {
                  return (
                    <figure key={index} className="pf-post__fig pf-rise">
                      <img src={block.src} alt={block.caption || ""} draggable="false" onContextMenu={(e) => e.preventDefault()} />
                      {block.caption && <figcaption className="pf-label">{block.caption}</figcaption>}
                    </figure>
                  );
                }
                return null;
              })}

              <section className="pf-comments" aria-label="Comments">
                <h2 className="pf-comments__title pf-rise">
                  Comments<sup>({String(comments.length).padStart(2, "0")})</sup>
                </h2>

                {comments.length ? (
                  <ul>
                    {comments.map((c, i) => (
                      <li key={c.id ?? i} className="pf-comment pf-rise">
                        <span className="pf-comment__av" aria-hidden="true">{(c.name || "?").trim().charAt(0)}</span>
                        <div>
                          <p className="pf-comment__name">
                            {c.website ? <a href={/^https?:\/\//.test(c.website) ? c.website : `https://${c.website}`} target="_blank" rel="noopener noreferrer nofollow">{c.name}</a> : c.name}
                          </p>
                          {(c.date || c.createdAt) && <span className="pf-label">{c.date || new Date(c.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>}
                          <p className="pf-comment__text">{c.text}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="pf-comments__empty">No comments yet — be the first to share a thought.</p>
                )}

                <form className="pf-form pf-rise" onSubmit={handleCommentSubmit} noValidate>
                  <h3 className="pf-form__title">Leave a <span className="pf-em">comment</span></h3>
                  <div className="pf-form__grid">
                    <label className={`pf-field ${errors.name ? "has-error" : ""}`}>
                      <span className="pf-label">Name *</span>
                      <input value={form.name} onChange={set("name")} placeholder="Ada Lovelace" autoComplete="name" />
                      {errors.name && <span className="pf-field__err">{errors.name}</span>}
                    </label>
                    <label className={`pf-field ${errors.email ? "has-error" : ""}`}>
                      <span className="pf-label">Email *</span>
                      <input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
                      {errors.email && <span className="pf-field__err">{errors.email}</span>}
                    </label>
                    <label className="pf-field">
                      <span className="pf-label">Website</span>
                      <input value={form.website} onChange={set("website")} placeholder="Optional" autoComplete="url" />
                    </label>
                  </div>
                  <label className={`pf-field ${errors.text ? "has-error" : ""}`}>
                    <span className="pf-label">Comment *</span>
                    <textarea rows={5} value={form.text} onChange={set("text")} placeholder="What did you think?" />
                    {errors.text && <span className="pf-field__err">{errors.text}</span>}
                  </label>
                  <div className="pf-form__foot">
                    <span className="pf-label">Your email is never shown.</span>
                    <Magnetic>
                      <button type="submit" className="pf-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Posting…" : "Post comment"}
                        <span className="pf-btn__ico">{isSubmitting ? <span className="pf-btn__spin" /> : <BsArrowUpRight />}</span>
                      </button>
                    </Magnetic>
                  </div>
                </form>
              </section>
            </div>
            <div />
          </div>
        </div>
      </article>
      <Toaster />
    </>
  );
};

export default BlogPost;

/** Letter-by-letter vertical roll on hover (CSS-driven, staggered per character). */
export default function Roll({ children, className = "" }) {
  const text = String(children);
  return (
    <span className={`pf-roll ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span className="pf-roll__c" aria-hidden="true" key={i} style={{ "--i": i }}>
          <span data-ch={ch === " " ? " " : ch}>{ch === " " ? " " : ch}</span>
        </span>
      ))}
    </span>
  );
}

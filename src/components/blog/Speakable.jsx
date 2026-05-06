// <Speakable> — wraps the answer-first paragraph after each H2.
// The CSS class .speakable is consumed by the SpeakableSpecification JSON-LD.
//
// Rendered as a <div>, not a <p>, because MDX wraps free-standing text inside
// JSX in its own <p> element. A <p> nesting another <p> is invalid HTML —
// browsers auto-correct by closing the outer <p>, which produces a server/
// client DOM mismatch and triggers React #418 hydration errors. <div> is
// neutral, keeps the .speakable selector intact, and inherits paragraph-style
// CSS via the surrounding `mdx-prose` typography rules.

export default function Speakable({ children }) {
  return <div className="speakable">{children}</div>;
}

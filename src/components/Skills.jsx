import Reveal from "./Reveal.jsx";
import { useInView } from "../hooks/useInView.js";

const SKILLS = [
  { name: "JavaScript (ES6+)", level: 0.92 },
  { name: "React & Next.js", level: 0.88 },
  { name: "CSS / Tailwind", level: 0.94 },
  { name: "Node.js & Express", level: 0.78 },
  { name: "UI/UX Design", level: 0.72 },
];

function SkillsInner() {
  const [ref, visible] = useInView(0.25);
  return (
    <div ref={ref} className={`skills-list ${visible ? "visible" : ""}`}>
      {SKILLS.map((s, i) => (
        <div className="skill-row" key={s.name}>
          <span className="skill-row__idx">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div>
            <div className="skill-row__name">{s.name}</div>
            <div className="skill-row__bar">
              <i style={{ "--level": s.level }} />
            </div>
          </div>
          <span className="skill-row__pct">
            {Math.round(s.level * 100)}%
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  return (
    <section id="keahlian" className="section">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__num">02</span>
            <h2 className="section__title">Keahlian</h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SkillsInner />
        </Reveal>
      </div>
    </section>
  );
}

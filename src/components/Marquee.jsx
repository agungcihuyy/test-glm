const ITEMS = ["Agung Pandu", "Web Developer", "Mari Bekerja Sama", "Fullstack"];

function Row({ ariaHidden = false, reverse = false }) {
  const seq = [...ITEMS, ...ITEMS];
  return (
    <div
      className={`marquee ${reverse ? "marquee--reverse" : ""}`}
      aria-hidden={ariaHidden}
    >
      <div className="marquee__track">
        {seq.map((item, i) => (
          <span key={i} className="marquee__item">
            {i % 2 === 0 ? (
              item
            ) : (
              <span className="fill">{item}</span>
            )}
            <span className="star">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Strip teks bergerak — dua arah berlawanan */
export default function Marquee() {
  return (
    <section>
      <Row />
      <Row reverse ariaHidden />
    </section>
  );
}

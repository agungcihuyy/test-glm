import Reveal from "./Reveal.jsx";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  DribbbleIcon,
} from "./SocialIcons.jsx";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com", Icon: GitHubIcon },
  { label: "LinkedIn", href: "https://linkedin.com", Icon: LinkedInIcon },
  { label: "Instagram", href: "https://instagram.com", Icon: InstagramIcon },
  { label: "Dribbble", href: "https://dribbble.com", Icon: DribbbleIcon },
];

export default function Contact() {
  return (
    <section id="kontak" className="section contact">
      <div className="container">
        <Reveal>
          <div className="section__head">
            <span className="section__num">06</span>
            <h2 className="section__title">Kontak</h2>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="contact__big">
            <div>Ada proyek?</div>
            <div>
              <a href="mailto:halo@agungpandu.id">Halo@agungpandu.id</a>
            </div>
          </div>
        </Reveal>

        <div className="contact__row">
          <span>© 2026 Agung Pandu — Dibuat dengan React</span>

          <div className="contact__socials">
            <span className="contact__socials-label">Temukan saya di</span>
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

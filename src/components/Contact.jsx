import { useState } from "react";
import Reveal from "./Reveal.jsx";
import {
  GitHubIcon,
  LinkedInIcon,
  InstagramIcon,
  TikTokIcon,
} from "./SocialIcons.jsx";

const EMAIL = "agungpandu36@gmail.com";
const EMAIL_USER = "agungpandu36";
const EMAIL_DOMAIN = EMAIL.split("@")[1]; // "gmail.com"

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/agungcihuyy", Icon: GitHubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/i-gusti-lanang-agung-wahyu-pandu-rangga-385029383/", Icon: LinkedInIcon },
  { label: "Instagram", href: "https://instagram.com/gungpanduu_", Icon: InstagramIcon },
  { label: "TikTok", href: "https://www.tiktok.com/@agungcihuyy_", Icon: TikTokIcon },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard bisa diblokir browser — diabaikan */
    }
  };

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
            <div className="contact__mail">
              <a href={`mailto:${EMAIL}`}>
                <span className="contact__big-user">{EMAIL_USER}</span>
                <span className="contact__big-domain">@{EMAIL_DOMAIN}</span>
              </a>
              <button
                type="button"
                className={`contact-copy${copied ? " copied" : ""}`}
                onClick={copyEmail}
                title="Salin email lengkap ke clipboard"
                aria-live="polite"
              >
                {copied ? "Tersalin ✓" : "Salin email"}
              </button>
            </div>
          </div>
        </Reveal>

        <div className="contact__row">
          <span>© 2026 Agung Pandu</span>

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

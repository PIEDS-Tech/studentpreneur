import Image from "next/image";
import {
  backers, bitsStats, campusPoints, chapters, companies, logos, photos, piedsStats, programmes, startedAsStudents,
} from "@/content/site";
import CountUp from "../CountUp";
import Rocket from "../Rocket";

const css = (vars: Record<string, string>) => vars as React.CSSProperties;

export function Letter() {
  return (
    <section className="letter" id="letter" data-chapter>
      <header className="section-head">
        <h2 className="headline">Dear teacher,</h2>
      </header>
      <div className="letter__grid">
        <div className="letter__body">
          <p className="letter__lede">At BITS Pilani, startup ideas are discussed everywhere. We want that conversation to start in your school.</p>
          <p>
            Studentpreneur is an entrepreneurship programme for Grades 8–12, run by PIEDS, the startup incubator of
            BITS Pilani. Young minds bring the boldest ideas. We give them the tools to make those ideas real: two days of
            workshops at your school, an online week of assignments with a live leaderboard, and Demo Day on the BITS
            Pilani campus, with parents in the audience.
          </p>
          <p>
            The first edition ran at Birla Balika Vidyapeeth, Pilani. This issue shows what your students will do,
            what you’ll need to bring us in, and what everyone takes home.
          </p>
          <p className="letter__signoff">The PIEDS Student Team</p>
        </div>
        <nav aria-label="In this issue">
          <ol className="index">
            {chapters.slice(1).map((c) => (
              <li key={c.id}>
                <a href={`#${c.id}`} style={css({ "--c": c.color })}>{c.label}</a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}

export function Bitsians() {
  return (
    <section className="bitsians" id="bitsians" data-chapter>
      <header className="section-head section-head--split">
        <h2 className="headline">Built by BITSians</h2>
        <p className="lede">Some of India’s best-known companies were started by <strong>BITS Pilani students</strong>.</p>
      </header>

      <ul className="logo-wall" aria-label="Companies founded by BITS Pilani alumni">
        {companies.map((c, i) => (
          <li key={c.name} style={css({ "--r": `${(i % 2 ? 1 : -1) * (1 + (i % 3))}deg` })}>
            <Image src={c.logo} alt={c.name} sizes="200px" />
          </li>
        ))}
      </ul>

      <dl className="stat-row">
        {bitsStats.map((s) => (
          <div key={s.label}>
            <dt><CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} /></dt>
            <dd>{s.label}</dd>
          </div>
        ))}
      </dl>

      <div className="campus" id="campus">
        <div className="campus__copy">
          <h3 className="subhead">All of this starts at BITS Pilani.</h3>
          <p>
            From their first week, BITS students are surrounded by startups: founder talks, pitch nights, and friends
            building companies in their hostel rooms. Startup talk is everyday talk.
          </p>
          <ul className="campus__points">
            {campusPoints.map((p) => (
              <li key={p.title}><strong>{p.title}</strong>{p.text}</li>
            ))}
          </ul>
          <div className="started">
            <p className="started__label">Started as students</p>
            {startedAsStudents.map((s) => (
              <p key={s.name}><strong>{s.name}:</strong> {s.text}</p>
            ))}
          </div>
        </div>
        <div className="campus__photos">
          <figure className="campus__main" data-parallax>
            <Image src={photos.founderTalk.src} alt={photos.founderTalk.alt} sizes="(max-width: 900px) 92vw, 50vw" placeholder="blur" />
            <figcaption>A full house for a founder talk at BITS Pilani</figcaption>
          </figure>
          <figure><Image src={photos.audienceQuestion.src} alt={photos.audienceQuestion.alt} sizes="(max-width: 900px) 46vw, 25vw" placeholder="blur" /></figure>
          <figure><Image src={photos.auditorium.src} alt={photos.auditorium.alt} sizes="(max-width: 900px) 46vw, 25vw" placeholder="blur" /></figure>
        </div>
      </div>
    </section>
  );
}

export function Pieds() {
  return (
    <section className="pieds" id="pieds" data-chapter>
      <header className="section-head section-head--split">
        <h2 className="headline">PIEDS turns the BITSpreneur spirit into real companies.</h2>
        <p className="lede">
          <strong>PIEDS</strong> is the Technology Business Incubator at BITS Pilani. The <strong>PIEDS Student Team</strong>{" "}
          runs its outreach, events, programmes, technology and research, and Studentpreneur is one of its programmes.
        </p>
      </header>

      <dl className="pieds__stats">
        {piedsStats.map((s) => (
          <div key={s.label} className={`stat-card stat-card--${s.tone}`}>
            <dt><CountUp value={s.value} suffix={"suffix" in s ? s.suffix : ""} /></dt>
            <dd>{s.label}</dd>
          </div>
        ))}
      </dl>

      <h3 className="subhead">PIEDS also runs</h3>
      <ul className="programs">
        {programmes.map((p) => (
          <li key={p.name} style={css({ "--c": p.color })}>
            {p.mask ? (
              <span className="logo-mask" role="img" aria-label={p.name} style={css({ "--src": `url(${p.mask})`, "--ar": p.ratio! })} />
            ) : (
              <span className="program__word">{p.name.toUpperCase()}</span>
            )}
            <p>{p.text}</p>
          </li>
        ))}
      </ul>

      <div className="backers">
        <Rocket className="backers__rocket" />
        <p className="backers__label">Backed by</p>
        <ul>
          {backers.map((b) => (
            <li key={b.name}>
              <Image src={b.logo} alt="" sizes="160px" />
              <span><strong>{b.name}</strong>{b.note}</span>
            </li>
          ))}
          <li>
            <Image src={logos.piedsFull} alt="" sizes="200px" />
            <span><strong>PIEDS</strong>Technology Business Incubator</span>
          </li>
        </ul>
      </div>
    </section>
  );
}

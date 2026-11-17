import Image from "next/image";
import phoneApp from "@/assets/photos/phone-app.png";
import { photos, pillarsOfJourney, progressFeatures, runSteps, takeaways, workshopPillars } from "@/content/site";
import ActivityBoard from "../ActivityBoard";
import Leaderboard from "../Leaderboard";
import WorkshopTrack from "../WorkshopTrack";

export function Journey() {
  return (
    <section className="journey" id="journey" data-chapter>
      <header className="section-head section-head--split">
        <h2 className="headline">Learn. Build. Present.</h2>
        <p className="lede">Studentpreneur gives young minds the tools to turn their <strong>boldest ideas</strong> into something real.</p>
      </header>

      <div className="journey__cards">
        {pillarsOfJourney.map((p) => (
          <article key={p.title} className={`journey-card journey-card--${p.tone}`}>
            <figure data-parallax>
              <Image src={p.photo.src} alt={p.photo.alt} sizes="(max-width: 900px) 92vw, 31vw" placeholder="blur" />
            </figure>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </article>
        ))}
      </div>

      <h3 className="subhead">How Studentpreneur runs at your school</h3>
      <ol className="timeline">
        {runSteps.map((s) => (
          <li key={s.title}>
            <h4>{s.title}</h4>
            <p className="timeline__when">{s.when}</p>
            <p>{s.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Workshop() {
  return (
    <section className="workshop" id="workshop" data-chapter>
      <WorkshopTrack>
        <div className="workshop__intro">
          <h2 className="headline headline--mono">workshop</h2>
          <p className="lede">
            Two days at your school with the BITS team. Students learn <strong>entrepreneurship</strong> and{" "}
            <strong>startup fundamentals</strong>: key terms, <strong>market analysis</strong>, why <strong>user feedback</strong>{" "}
            matters, <strong>product positioning</strong>, and <strong>case studies</strong> of startups that made it.
          </p>
          <p className="workshop__nudge" aria-hidden="true">Keep scrolling, the pages turn sideways</p>
        </div>
        {workshopPillars.map((p) => (
          <article key={p.title} className="pillar" style={{ "--bg": p.bg, "--fg": p.fg } as React.CSSProperties}>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
          </article>
        ))}
        <figure className="pillar pillar--photo">
          <Image src={photos.lecture.src} alt={photos.lecture.alt} sizes="(max-width: 900px) 92vw, 420px" placeholder="blur" />
        </figure>
      </WorkshopTrack>
    </section>
  );
}

export function Activities() {
  return (
    <section className="activities" id="activities" data-chapter>
      <header className="section-head section-head--split">
        <h2 className="headline">Activities</h2>
        <p className="lede">Between sessions we run <strong>games and challenges</strong> to keep the room <strong>lively and energetic</strong>, from the first hour to the last.</p>
      </header>
      <ActivityBoard />
    </section>
  );
}

export function OnlineWeek() {
  return (
    <section className="online" id="online-week" data-chapter>
      <div className="online__grid">
        <div>
          <h2 className="headline">Progress every student can see.</h2>
          <ul className="online__features">
            {progressFeatures.map((f) => (
              <li key={f.title}><h3>{f.title}</h3><p>{f.text}</p></li>
            ))}
          </ul>
        </div>
        <div className="online__demo">
          <Image className="online__phone" src={phoneApp} alt="The Studentpreneur app on a phone" sizes="(max-width: 900px) 60vw, 26vw" />
          <Leaderboard />
        </div>
      </div>
    </section>
  );
}

export function DemoDay() {
  return (
    <section className="demoday" id="demoday" data-chapter>
      <div className="demoday__stage">
        <div className="demoday__copy">
          <h2 className="headline headline--mono">demo<sup>day</sup></h2>
          <p className="lede">
            Teams pitch to a jury at <strong>BITS Pilani</strong>, in a format that feels like a <strong>real startup pitch</strong>.
            Then they take questions and <strong>get feedback</strong>. Scores go onto the leaderboard, and <strong>parents are invited</strong>.
          </p>
          <ol className="steps">
            <li><b>Pitch</b>Present to the jury</li>
            <li><b>Q&amp;A</b>Defend the idea</li>
            <li><b>Feedback</b>Take notes, improve</li>
          </ol>
        </div>
        <figure className="demoday__photo" data-reveal>
          <Image src={photos.demoday.src} alt={photos.demoday.alt} sizes="(max-width: 900px) 92vw, 58vw" placeholder="blur" />
        </figure>
      </div>
      <div className="demoday__strip">
        {[photos.demoPitches, photos.studentsOnStage, photos.demoAudience].map((p) => (
          <figure key={p.alt}><Image src={p.src} alt={p.alt} sizes="(max-width: 900px) 92vw, 31vw" placeholder="blur" /></figure>
        ))}
      </div>
    </section>
  );
}

export function Takeaways() {
  return (
    <section className="takeaways" aria-labelledby="takeaways-title">
      <h2 className="headline" id="takeaways-title">What your students and school take away</h2>
      <ul className="takeaways__grid">
        {takeaways.map((t) => (
          <li key={t.title} className={`take take--${t.tone}`}>
            <h3>{t.title}</h3>
            <p>{t.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

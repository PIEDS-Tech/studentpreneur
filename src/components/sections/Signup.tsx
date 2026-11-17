import { faqs, included, responsibilities, SITE } from "@/content/site";
import InterestForm from "../InterestForm";

export function ProgrammeDetails() {
  return (
    <section className="programme" id="programme" data-chapter>
      <header className="section-head">
        <h2 className="headline">One programme. We run it for you.</h2>
      </header>

      <div className="programme__grid">
        <div className="price-card">
          <span className="wordmark wordmark--violet" role="img" aria-label="Studentpreneur" />
          <p className="price-card__label">For students of</p>
          <p className="price-card__price">Grades 8–12</p>
          <p>The whole programme, from the first workshop to Demo Day at BITS Pilani.</p>
        </div>

        <div className="included">
          <h3>What’s included</h3>
          <ul>
            {included.map((i) => (
              <li key={i.title}><strong>{i.title}</strong><span>{i.note}</span></li>
            ))}
          </ul>
        </div>

        <div className="roles roles--school">
          <h3>Your school</h3>
          <ul>{responsibilities.school.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
        <div className="roles roles--pieds">
          <h3>PIEDS, BITS Pilani</h3>
          <ul>{responsibilities.pieds.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
      </div>

      <div className="faq">
        <h3 className="subhead">Questions teachers ask</h3>
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Interest() {
  return (
    <section className="interest" id="interest" data-chapter>
      <div className="interest__grid">
        <div className="interest__intro">
          <h2 className="headline headline--huge">Bring Studentpreneur to your school</h2>
          <p className="lede">
            Tell us a little about your school. The PIEDS team will get back to you with dates, a plan for your
            students and anything else you need.
          </p>
          <ul className="interest__promises">
            <li>No commitment yet</li>
            <li>Minimum {SITE.minStudents} students, Grades 8–12</li>
            <li>Demo Day at BITS Pilani</li>
          </ul>
        </div>
        <InterestForm />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="colophon">
      <span className="wordmark wordmark--small wordmark--ink" role="img" aria-label="Studentpreneur" />
      <p>A PIEDS Student Team programme. Technology Business Incubator, BITS Pilani.</p>
      <a href="#cover" className="btn btn--ghost-ink">Back to the cover</a>
    </footer>
  );
}

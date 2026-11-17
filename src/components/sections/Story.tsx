import Image from "next/image";
import { accolades, photos } from "@/content/site";
import Photobook from "../Photobook";
import PitchClock from "../PitchClock";

export function EditionOne() {
  return (
    <section className="edition" id="edition-one" data-chapter>
      <header className="section-head">
        <h2 className="headline">Last time, at Birla Balika Vidyapeeth</h2>
      </header>

      <div className="spread">
        <figure className="spread__item spread__item--team" data-parallax>
          <Image src={photos.teamWithStudents.src} alt={photos.teamWithStudents.alt} sizes="(max-width: 900px) 92vw, 70vw" placeholder="blur" />
          <figcaption>The BITS team with students</figcaption>
        </figure>
        <figure className="spread__item spread__item--duo">
          <Image src={photos.pitchDuo.src} alt={photos.pitchDuo.alt} sizes="(max-width: 900px) 46vw, 20vw" placeholder="blur" />
          <figcaption className="cap-display">Pitch making</figcaption>
        </figure>
        <div className="spread__item spread__item--title">
          <span className="crest" role="img" aria-label="Birla Balika Vidyapeeth crest" />
          <p className="spread__edition">studentpreneur<sup>1.0</sup></p>
        </div>
        <figure className="spread__item spread__item--workshop">
          <Image src={photos.workshopDesk.src} alt={photos.workshopDesk.alt} sizes="(max-width: 900px) 92vw, 46vw" placeholder="blur" />
          <figcaption className="cap-display cap-display--mono">workshop</figcaption>
        </figure>
        <figure className="spread__item spread__item--demo">
          <Image src={photos.demoStageWide.src} alt={photos.demoStageWide.alt} sizes="(max-width: 900px) 92vw, 24vw" placeholder="blur" />
          <figcaption className="cap-display">demo<sup>day</sup></figcaption>
        </figure>
        <figure className="spread__item spread__item--mic">
          <Image src={photos.presidentMic.src} alt={photos.presidentMic.alt} sizes="(max-width: 900px) 46vw, 20vw" placeholder="blur" />
          <figcaption className="cap-display">BITS Pilani</figcaption>
        </figure>
      </div>

      <div className="accolades">
        <p>Our first host school has been recognised with:</p>
        <ul>
          {accolades.map((a, i) => (
            <li key={a} style={{ "--r": `${[-3, 2, -1, 3][i % 4]}deg` } as React.CSSProperties}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="pitch">
        <div className="pitch__copy">
          <h3 className="headline headline--display">Idea to Pitch</h3>
          <p className="pitch__sub">The 72-hour competition from Edition 1.0</p>
          <p className="lede">
            Students got <strong>72 hours</strong> to build a <strong>pitch deck</strong> around <strong>problem statements they found</strong>{" "}
            during the workshop activities. <strong>Dedicated mentors</strong> guided each team, offered suggestions and helped them past blockers.
          </p>
        </div>
        <PitchClock />
      </div>
    </section>
  );
}

export function PhotobookSection() {
  return (
    <section className="photobook-section" id="photobook" data-chapter>
      <header className="section-head section-head--split">
        <h2 className="headline">The photobook</h2>
        <p className="lede">Every picture from <strong>Studentpreneur 1.0</strong>. Turn the pages, or jump straight to a photo below.</p>
      </header>
      <Photobook />
    </section>
  );
}

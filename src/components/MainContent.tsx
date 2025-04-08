'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Link from 'next/link';

export default function MainContent() {
  const skills = useSelector((state: RootState) => state.skills.list);
  const projects = useSelector((state: RootState) => state.projects.list);
  const testimonials = useSelector((state: RootState) => state.testimonials.list);
  console.log(skills);
  return (
    <main className="container py-5">
      {/* Présentation */}
      <section id="presentation" className="text-center mb-5">
        <img
          src="/images/profile.jpg"
          className="rounded-circle mb-3"
          alt="Photo de Alioune"
          width={150}
          height={150}
        />
        <h1 className="fw-bold">Seck Alioune Badara</h1>
        <h5 className="text-muted mb-3">Développeur Web Full Stack basé à Ottawa</h5>
        <p className="lead">
          Passionné par le développement web moderne, je conçois des applications robustes et dynamiques avec React, Redux et Next.js.
          Mon objectif est de livrer des interfaces efficaces, intuitives et esthétiques.
        </p>
      </section>

      {/* Compétences */}
      <section id="competences" className="mb-5 text-center">
        <h2 className="mb-4">🧠 Compétences</h2>
        <div className="row">
          {skills.map((skill) => (
            <div className="col-md-4 mb-3" key={skill.id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{skill.name}</h5>
                  <p className="card-text">Niveau : {skill.level}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

{/* Projets */}
<section id="projets" className="mb-5 text-center">
  <h2 className="mb-4">📁 Projets</h2>
  <div className="row">
    {projects.map((project) => (
      <div className="col-md-6 mb-4" key={project.id}>
        <Link href={`/projets/${project.id}`} className="text-decoration-none text-dark">
          <div className="card h-100 shadow project-hover">
            <div className="card-body">
              <h5 className="card-title">{project.title}</h5>
              <p className="card-text">{project.description}</p>
              <p className="text-muted">
                <strong>Technologies :</strong> {project.technologies.join(', ')}
              </p>
            </div>
          </div>
        </Link>
      </div>
    ))}
  </div>
</section>

      {/* Témoignages */}
      <section id="temoignages" className="mb-5 text-center">
        <h2 className="mb-4">💬 Témoignages</h2>
        {testimonials.length === 0 ? (
          <p className="text-muted">Aucun témoignage disponible.</p>
        ) : (
          testimonials.map((t) => (
            <div className="alert alert-secondary" key={t.id}>
              <strong>{t.author} :</strong> {t.message}
            </div>
          ))
        )}
      </section>

      {/* Contact */}
      <section id="contact" className="text-center mt-5">
        <h2 className="mb-3">📞 Contact</h2>
        <p>
          Vous pouvez me joindre à{' '}
          <a href="mailto:2709281@collegelacite.ca">2709281@collegelacite.ca</a>
        </p>
      </section>
    </main>
  );
}

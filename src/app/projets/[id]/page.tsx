'use client';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const projects = useSelector((state: RootState) => state.projects.list);
  const project = projects.find(p => p.id === Number(id));

  if (!project) {
    return (
      <>
        <Header />
        <main className="container py-5 text-center">
          <h2 className="text-danger">Projet introuvable</h2>
          <p>Le projet avec l'identifiant {id} n'existe pas.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container py-5">
        <h1 className="mb-4 text-center">{project.title}</h1>
        <p className="lead text-center">{project.description}</p>
        <hr />
        <h5>🛠️ Technologies utilisées :</h5>
        <ul>
          {project.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </main>
      <Footer />
    </>
  );
}

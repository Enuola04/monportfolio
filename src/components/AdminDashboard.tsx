'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Link from 'next/link';

export default function AdminDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <main className="container py-5 text-center">
      <h1 className="mb-3">👋 Bonjour {user?.username} !</h1>
      <p className="lead mb-4">
        Bienvenue sur votre tableau de bord. Vous pouvez gérer vos projets, compétences et témoignages ici.
      </p>

      <div className="row justify-content-center g-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-primary h-100">
            <div className="card-body">
              <h5 className="card-title">🛠️ Projets</h5>
              <p className="card-text">Ajoutez, modifiez ou supprimez vos projets.</p>
              <Link href="/admin/projets" className="btn btn-primary w-100">Gérer les projets</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-success h-100">
            <div className="card-body">
              <h5 className="card-title">🧠 Compétences</h5>
              <p className="card-text">Mettez à jour vos compétences techniques.</p>
              <Link href="/admin/competences" className="btn btn-success w-100">Gérer les compétences</Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-info h-100">
            <div className="card-body">
              <h5 className="card-title">💬 Témoignages</h5>
              <p className="card-text">Gérez les retours laissés par les visiteurs.</p>
              <Link href="/admin/temoignages" className="btn btn-info w-100">Gérer les témoignages</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

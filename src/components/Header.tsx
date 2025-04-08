'use client';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { useRouter } from 'next/navigation';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" href="/">Seck Alioune Badara</Link>
          
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto text-center">
              <li className="nav-item">
                <a className="nav-link" href="#presentation">Présentation</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#competences">Compétences</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#projets">Projets</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#temoignages">Témoignages</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#contact">Contact</a>
              </li>

              {!isAuthenticated ? (
                <li className="nav-item">
                  <Link className="nav-link" href="/login">Connexion</Link>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" href="/admin">Gestion</Link>
                  </li>
                  <li className="nav-item">
                    <button
                      onClick={handleLogout}
                      className="btn btn-outline-light w-100 mt-2 mt-lg-0"
                    >
                      Déconnexion
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

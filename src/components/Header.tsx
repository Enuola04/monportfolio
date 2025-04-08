'use client';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/slices/authSlice';
import { useRouter, usePathname } from 'next/navigation';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push(`/#${anchor}`);
    } else {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
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
              {[
                { label: 'Présentation', id: 'presentation' },
                { label: 'Compétences', id: 'competences' },
                { label: 'Projets', id: 'projets' },
                { label: 'Témoignages', id: 'temoignages' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li className="nav-item" key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="nav-link"
                    onClick={(e) => handleAnchorClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}

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

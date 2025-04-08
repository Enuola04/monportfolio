'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const registeredUsers = useSelector((state: RootState) => state.auth.registeredUsers);

  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    identifier: '',
    password: '',
  });

  const [globalError, setGlobalError] = useState('');

  const validate = (): boolean => {
    let isValid = true;
    const newErrors = { identifier: '', password: '' };

    if (!form.identifier.trim()) {
      newErrors.identifier = 'Nom d’utilisateur ou email requis.';
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = 'Mot de passe requis.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setGlobalError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const found = registeredUsers.find(
      u =>
        (u.username === form.identifier || u.email === form.identifier) &&
        u.password === form.password
    );

    if (!found) {
      setGlobalError("Identifiants incorrects. Veuillez réessayer.");
      return;
    }

    dispatch(login({ identifier: form.identifier, password: form.password }));
    router.push('/');
  };

  return (
    <div className="container my-5" style={{ maxWidth: 500 }}>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h2 className="mb-4 text-center">Se connecter</h2>

          <form onSubmit={handleSubmit} noValidate>
            {globalError && (
              <div className="alert alert-danger">{globalError}</div>
            )}

            {/* Identifiant */}
            <div className="mb-3">
              <label htmlFor="identifier" className="form-label">
                Nom d’utilisateur ou Email
              </label>
              <input
                type="text"
                name="identifier"
                className={`form-control ${errors.identifier ? 'is-invalid' : ''}`}
                value={form.identifier}
                onChange={handleChange}
              />
              {errors.identifier && (
                <div className="invalid-feedback">{errors.identifier}</div>
              )}
            </div>

            {/* Mot de passe */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input
                type="password"
                name="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button type="submit" className="btn btn-success w-100">
              Se connecter
            </button>
          </form>

          <hr className="my-4" />

          <p className="text-center mb-0">
            Pas encore inscrit ?{' '}
            <Link href="/register" className="text-decoration-none fw-semibold">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

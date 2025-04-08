'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SignupForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const registeredUsers = useSelector((state: RootState) => state.auth.registeredUsers);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const validate = () => {
    const newErrors = { username: '', email: '', password: '' };
    let isValid = true;

    if (!form.username.trim()) {
      newErrors.username = "Le nom d'utilisateur est requis.";
      isValid = false;
    } else if (registeredUsers.find(u => u.username === form.username)) {
      newErrors.username = "Ce nom d'utilisateur est déjà utilisé.";
      isValid = false;
    }

    if (!form.email.trim()) {
      newErrors.email = "L'email est requis.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Format d'email invalide.";
      isValid = false;
    } else if (registeredUsers.find(u => u.email === form.email)) {
      newErrors.email = "Cet email est déjà enregistré.";
      isValid = false;
    }

    if (!form.password.trim()) {
      newErrors.password = "Le mot de passe est requis.";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(register(form));
    router.push('/login');
  };

  return (
    <div className="container my-5" style={{ maxWidth: 500 }}>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <h2 className="mb-4 text-center">Créer un compte</h2>

          <form onSubmit={handleSubmit} noValidate>
            {/* Username */}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
              <input
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Ex: alioune_dev"
              />
              {errors.username && <div className="invalid-feedback">{errors.username}</div>}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Adresse email</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Ex: alioune@example.com"
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Mot de passe</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                name="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              S'inscrire
            </button>
          </form>

          <hr className="my-4" />

          <p className="text-center mb-0">
            Vous avez déjà un compte ?{' '}
            <Link href="/login" className="text-decoration-none fw-semibold">
              Connectez-vous ici
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

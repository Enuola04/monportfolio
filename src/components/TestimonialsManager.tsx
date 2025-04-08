'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addTestimonial, updateTestimonial, deleteTestimonial } from '../redux/slices/testimonialsSlice';
import { useState } from 'react';
import Link from 'next/link';

export default function TestimonialsManager() {
  const testimonials = useSelector((state: RootState) => state.testimonials.list);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState({ author: '', message: '' });
  const [errors, setErrors] = useState({ author: '', message: '' });
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const openModal = (testimonial?: { id: number; author: string; message: string }) => {
    if (testimonial) {
      setIsEditing(true);
      setSelectedId(testimonial.id);
      setForm({ author: testimonial.author, message: testimonial.message });
    } else {
      setIsEditing(false);
      setSelectedId(null);
      setForm({ author: '', message: '' });
    }
    setErrors({ author: '', message: '' });
    setModalOpen(true);
  };

  const validateForm = () => {
    const newErrors = { author: '', message: '' };
    let valid = true;

    if (!form.author.trim()) {
      newErrors.author = 'Le nom de l’auteur est requis.';
      valid = false;
    }
    if (!form.message.trim()) {
      newErrors.message = 'Le message est requis.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const testimonial = {
      id: isEditing && selectedId !== null ? selectedId : Date.now(),
      author: form.author,
      message: form.message,
    };

    if (isEditing) {
      dispatch(updateTestimonial(testimonial));
    } else {
      dispatch(addTestimonial(testimonial));
    }

    setModalOpen(false);
  };

  const confirmDelete = (id: number) => {
    setConfirmId(id);
  };

  const handleDelete = () => {
    if (confirmId !== null) {
      dispatch(deleteTestimonial(confirmId));
      setConfirmId(null);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">💬 Gestion des Témoignages</h2>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => openModal()}>
          ➕ Ajouter un témoignage
        </button>
        <Link href="/admin" className="btn btn-secondary">↩️ Retour au tableau de bord</Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>Auteur</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((t, idx) => (
            <tr key={t.id}>
              <td>{idx + 1}</td>
              <td>{t.author}</td>
              <td>{t.message}</td>
              <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => openModal(t)}
                    title="Modifier"
                  >
                    <i className="bi bi-pencil-fill me-1" /> Modifier
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => confirmDelete(t.id)}
                    title="Supprimer"
                  >
                    <i className="bi bi-trash-fill me-1" /> Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal ajout/modif */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? 'Modifier le témoignage' : 'Ajouter un témoignage'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Auteur</label>
                  <input
                    type="text"
                    className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                    value={form.author}
                    onChange={(e) => {
                      setForm({ ...form, author: e.target.value });
                      setErrors({ ...errors, author: '' });
                    }}
                  />
                  {errors.author && <div className="invalid-feedback">{errors.author}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value });
                      setErrors({ ...errors, message: '' });
                    }}
                  />
                  {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>Annuler</button>
                <button className="btn btn-success" onClick={handleSubmit}>
                  {isEditing ? 'Enregistrer' : 'Ajouter'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation suppression */}
      {confirmId !== null && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <p>Supprimer ce témoignage ?</p>
                <div className="d-flex justify-content-center gap-3">
                  <button className="btn btn-outline-secondary" onClick={() => setConfirmId(null)}>Annuler</button>
                  <button className="btn btn-danger" onClick={handleDelete}>Confirmer</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

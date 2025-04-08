'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { addSkill, updateSkill, deleteSkill } from '../redux/slices/skillsSlice';
import { useState } from 'react';
import Link from 'next/link';

export default function SkillsManager() {
  const skills = useSelector((state: RootState) => state.skills.list);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', level: '' });
  const [errors, setErrors] = useState({ name: '', level: '' });
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const openModal = (skill?: { id: number; name: string; level: string }) => {
    if (skill) {
      setIsEditing(true);
      setSelectedId(skill.id);
      setForm({ name: skill.name, level: skill.level });
    } else {
      setIsEditing(false);
      setSelectedId(null);
      setForm({ name: '', level: '' });
    }
    setErrors({ name: '', level: '' });
    setModalOpen(true);
  };

  const validateForm = () => {
    const newErrors = { name: '', level: '' };
    let valid = true;

    if (!form.name.trim()) {
      newErrors.name = 'Le nom est requis.';
      valid = false;
    }
    if (!form.level.trim()) {
      newErrors.level = 'Le niveau est requis.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const skill = {
      id: isEditing && selectedId !== null ? selectedId : Date.now(),
      name: form.name,
      level: form.level,
    };

    if (isEditing) {
      dispatch(updateSkill(skill));
    } else {
      dispatch(addSkill(skill));
    }

    setModalOpen(false);
  };

  const confirmDelete = (id: number) => {
    setConfirmId(id);
  };

  const handleDelete = () => {
    if (confirmId !== null) {
      dispatch(deleteSkill(confirmId));
      setConfirmId(null);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">🧠 Gestion des Compétences</h2>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => openModal()}>
          ➕ Ajouter une compétence
        </button>
        <Link href="/admin" className="btn btn-secondary">↩️ Retour au tableau de bord</Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Niveau</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill, idx) => (
            <tr key={skill.id}>
              <td>{idx + 1}</td>
              <td>{skill.name}</td>
              <td>{skill.level}</td>
              <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => openModal(skill)}
                    title="Modifier"
                  >
                    <i className="bi bi-pencil-fill me-1" /> Modifier
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => confirmDelete(skill.id)}
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

      {/* Modal Ajout / Modification */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? 'Modifier la compétence' : 'Ajouter une compétence'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)} />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nom</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value });
                      setErrors({ ...errors, name: '' });
                    }}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="mb-3">
                  <label className="form-label">Niveau</label>
                  <input
                    type="text"
                    className={`form-control ${errors.level ? 'is-invalid' : ''}`}
                    value={form.level}
                    onChange={(e) => {
                      setForm({ ...form, level: e.target.value });
                      setErrors({ ...errors, level: '' });
                    }}
                  />
                  {errors.level && <div className="invalid-feedback">{errors.level}</div>}
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

      {/* Modal confirmation suppression */}
      {confirmId !== null && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog modal-sm modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-body text-center">
                <p>Supprimer cette compétence ?</p>
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

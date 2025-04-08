'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { useState } from 'react';
import { addProject, updateProject, deleteProject, Project } from '../redux/slices/projectsSlice';
import Link from 'next/link';

export default function ProjectManager() {
  const projects = useSelector((state: RootState) => state.projects.list);
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [form, setForm] = useState({ title: '', description: '', technologies: '' });
  const [errors, setErrors] = useState({ title: '', description: '', technologies: '' });
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const openModal = (project?: Project) => {
    if (project) {
      setIsEditing(true);
      setSelectedProject(project);
      setForm({
        title: project.title,
        description: project.description,
        technologies: project.technologies.join(', '),
      });
    } else {
      setIsEditing(false);
      setSelectedProject(null);
      setForm({ title: '', description: '', technologies: '' });
    }
    setErrors({ title: '', description: '', technologies: '' });
    setModalOpen(true);
  };

  const validateForm = () => {
    const newErrors = { title: '', description: '', technologies: '' };
    let valid = true;

    if (!form.title.trim()) {
      newErrors.title = 'Le titre est requis.';
      valid = false;
    }
    if (!form.description.trim()) {
      newErrors.description = 'La description est requise.';
      valid = false;
    }
    if (!form.technologies.trim()) {
      newErrors.technologies = 'Au moins une technologie est requise.';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const newProject: Project = {
      id: isEditing && selectedProject ? selectedProject.id : Date.now(),
      title: form.title,
      description: form.description,
      technologies: form.technologies.split(',').map(t => t.trim()),
    };

    if (isEditing) {
      dispatch(updateProject(newProject));
    } else {
      dispatch(addProject(newProject));
    }

    setModalOpen(false);
  };

  const confirmDelete = (id: number) => {
    setConfirmId(id);
  };

  const handleDelete = () => {
    if (confirmId !== null) {
      dispatch(deleteProject(confirmId));
      setConfirmId(null);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">🛠️ Gestion des Projets</h2>

      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={() => openModal()}>
          ➕ Ajouter un projet
        </button>
        <Link href="/admin" className="btn btn-secondary">↩️ Retour au tableau de bord</Link>
      </div>

      <table className="table table-bordered table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>#</th>
            <th>Titre</th>
            <th>Description</th>
            <th>Technologies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, idx) => (
            <tr key={project.id}>
              <td>{idx + 1}</td>
              <td>{project.title}</td>
              <td>{project.description}</td>
              <td>{project.technologies.join(', ')}</td>
              <td className="text-center">
  <div className="d-flex justify-content-center gap-2">
    <button
      className="btn btn-outline-warning btn-sm d-flex align-items-center"
      onClick={() => openModal(project)}
      title="Modifier ce projet"
    >
      <i className="bi bi-pencil-fill me-1"></i> Modifier
    </button>

    <button
      className="btn btn-outline-danger btn-sm d-flex align-items-center"
      onClick={() => confirmDelete(project.id)}
      title="Supprimer ce projet"
    >
      <i className="bi bi-trash-fill me-1"></i> Supprimer
    </button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal ajout/modification */}
      {modalOpen && (
        <div className="modal show d-block" tabIndex={-1}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? 'Modifier le projet' : 'Ajouter un projet'}
                </h5>
                <button type="button" className="btn-close" onClick={() => setModalOpen(false)} />
              </div>
              <div className="modal-body">
                {/* Titre */}
                <div className="mb-3">
                  <label className="form-label">Titre</label>
                  <input
                    type="text"
                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                    value={form.title}
                    onChange={(e) => {
                      setForm({ ...form, title: e.target.value });
                      setErrors({ ...errors, title: '' });
                    }}
                  />
                  {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                </div>

                {/* Description */}
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    value={form.description}
                    onChange={(e) => {
                      setForm({ ...form, description: e.target.value });
                      setErrors({ ...errors, description: '' });
                    }}
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                </div>

                {/* Technologies */}
                <div className="mb-3">
                  <label className="form-label">Technologies (séparées par virgule)</label>
                  <input
                    type="text"
                    className={`form-control ${errors.technologies ? 'is-invalid' : ''}`}
                    value={form.technologies}
                    onChange={(e) => {
                      setForm({ ...form, technologies: e.target.value });
                      setErrors({ ...errors, technologies: '' });
                    }}
                  />
                  {errors.technologies && <div className="invalid-feedback">{errors.technologies}</div>}
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
                <p>Supprimer ce projet ?</p>
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

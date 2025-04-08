'use client';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProtectedRoute from '../../../components/ProtectedRoute';
import ProjectManager from '../../../components/ProjectManager';

export default function AdminProjectsPage() {
  return (
    <ProtectedRoute>
      <Header />
      <ProjectManager />
      <Footer />
    </ProtectedRoute>
  );
}

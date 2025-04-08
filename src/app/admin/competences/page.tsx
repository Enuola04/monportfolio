'use client';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProtectedRoute from '../../../components/ProtectedRoute';
import SkillsManager from '../../../components/SkillsManager';

export default function AdminSkillsPage() {
  return (
    <ProtectedRoute>
      <Header />
      <SkillsManager />
      <Footer />
    </ProtectedRoute>
  );
}

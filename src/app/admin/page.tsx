'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminDashboard from '../../components/AdminDashboard';

export default function AdminPage() {
  return (
    <ProtectedRoute>
      <Header />
      <AdminDashboard />
      <Footer />
    </ProtectedRoute>
  );
}

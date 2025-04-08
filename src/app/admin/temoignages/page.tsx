'use client';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProtectedRoute from '../../../components/ProtectedRoute';
import TestimonialsManager from '../../../components/TestimonialsManager';

export default function AdminTestimonialsPage() {
  return (
    <ProtectedRoute>
      <Header />
      <TestimonialsManager />
      <Footer />
    </ProtectedRoute>
  );
}

'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import LoginForm from '../../components/LoginForm';

export default function LoginPage() {
  return (
    <>
      <Header />
      <main className="container py-5">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}

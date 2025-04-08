'use client';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import SignupForm from '../../components/SignupForm';

export default function RegisterPage() {
  return (
    <>
      <Header />
      <main className="container py-5">
              <SignupForm />
       </main>
      <Footer />
    </>
  );
}

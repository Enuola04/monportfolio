"use client";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainContent from "../components/MainContent";

export default function HomePage() {
  const auth = useSelector((state: RootState) => state.auth);
  const skills = useSelector((state: RootState) => state.skills.list);
  const projects = useSelector((state: RootState) => state.projects.list);
  const testimonials = useSelector((state: RootState) => state.testimonials.list);

  return (
    <>
      <Header />
      <MainContent />
      <Footer />
    </>
  );
}

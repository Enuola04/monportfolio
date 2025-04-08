export default function Footer() {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-1">© {new Date().getFullYear()} Seck Alioune Badara</p>
        <div>
          <a
            href="https://github.com/Enuola04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light me-3"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/Enuola04"
            target="_blank"
            rel="noopener noreferrer"
            className="text-light"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

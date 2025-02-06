import { useEffect, useState } from 'react';
import { FaGithub, FaHeart, FaInstagram } from 'react-icons/fa';
import './App.css';
import ValentineForm from './components/ValentineForm';
import ValentinePreview from './components/ValentinePreview';

function App() {
  const [formData, setFormData] = useState({
    senderName: '',
    receiverName: '',
    message: '',
    imageUrl: ''
  });
  const [isPreview, setIsPreview] = useState(false);
  const [shareableLink, setShareableLink] = useState('');

  // Función para crear corazones flotantes
  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.animationDuration = Math.random() * 3 + 7 + 's';
      heart.style.opacity = Math.random() * 0.5 + 0.3;
      document.querySelector('.floating-hearts').appendChild(heart);
      setTimeout(() => {
        heart.remove();
      }, 10000);
    };

    const interval = setInterval(createHeart, 300);
    return () => clearInterval(interval);
  }, []);

  // Verificar si hay parámetros en la URL al cargar
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const encodedData = params.get('data');
    if (encodedData) {
      try {
        const decodedData = JSON.parse(atob(encodedData));
        setFormData(decodedData);
        setIsPreview(true);
      } catch (error) {
        console.error('Error al decodificar datos:', error);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear link compartible
    const encodedData = btoa(JSON.stringify(formData));
    const baseUrl = window.location.origin;
    const shareableUrl = `${baseUrl}?data=${encodedData}`;
    setShareableLink(shareableUrl);
    setIsPreview(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-purple-300 relative overflow-hidden">
      <div className="floating-hearts" />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
        <div className="container mx-auto max-w-4xl px-4 flex-grow flex flex-col items-center justify-center">
          <div className="w-full animate-fade-in">
            {!isPreview ? (
              <ValentineForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
              />
            ) : (
              <>
                <ValentinePreview formData={formData} />
                {shareableLink && (
                  <div className="valentine-form mt-8">
                    <h2 className="valentine-title">¡Comparte el Amor! 💌</h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={shareableLink}
                        readOnly
                        className="valentine-input"
                        onClick={(e) => e.target.select()}
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shareableLink);
                          alert('¡Link copiado!');
                        }}
                        className="valentine-button"
                      >
                        Copiar Link
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="adsense-container">
            {/* Inserta aquí tu código de anuncio de AdSense */}
          </div>
        </div>
      </div>

      <footer className="valentine-footer">
        <FaHeart className="footer-hearts footer-heart-1" />
        <FaHeart className="footer-hearts footer-heart-2" />
        <FaHeart className="footer-hearts footer-heart-3" />
        <FaHeart className="footer-hearts footer-heart-4" />

        <div className="footer-content">
          <h3 className="footer-title">Espero que les guste</h3>
          <div className="footer-divider" />

          <div className="footer-links">
            <a href="https://github.com/tuusuario" className="footer-link" target="_blank" rel="noopener noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href="https://github.com/Davidcrz14" className="footer-link" target="_blank" rel="noopener noreferrer">
              <FaInstagram /> Instagram
            </a>
          </div>
          <div className="footer-divider" />
          <p className="footer-text text-sm">
            © {new Date().getFullYear()} - Hecho con <FaHeart className="inline-block text-red-500" /> por DavC / Bliss
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

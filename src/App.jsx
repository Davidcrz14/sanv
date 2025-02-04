import { useEffect, useState } from 'react';
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
  const [step, setStep] = useState(1);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200 relative overflow-hidden">
      <div className="floating-hearts" />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
        <div className="container mx-auto max-w-4xl px-4 flex-grow flex items-center justify-center">
          <div className="w-full animate-fade-in">
            {!isPreview ? (
              <ValentineForm
                formData={formData}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
              />
            ) : (
              <>
                <ValentinePreview
                  formData={formData}
                  step={step}
                  onNextStep={() => setStep(2)}
                />
                {shareableLink && (
                  <div className="mt-8 text-center">
                    <p className="text-lg mb-4 text-blue-600 font-semibold">¡Comparte este link con tu San Valentín! 💌</p>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <input
                        type="text"
                        value={shareableLink}
                        readOnly
                        className="w-full p-2 border rounded text-sm"
                        onClick={(e) => e.target.select()}
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(shareableLink);
                          alert('¡Link copiado!');
                        }}
                        className="mt-2 bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-500 transition-all duration-300"
                      >
                        Copiar Link
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

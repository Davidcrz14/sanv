import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FaCamera, FaCheck, FaHeart, FaQuestion, FaTimes } from 'react-icons/fa';

function ValentinePreview({ formData, step, onNextStep }) {
  const [currentStep, setCurrentStep] = useState(step);
  const [currentGif, setCurrentGif] = useState(null);
  const [message, setMessage] = useState('');
  const [showButtons, setShowButtons] = useState(true);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [imageError, setImageError] = useState(false);
  const screenshotRef = useRef(null);

  const getProxiedImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/')) return url; // Local images
    return `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
  };

  useEffect(() => {
    console.log('Image URL:', formData.imageUrl);
  }, [formData.imageUrl]);

  const handleImageError = () => {
    console.error('Error loading image:', formData.imageUrl);
    setImageError(true);
  };

  const handleScreenshot = async () => {
    if (screenshotRef.current) {
      try {
        const canvas = await html2canvas(screenshotRef.current, {
          ignoreElements: (element) => {
            return element.classList.contains('no-screenshot');
          },
          useCORS: true,
          allowTaint: true,
          proxy: 'https://api.allorigins.win/raw?url='
        });
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'valentine-message.png';
        link.click();
      } catch (error) {
        console.error('Error capturing screenshot:', error);
      }
    }
  };

  const handleResponse = (response) => {
    setShowButtons(false);

    if (currentStep === 1) {
      if (response === 'yes') {
        setShowFinalMessage(true);
        if (!formData.imageUrl || imageError) {
          setCurrentGif('/sii.gif');
        } else {
          setCurrentGif(null);
        }
        setMessage('¡Qué felicidad! 💖');
      } else if (response === 'think') {
        setCurrentGif('/acepta.gif');
        setMessage('Piénsalo bien...');
        setTimeout(() => {
          setCurrentStep(2);
          setShowButtons(true);
          setCurrentGif(null);
        }, 3000);
      }
    } else if (currentStep === 2) {
      if (response === 'yes') {
        setShowFinalMessage(true);
        if (!formData.imageUrl || imageError) {
          setCurrentGif('/sii.gif');
        } else {
          setCurrentGif(null);
        }
        setMessage('Iiiiiiiiiii, yo sabía que aceptarias 💖');
      } else if (response === 'think') {
        setCurrentGif('/andaleacepta.gif');
        setMessage('Andaleee acepta');
        setTimeout(() => {
          setCurrentStep(3);
          setShowButtons(true);
          setCurrentGif(null);
        }, 4000);
      }
    } else if (currentStep === 3) {
      if (response === 'yes') {
        setShowFinalMessage(true);
        if (!formData.imageUrl || imageError) {
          setCurrentGif('/sii.gif');
        } else {
          setCurrentGif(null);
        }
        setMessage('¡Qué felicidad! 💖');
      } else if (response === 'no') {
        setCurrentGif('/YandereYunoGun.gif');
        setMessage('Última oportunidad acepta, o voy por ti a tu casa 🔪');
        setTimeout(() => {
          setCurrentStep(4);
          setShowButtons(true);
          setCurrentGif(null);
        }, 6000);
      }
    } else if (currentStep === 4) {
      if (response === 'yes') {
        setShowFinalMessage(true);
        if (!formData.imageUrl || imageError) {
          setCurrentGif('/sii.gif');
        } else {
          setCurrentGif(null);
        }
        setMessage('¡Qué felicidad! 💖');
      } else if (response === 'no') {
        setCurrentGif('/cry.gif');
        setMessage('Bueno, lo intente...');
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300">
        {step === 1 && !currentGif && !showFinalMessage ? (
          <>
            {formData.imageUrl && !imageError && (
              <div className="relative w-full max-w-md mx-auto mb-6">
                <img
                  src={getProxiedImageUrl(formData.imageUrl)}
                  alt="Valentine"
                  className="w-auto max-h-64 mx-auto hover:scale-105 transition-transform duration-500"
                  onError={handleImageError}
                  crossOrigin="anonymous"
                />
              </div>
            )}
            <h2 className="text-4xl font-bold text-blue-400 mb-6">Para: {formData.receiverName}</h2>
            <p className="text-gray-700 mb-8 text-xl leading-relaxed">{formData.message}</p>
            <p className="text-blue-400 mb-8 text-2xl">Con amor, {formData.senderName}</p>
            <button
              onClick={onNextStep}
              className="bg-blue-400 text-white px-8 py-4 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 text-xl font-semibold flex items-center justify-center gap-2 mx-auto"
            >
              Siguiente <FaHeart className="animate-pulse" />
            </button>
          </>
        ) : (
          <div className="space-y-8">
            {!showFinalMessage ? (
              <>
                {currentGif && (
                  <div className="relative w-full max-w-md mx-auto mb-6">
                    <img
                      src={currentGif}
                      alt="Reacción"
                      className="w-auto max-h-64 mx-auto"
                    />
                  </div>
                )}
                <p className="text-2xl font-bold text-blue-400">{message}</p>
                <h2 className="text-5xl font-bold text-blue-400 mb-10">
                  ¿Quieres ser mi San Valentín? 💝
                </h2>
                {showButtons && (
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                      onClick={() => handleResponse('yes')}
                      className="bg-blue-400 text-white px-8 py-4 rounded-full hover:bg-blue-500 transition-all duration-300 transform hover:scale-110 text-xl font-bold flex items-center justify-center gap-2"
                    >
                      ¡Sí! <FaCheck />
                    </button>
                    {currentStep < 3 && (
                      <button
                        onClick={() => handleResponse('think')}
                        className="bg-purple-400 text-white px-8 py-4 rounded-full hover:bg-purple-500 transition-all duration-300 transform hover:scale-110 text-xl font-bold flex items-center justify-center gap-2"
                      >
                        {currentStep === 1 ? 'Déjame pensarlo' : 'Pensar más'} <FaQuestion />
                      </button>
                    )}
                    {currentStep >= 3 && (
                      <button
                        onClick={() => handleResponse('no')}
                        className="bg-red-400 text-white px-8 py-4 rounded-full hover:bg-red-500 transition-all duration-300 transform hover:scale-110 text-xl font-bold flex items-center justify-center gap-2"
                      >
                        No <FaTimes />
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <>
                <div ref={screenshotRef} className="final-message">
                  {formData.imageUrl && !imageError ? (
                    <div className="w-full max-w-md mx-auto mb-6">
                      <img
                        src={getProxiedImageUrl(formData.imageUrl)}
                        alt="Valentine"
                        className="w-auto max-h-64 mx-auto"
                        onError={handleImageError}
                        crossOrigin="anonymous"
                      />
                    </div>
                  ) : (
                    <div className="w-full max-w-md mx-auto mb-6">
                      <img
                        src="/sii.gif"
                        alt="Celebración"
                        className="w-auto max-h-64 mx-auto"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-center text-3xl font-bold text-blue-400 mb-4 gap-3">
                    <span>{formData.senderName}</span>
                    <FaHeart className="text-red-500 text-4xl" />
                    <span>{formData.receiverName}</span>
                  </div>
                  <p className="text-xl text-gray-700 mb-4">{formData.message}</p>
                </div>
                <button
                  onClick={handleScreenshot}
                  className="bg-blue-400 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition-all duration-300 flex items-center gap-2 mx-auto no-screenshot"
                >
                  <FaCamera /> Guardar Recuerdo
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

ValentinePreview.propTypes = {
  formData: PropTypes.shape({
    senderName: PropTypes.string.isRequired,
    receiverName: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  step: PropTypes.number.isRequired,
  onNextStep: PropTypes.func.isRequired,
};

export default ValentinePreview;

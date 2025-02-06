import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { FaCamera, FaHeart, FaTimes } from 'react-icons/fa';

function ValentinePreview({ formData }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentGif, setCurrentGif] = useState(null);
  const [message, setMessage] = useState('');
  const [showButtons, setShowButtons] = useState(true);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showOriginalContent, setShowOriginalContent] = useState(true);
  const screenshotRef = useRef(null);

  const getProxiedImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('/')) return url;
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
    setShowOriginalContent(false);
    setShowButtons(true);

    if (response === 'yes') {
      setShowFinalMessage(true);
      setCurrentGif('/sii.gif');
      setMessage('Sabia que lo presionarías amor 💖');
      setShowButtons(false);
    } else if (response === 'no') {
      switch (currentStep) {
        case 1:
          setCurrentGif('/acepta.gif');
          setMessage('¿Por qué no? Acepta :c');
          setCurrentStep(2);
          break;
        case 2:
          setCurrentGif('/cry.gif');
          setMessage('Mal@ Acepta, sip?');
          setCurrentStep(3);
          break;
        case 3:
          setCurrentGif('/YandereYunoGun.gif');
          setMessage('Pues aunque no quieras tendré que ir a tu casa y tomarte por la fuerza');
          setCurrentStep(4);
          break;
        default:
          break;
      }
    } else if (response === 'think') {
      switch (currentStep) {
        case 2:
          setCurrentGif('/andaleacepta.gif');
          setMessage('Andaaaa acepta sii?');
          setCurrentStep(3);
          break;
        default:
          break;
      }
    } else if (response === 'force-yes') {
      setShowFinalMessage(true);
      setCurrentGif('/sii.gif');
      setMessage('¡Sii sabía que lo presionarías! 💖');
      setShowButtons(false);
    }
  };

  const renderButtons = () => {
    if (currentStep === 4) {
      return (
        <button
          onClick={() => handleResponse('force-yes')}
          className="valentine-button"
        >
          Bueno está bien <FaHeart className="ml-2" />
        </button>
      );
    }

    return (
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleResponse('yes')}
          className="valentine-button"
        >
          ¡Sí! <FaHeart className="ml-2" />
        </button>
        {currentStep === 1 || currentStep === 2 ? (
          <button
            onClick={() => handleResponse(currentStep === 1 ? 'no' : 'think')}
            className="valentine-button bg-gray-400 hover:bg-gray-500"
          >
            {currentStep === 1 ? 'No' : 'Lo pensaré más'} <FaTimes className="ml-2" />
          </button>
        ) : (
          <button
            onClick={() => handleResponse('no')}
            className="valentine-button bg-gray-400 hover:bg-gray-500"
          >
            No <FaTimes className="ml-2" />
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="valentine-form">
      <FaHeart className="corner-hearts top-left" />
      <FaHeart className="corner-hearts top-right" />
      <FaHeart className="corner-hearts bottom-left" />
      <FaHeart className="corner-hearts bottom-right" />

      {!showFinalMessage ? (
        <div className="space-y-6">
          <h2 className="valentine-title">¿Quieres ser mi San Valentín?</h2>

          {showOriginalContent ? (
            <>
              {formData.imageUrl && !imageError && (
                <div className="flex justify-center mb-6">
                  <img
                    src={getProxiedImageUrl(formData.imageUrl)}
                    alt="Valentine"
                    className="max-w-[300px] max-h-[300px] object-contain rounded-lg"
                    onError={handleImageError}
                    crossOrigin="anonymous"
                  />
                </div>
              )}

              <div className="text-center space-y-4">
                <p className="text-2xl font-playfair text-pink-600">Para: {formData.receiverName}</p>
                <p className="text-lg text-gray-700">{formData.message}</p>
                <p className="text-xl font-playfair text-pink-600">Con amor, {formData.senderName}</p>
              </div>
            </>
          ) : (
            <>
              {currentGif && (
                <div className="flex justify-center mb-6">
                  <img
                    src={currentGif}
                    alt="Reacción"
                    className="max-w-[300px] max-h-[300px] object-contain rounded-lg"
                  />
                </div>
              )}
              <p className="text-xl text-center text-pink-600 font-playfair">{message}</p>
            </>
          )}

          {showButtons && renderButtons()}
        </div>
      ) : (
        <div className="relative">
          <div ref={screenshotRef} className="valentine-form">
            <div className="relative">
              <FaHeart className="screenshot-hearts" style={{ top: '10px', left: '10px' }} />
              <FaHeart className="screenshot-hearts" style={{ top: '10px', right: '10px' }} />
              <FaHeart className="screenshot-hearts" style={{ bottom: '10px', left: '10px' }} />
              <FaHeart className="screenshot-hearts" style={{ bottom: '10px', right: '10px' }} />

              <h2 className="valentine-title">¡Feliz San Valentín!</h2>

              {currentGif && (
                <div className="flex justify-center mb-6">
                  <img
                    src={currentGif}
                    alt="Celebración"
                    className="max-w-[300px] max-h-[300px] object-contain rounded-lg"
                  />
                </div>
              )}

              <div className="text-center space-y-4">
                <div className="flex items-center justify-center text-2xl font-playfair text-pink-600 gap-3">
                  <span>{formData.senderName}</span>
                  <FaHeart className="text-red-500" />
                  <span>{formData.receiverName}</span>
                </div>
                <p className="text-lg text-gray-700">{formData.message}</p>
                <p className="text-xl text-pink-600">{message}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleScreenshot}
            className="valentine-button no-screenshot mt-6"
          >
            <FaCamera className="mr-2" /> Guardar Recuerdo
          </button>
        </div>
      )}
    </div>
  );
}

ValentinePreview.propTypes = {
  formData: PropTypes.shape({
    senderName: PropTypes.string.isRequired,
    receiverName: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default ValentinePreview;

import PropTypes from 'prop-types';
import { FaHeart } from 'react-icons/fa';

function ValentineForm({ formData, onInputChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="valentine-form">
      <FaHeart className="corner-hearts top-left" />
      <FaHeart className="corner-hearts top-right" />
      <FaHeart className="corner-hearts bottom-left" />
      <FaHeart className="corner-hearts bottom-right" />

      <h2 className="valentine-title">Valentine&apos;s Day</h2>

      <div className="space-y-4">
        <div>
          <label className="valentine-label">Tu Nombre</label>
          <input
            type="text"
            name="senderName"
            value={formData.senderName}
            onChange={onInputChange}
            className="valentine-input"
            placeholder="¿Quién envía este mensaje de amor?"
            required
          />
        </div>
        <div>
          <label className="valentine-label">Nombre de tu San Valentín</label>
          <input
            type="text"
            name="receiverName"
            value={formData.receiverName}
            onChange={onInputChange}
            className="valentine-input"
            placeholder="¿Para quién es este mensaje especial?"
            required
          />
        </div>
        <div>
          <label className="valentine-label">URL de Imagen (Opcional)</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={onInputChange}
            className="valentine-input"
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>
        <div>
          <label className="valentine-label">Mensaje Personalizado</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={onInputChange}
            className="valentine-input"
            style={{ minHeight: "120px" }}
            placeholder="Escribe un mensaje especial para tu San Valentín..."
            required
          />
        </div>
      </div>
      <div className="flex justify-center mt-6">
        <button
          type="submit"
          className="valentine-button"
        >
          <FaHeart className="mr-2" /> Crear Tarjeta
        </button>
      </div>
    </form>
  );
}

ValentineForm.propTypes = {
  formData: PropTypes.shape({
    senderName: PropTypes.string.isRequired,
    receiverName: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ValentineForm;

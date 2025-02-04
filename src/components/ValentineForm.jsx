import PropTypes from 'prop-types';

function ValentineForm({ formData, onInputChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-8 mx-auto">
      <h1 className="text-4xl font-bold text-center text-blue-400 mb-8">Crea tu Mensaje de San Valentín</h1>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 text-lg mb-2">Tu Nombre</label>
          <input
            type="text"
            name="senderName"
            value={formData.senderName}
            onChange={onInputChange}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-lg mb-2">Nombre de tu San Valentín</label>
          <input
            type="text"
            name="receiverName"
            value={formData.receiverName}
            onChange={onInputChange}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 text-lg mb-2">URL de Imagen (opcional)</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={onInputChange}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 text-lg mb-2">Mensaje Personalizado</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={onInputChange}
            className="w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-40 text-lg"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-400 text-white py-4 rounded-lg mt-8 hover:bg-blue-500 transition-colors text-xl font-semibold"
      >
        Generar Mensaje ❤️
      </button>
    </form>
  );
}

ValentineForm.propTypes = {
  formData: PropTypes.shape({
    senderName: PropTypes.string.isRequired,
    receiverName: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ValentineForm;

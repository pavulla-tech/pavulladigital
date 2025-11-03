import { QrCode } from 'lucide-react';

interface QRScannerModalProps {
  onClose: () => void;
}

const QRScannerModal = ({ onClose }: QRScannerModalProps) => {
  const handleScan = () => {
    alert('Check-in realizado com sucesso no Quarto 101!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
        <div className="w-48 h-48 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
          <QrCode className="w-24 h-24 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Escanear QR Code</h3>
        <p className="text-gray-600 mb-6">Aponte a câmera para o código QR do quarto</p>
        <div className="space-y-3">
          <button
            onClick={handleScan}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition"
          >
            Simular Check-in
          </button>
          <button
            onClick={onClose}
            className="w-full bg-muted text-gray-700 py-3 rounded-xl font-semibold hover:bg-muted/80 transition"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRScannerModal;

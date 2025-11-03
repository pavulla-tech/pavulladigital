import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, Camera, QrCode, Trophy, Zap, Gift, ChevronRight } from 'lucide-react';
import BackgroundWithLogo from '@/components/BackgroundWithLogo';
import Header from '@/components/Header';
import QRScannerModal from '@/components/QRScannerModal';
import { useApp } from '@/contexts/AppContext';

const Home = () => {
  const navigate = useNavigate();
  const { currentUser } = useApp();
  const [showQRScanner, setShowQRScanner] = useState(false);

  return (
    <div className="min-h-screen">
      <BackgroundWithLogo />
      <Header />
      
      <div className="max-w-6xl mx-auto p-4 pb-24 relative z-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Olá, {currentUser?.name}!</h2>
          <p className="text-blue-100">O que você gostaria de fazer hoje?</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => navigate('/quiz')}
            className="gradient-quiz rounded-2xl p-6 shadow-glow hover:shadow-xl transition-all transform hover:scale-105 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="w-12 h-12 text-white" />
                <Zap className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Quiz PAVULLA</h3>
              <p className="text-white text-sm mb-3 font-medium">Teste seus conhecimentos e ganhe prêmios!</p>
              <div className="flex items-center gap-2 text-white text-sm">
                <Gift className="w-5 h-5" />
                <span className="font-semibold">Boné, Agenda e muito mais!</span>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/agenda')}
            className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-all transform hover:scale-105 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <Calendar className="w-7 h-7 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800">Agenda do Dia</h3>
                <p className="text-sm text-gray-600">Ver atividades</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>

          <button
            onClick={() => navigate('/memories')}
            className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-all transform hover:scale-105 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <Camera className="w-7 h-7 text-secondary" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800">Memórias</h3>
                <p className="text-sm text-gray-600">Compartilhar momentos</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>

          <button
            onClick={() => setShowQRScanner(true)}
            className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant hover:shadow-glow transition-all transform hover:scale-105 flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition">
                <QrCode className="w-7 h-7 text-green-600" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-800">Check-in QR</h3>
                <p className="text-sm text-gray-600">Escanear código</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-gray-400" />
          </button>

          <div className="gradient-primary rounded-2xl p-6 shadow-elegant text-white">
            <Clock className="w-8 h-8 mb-3" />
            <h3 className="text-lg font-bold mb-1">Próxima Atividade</h3>
            <p className="text-sm opacity-90">Exercícios Matinais</p>
            <p className="text-2xl font-bold mt-2">09:30</p>
          </div>
        </div>
      </div>

      {showQRScanner && <QRScannerModal onClose={() => setShowQRScanner(false)} />}
    </div>
  );
};

export default Home;

// src/pages/Home.tsx
import { useState, useEffect } from 'react';
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
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualiza o horário a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Formata a hora no formato HH:MM:SS
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Formata a data completa
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen">
      <BackgroundWithLogo />
      <Header />
      
      <div className="max-w-6xl mx-auto p-4 pb-24 relative z-10">
        {/* Cabeçalho - Saudação e Data */}
        <div className="mb-6">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-5 shadow-elegant">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Olá, {currentUser?.name || 'Visitante'}!
            </h2>
            <p className="text-gray-600 text-sm capitalize">
              {formatDate(currentTime)}
            </p>
          </div>
        </div>

        {/* Grid 2x2 - Horário e Próxima Atividade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Card Horário Atual */}
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-6 h-6 text-primary" />
              <span className="text-sm text-gray-600 font-medium">
                Horário Atual
              </span>
            </div>
            <p className="text-4xl font-bold text-primary tabular-nums">
              {formatTime(currentTime)}
            </p>
          </div>

          {/* Card Próxima Atividade */}
          <div className="gradient-primary rounded-2xl p-6 shadow-elegant text-white">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-6 h-6" />
              <span className="text-sm font-medium">Próxima Atividade</span>
            </div>
            <p className="text-sm opacity-90 mb-1">Exercícios Matinais</p>
            <p className="text-4xl font-bold">09:30</p>
          </div>
        </div>

        {/* Grid de Ações - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quiz PAVULLA */}
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

          {/* Agenda do Dia */}
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

          {/* Memórias */}
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

          {/* Check-in QR */}
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
        </div>
      </div>

      {showQRScanner && <QRScannerModal onClose={() => setShowQRScanner(false)} />}
    </div>
  );
};

export default Home;
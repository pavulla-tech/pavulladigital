import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import BackgroundWithLogo from '@/components/BackgroundWithLogo';
import { useApp } from '@/contexts/AppContext';

const Register = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();
  const [registerForm, setRegisterForm] = useState({ name: '', phone: '', password: '' });

  const handleRegister = () => {
    if (registerForm.name && registerForm.phone && registerForm.password) {
      setCurrentUser({ name: registerForm.name, phone: registerForm.phone });
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BackgroundWithLogo />
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-glow w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-secondary rounded-2xl transform -rotate-6"></div>
            <div className="absolute inset-0 bg-secondary rounded-2xl flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-gray-800 mb-1">PAVULLA</h1>
          <p className="text-sm text-secondary font-semibold mb-2">Criar Nova Conta</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
            <input
              type="text"
              value={registerForm.name}
              onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-secondary focus:outline-none transition"
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Celular</label>
            <input
              type="tel"
              value={registerForm.phone}
              onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-secondary focus:outline-none transition"
              placeholder="+258 8# ### ####"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={registerForm.password}
              onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-secondary focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <button
            onClick={handleRegister}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3 rounded-xl font-semibold transition shadow-elegant"
          >
            Criar Conta
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-secondary hover:text-secondary/80 font-medium"
          >
            Voltar para login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

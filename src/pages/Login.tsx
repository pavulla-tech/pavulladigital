import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundWithLogo from '@/components/BackgroundWithLogo';
import { useApp } from '@/contexts/AppContext';

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useApp();
  const [loginForm, setLoginForm] = useState({ phone: '', password: '' });

  const handleLogin = () => {
    if (loginForm.phone && loginForm.password) {
      setCurrentUser({ name: 'Usuário', phone: loginForm.phone });
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <BackgroundWithLogo />
      <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-3xl shadow-glow w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 relative">
            <div className="absolute inset-0 bg-primary rounded-2xl transform rotate-6"></div>
            <div className="absolute inset-0 gradient-primary rounded-2xl flex items-center justify-center">
              <span className="text-5xl font-black text-white">P</span>
            </div>
          </div>
          <h1 className="text-3xl font-black text-gray-800 mb-1">PAVULLA</h1>
          <p className="text-sm text-secondary font-semibold mb-2">Confiável. Digital. Local.</p>
          <p className="text-gray-600">Entre para continuar</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Celular</label>
            <input
              type="tel"
              value={loginForm.phone}
              onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none transition"
              placeholder="+258 8# ### ####"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Senha</label>
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-primary focus:outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <button
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 rounded-xl font-semibold transition shadow-elegant"
          >
            Entrar
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/register')}
            className="text-primary hover:text-primary/80 font-medium"
          >
            Criar nova conta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useApp();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login');
  };

  return (
    <header className="bg-white bg-opacity-95 backdrop-blur-sm shadow-elegant sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 relative">
            <div className="absolute inset-0 gradient-primary rounded-xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black text-white">P</span>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-800">PAVULLA</h1>
            <p className="text-xs text-gray-600">{currentUser?.name}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full transition"
        >
          <LogOut className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </header>
  );
};

export default Header;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Heart } from 'lucide-react';
import BackgroundWithLogo from '@/components/BackgroundWithLogo';
import Header from '@/components/Header';
import AddMemoryModal from '@/components/AddMemoryModal';
import { useApp } from '@/contexts/AppContext';

const Memories = () => {
  const navigate = useNavigate();
  const { memories, addMemory, likeMemory } = useApp();
  const [showAddMemory, setShowAddMemory] = useState(false);

  return (
    <div className="min-h-screen">
      <BackgroundWithLogo />
      <Header />

      <div className="max-w-4xl mx-auto p-4 pb-24 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Memórias</h2>
          <button
            onClick={() => navigate('/home')}
            className="text-white hover:text-secondary font-medium bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm transition"
          >
            Voltar
          </button>
        </div>

        <button
          onClick={() => setShowAddMemory(true)}
          className="w-full bg-secondary hover:bg-secondary/90 text-white py-4 rounded-2xl font-semibold transition shadow-elegant mb-6 flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Compartilhar Memória
        </button>

        <div className="space-y-4">
          {memories.map((memory) => (
            <div key={memory.id} className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-5 shadow-elegant">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                  {memory.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800">{memory.user}</h4>
                  <p className="text-xs text-gray-500">{memory.timestamp}</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">{memory.comment}</p>
              <button
                onClick={() => likeMemory(memory.id)}
                className="flex items-center gap-2 text-red-500 hover:text-red-600 transition"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span className="font-semibold">{memory.likes}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {showAddMemory && (
        <AddMemoryModal
          onClose={() => setShowAddMemory(false)}
          onAdd={addMemory}
        />
      )}
    </div>
  );
};

export default Memories;

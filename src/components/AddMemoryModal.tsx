import { X } from 'lucide-react';
import { useState } from 'react';

interface AddMemoryModalProps {
  onClose: () => void;
  onAdd: (comment: string) => void;
}

const AddMemoryModal = ({ onClose, onAdd }: AddMemoryModalProps) => {
  const [newMemory, setNewMemory] = useState('');

  const handleAdd = () => {
    if (newMemory.trim()) {
      onAdd(newMemory);
      setNewMemory('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Nova Memória</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <textarea
          value={newMemory}
          onChange={(e) => setNewMemory(e.target.value)}
          className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-secondary focus:outline-none transition resize-none"
          rows={4}
          placeholder="Compartilhe um momento especial..."
        />
        <button
          onClick={handleAdd}
          className="w-full mt-4 bg-secondary hover:bg-secondary/90 text-white py-3 rounded-xl font-semibold transition"
        >
          Publicar
        </button>
      </div>
    </div>
  );
};

export default AddMemoryModal;

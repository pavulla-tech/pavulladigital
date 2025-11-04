import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Heart, Image as ImageIcon, X, MessageCircle, Send, Camera } from 'lucide-react';
import BackgroundWithLogo from '@/components/BackgroundWithLogo';
import Header from '@/components/Header';
import { useApp } from '@/contexts/AppContext';

const Memories = () => {
  const navigate = useNavigate();
  
  // Verificar se useApp está funcionando
  let appContext;
  try {
    appContext = useApp();
  } catch (error) {
    console.error('Erro ao acessar AppContext:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erro no Context</h2>
          <p className="text-gray-700">Verifique se o AppProvider está configurado.</p>
        </div>
      </div>
    );
  }

  const { memories = [], addMemory, likeMemory } = appContext;

  const [showAddMemory, setShowAddMemory] = useState(false);
  const [newMemory, setNewMemory] = useState({ comment: '', image: '' });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedMemory, setSelectedMemory] = useState<number | null>(null);
  const [comments, setComments] = useState<{[key: number]: Array<{text: string; author: string; timestamp: string}>}>({});
  const [newComment, setNewComment] = useState('');
  const [showImageModal, setShowImageModal] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log('Memories component mounted');
  console.log('Memories count:', memories.length);

  // Função para abrir seletor de imagens
  const handleImageSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Processar arquivo selecionado
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validar tipo
      if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione apenas arquivos de imagem.');
        return;
      }

      // Validar tamanho (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('A imagem deve ter no máximo 5MB.');
        return;
      }

      // Criar preview
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setNewMemory({ ...newMemory, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Remover imagem
  const handleRemoveImage = () => {
    setPreviewImage(null);
    setNewMemory({ ...newMemory, image: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Publicar nova memória
  const handleAddMemory = () => {
    try {
      if (!newMemory.comment.trim() && !newMemory.image) {
        alert('Adicione uma foto ou escreva algo para publicar.');
        return;
      }

      console.log('Adding memory:', newMemory);
      addMemory(newMemory);

      // Limpar formulário
      setNewMemory({ comment: '', image: '' });
      setPreviewImage(null);
      setShowAddMemory(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Erro ao adicionar memória:', error);
      alert('Erro ao publicar memória. Verifique o console.');
    }
  };

  // Adicionar comentário
  const handleAddComment = (memoryId: number) => {
    if (!newComment.trim()) return;

    const comment = {
      text: newComment,
      author: 'Usuário',
      timestamp: new Date().toISOString(),
    };

    setComments({
      ...comments,
      [memoryId]: [...(comments[memoryId] || []), comment],
    });
    setNewComment('');
  };

  // Formatar timestamp
  const formatTimestamp = (timestamp: string): string => {
    if (!timestamp) return '';
    
    // Se já for uma string formatada, retornar
    if (typeof timestamp === 'string' && !timestamp.includes('T') && !timestamp.includes('-')) {
      return timestamp;
    }

    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'agora';
      if (diffMins < 60) return `há ${diffMins}min`;
      if (diffHours < 24) return `há ${diffHours}h`;
      if (diffDays < 7) return `há ${diffDays}d`;
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
    } catch (error) {
      console.error('Erro ao formatar timestamp:', error);
      return timestamp;
    }
  };

  return (
    <div className="min-h-screen">
      <BackgroundWithLogo />
      <Header />

      <div className="max-w-4xl mx-auto p-4 pb-24 relative z-10">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Memórias</h2>
          <button
            onClick={() => navigate('/home')}
            className="text-white hover:text-secondary font-medium bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm transition"
          >
            Voltar
          </button>
        </div>

        {/* Botão Compartilhar Memória */}
        {!showAddMemory && (
          <button
            onClick={() => setShowAddMemory(true)}
            className="w-full bg-secondary hover:bg-secondary/90 text-white py-4 rounded-2xl font-semibold transition shadow-elegant mb-6 flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Compartilhar Memória
          </button>
        )}

        {/* Formulário de Nova Memória */}
        {showAddMemory && (
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Nova Memória</h3>
              <button
                onClick={() => {
                  setShowAddMemory(false);
                  setNewMemory({ comment: '', image: '' });
                  setPreviewImage(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Área de Texto */}
            <textarea
              value={newMemory.comment}
              onChange={(e) => setNewMemory({ ...newMemory, comment: e.target.value })}
              placeholder="Compartilhe um momento especial..."
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-secondary focus:outline-none resize-none mb-3"
              rows={4}
            />

            {/* Preview da Imagem */}
            {previewImage && (
              <div className="relative mb-3">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-xl"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Input de Arquivo (Oculto) */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Botões de Ação */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleImageSelect}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-primary rounded-lg hover:bg-blue-100 transition"
              >
                <ImageIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Adicionar Foto</span>
              </button>

              <button
                onClick={handleAddMemory}
                disabled={!newMemory.comment.trim() && !newMemory.image}
                className="flex-1 bg-secondary text-white py-2 rounded-lg font-semibold hover:bg-secondary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Publicar
              </button>
            </div>
          </div>
        )}

        {/* Lista de Memórias */}
        <div className="space-y-4">
          {memories.length === 0 ? (
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 shadow-elegant text-center">
              <Camera className="w-16 h-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhuma memória compartilhada ainda.</p>
              <p className="text-gray-400 text-sm">Seja o primeiro a compartilhar!</p>
            </div>
          ) : (
            memories.map((memory) => (
              <div key={memory.id} className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-5 shadow-elegant">
                {/* Cabeçalho da Publicação */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 gradient-primary rounded-full flex items-center justify-center text-white font-bold">
                    {memory.user?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{memory.user || 'Usuário'}</h4>
                    <p className="text-xs text-gray-500">{formatTimestamp(memory.timestamp)}</p>
                  </div>
                </div>

                {/* Texto da Publicação */}
                {memory.comment && (
                  <p className="text-gray-700 mb-3 leading-relaxed">{memory.comment}</p>
                )}

                {/* Imagem da Publicação */}
                {(memory as any).image && (
                  <img
                    src={(memory as any).image}
                    alt="Memória"
                    className="w-full rounded-xl mb-3 cursor-pointer hover:opacity-95 transition"
                    onClick={() => setShowImageModal((memory as any).image)}
                  />
                )}

                {/* Barra de Interações */}
                <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => likeMemory(memory.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-red-50 hover:text-red-500 transition"
                  >
                    <Heart className="w-5 h-5 fill-current" />
                    <span className="text-sm font-semibold">{memory.likes || 0}</span>
                  </button>

                  <button
                    onClick={() => setSelectedMemory(selectedMemory === memory.id ? null : memory.id)}
                    className="flex items-center gap-2 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">{comments[memory.id]?.length || 0}</span>
                  </button>
                </div>

                {/* Seção de Comentários */}
                {selectedMemory === memory.id && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {/* Lista de Comentários */}
                    {comments[memory.id] && comments[memory.id].length > 0 && (
                      <div className="space-y-3 mb-4">
                        {comments[memory.id].map((comment, index) => (
                          <div key={index} className="flex gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                              {comment.author.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 bg-gray-50 rounded-lg p-3">
                              <p className="font-semibold text-sm text-gray-800">{comment.author}</p>
                              <p className="text-gray-700 text-sm">{comment.text}</p>
                              <p className="text-xs text-gray-500 mt-1">{formatTimestamp(comment.timestamp)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Adicionar Comentário */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Escrever um comentário..."
                        className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-secondary focus:outline-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddComment(memory.id);
                          }
                        }}
                      />
                      <button
                        onClick={() => handleAddComment(memory.id)}
                        disabled={!newComment.trim()}
                        className="bg-secondary text-white p-2 rounded-lg hover:bg-secondary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal de Imagem em Tela Cheia */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(null)}
        >
          <button
            onClick={() => setShowImageModal(null)}
            className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-70 transition"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={showImageModal}
            alt="Memória"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default Memories;
import { Navigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

const Index = () => {
  const { currentUser } = useApp();
  
  // Redireciona para home se logado, senão para login
  return <Navigate to={currentUser ? '/home' : '/login'} replace />;
};

export default Index;

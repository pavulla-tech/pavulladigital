import { createContext, useContext, useState, ReactNode } from 'react';

// Interface do Usuário (ATUALIZADA)
export interface User {
  id?: string;
  name: string;
  email?: string;
  phone?: string;  // ← ADICIONADO
  avatar?: string;
  role?: string;
}

// Interface de Atividade
export interface Activity {
  id: string;
  time: string;
  title: string;
  type: 'meal' | 'visit' | 'activity';
  completed: boolean;
  completedAt?: string;
  day: number;
}

// Interface do Contexto
interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  activities: Activity[];
  toggleActivity: (id: string) => void;
  autoCompleteActivity: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Estado do usuário atual
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: '1',
    name: 'Usuário',
    email: 'usuario@example.com',
    phone: '',
    avatar: '',
    role: 'participant'
  });

  // Estado das atividades
  const [activities, setActivities] = useState<Activity[]>([
    // DIA 5
    { id: 'd5-1', time: '08:00', title: 'Pequeno-almoço', type: 'meal', completed: false, day: 5 },
    { id: 'd5-2', time: '10:00', title: 'Visita da família', type: 'visit', completed: false, day: 5 },
    { id: 'd5-3', time: '12:30', title: 'Almoço', type: 'meal', completed: false, day: 5 },
    { id: 'd5-4', time: '15:00', title: 'Sessão de fisioterapia', type: 'activity', completed: false, day: 5 },
    { id: 'd5-5', time: '19:00', title: 'Jantar', type: 'meal', completed: false, day: 5 },
    
    // DIA 6
    { id: 'd6-1', time: '08:00', title: 'Pequeno-almoço', type: 'meal', completed: false, day: 6 },
    { id: 'd6-2', time: '09:30', title: 'Consulta médica', type: 'activity', completed: false, day: 6 },
    { id: 'd6-3', time: '11:00', title: 'Visita dos netos', type: 'visit', completed: false, day: 6 },
    { id: 'd6-4', time: '12:30', title: 'Almoço', type: 'meal', completed: false, day: 6 },
    { id: 'd6-5', time: '14:30', title: 'Atividade recreativa', type: 'activity', completed: false, day: 6 },
    { id: 'd6-6', time: '19:00', title: 'Jantar', type: 'meal', completed: false, day: 6 },
    
    // DIA 7
    { id: 'd7-1', time: '08:00', title: 'Pequeno-almoço', type: 'meal', completed: false, day: 7 },
    { id: 'd7-2', time: '10:00', title: 'Caminhada no jardim', type: 'activity', completed: false, day: 7 },
    { id: 'd7-3', time: '11:30', title: 'Visita do médico', type: 'visit', completed: false, day: 7 },
    { id: 'd7-4', time: '12:30', title: 'Almoço', type: 'meal', completed: false, day: 7 },
    { id: 'd7-5', time: '14:00', title: 'Sessão de leitura', type: 'activity', completed: false, day: 7 },
    { id: 'd7-6', time: '19:00', title: 'Jantar', type: 'meal', completed: false, day: 7 },
    
    // DIA 8
    { id: 'd8-1', time: '08:00', title: 'Pequeno-almoço', type: 'meal', completed: false, day: 8 },
    { id: 'd8-2', time: '09:00', title: 'Exercícios matinais', type: 'activity', completed: false, day: 8 },
    { id: 'd8-3', time: '10:30', title: 'Visita de amigos', type: 'visit', completed: false, day: 8 },
    { id: 'd8-4', time: '12:30', title: 'Almoço', type: 'meal', completed: false, day: 8 },
    { id: 'd8-5', time: '15:30', title: 'Aula de artesanato', type: 'activity', completed: false, day: 8 },
    { id: 'd8-6', time: '19:00', title: 'Jantar', type: 'meal', completed: false, day: 8 },
    
    // DIA 9
    { id: 'd9-1', time: '08:00', title: 'Pequeno-almoço', type: 'meal', completed: false, day: 9 },
    { id: 'd9-2', time: '09:30', title: 'Análises clínicas', type: 'activity', completed: false, day: 9 },
    { id: 'd9-3', time: '11:00', title: 'Visita da enfermeira', type: 'visit', completed: false, day: 9 },
    { id: 'd9-4', time: '12:30', title: 'Almoço', type: 'meal', completed: false, day: 9 },
    { id: 'd9-5', time: '14:30', title: 'Terapia ocupacional', type: 'activity', completed: false, day: 9 },
    { id: 'd9-6', time: '19:00', title: 'Jantar', type: 'meal', completed: false, day: 9 },
    
    // DIA 10
    { id: 'd10-1', time: '08:00', title: 'Pequeno-almoço', type: 'meal', completed: false, day: 10 },
    { id: 'd10-2', time: '10:00', title: 'Missa/Culto religioso', type: 'activity', completed: false, day: 10 },
    { id: 'd10-3', time: '11:30', title: 'Visita da família', type: 'visit', completed: false, day: 10 },
    { id: 'd10-4', time: '12:30', title: 'Almoço especial', type: 'meal', completed: false, day: 10 },
    { id: 'd10-5', time: '14:00', title: 'Filme ou documentário', type: 'activity', completed: false, day: 10 },
    { id: 'd10-6', time: '19:00', title: 'Jantar', type: 'meal', completed: false, day: 10 }
  ]);

  const toggleActivity = (id: string) => {
    setActivities(prev =>
      prev.map(activity => {
        if (activity.id === id) {
          const newCompleted = !activity.completed;
          return {
            ...activity,
            completed: newCompleted,
            completedAt: newCompleted
              ? new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
              : undefined
          };
        }
        return activity;
      })
    );
  };

  const autoCompleteActivity = (id: string) => {
    setActivities(prev =>
      prev.map(activity => {
        if (activity.id === id && !activity.completed) {
          return {
            ...activity,
            completed: true,
            completedAt: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
          };
        }
        return activity;
      })
    );
  };

  return (
    <AppContext.Provider 
      value={{ 
        currentUser, 
        setCurrentUser,
        activities, 
        toggleActivity, 
        autoCompleteActivity 
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
}
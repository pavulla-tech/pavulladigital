import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Activity, Memory } from '@/types';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  activities: Activity[];
  setActivities: (activities: Activity[]) => void;
  memories: Memory[];
  setMemories: (memories: Memory[]) => void;
  toggleActivity: (id: number) => void;
  addMemory: (comment: string) => void;
  likeMemory: (id: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activities, setActivities] = useState<Activity[]>([
    { id: 1, time: '08:00', title: 'Café da Manhã', type: 'meal', completed: true },
    { id: 2, time: '09:30', title: 'Exercícios Matinais', type: 'activity', completed: false },
    { id: 3, time: '11:00', title: 'Visita - Dr. Silva', type: 'visit', completed: false },
    { id: 4, time: '12:30', title: 'Almoço', type: 'meal', completed: false },
    { id: 5, time: '15:00', title: 'Terapia Ocupacional', type: 'activity', completed: false },
    { id: 6, time: '18:00', title: 'Jantar', type: 'meal', completed: false },
  ]);
  const [memories, setMemories] = useState<Memory[]>([
    { id: 1, user: 'Maria Silva', comment: 'Que dia lindo! A caminhada no jardim foi maravilhosa.', likes: 5, timestamp: '2h atrás' },
    { id: 2, user: 'João Santos', comment: 'Adorei a festa de aniversário de ontem! Obrigado a todos.', likes: 12, timestamp: '5h atrás' },
  ]);

  const toggleActivity = (id: number) => {
    setActivities(activities.map(act => 
      act.id === id ? { ...act, completed: !act.completed } : act
    ));
  };

  const addMemory = (comment: string) => {
    if (comment.trim() && currentUser) {
      setMemories([{
        id: Date.now(),
        user: currentUser.name,
        comment,
        likes: 0,
        timestamp: 'Agora'
      }, ...memories]);
    }
  };

  const likeMemory = (id: number) => {
    setMemories(memories.map(mem => 
      mem.id === id ? { ...mem, likes: mem.likes + 1 } : mem
    ));
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      setCurrentUser,
      activities,
      setActivities,
      memories,
      setMemories,
      toggleActivity,
      addMemory,
      likeMemory,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

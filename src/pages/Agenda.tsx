import { useNavigate } from 'react-router-dom';
import { Clock, Calendar } from 'lucide-react';
import { useState, useEffect } from 'react';
import BackgroundWithLogo from '@/components/BackgroundWithLogo';
import Header from '@/components/Header';
import { useApp } from '@/contexts/AppContext';

const Agenda = () => {
  const navigate = useNavigate();
  const { activities, autoCompleteActivity } = useApp();
  const [selectedDay, setSelectedDay] = useState(5);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualiza o horário atual a cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Atualiza a cada 1 minuto

    return () => clearInterval(timer);
  }, []);

  // Marca automaticamente atividades que passaram do horário
  useEffect(() => {
    const now = new Date();
    const currentDay = now.getDate();
    
    activities.forEach(activity => {
      // Só auto-completar atividades do dia atual
      if (activity.day === currentDay && !activity.completed) {
        const [hours, minutes] = activity.time.split(':').map(Number);
        const activityTime = new Date();
        activityTime.setHours(hours, minutes, 0, 0);
        
        // Se passou do horário, marca automaticamente
        if (now > activityTime) {
          autoCompleteActivity(activity.id);
        }
      }
    });
  }, [currentTime, activities, autoCompleteActivity]);

  // Gera os 6 dias (5 a 10 do mês atual)
  const getDays = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const days = [];

    for (let day = 5; day <= 10; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const dayName = date.toLocaleDateString('pt-PT', { weekday: 'short' });
      days.push({
        day,
        dayName: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        date,
        isToday: today.getDate() === day && today.getMonth() === currentMonth
      });
    }

    return days;
  };

  const days = getDays();

  // Verifica se uma atividade já passou do horário
  const isPastTime = (activityTime: string, activityDay: number) => {
    const now = new Date();
    const currentDay = now.getDate();
    
    // Se for um dia passado, já passou
    if (activityDay < currentDay) return true;
    
    // Se for um dia futuro, ainda não passou
    if (activityDay > currentDay) return false;
    
    // Se for o dia atual, verifica o horário
    const [hours, minutes] = activityTime.split(':').map(Number);
    const activityDate = new Date();
    activityDate.setHours(hours, minutes, 0, 0);
    
    return now > activityDate;
  };

  // Filtra atividades do dia selecionado
  const filteredActivities = activities.filter(activity => activity.day === selectedDay);

  const getActivityIcon = (type: string) => {
    if (type === 'meal') return '🍽️';
    if (type === 'visit') return '👥';
    return '🎯';
  };

  return (
    <div className="min-h-screen">
      <BackgroundWithLogo />
      <Header />

      <div className="max-w-4xl mx-auto p-4 pb-24 relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Agenda do Dia</h2>
          <button
            onClick={() => navigate('/home')}
            className="text-white hover:text-secondary font-medium bg-white bg-opacity-20 px-4 py-2 rounded-lg backdrop-blur-sm transition"
          >
            Voltar
          </button>
        </div>

        {/* Seletor de Dias */}
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-4 shadow-elegant mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-bold text-gray-800">Selecione o Dia</h3>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {days.map((dayInfo) => (
              <button
                key={dayInfo.day}
                onClick={() => setSelectedDay(dayInfo.day)}
                className={`p-3 rounded-xl transition-all ${
                  selectedDay === dayInfo.day
                    ? 'bg-primary text-white shadow-lg scale-105'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                } ${dayInfo.isToday ? 'ring-2 ring-secondary' : ''}`}
              >
                <div className="text-xs font-semibold">{dayInfo.dayName}</div>
                <div className="text-lg font-bold">{dayInfo.day}</div>
                {dayInfo.isToday && (
                  <div className="text-xs mt-1">Hoje</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Horário Atual */}
        <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-xl p-3 mb-4 shadow-md">
          <div className="flex items-center justify-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="font-semibold text-gray-700">
              Horário Atual: {currentTime.toLocaleTimeString('pt-PT', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
        </div>

        {/* Lista de Atividades */}
        <div className="space-y-3">
          {filteredActivities.length === 0 ? (
            <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-8 text-center shadow-elegant">
              <p className="text-gray-500 text-lg">
                Nenhuma atividade agendada para o dia {selectedDay}
              </p>
            </div>
          ) : (
            filteredActivities.map((activity) => {
              const hasPassed = isPastTime(activity.time, activity.day);
              const isCompleted = activity.completed;
              
              return (
                <div
                  key={activity.id}
                  className={`bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-4 shadow-elegant transition ${
                    isCompleted ? 'opacity-70' : hasPassed ? 'opacity-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{getActivityIcon(activity.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className={`text-sm font-semibold ${
                          isCompleted ? 'text-green-600' : hasPassed ? 'text-gray-400' : 'text-gray-600'
                        }`}>
                          {activity.time}
                        </span>
                        {isCompleted && (
                          <span className="text-xs text-green-600 font-medium">✓ Concluído</span>
                        )}
                      </div>
                      <h3 className={`text-lg font-bold ${
                        isCompleted ? 'text-green-700' : hasPassed ? 'text-gray-400' : 'text-gray-800'
                      }`}>
                        {activity.title}
                      </h3>
                      {activity.completedAt && (
                        <p className="text-xs text-green-600 mt-1">
                          Concluído automaticamente às {activity.completedAt}
                        </p>
                      )}
                    </div>
                    {/* Ícone de status - apenas visual */}
                    <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center ${
                      isCompleted
                        ? 'bg-green-500 border-green-500'
                        : hasPassed
                        ? 'bg-gray-300 border-gray-300'
                        : 'border-gray-300'
                    }`}>
                      {isCompleted && <span className="text-white text-xl">✓</span>}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Agenda;
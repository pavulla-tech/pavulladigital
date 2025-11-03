import { useNavigate } from 'react-router-dom';
import { Clock } from 'lucide-react';
import BackgroundWithLogo from '@/components/BackgroundWithLogo';
import Header from '@/components/Header';
import { useApp } from '@/contexts/AppContext';

const Agenda = () => {
  const navigate = useNavigate();
  const { activities, toggleActivity } = useApp();

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

        <div className="space-y-3">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-4 shadow-elegant hover:shadow-glow transition ${
                activity.completed ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="text-3xl">{getActivityIcon(activity.type)}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-600">{activity.time}</span>
                  </div>
                  <h3 className={`text-lg font-bold ${activity.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {activity.title}
                  </h3>
                </div>
                <button
                  onClick={() => toggleActivity(activity.id)}
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition ${
                    activity.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-green-500'
                  }`}
                >
                  {activity.completed && <span className="text-white text-xl">✓</span>}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Agenda;

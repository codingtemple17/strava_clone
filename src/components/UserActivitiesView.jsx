import { useApp } from '../context/AppContext';
import ActivityCard from './ActivityCard';
import { ChevronLeft } from 'lucide-react';

export default function UserActivitiesView({ userId, onBack }) {
  const { getUserById, getActivitiesByUserId } = useApp();
  const user = getUserById(userId);
  const activities = getActivitiesByUserId(userId);

  return (
    <div className="bg-white min-h-[calc(100vh-80px)]">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-strava-border">
        <div className="max-w-lg mx-auto flex items-center gap-2 px-4 py-3">
          <button
            type="button"
            onClick={onBack}
            className="text-strava-dark p-1 -ml-1"
            aria-label="Back"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="min-w-0">
            <h1 className="text-base font-semibold text-strava-dark truncate">
              Activities
            </h1>
            {user?.username && (
              <p className="text-xs text-strava-medium truncate">{user.username}</p>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto">
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <p className="text-4xl mb-3">📝</p>
            <p className="text-strava-dark font-semibold">No activities yet</p>
            <p className="text-sm text-strava-medium mt-1">
              When {user?.username || 'this athlete'} logs workouts, they will show up here.
            </p>
          </div>
        ) : (
          activities.map((activity) => <ActivityCard key={activity.id} activity={activity} />)
        )}
      </main>
    </div>
  );
}

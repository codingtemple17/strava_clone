import { useApp } from '../context/AppContext';
import ActivityCard from './ActivityCard';

export default function ActivityFeed({ onSelectUser }) {
  const { getFeedActivities } = useApp();
  const activities = getFeedActivities();

  if (activities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <p className="text-4xl mb-3">🏃</p>
        <p className="text-strava-dark font-semibold">No activities yet</p>
        <p className="text-sm text-strava-medium mt-1">
          Follow athletes or log your first workout to see activities here.
        </p>
      </div>
    );
  }

  return (
    <div>
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          onSelectUser={onSelectUser}
        />
      ))}
    </div>
  );
}

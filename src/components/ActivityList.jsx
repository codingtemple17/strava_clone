import { useApp } from '../context/AppContext';
import ActivityCard from './ActivityCard';
import { Avatar } from './ActivityCard';

export default function ActivityList() {
  const { getMyActivities, currentUser, users } = useApp();
  const activities = getMyActivities();
  const me = users.find((u) => u.id === currentUser?.id);

  return (
    <div>
      {/* Profile header */}
      {me && (
        <div className="bg-white px-4 py-5 border-b border-strava-border">
          <div className="flex items-center gap-3">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold"
              style={{ backgroundColor: me.profileColor }}
            >
              {me.username.split(' ').map((n) => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h2 className="text-lg font-bold text-strava-dark">{me.username}</h2>
              {me.bio && <p className="text-sm text-strava-medium">{me.bio}</p>}
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <div className="text-center">
              <p className="text-lg font-bold text-strava-dark">{activities.length}</p>
              <p className="text-xs text-strava-medium">Activities</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-strava-dark">{me.following.length}</p>
              <p className="text-xs text-strava-medium">Following</p>
            </div>
          </div>
        </div>
      )}

      {/* Activity list */}
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-strava-dark font-semibold">No activities yet</p>
          <p className="text-sm text-strava-medium mt-1">
            Log your first workout to see it here!
          </p>
        </div>
      ) : (
        activities.map((activity) => (
          <ActivityCard key={activity.id} activity={activity} />
        ))
      )}
    </div>
  );
}

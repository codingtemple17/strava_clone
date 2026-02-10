import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { calculatePace, formatDuration, formatDate } from '../utils/calculations';
import {
  MapPin,
  MoreHorizontal,
  ThumbsUp,
  MessageCircle,
  Share2,
  Send,
} from 'lucide-react';

const TYPE_ICONS = {
  Run: '🏃',
  Ride: '🚴',
  Swim: '🏊',
  Hike: '🥾',
  Walk: '🚶',
  Other: '💪',
};

function Avatar({ user, size = 'md' }) {
  const sizeClasses = size === 'sm' ? 'w-6 h-6 text-[10px]' : 'w-10 h-10 text-sm';
  const initials = user?.username
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase() || '?';

  return (
    <div
      className={`${sizeClasses} rounded-full flex items-center justify-center text-white font-semibold shrink-0 overflow-hidden`}
      style={{ backgroundColor: user?.profileColor || '#6D6D6D' }}
    >
      {user?.profilePhoto ? (
        <img
          src={user.profilePhoto}
          alt=""
          className="w-full h-full object-cover"
          loading="lazy"
        />
      ) : (
        initials
      )}
    </div>
  );
}

export default function ActivityCard({ activity, onSelectUser }) {
  const {
    getUserById,
    getActivityKudos,
    getActivityComments,
    hasGivenKudo,
    toggleKudo,
    addComment,
    currentUser,
  } = useApp();

  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const user = getUserById(activity.userId);
  const activityKudos = getActivityKudos(activity.id);
  const activityComments = getActivityComments(activity.id);
  const userGaveKudo = hasGivenKudo(activity.id);
  const pace = calculatePace(activity.duration, activity.distance);
  const duration = formatDuration(activity.duration);
  const dateStr = formatDate(activity.timestamp);
  const paceUnit = `/${activity.distanceUnit}`;

  function handleComment(e) {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(activity.id, commentText.trim());
    setCommentText('');
  }

  function handleSelectUser() {
    if (!user) return;
    onSelectUser?.(user);
  }

  function handleMediaError(e) {
    const img = e.currentTarget;
    if (img?.dataset?.fallbackApplied) return;
    img.dataset.fallbackApplied = '1';
    img.src = '/highlights/activity-placeholder.svg';
  }

  return (
    <div className="bg-white border-b border-strava-border">
      {/* Header: Avatar + User info + menu */}
      <div className="px-4 pt-4 flex items-start gap-3">
        <button
          type="button"
          onClick={handleSelectUser}
          className="rounded-full focus:outline-none focus:ring-2 focus:ring-strava-orange/40"
          aria-label={`View ${user?.username || 'athlete'} profile`}
        >
          <Avatar user={user} />
        </button>
        <div className="flex-1 min-w-0">
          <button
            type="button"
            onClick={handleSelectUser}
            className="font-semibold text-strava-dark text-sm leading-tight text-left hover:underline"
          >
            {user?.username}
          </button>
          <p className="text-xs text-strava-medium leading-tight mt-0.5">
            {dateStr}
            {activity.device && ` · ${activity.device}`}
          </p>
          {activity.location && (
            <p className="text-xs text-strava-medium flex items-center gap-0.5 mt-0.5">
              <MapPin size={11} className="shrink-0" />
              {activity.location}
            </p>
          )}
        </div>
        <button className="text-strava-medium p-1">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Title & description */}
      <div className="px-4 mt-3">
        <h3 className="text-lg font-bold text-strava-dark leading-tight">
          {TYPE_ICONS[activity.type] || '💪'}{' '}
          {activity.title}
        </h3>
        {activity.description && (
          <p className="text-sm text-strava-dark mt-1">{activity.description}</p>
        )}
      </div>

      {/* Media */}
      {Array.isArray(activity.media) && activity.media.length > 0 && (
        <div className="px-4 mt-3">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {activity.media.map((src) => (
              <img
                key={src}
                src={src}
                alt="Activity media"
                loading="lazy"
                onError={handleMediaError}
                className="w-56 h-40 shrink-0 rounded-2xl object-cover border border-strava-border"
              />
            ))}
          </div>
        </div>
      )}

      {/* Stats row */}
      <div className="px-4 mt-3 flex gap-8">
        <div>
          <p className="text-[11px] text-strava-medium uppercase tracking-wide">Distance</p>
          <p className="text-lg font-bold text-strava-dark">
            {activity.distance} <span className="text-sm font-normal">{activity.distanceUnit}</span>
          </p>
        </div>
        <div>
          <p className="text-[11px] text-strava-medium uppercase tracking-wide">Pace</p>
          <p className="text-lg font-bold text-strava-dark">
            {pace} <span className="text-sm font-normal">{paceUnit}</span>
          </p>
        </div>
        <div>
          <p className="text-[11px] text-strava-medium uppercase tracking-wide">Time</p>
          <p className="text-lg font-bold text-strava-dark">{duration}</p>
        </div>
      </div>

      {/* Kudos summary */}
      {activityKudos.length > 0 && (
        <div className="px-4 mt-3 flex items-center gap-1.5">
          <div className="flex -space-x-1.5">
            {activityKudos.slice(0, 3).map((k) => {
              const kudoUser = getUserById(k.userId);
              return <Avatar key={k.id} user={kudoUser} size="sm" />;
            })}
          </div>
          <span className="text-xs text-strava-medium ml-1">
            {activityKudos.length} gave kudos
          </span>
        </div>
      )}

      {/* Action bar */}
      <div className="px-4 py-3 mt-1 flex items-center gap-6 border-t border-strava-border">
        <button
          onClick={() => toggleKudo(activity.id)}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            userGaveKudo
              ? 'text-strava-orange font-semibold'
              : 'text-strava-medium hover:text-strava-dark'
          }`}
        >
          <ThumbsUp size={18} fill={userGaveKudo ? 'currentColor' : 'none'} />
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-sm text-strava-medium hover:text-strava-dark transition-colors"
        >
          <MessageCircle size={18} />
          {activityComments.length > 0 && (
            <span>{activityComments.length}</span>
          )}
        </button>
        <button className="text-strava-medium hover:text-strava-dark transition-colors">
          <Share2 size={18} />
        </button>
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-strava-border">
          {activityComments.map((c) => {
            const commentUser = getUserById(c.userId);
            return (
              <div key={c.id} className="flex gap-2 mt-3">
                <Avatar user={commentUser} size="sm" />
                <div>
                  <span className="text-xs font-semibold text-strava-dark">
                    {commentUser?.username}
                  </span>
                  <p className="text-sm text-strava-dark">{c.text}</p>
                </div>
              </div>
            );
          })}
          <form onSubmit={handleComment} className="flex gap-2 mt-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 text-sm border border-strava-border rounded-full px-3 py-1.5 focus:outline-none focus:border-strava-orange"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="text-strava-orange disabled:opacity-30 transition-opacity"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export { Avatar };

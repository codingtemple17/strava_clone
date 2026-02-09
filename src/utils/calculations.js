/**
 * Calculate pace from duration (seconds) and distance.
 * Returns formatted string like "6:34"
 */
export function calculatePace(durationSeconds, distance) {
  if (!distance || distance <= 0 || !durationSeconds || durationSeconds <= 0) {
    return '--:--';
  }
  const totalMinutes = durationSeconds / 60;
  const paceMinutes = totalMinutes / distance;
  const mins = Math.floor(paceMinutes);
  const secs = Math.round((paceMinutes - mins) * 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format duration in seconds to "Xh Ym Zs" or "Ym Zs"
 */
export function formatDuration(totalSeconds) {
  if (!totalSeconds || totalSeconds <= 0) return '0m 0s';
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  return `${minutes}m ${seconds}s`;
}

/**
 * Format a timestamp to relative time ("2 hours ago", "Yesterday", etc.)
 */
export function timeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;

  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format a timestamp to a date string like "February 5, 2026 at 6:45 PM"
 */
export function formatDate(timestamp) {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }) + ' at ' + new Date(timestamp).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Parse "HH:MM:SS" or "MM:SS" string into total seconds.
 */
export function parseDuration(str) {
  const parts = str.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  }
  if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  return 0;
}

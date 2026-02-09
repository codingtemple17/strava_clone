const KEYS = {
  USERS: 'strava_users',
  ACTIVITIES: 'strava_activities',
  KUDOS: 'strava_kudos',
  COMMENTS: 'strava_comments',
  CURRENT_USER: 'strava_current_user',
};

export function getItem(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('localStorage write failed:', e);
  }
}

export function getUsers() {
  return getItem(KEYS.USERS) || [];
}

export function setUsers(users) {
  setItem(KEYS.USERS, users);
}

export function getActivities() {
  return getItem(KEYS.ACTIVITIES) || [];
}

export function setActivities(activities) {
  setItem(KEYS.ACTIVITIES, activities);
}

export function getKudos() {
  return getItem(KEYS.KUDOS) || [];
}

export function setKudos(kudos) {
  setItem(KEYS.KUDOS, kudos);
}

export function getComments() {
  return getItem(KEYS.COMMENTS) || [];
}

export function setComments(comments) {
  setItem(KEYS.COMMENTS, comments);
}

export function getCurrentUser() {
  return getItem(KEYS.CURRENT_USER);
}

export function setCurrentUser(user) {
  setItem(KEYS.CURRENT_USER, user);
}

export function clearAll() {
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}

export { KEYS };

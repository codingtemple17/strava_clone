import {
  setUsers,
  setActivities,
  setKudos,
  setComments,
  setCurrentUser,
  getUsers,
  getActivities,
  getKudos,
  getComments,
  getCurrentUser,
} from './localStorage.js';

const USERS = [
  {
    id: 'user-1',
    username: 'Victor Castillo',
    bio: 'Runner & developer. Building cool things at Pursuit.',
    profileColor: '#FC4C02',
    following: ['user-2', 'user-4', 'user-5'],
    isPremium: false,
  },
  {
    id: 'user-2',
    username: 'René Ugarte',
    bio: 'FRNY coached runner. Manhattan miles.',
    profileColor: '#4A90D9',
    following: ['user-1'],
    isPremium: false,
  },
  {
    id: 'user-4',
    username: 'Juan Carlos Franco',
    bio: 'Co-builder of this app. Cyclist and hiker.',
    profileColor: '#2ECC71',
    following: ['user-1', 'user-5'],
    isPremium: false,
    profilePhoto: '/highlights/juan-franco-1.png',
  },
  {
    id: 'user-5',
    username: 'Sarah Chen',
    bio: 'Swimming and yoga enthusiast. NYC life.',
    profileColor: '#9B59B6',
    following: ['user-1', 'user-2'],
    isPremium: false,
  },
];

function daysAgo(days, hour = 8, minute = 0) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.getTime();
}

const ACTIVITIES = [
  // René Ugarte's activities
  {
    id: 'act-1',
    userId: 'user-2',
    title: 'FRNY coached workout',
    description: 'Special thanks to coach Jennifer Spina & coach Mike Keohane',
    type: 'Run',
    distance: 6.59,
    distanceUnit: 'mi',
    duration: 2600, // 43m 20s
    date: daysAgo(3, 18, 45),
    timestamp: daysAgo(3, 18, 45),
    location: 'Manhattan, New York',
    device: 'Garmin fēnix 5X Plus',
  },
  {
    id: 'act-2',
    userId: 'user-2',
    title: 'Easy recovery run',
    description: 'Keeping it light today. Central Park loop.',
    type: 'Run',
    distance: 3.1,
    distanceUnit: 'mi',
    duration: 1680, // 28m
    date: daysAgo(5, 7, 30),
    timestamp: daysAgo(5, 7, 30),
    location: 'Central Park, New York',
    device: 'Garmin fēnix 5X Plus',
  },
  {
    id: 'act-3',
    userId: 'user-2',
    title: 'Long run Saturday',
    description: 'Building up that base mileage. Felt strong throughout.',
    type: 'Run',
    distance: 10.2,
    distanceUnit: 'mi',
    duration: 5100, // 1h 25m
    date: daysAgo(7, 6, 0),
    timestamp: daysAgo(7, 6, 0),
    location: 'Manhattan, New York',
    device: 'Garmin fēnix 5X Plus',
  },
  // Victor Castillo's activities
  {
    id: 'act-7',
    userId: 'user-1',
    title: 'Afternoon run in the park',
    description: 'Nice and easy. Enjoying the weather.',
    type: 'Run',
    distance: 4.0,
    distanceUnit: 'mi',
    duration: 2160, // 36m
    date: daysAgo(1, 16, 0),
    timestamp: daysAgo(1, 16, 0),
    location: 'Prospect Park, Brooklyn',
    device: 'Apple Watch',
    media: [
      '/highlights/ducks-images.jpg',
      '/highlights/victor-8364.jpg',
      '/highlights/victor-7641.jpg',
    ],
  },
  {
    id: 'act-8',
    userId: 'user-1',
    title: 'Weekend hike',
    description: 'Got out of the city for some trails. Much needed reset.',
    type: 'Hike',
    distance: 6.2,
    distanceUnit: 'mi',
    duration: 7200, // 2h
    date: daysAgo(5, 9, 0),
    timestamp: daysAgo(5, 9, 0),
    location: 'Bear Mountain, NY',
    device: 'Apple Watch',
  },
  {
    id: 'act-9',
    userId: 'user-1',
    title: 'Lunch walk',
    description: 'Quick walk to clear the head between coding sessions.',
    type: 'Walk',
    distance: 1.5,
    distanceUnit: 'mi',
    duration: 1200, // 20m
    date: daysAgo(3, 12, 30),
    timestamp: daysAgo(3, 12, 30),
    location: 'Downtown Brooklyn',
    device: 'Apple Watch',
  },
  // Juan Franco's activities
  {
    id: 'act-10',
    userId: 'user-4',
    title: 'Riverside cycling',
    description: 'Great ride along the Hudson. Headwind on the way back though.',
    type: 'Ride',
    distance: 18.5,
    distanceUnit: 'mi',
    duration: 3600, // 1h
    date: daysAgo(2, 10, 0),
    timestamp: daysAgo(2, 10, 0),
    location: 'Hudson River Greenway, NYC',
    device: 'Garmin Edge 530',
    media: ['/highlights/juan-franco-1.png'],
  },
  {
    id: 'act-11',
    userId: 'user-4',
    title: 'Trail hike with the crew',
    description: 'Sunday vibes on the trails. Beautiful views at the top.',
    type: 'Hike',
    distance: 7.8,
    distanceUnit: 'mi',
    duration: 10800, // 3h
    date: daysAgo(6, 8, 0),
    timestamp: daysAgo(6, 8, 0),
    location: 'Harriman State Park, NY',
    device: 'Garmin Edge 530',
    media: ['/highlights/juan-franco-2.png'],
  },
  {
    id: 'act-14',
    userId: 'user-4',
    title: 'Alley Pond trail run',
    description: 'Easy trail miles and good vibes.',
    type: 'Run',
    distance: 4.2,
    distanceUnit: 'mi',
    duration: 2520, // 42m
    date: daysAgo(9, 7, 15),
    timestamp: daysAgo(9, 7, 15),
    location: 'Queens, New York',
    device: 'Apple Watch',
    media: ['/highlights/juan-franco-3.png'],
  },
  // Sarah Chen's activities
  {
    id: 'act-12',
    userId: 'user-5',
    title: 'Morning swim laps',
    description: 'Worked on technique today. Flip turns getting better.',
    type: 'Swim',
    distance: 1.2,
    distanceUnit: 'mi',
    duration: 2700, // 45m
    date: daysAgo(1, 6, 30),
    timestamp: daysAgo(1, 6, 30),
    location: 'Chelsea Recreation Center, NYC',
    device: 'Apple Watch Ultra',
    media: ['/highlights/sarah-swimming-1.png'],
  },
  {
    id: 'act-13',
    userId: 'user-5',
    title: 'Brooklyn Bridge run',
    description: 'Ran across the bridge and back. Tourist dodge level: expert.',
    type: 'Run',
    distance: 5.5,
    distanceUnit: 'mi',
    duration: 2970, // 49m 30s
    date: daysAgo(4, 7, 0),
    timestamp: daysAgo(4, 7, 0),
    location: 'Brooklyn Bridge, NYC',
    device: 'Apple Watch Ultra',
  },
];

const KUDOS = [
  { id: 'k-1', activityId: 'act-1', userId: 'user-1', timestamp: daysAgo(3, 19, 0) },
  { id: 'k-3', activityId: 'act-1', userId: 'user-5', timestamp: daysAgo(3, 20, 0) },
  { id: 'k-6', activityId: 'act-7', userId: 'user-2', timestamp: daysAgo(1, 17, 0) },
  { id: 'k-7', activityId: 'act-7', userId: 'user-4', timestamp: daysAgo(1, 17, 30) },
  { id: 'k-9', activityId: 'act-10', userId: 'user-1', timestamp: daysAgo(2, 11, 0) },
  { id: 'k-10', activityId: 'act-12', userId: 'user-1', timestamp: daysAgo(1, 7, 0) },
  { id: 'k-14', activityId: 'act-8', userId: 'user-4', timestamp: daysAgo(5, 12, 0) },
  { id: 'k-15', activityId: 'act-13', userId: 'user-2', timestamp: daysAgo(4, 9, 0) },
  { id: 'k-16', activityId: 'act-13', userId: 'user-1', timestamp: daysAgo(4, 10, 0) },
];

const COMMENTS = [
  { id: 'c-1', activityId: 'act-1', userId: 'user-1', text: 'Great pace René! Those coaches are making a difference.', timestamp: daysAgo(3, 20, 0) },
  { id: 'c-4', activityId: 'act-7', userId: 'user-4', text: 'Prospect Park is the best for afternoon runs!', timestamp: daysAgo(1, 18, 0) },
  { id: 'c-5', activityId: 'act-10', userId: 'user-1', text: 'That headwind is no joke lol', timestamp: daysAgo(2, 12, 0) },
  { id: 'c-6', activityId: 'act-13', userId: 'user-1', text: 'Tourist dodge level 😂 so real', timestamp: daysAgo(4, 11, 0) },
];

export function seedData() {
  // Seed if empty; otherwise migrate existing data for new fields/content.
  if (getUsers().length === 0) {
    setUsers(USERS);
    setActivities(ACTIVITIES);
    setKudos(KUDOS);
    setComments(COMMENTS);
    setCurrentUser({ id: 'user-1', username: 'Victor Castillo', isPremium: false });
    return;
  }

  // Migration: ensure Juan's official profile name + seeded media exist.
  const users = getUsers();
  const activities = getActivities();
  const kudos = getKudos();
  const comments = getComments();

  const removedUserIds = new Set(['user-3']);
  const removedActivityIds = new Set(['act-4', 'act-5', 'act-6']);

  let changedUsers = false;
  let changedActivities = false;
  let changedKudos = false;
  let changedComments = false;

  // Purge removed users + references.
  const usersWithoutRemoved = users.filter((u) => !removedUserIds.has(u.id));
  if (usersWithoutRemoved.length !== users.length) changedUsers = true;

  const migratedUsers = usersWithoutRemoved.map((u) => {
    // Remove user-3 from any following arrays.
    const following = Array.isArray(u.following) ? u.following : [];
    const nextFollowing = following.filter((id) => !removedUserIds.has(id));
    let nextUser = nextFollowing.length !== following.length ? { ...u, following: nextFollowing } : u;
    if (nextUser !== u) changedUsers = true;

    if (nextUser.id === 'user-4') {
      const needsName = u.username !== 'Juan Carlos Franco';
      const needsPhoto = !u.profilePhoto;
      if (!needsName && !needsPhoto) return u;
      changedUsers = true;
      return {
        ...nextUser,
        username: 'Juan Carlos Franco',
        profilePhoto: u.profilePhoto || '/highlights/juan-franco-1.png',
      };
    }

    return nextUser;
  });

  const mediaByActivityId = {
    'act-7': [
      '/highlights/ducks-images.jpg',
      '/highlights/victor-8364.jpg',
      '/highlights/victor-7641.jpg',
    ],
    'act-12': ['/highlights/sarah-swimming-1.png'],
    'act-10': ['/highlights/juan-franco-1.png'],
    'act-11': ['/highlights/juan-franco-2.png'],
    'act-14': ['/highlights/juan-franco-3.png'],
  };

  const activitiesWithoutRemoved = activities.filter(
    (a) => !removedUserIds.has(a.userId) && !removedActivityIds.has(a.id)
  );
  if (activitiesWithoutRemoved.length !== activities.length) changedActivities = true;

  const migratedActivities = activitiesWithoutRemoved.map((a) => {
    const media = mediaByActivityId[a.id];
    if (!media) return a;
    if (a.id === 'act-7') {
      const currentMedia = Array.isArray(a.media) ? a.media : [];
      const hasLegacy =
        currentMedia.length === 0 ||
        currentMedia.some((src) => String(src).includes('victor-castillo-run.svg')) ||
        currentMedia.some((src) => String(src).includes('victor-castillo-run.png')) ||
        currentMedia.some((src) => String(src).includes('ducks images.heic'));

      const isSameSet =
        currentMedia.length === media.length &&
        currentMedia.every((src, i) => src === media[i]);

      const needsUpgrade = hasLegacy || !isSameSet;
      if (!needsUpgrade) return a;
      changedActivities = true;
      return { ...a, media };
    }

    if (Array.isArray(a.media) && a.media.length > 0) return a;
    changedActivities = true;
    return { ...a, media };
  });

  const hasAct14 = migratedActivities.some((a) => a.id === 'act-14');
  const shouldAddAct14 = !hasAct14;
  const finalActivities = shouldAddAct14
    ? [
        ...migratedActivities,
        {
          id: 'act-14',
          userId: 'user-4',
          title: 'Alley Pond trail run',
          description: 'Easy trail miles and good vibes.',
          type: 'Run',
          distance: 4.2,
          distanceUnit: 'mi',
          duration: 2520, // 42m
          date: daysAgo(9, 7, 15),
          timestamp: daysAgo(9, 7, 15),
          location: 'Queens, New York',
          device: 'Apple Watch',
          media: ['/highlights/juan-franco-3.png'],
        },
      ]
    : migratedActivities;

  if (shouldAddAct14) changedActivities = true;

  if (changedUsers) setUsers(migratedUsers);
  if (changedActivities) setActivities(finalActivities);

  const kudosWithoutRemoved = kudos.filter(
    (k) => !removedUserIds.has(k.userId) && !removedActivityIds.has(k.activityId)
  );
  if (kudosWithoutRemoved.length !== kudos.length) changedKudos = true;
  if (changedKudos) setKudos(kudosWithoutRemoved);

  const commentsWithoutRemoved = comments.filter(
    (c) => !removedUserIds.has(c.userId) && !removedActivityIds.has(c.activityId)
  );
  if (commentsWithoutRemoved.length !== comments.length) changedComments = true;
  if (changedComments) setComments(commentsWithoutRemoved);

  const currentUser = getCurrentUser();
  if (currentUser && removedUserIds.has(currentUser.id)) {
    setCurrentUser({ id: 'user-1', username: 'Victor Castillo', isPremium: false });
  }
}

export function resetData() {
  setUsers(USERS);
  setActivities(ACTIVITIES);
  setKudos(KUDOS);
  setComments(COMMENTS);
  setCurrentUser({ id: 'user-1', username: 'Victor Castillo', isPremium: false });
}

export { USERS, ACTIVITIES };

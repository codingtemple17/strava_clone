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
    following: ['user-2', 'user-4', 'user-5', 'user-6', 'user-7', 'user-8'],
    isPremium: false,
  },
  {
    id: 'user-2',
    username: 'René Ugarte',
    bio: 'FRNY coached runner. Manhattan miles.',
    profileColor: '#4A90D9',
    following: ['user-1', 'user-6'],
    isPremium: false,
  },
  {
    id: 'user-4',
    username: 'Juan Carlos Franco',
    bio: 'Co-builder of this app. Cyclist and hiker.',
    profileColor: '#2ECC71',
    following: ['user-1', 'user-5', 'user-7'],
    isPremium: false,
    profilePhoto: '/highlights/juan-franco-1.png',
  },
  {
    id: 'user-5',
    username: 'Sarah Chen',
    bio: 'Swimming and yoga enthusiast. NYC life.',
    profileColor: '#9B59B6',
    following: ['user-1', 'user-2', 'user-8'],
    isPremium: false,
  },
  {
    id: 'user-6',
    username: 'Mike Rodriguez',
    bio: 'Trail runner and nature photographer. Weekend warrior.',
    profileColor: '#E67E22',
    following: ['user-1', 'user-2', 'user-4'],
    isPremium: false,
  },
  {
    id: 'user-7',
    username: 'Emily Thompson',
    bio: 'Marathon training. Coffee enthusiast. Brooklyn runner.',
    profileColor: '#E91E63',
    following: ['user-1', 'user-5', 'user-6'],
    isPremium: false,
  },
  {
    id: 'user-8',
    username: 'David Park',
    bio: 'NYC runner. Chasing PRs and good vibes.',
    profileColor: '#3F51B5',
    following: ['user-1', 'user-2', 'user-4', 'user-5'],
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
    media: ['/highlights/rene-jersey.png', '/highlights/rene-ice-1.png', '/highlights/rene-ice-2.png'],
    mapImage: '/maps/rene-frny-workout.png',
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
    mapImage: '/maps/rene-recovery.png',
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
    mapImage: '/maps/rene-long-run.png',
  },
  // Victor Castillo's activities
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
    mapImage: '/maps/victor-hike.png',
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
    date: daysAgo(6, 12, 30),
    timestamp: daysAgo(6, 12, 30),
    location: 'Downtown Brooklyn',
    device: 'Apple Watch',
    media: ['/highlights/juan-4779.jpg', '/highlights/victor-7641.jpg', '/highlights/victor-9901.jpg'],
    mapImage: '/maps/victor-walk.png',
  },
  {
    id: 'act-15',
    userId: 'user-1',
    title: 'Cold morning run',
    description: 'Brrr! 🥶',
    type: 'Run',
    distance: 4.0,
    distanceUnit: 'mi',
    duration: 2696, // 44m 56s (11:14/mile pace)
    date: daysAgo(0, 7, 15),
    timestamp: daysAgo(0, 7, 15),
    location: 'Prospect Park, Brooklyn',
    device: 'Apple Watch',
    media: ['/highlights/victor_run.jpg'],
    mapImage: '/maps/victor-cold-run.png',
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
    date: daysAgo(4, 10, 0),
    timestamp: daysAgo(4, 10, 0),
    location: 'Hudson River Greenway, NYC',
    device: 'Garmin Edge 530',
    media: ['/highlights/juan-franco-1.png', '/highlights/juan-4779.jpg'],
    mapImage: '/maps/juan-riverside.png',
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
    date: daysAgo(1, 8, 0),
    timestamp: daysAgo(1, 8, 0),
    location: 'Harriman State Park, NY',
    device: 'Garmin Edge 530',
    media: ['/highlights/juan-franco-2.png', '/highlights/juan-4760.jpg'],
    mapImage: '/maps/juan-trail-hike.png',
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
    media: ['/highlights/juan-franco-3.png', '/highlights/juan-3114.jpg'],
    mapImage: '/maps/juan-alley-pond.png',
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
    date: daysAgo(2, 6, 30),
    timestamp: daysAgo(2, 6, 30),
    location: 'Chelsea Recreation Center, NYC',
    device: 'Apple Watch Ultra',
    media: ['/highlights/sarah_swimming.jpeg'],
    mapImage: '/maps/sarah-swim.png',
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
    date: daysAgo(5, 7, 0),
    timestamp: daysAgo(5, 7, 0),
    location: 'Brooklyn Bridge, NYC',
    device: 'Apple Watch Ultra',
    mapImage: '/maps/sarah-bridge-run.png',
  },
  // Mike Rodriguez's activities
  {
    id: 'act-16',
    userId: 'user-6',
    title: 'Duck pond morning run',
    description: 'Perfect morning to capture some wildlife shots during my run!',
    type: 'Run',
    distance: 5.2,
    distanceUnit: 'mi',
    duration: 2880, // 48m
    date: daysAgo(6, 7, 0),
    timestamp: daysAgo(6, 7, 0),
    location: 'Prospect Park, Brooklyn',
    device: 'Garmin Forerunner 245',
    media: ['/highlights/ducks-images.jpg'],
    mapImage: '/maps/mike-duck-pond.png',
  },
  // Emily Thompson's activities
  {
    id: 'act-17',
    userId: 'user-7',
    title: 'Long run training',
    description: 'Mile 18 of my marathon training plan. Feeling strong! 💪',
    type: 'Run',
    distance: 18.0,
    distanceUnit: 'mi',
    duration: 9360, // 2h 36m
    date: daysAgo(7, 6, 30),
    timestamp: daysAgo(7, 6, 30),
    location: 'Brooklyn, NY',
    device: 'Apple Watch Series 8',
    media: ['/highlights/victor-8364.jpg'],
    mapImage: '/maps/emily-long-run.png',
  },
  // David Park's activities
  {
    id: 'act-18',
    userId: 'user-8',
    title: 'Evening tempo run',
    description: 'Hitting those tempo miles. PR pace feeling good!',
    type: 'Run',
    distance: 6.0,
    distanceUnit: 'mi',
    duration: 3240, // 54m
    date: daysAgo(8, 18, 0),
    timestamp: daysAgo(8, 18, 0),
    location: 'Central Park, NYC',
    device: 'Garmin Forerunner 955',
    media: ['/highlights/victor-7641.jpg'],
    mapImage: '/maps/david-tempo.png',
  },
];

const KUDOS = [
  // act-1 (René FRNY workout) - 42 kudos
  { id: 'k-1', activityId: 'act-1', userId: 'user-1', timestamp: daysAgo(3, 19, 0) },
  { id: 'k-2', activityId: 'act-1', userId: 'user-4', timestamp: daysAgo(3, 19, 15) },
  { id: 'k-3', activityId: 'act-1', userId: 'user-5', timestamp: daysAgo(3, 20, 0) },
  ...Array.from({ length: 39 }, (_, i) => ({
    id: `k-act1-${i}`,
    activityId: 'act-1',
    userId: `ghost-${i}`,
    timestamp: daysAgo(3, 19, i * 2),
  })),

  // act-2 (René recovery run) - 18 kudos
  ...Array.from({ length: 18 }, (_, i) => ({
    id: `k-act2-${i}`,
    activityId: 'act-2',
    userId: i < 2 ? ['user-1', 'user-5'][i] : `ghost-${i}`,
    timestamp: daysAgo(5, 8, i * 3),
  })),

  // act-3 (René long run) - 35 kudos
  ...Array.from({ length: 35 }, (_, i) => ({
    id: `k-act3-${i}`,
    activityId: 'act-3',
    userId: i < 3 ? ['user-1', 'user-4', 'user-5'][i] : `ghost-${i}`,
    timestamp: daysAgo(7, 7, i * 2),
  })),

  // act-8 (Victor weekend hike) - 31 kudos
  { id: 'k-14', activityId: 'act-8', userId: 'user-4', timestamp: daysAgo(5, 12, 0) },
  { id: 'k-act8-1', activityId: 'act-8', userId: 'user-2', timestamp: daysAgo(5, 11, 0) },
  { id: 'k-act8-2', activityId: 'act-8', userId: 'user-5', timestamp: daysAgo(5, 13, 0) },
  ...Array.from({ length: 28 }, (_, i) => ({
    id: `k-act8-${i + 3}`,
    activityId: 'act-8',
    userId: `ghost-${i}`,
    timestamp: daysAgo(5, 10, i * 2),
  })),

  // act-9 (Victor lunch walk) - 22 kudos
  ...Array.from({ length: 22 }, (_, i) => ({
    id: `k-act9-${i}`,
    activityId: 'act-9',
    userId: i < 3 ? ['user-2', 'user-4', 'user-5'][i] : `ghost-${i}`,
    timestamp: daysAgo(6, 13, i * 2),
  })),

  // act-15 (Victor cold morning run - NEW!) - 15 kudos
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `k-act15-${i}`,
    activityId: 'act-15',
    userId: i < 3 ? ['user-2', 'user-4', 'user-5'][i] : `ghost-${i}`,
    timestamp: daysAgo(0, 8, i * 3),
  })),

  // act-10 (Juan cycling) - 26 kudos
  { id: 'k-9', activityId: 'act-10', userId: 'user-1', timestamp: daysAgo(4, 11, 0) },
  { id: 'k-act10-1', activityId: 'act-10', userId: 'user-5', timestamp: daysAgo(4, 12, 0) },
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `k-act10-${i + 2}`,
    activityId: 'act-10',
    userId: `ghost-${i}`,
    timestamp: daysAgo(4, 11, i * 2),
  })),

  // act-11 (Juan trail hike) - 38 kudos
  ...Array.from({ length: 38 }, (_, i) => ({
    id: `k-act11-${i}`,
    activityId: 'act-11',
    userId: i < 2 ? ['user-1', 'user-5'][i] : `ghost-${i}`,
    timestamp: daysAgo(1, 9, i * 2),
  })),

  // act-14 (Juan trail run) - 20 kudos
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `k-act14-${i}`,
    activityId: 'act-14',
    userId: i === 0 ? 'user-1' : `ghost-${i}`,
    timestamp: daysAgo(9, 8, i * 3),
  })),

  // act-12 (Sarah swim) - 45 kudos
  { id: 'k-10', activityId: 'act-12', userId: 'user-1', timestamp: daysAgo(2, 7, 0) },
  { id: 'k-act12-1', activityId: 'act-12', userId: 'user-2', timestamp: daysAgo(2, 7, 30) },
  { id: 'k-act12-2', activityId: 'act-12', userId: 'user-4', timestamp: daysAgo(2, 8, 0) },
  ...Array.from({ length: 42 }, (_, i) => ({
    id: `k-act12-${i + 3}`,
    activityId: 'act-12',
    userId: `ghost-${i}`,
    timestamp: daysAgo(2, 7, i * 2),
  })),

  // act-13 (Sarah Brooklyn Bridge run) - 33 kudos
  { id: 'k-15', activityId: 'act-13', userId: 'user-2', timestamp: daysAgo(5, 9, 0) },
  { id: 'k-16', activityId: 'act-13', userId: 'user-1', timestamp: daysAgo(5, 10, 0) },
  { id: 'k-act13-1', activityId: 'act-13', userId: 'user-4', timestamp: daysAgo(5, 10, 30) },
  ...Array.from({ length: 30 }, (_, i) => ({
    id: `k-act13-${i + 2}`,
    activityId: 'act-13',
    userId: `ghost-${i}`,
    timestamp: daysAgo(5, 8, i * 2),
  })),

  // act-16 (Mike duck pond run) - 24 kudos
  ...Array.from({ length: 24 }, (_, i) => ({
    id: `k-act16-${i}`,
    activityId: 'act-16',
    userId: i < 3 ? ['user-1', 'user-2', 'user-5'][i] : `ghost-${i}`,
    timestamp: daysAgo(6, 8, i * 2),
  })),

  // act-17 (Emily long run) - 41 kudos
  ...Array.from({ length: 41 }, (_, i) => ({
    id: `k-act17-${i}`,
    activityId: 'act-17',
    userId: i < 4 ? ['user-1', 'user-4', 'user-5', 'user-6'][i] : `ghost-${i}`,
    timestamp: daysAgo(7, 7, i * 2),
  })),

  // act-18 (David tempo run) - 29 kudos
  ...Array.from({ length: 29 }, (_, i) => ({
    id: `k-act18-${i}`,
    activityId: 'act-18',
    userId: i < 3 ? ['user-1', 'user-2', 'user-7'][i] : `ghost-${i}`,
    timestamp: daysAgo(8, 19, i * 2),
  })),
];

const COMMENTS = [
  // act-1 (René FRNY workout) - 6 comments
  { id: 'c-1', activityId: 'act-1', userId: 'user-1', text: 'Great pace René! Those coaches are making a difference.', timestamp: daysAgo(3, 20, 0) },
  { id: 'c-act1-1', activityId: 'act-1', userId: 'user-4', text: 'Killing it! What was the workout?', timestamp: daysAgo(3, 20, 30) },
  { id: 'c-act1-2', activityId: 'act-1', userId: 'user-5', text: 'Those FRNY coaches are amazing 🔥', timestamp: daysAgo(3, 21, 0) },
  { id: 'c-act1-3', activityId: 'act-1', userId: 'user-2', text: 'Thanks everyone! 8x800m repeats today', timestamp: daysAgo(3, 21, 30) },
  { id: 'c-act1-4', activityId: 'act-1', userId: 'user-1', text: 'Ooof those sound tough!', timestamp: daysAgo(3, 22, 0) },
  { id: 'c-act1-5', activityId: 'act-1', userId: 'user-4', text: 'Beast mode 💪', timestamp: daysAgo(3, 22, 15) },

  // act-2 (René recovery run) - 5 comments
  { id: 'c-act2-1', activityId: 'act-2', userId: 'user-1', text: 'Recovery runs are so important!', timestamp: daysAgo(5, 8, 0) },
  { id: 'c-act2-2', activityId: 'act-2', userId: 'user-5', text: 'Central Park is beautiful this time of year', timestamp: daysAgo(5, 9, 0) },
  { id: 'c-act2-3', activityId: 'act-2', userId: 'user-4', text: 'Nice easy pace 👍', timestamp: daysAgo(5, 10, 0) },
  { id: 'c-act2-4', activityId: 'act-2', userId: 'user-2', text: 'Felt great today, legs are recovering well', timestamp: daysAgo(5, 11, 0) },
  { id: 'c-act2-5', activityId: 'act-2', userId: 'user-1', text: 'That\'s what we like to hear!', timestamp: daysAgo(5, 12, 0) },

  // act-3 (René long run) - 7 comments
  { id: 'c-act3-1', activityId: 'act-3', userId: 'user-1', text: 'Double digits! Strong work 💪', timestamp: daysAgo(7, 7, 0) },
  { id: 'c-act3-2', activityId: 'act-3', userId: 'user-4', text: 'Impressive mileage!', timestamp: daysAgo(7, 8, 0) },
  { id: 'c-act3-3', activityId: 'act-3', userId: 'user-5', text: '10 miles is no joke! Great job', timestamp: daysAgo(7, 9, 0) },
  { id: 'c-act3-4', activityId: 'act-3', userId: 'user-2', text: 'Thanks! Prepping for a half in March', timestamp: daysAgo(7, 10, 0) },
  { id: 'c-act3-5', activityId: 'act-3', userId: 'user-1', text: 'You\'re gonna crush it!', timestamp: daysAgo(7, 11, 0) },
  { id: 'c-act3-6', activityId: 'act-3', userId: 'user-4', text: 'Which race?', timestamp: daysAgo(7, 12, 0) },
  { id: 'c-act3-7', activityId: 'act-3', userId: 'user-2', text: 'NYC Half!', timestamp: daysAgo(7, 13, 0) },

  // act-8 (Victor weekend hike) - 5 comments
  { id: 'c-act8-1', activityId: 'act-8', userId: 'user-4', text: 'Bear Mountain is such a good escape!', timestamp: daysAgo(5, 12, 0) },
  { id: 'c-act8-2', activityId: 'act-8', userId: 'user-2', text: '2 hours on trails beats any gym session', timestamp: daysAgo(5, 13, 0) },
  { id: 'c-act8-3', activityId: 'act-8', userId: 'user-5', text: 'Need to get out there soon!', timestamp: daysAgo(5, 14, 0) },
  { id: 'c-act8-4', activityId: 'act-8', userId: 'user-1', text: 'Highly recommend! Fresh air hits different', timestamp: daysAgo(5, 15, 0) },
  { id: 'c-act8-5', activityId: 'act-8', userId: 'user-4', text: 'We should organize a group hike!', timestamp: daysAgo(5, 16, 0) },

  // act-9 (Victor lunch walk) - 5 comments
  { id: 'c-act9-1', activityId: 'act-9', userId: 'user-4', text: 'Quick walks are so underrated for clearing your head', timestamp: daysAgo(6, 13, 0) },
  { id: 'c-act9-2', activityId: 'act-9', userId: 'user-2', text: 'Love the midday movement!', timestamp: daysAgo(6, 14, 0) },
  { id: 'c-act9-3', activityId: 'act-9', userId: 'user-5', text: 'I need to do this more often', timestamp: daysAgo(6, 15, 0) },
  { id: 'c-act9-4', activityId: 'act-9', userId: 'user-1', text: 'Game changer for productivity honestly', timestamp: daysAgo(6, 16, 0) },
  { id: 'c-act9-5', activityId: 'act-9', userId: 'user-4', text: 'Facts! Especially when debugging 😅', timestamp: daysAgo(6, 17, 0) },

  // act-15 (Victor cold morning run - NEW!) - 7 comments
  { id: 'c-act15-1', activityId: 'act-15', userId: 'user-2', text: 'That cold weather face! 😂 You\'re a warrior', timestamp: daysAgo(0, 8, 0) },
  { id: 'c-act15-2', activityId: 'act-15', userId: 'user-4', text: 'Brrr is right! How cold was it?', timestamp: daysAgo(0, 8, 30) },
  { id: 'c-act15-3', activityId: 'act-15', userId: 'user-5', text: 'Respect for getting out there in this weather 🥶', timestamp: daysAgo(0, 9, 0) },
  { id: 'c-act15-4', activityId: 'act-15', userId: 'user-1', text: '28 degrees! But you warm up after mile 1', timestamp: daysAgo(0, 9, 30) },
  { id: 'c-act15-5', activityId: 'act-15', userId: 'user-2', text: 'Those winter miles hit different 💪', timestamp: daysAgo(0, 10, 0) },
  { id: 'c-act15-6', activityId: 'act-15', userId: 'user-4', text: 'Solid pace in that cold too!', timestamp: daysAgo(0, 10, 30) },
  { id: 'c-act15-7', activityId: 'act-15', userId: 'user-5', text: 'Need your cold weather running tips!', timestamp: daysAgo(0, 11, 0) },

  // act-10 (Juan cycling) - 6 comments
  { id: 'c-5', activityId: 'act-10', userId: 'user-1', text: 'That headwind is no joke lol', timestamp: daysAgo(4, 12, 0) },
  { id: 'c-act10-1', activityId: 'act-10', userId: 'user-5', text: 'Hudson River Greenway is so scenic!', timestamp: daysAgo(4, 12, 30) },
  { id: 'c-act10-2', activityId: 'act-10', userId: 'user-4', text: 'Yeah that north wind was brutal today', timestamp: daysAgo(4, 13, 0) },
  { id: 'c-act10-3', activityId: 'act-10', userId: 'user-1', text: 'Still crushed it though! 18.5 miles 🚴', timestamp: daysAgo(4, 13, 30) },
  { id: 'c-act10-4', activityId: 'act-10', userId: 'user-5', text: 'Great photos too!', timestamp: daysAgo(4, 14, 0) },
  { id: 'c-act10-5', activityId: 'act-10', userId: 'user-4', text: 'Thanks! Gotta document the journey', timestamp: daysAgo(4, 14, 30) },

  // act-11 (Juan trail hike) - 7 comments
  { id: 'c-act11-1', activityId: 'act-11', userId: 'user-1', text: 'Sunday trail vibes! Who was the crew?', timestamp: daysAgo(1, 9, 0) },
  { id: 'c-act11-2', activityId: 'act-11', userId: 'user-5', text: '7.8 miles and 3 hours? That elevation! 🏔️', timestamp: daysAgo(1, 10, 0) },
  { id: 'c-act11-3', activityId: 'act-11', userId: 'user-4', text: 'Yeah we did the full Harriman loop, so worth it', timestamp: daysAgo(1, 11, 0) },
  { id: 'c-act11-4', activityId: 'act-11', userId: 'user-2', text: 'Those views though! 😍', timestamp: daysAgo(1, 12, 0) },
  { id: 'c-act11-5', activityId: 'act-11', userId: 'user-1', text: 'Need to join next time!', timestamp: daysAgo(1, 13, 0) },
  { id: 'c-act11-6', activityId: 'act-11', userId: 'user-4', text: 'For sure! Planning another one soon', timestamp: daysAgo(1, 14, 0) },
  { id: 'c-act11-7', activityId: 'act-11', userId: 'user-5', text: 'Count me in! 🙋‍♀️', timestamp: daysAgo(1, 15, 0) },

  // act-14 (Juan trail run) - 5 comments
  { id: 'c-act14-1', activityId: 'act-14', userId: 'user-1', text: 'Alley Pond is such a hidden gem!', timestamp: daysAgo(9, 8, 0) },
  { id: 'c-act14-2', activityId: 'act-14', userId: 'user-2', text: 'Trail running in Queens? I need to check this out', timestamp: daysAgo(9, 9, 0) },
  { id: 'c-act14-3', activityId: 'act-14', userId: 'user-4', text: 'Yeah! Trails are smooth, perfect for easy miles', timestamp: daysAgo(9, 10, 0) },
  { id: 'c-act14-4', activityId: 'act-14', userId: 'user-5', text: 'Love the trail vibes energy ✨', timestamp: daysAgo(9, 11, 0) },
  { id: 'c-act14-5', activityId: 'act-14', userId: 'user-1', text: 'Might have to join you next time!', timestamp: daysAgo(9, 12, 0) },

  // act-12 (Sarah swim) - 6 comments
  { id: 'c-act12-1', activityId: 'act-12', userId: 'user-1', text: 'Swimming goals! 🏊‍♀️', timestamp: daysAgo(2, 7, 0) },
  { id: 'c-act12-2', activityId: 'act-12', userId: 'user-2', text: 'Flip turns are tough! Nice work on the technique', timestamp: daysAgo(2, 7, 30) },
  { id: 'c-act12-3', activityId: 'act-12', userId: 'user-4', text: '1.2 miles is serious!', timestamp: daysAgo(2, 8, 0) },
  { id: 'c-act12-4', activityId: 'act-12', userId: 'user-5', text: 'Thanks everyone! Working toward a tri', timestamp: daysAgo(2, 8, 30) },
  { id: 'c-act12-5', activityId: 'act-12', userId: 'user-1', text: 'Oh wow! Which one?', timestamp: daysAgo(2, 9, 0) },
  { id: 'c-act12-6', activityId: 'act-12', userId: 'user-5', text: 'NYC Tri in July! 🎯', timestamp: daysAgo(2, 9, 30) },

  // act-13 (Sarah Brooklyn Bridge run) - 6 comments
  { id: 'c-6', activityId: 'act-13', userId: 'user-1', text: 'Tourist dodge level 😂 so real', timestamp: daysAgo(5, 11, 0) },
  { id: 'c-act13-1', activityId: 'act-13', userId: 'user-2', text: 'Brooklyn Bridge runs are a whole different sport 😅', timestamp: daysAgo(5, 11, 30) },
  { id: 'c-act13-2', activityId: 'act-13', userId: 'user-4', text: 'The views make it worth it though!', timestamp: daysAgo(5, 12, 0) },
  { id: 'c-act13-3', activityId: 'act-13', userId: 'user-5', text: 'Facts! Early morning is the move', timestamp: daysAgo(5, 12, 30) },
  { id: 'c-act13-4', activityId: 'act-13', userId: 'user-1', text: 'What time did you go?', timestamp: daysAgo(5, 13, 0) },
  { id: 'c-act13-5', activityId: 'act-13', userId: 'user-5', text: '7am - still busy but manageable!', timestamp: daysAgo(5, 13, 30) },

  // act-16 (Mike duck pond run) - 6 comments
  { id: 'c-act16-1', activityId: 'act-16', userId: 'user-1', text: 'Those duck photos are incredible! 🦆', timestamp: daysAgo(6, 8, 0) },
  { id: 'c-act16-2', activityId: 'act-16', userId: 'user-2', text: 'Nature photography + running = perfect combo', timestamp: daysAgo(6, 9, 0) },
  { id: 'c-act16-3', activityId: 'act-16', userId: 'user-4', text: 'Prospect Park is so beautiful in the morning!', timestamp: daysAgo(6, 10, 0) },
  { id: 'c-act16-4', activityId: 'act-16', userId: 'user-6', text: 'Thanks! Early mornings are the best for catching wildlife', timestamp: daysAgo(6, 11, 0) },
  { id: 'c-act16-5', activityId: 'act-16', userId: 'user-5', text: 'I need to start bringing my camera on runs', timestamp: daysAgo(6, 12, 0) },
  { id: 'c-act16-6', activityId: 'act-16', userId: 'user-7', text: 'Stunning shots! What camera do you use?', timestamp: daysAgo(6, 13, 0) },

  // act-17 (Emily long run) - 7 comments
  { id: 'c-act17-1', activityId: 'act-17', userId: 'user-1', text: '18 miles!! Marathon training looking strong 💪', timestamp: daysAgo(7, 7, 0) },
  { id: 'c-act17-2', activityId: 'act-17', userId: 'user-4', text: 'Wow that\'s impressive mileage!', timestamp: daysAgo(7, 8, 0) },
  { id: 'c-act17-3', activityId: 'act-17', userId: 'user-5', text: 'You\'re crushing your training plan!', timestamp: daysAgo(7, 9, 0) },
  { id: 'c-act17-4', activityId: 'act-17', userId: 'user-7', text: 'Thanks everyone! Feeling ready for race day', timestamp: daysAgo(7, 10, 0) },
  { id: 'c-act17-5', activityId: 'act-17', userId: 'user-6', text: 'Which marathon are you training for?', timestamp: daysAgo(7, 11, 0) },
  { id: 'c-act17-6', activityId: 'act-17', userId: 'user-7', text: 'NYC Marathon in November!', timestamp: daysAgo(7, 12, 0) },
  { id: 'c-act17-7', activityId: 'act-17', userId: 'user-1', text: 'You\'re going to crush it! 🎯', timestamp: daysAgo(7, 13, 0) },

  // act-18 (David tempo run) - 5 comments
  { id: 'c-act18-1', activityId: 'act-18', userId: 'user-1', text: 'Tempo runs are so tough! Great work', timestamp: daysAgo(8, 19, 0) },
  { id: 'c-act18-2', activityId: 'act-18', userId: 'user-2', text: 'PR pace! That\'s what we like to see 🔥', timestamp: daysAgo(8, 20, 0) },
  { id: 'c-act18-3', activityId: 'act-18', userId: 'user-7', text: 'Central Park tempos hit different', timestamp: daysAgo(8, 21, 0) },
  { id: 'c-act18-4', activityId: 'act-18', userId: 'user-8', text: 'Thanks! Chasing that sub-40 10K 🎯', timestamp: daysAgo(8, 22, 0) },
  { id: 'c-act18-5', activityId: 'act-18', userId: 'user-4', text: 'You got this! Those splits looking fast', timestamp: daysAgo(8, 23, 0) },
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
  const removedActivityIds = new Set(['act-4', 'act-5', 'act-6', 'act-7']);

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

  // Add new users if they don't exist
  const existingUserIds = new Set(migratedUsers.map(u => u.id));
  const newUsersToAdd = USERS.filter(u => !existingUserIds.has(u.id));
  const finalUsers = newUsersToAdd.length > 0 ? [...migratedUsers, ...newUsersToAdd] : migratedUsers;
  if (newUsersToAdd.length > 0) changedUsers = true;

  const mediaByActivityId = {
    'act-1': ['/highlights/rene-jersey.png', '/highlights/rene-ice-1.png', '/highlights/rene-ice-2.png'],
    'act-9': ['/highlights/juan-4779.jpg', '/highlights/victor-7641.jpg', '/highlights/victor-9901.jpg'],
    'act-15': ['/highlights/victor_run.jpg'],
    'act-12': ['/highlights/sarah_swimming.jpeg'],
    'act-10': ['/highlights/juan-franco-1.png', '/highlights/juan-4779.jpg'],
    'act-11': ['/highlights/juan-franco-2.png', '/highlights/juan-4760.jpg'],
    'act-14': ['/highlights/juan-franco-3.png', '/highlights/juan-3114.jpg'],
    'act-16': ['/highlights/ducks-images.jpg'],
    'act-17': ['/highlights/victor-8364.jpg'],
    'act-18': ['/highlights/victor-7641.jpg'],
  };

  const activitiesWithoutRemoved = activities.filter(
    (a) => !removedUserIds.has(a.userId) && !removedActivityIds.has(a.id)
  );
  if (activitiesWithoutRemoved.length !== activities.length) changedActivities = true;

  const migratedActivities = activitiesWithoutRemoved.map((a) => {
    // Update timestamps for feed ordering
    const timestampUpdates = {
      'act-11': { date: daysAgo(1, 8, 0), timestamp: daysAgo(1, 8, 0) },
      'act-12': { date: daysAgo(2, 6, 30), timestamp: daysAgo(2, 6, 30) },
      'act-1': { date: daysAgo(3, 18, 45), timestamp: daysAgo(3, 18, 45) },
      'act-10': { date: daysAgo(4, 10, 0), timestamp: daysAgo(4, 10, 0) },
      'act-9': { date: daysAgo(6, 12, 30), timestamp: daysAgo(6, 12, 30) },
    };

    const media = mediaByActivityId[a.id];
    const newTimestamps = timestampUpdates[a.id];

    if (!media && !newTimestamps) return a;

    let updated = { ...a };
    let hasChanges = false;

    if (media) {
      const currentMedia = Array.isArray(a.media) ? a.media : [];
      const isSameSet =
        currentMedia.length === media.length &&
        currentMedia.every((src, i) => src === media[i]);

      if (!isSameSet && (
        a.id === 'act-1' ||
        a.id === 'act-9' ||
        a.id === 'act-15' ||
        a.id === 'act-10' ||
        a.id === 'act-11' ||
        a.id === 'act-12' ||
        a.id === 'act-14' ||
        a.id === 'act-16' ||
        a.id === 'act-17' ||
        a.id === 'act-18'
      )) {
        updated.media = media;
        hasChanges = true;
      }
    }

    if (newTimestamps && (a.date !== newTimestamps.date || a.timestamp !== newTimestamps.timestamp)) {
      updated.date = newTimestamps.date;
      updated.timestamp = newTimestamps.timestamp;
      hasChanges = true;
    }

    if (hasChanges) {
      changedActivities = true;
      return updated;
    }

    return a;
  });

  const hasAct14 = migratedActivities.some((a) => a.id === 'act-14');
  const shouldAddAct14 = !hasAct14;
  let finalActivities = shouldAddAct14
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
          media: ['/highlights/juan-franco-3.png', '/highlights/juan-3114.jpg'],
        },
      ]
    : migratedActivities;

  if (shouldAddAct14) changedActivities = true;

  const hasAct15 = finalActivities.some((a) => a.id === 'act-15');
  const shouldAddAct15 = !hasAct15;
  finalActivities = shouldAddAct15
    ? [
        ...finalActivities,
        {
          id: 'act-15',
          userId: 'user-1',
          title: 'Cold morning run',
          description: 'Brrr! 🥶',
          type: 'Run',
          distance: 4.0,
          distanceUnit: 'mi',
          duration: 2696, // 44m 56s (11:14/mile pace)
          date: daysAgo(0, 7, 15),
          timestamp: daysAgo(0, 7, 15),
          location: 'Prospect Park, Brooklyn',
          device: 'Apple Watch',
          media: ['/highlights/victor_run.jpg'],
          mapImage: '/maps/victor-cold-run.png',
        },
      ]
    : finalActivities;

  if (shouldAddAct15) changedActivities = true;

  // Add new user activities
  const hasAct16 = finalActivities.some((a) => a.id === 'act-16');
  if (!hasAct16) {
    finalActivities.push({
      id: 'act-16',
      userId: 'user-6',
      title: 'Duck pond morning run',
      description: 'Perfect morning to capture some wildlife shots during my run!',
      type: 'Run',
      distance: 5.2,
      distanceUnit: 'mi',
      duration: 2880,
      date: daysAgo(6, 7, 0),
      timestamp: daysAgo(6, 7, 0),
      location: 'Prospect Park, Brooklyn',
      device: 'Garmin Forerunner 245',
      media: ['/highlights/ducks-images.jpg'],
      mapImage: '/maps/mike-duck-pond.png',
    });
    changedActivities = true;
  }

  const hasAct17 = finalActivities.some((a) => a.id === 'act-17');
  if (!hasAct17) {
    finalActivities.push({
      id: 'act-17',
      userId: 'user-7',
      title: 'Long run training',
      description: 'Mile 18 of my marathon training plan. Feeling strong! 💪',
      type: 'Run',
      distance: 18.0,
      distanceUnit: 'mi',
      duration: 9360,
      date: daysAgo(7, 6, 30),
      timestamp: daysAgo(7, 6, 30),
      location: 'Brooklyn, NY',
      device: 'Apple Watch Series 8',
      media: ['/highlights/victor-8364.jpg'],
      mapImage: '/maps/emily-long-run.png',
    });
    changedActivities = true;
  }

  const hasAct18 = finalActivities.some((a) => a.id === 'act-18');
  if (!hasAct18) {
    finalActivities.push({
      id: 'act-18',
      userId: 'user-8',
      title: 'Evening tempo run',
      description: 'Hitting those tempo miles. PR pace feeling good!',
      type: 'Run',
      distance: 6.0,
      distanceUnit: 'mi',
      duration: 3240,
      date: daysAgo(8, 18, 0),
      timestamp: daysAgo(8, 18, 0),
      location: 'Central Park, NYC',
      device: 'Garmin Forerunner 955',
      media: ['/highlights/victor-7641.jpg'],
      mapImage: '/maps/david-tempo.png',
    });
    changedActivities = true;
  }

  if (changedUsers) setUsers(finalUsers);
  if (changedActivities) setActivities(finalActivities);

  // For kudos: replace with the seeded KUDOS array to get updated counts
  // This ensures new activities get their kudos and counts are updated
  const existingKudosIds = new Set(kudos.map(k => k.id));
  const newSeededKudos = KUDOS.filter(k => !existingKudosIds.has(k.id));

  if (newSeededKudos.length > 0 || kudos.length !== KUDOS.length) {
    // Replace with fresh KUDOS data to ensure all activities have proper engagement
    setKudos(KUDOS);
  }

  // For comments: replace with the seeded COMMENTS array to get updated comments
  const existingCommentIds = new Set(comments.map(c => c.id));
  const newSeededComments = COMMENTS.filter(c => !existingCommentIds.has(c.id));

  if (newSeededComments.length > 0 || comments.length !== COMMENTS.length) {
    // Replace with fresh COMMENTS data to ensure all activities have proper engagement
    setComments(COMMENTS);
  }

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

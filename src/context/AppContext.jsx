import { createContext, useContext, useState, useEffect } from 'react';
import {
  getUsers, setUsers as saveUsers,
  getActivities, setActivities as saveActivities,
  getKudos, setKudos as saveKudos,
  getComments, setComments as saveComments,
  getCurrentUser, setCurrentUser as saveCurrentUser,
} from '../utils/localStorage';
import { seedData, resetData } from '../utils/seedData';
import { calculatePace } from '../utils/calculations';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [kudos, setKudos] = useState([]);
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    seedData();

    // Safety net: purge deprecated demo content from old localStorage installs.
    // (Some browsers can keep stale localStorage even after code changes/HMR.)
    const removedUserIds = new Set(['user-3']);
    const removedActivityIds = new Set(['act-4', 'act-5', 'act-6']);

    const prevUsers = getUsers();
    const nextUsers = prevUsers
      .filter((u) => !removedUserIds.has(u.id))
      .map((u) => {
        const following = Array.isArray(u.following) ? u.following : [];
        const nextFollowing = following.filter((id) => !removedUserIds.has(id));
        if (nextFollowing.length === following.length) return u;
        return { ...u, following: nextFollowing };
      });
    if (nextUsers.length !== prevUsers.length || nextUsers.some((u, i) => u !== prevUsers[i])) {
      saveUsers(nextUsers);
    }

    const prevActivities = getActivities();
    let activitiesChanged = false;
    const nextActivities = prevActivities
      .filter((a) => {
        const keep = !removedUserIds.has(a.userId) && !removedActivityIds.has(a.id);
        if (!keep) activitiesChanged = true;
        return keep;
      })
      .map((a) => {
        if (a.userId !== 'user-4' || !Array.isArray(a.media) || a.media.length === 0) return a;
        const nextMedia = a.media.filter(
          (src) => !['/highlights/juan-franco-1.png', '/highlights/juan-franco-2.png', '/highlights/juan-franco-3.png'].includes(src)
        );
        if (nextMedia.length === a.media.length) return a;
        activitiesChanged = true;
        return { ...a, media: nextMedia };
      });
    if (activitiesChanged) {
      saveActivities(nextActivities);
    }

    const prevKudos = getKudos();
    const nextKudos = prevKudos.filter(
      (k) => !removedUserIds.has(k.userId) && !removedActivityIds.has(k.activityId)
    );
    if (nextKudos.length !== prevKudos.length) {
      saveKudos(nextKudos);
    }

    const prevComments = getComments();
    const nextComments = prevComments.filter(
      (c) => !removedUserIds.has(c.userId) && !removedActivityIds.has(c.activityId)
    );
    if (nextComments.length !== prevComments.length) {
      saveComments(nextComments);
    }

    const current = getCurrentUser();
    if (current && removedUserIds.has(current.id)) {
      saveCurrentUser({ id: 'user-1', username: 'Victor Castillo', isPremium: false });
    }

    setUsers(getUsers());
    setActivities(getActivities());
    setKudos(getKudos());
    setComments(getComments());
    setCurrentUser(getCurrentUser());
  }, []);

  function addActivity({ title, description, type, distance, distanceUnit, duration, location }) {
    const newActivity = {
      id: `act-${Date.now()}`,
      userId: currentUser.id,
      title,
      description: description || '',
      type,
      distance: parseFloat(distance),
      distanceUnit,
      duration,
      date: Date.now(),
      timestamp: Date.now(),
      location: location || '',
      device: '',
    };

    const updated = [newActivity, ...activities];
    setActivities(updated);
    saveActivities(updated);
    return newActivity;
  }

  function toggleKudo(activityId) {
    const existing = kudos.find(
      (k) => k.activityId === activityId && k.userId === currentUser.id
    );

    let updated;
    if (existing) {
      updated = kudos.filter((k) => k.id !== existing.id);
    } else {
      updated = [
        ...kudos,
        {
          id: `k-${Date.now()}`,
          activityId,
          userId: currentUser.id,
          timestamp: Date.now(),
        },
      ];
    }
    setKudos(updated);
    saveKudos(updated);
  }

  function addComment(activityId, text) {
    const newComment = {
      id: `c-${Date.now()}`,
      activityId,
      userId: currentUser.id,
      text,
      timestamp: Date.now(),
    };
    const updated = [...comments, newComment];
    setComments(updated);
    saveComments(updated);
  }

  function getUserById(id) {
    return users.find((u) => u.id === id);
  }

  function setUserProfilePhoto(userId, profilePhoto) {
    const updated = users.map((u) => {
      if (u.id !== userId) return u;
      return { ...u, profilePhoto: profilePhoto || null };
    });
    setUsers(updated);
    saveUsers(updated);
  }

  function getActivityKudos(activityId) {
    return kudos.filter((k) => k.activityId === activityId);
  }

  function getActivityComments(activityId) {
    return comments
      .filter((c) => c.activityId === activityId)
      .sort((a, b) => a.timestamp - b.timestamp);
  }

  function hasGivenKudo(activityId) {
    return kudos.some(
      (k) => k.activityId === activityId && k.userId === currentUser?.id
    );
  }

  function getFeedActivities() {
    if (!currentUser) return [];
    const me = users.find((u) => u.id === currentUser.id);
    if (!me) return [];
    const followedIds = new Set([...me.following, me.id]);
    return activities
      .filter((a) => followedIds.has(a.userId))
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  function getMyActivities() {
    if (!currentUser) return [];
    return activities
      .filter((a) => a.userId === currentUser.id)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  function getActivitiesByUserId(userId) {
    if (!userId) return [];
    return activities
      .filter((a) => a.userId === userId)
      .sort((a, b) => b.timestamp - a.timestamp);
  }

  function handleResetData() {
    resetData();
    setUsers(getUsers());
    setActivities(getActivities());
    setKudos(getKudos());
    setComments(getComments());
    setCurrentUser(getCurrentUser());
  }

  const value = {
    users,
    activities,
    kudos,
    comments,
    currentUser,
    addActivity,
    toggleKudo,
    addComment,
    getUserById,
    setUserProfilePhoto,
    getActivityKudos,
    getActivityComments,
    hasGivenKudo,
    getFeedActivities,
    getMyActivities,
    getActivitiesByUserId,
    resetData: handleResetData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

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
    getActivityKudos,
    getActivityComments,
    hasGivenKudo,
    getFeedActivities,
    getMyActivities,
    resetData: handleResetData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

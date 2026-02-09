import { useState } from 'react';
import { useApp } from './context/AppContext';
import ActivityFeed from './components/ActivityFeed';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';
import {
  Home,
  Map,
  Circle,
  Users,
  User,
  Search,
  MessageSquare,
  Bell,
} from 'lucide-react';

const TABS = {
  HOME: 'home',
  MAPS: 'maps',
  RECORD: 'record',
  GROUPS: 'groups',
  YOU: 'you',
};

function Header({ currentTab }) {
  const { currentUser } = useApp();

  const titles = {
    [TABS.HOME]: 'Home',
    [TABS.MAPS]: 'Maps',
    [TABS.RECORD]: 'Log Activity',
    [TABS.GROUPS]: 'Groups',
    [TABS.YOU]: 'You',
  };

  return (
    <header className="bg-white border-b border-strava-border sticky top-0 z-20">
      <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
        {/* Left: user avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
          style={{ backgroundColor: '#FC4C02' }}
        >
          {currentUser?.username?.split(' ').map((n) => n[0]).join('').toUpperCase() || '?'}
        </div>

        {/* Center: title */}
        <h1 className="font-semibold text-strava-dark">{titles[currentTab]}</h1>

        {/* Right: icons */}
        <div className="flex items-center gap-3">
          <button className="text-strava-dark">
            <Search size={20} />
          </button>
          <button className="text-strava-dark relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-strava-orange rounded-full text-[8px] text-white flex items-center justify-center font-bold">
              3
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function BottomNav({ currentTab, setTab }) {
  const navItems = [
    { id: TABS.HOME, icon: Home, label: 'Home' },
    { id: TABS.MAPS, icon: Map, label: 'Maps' },
    { id: TABS.RECORD, icon: Circle, label: 'Record', isRecord: true },
    { id: TABS.GROUPS, icon: Users, label: 'Groups' },
    { id: TABS.YOU, icon: User, label: 'You' },
  ];

  return (
    <nav className="bg-white border-t border-strava-border fixed bottom-0 left-0 right-0 z-20">
      <div className="max-w-lg mx-auto flex items-center justify-around py-1.5">
        {navItems.map(({ id, icon: Icon, label, isRecord }) => {
          const isActive = currentTab === id;

          if (isRecord) {
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex flex-col items-center gap-0.5 -mt-3"
              >
                <div className="w-12 h-12 rounded-full bg-strava-orange flex items-center justify-center shadow-lg">
                  <Icon size={24} className="text-white" fill="white" />
                </div>
                <span className="text-[10px] text-strava-medium">{label}</span>
              </button>
            );
          }

          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 ${
                isActive ? 'text-strava-orange' : 'text-strava-medium'
              }`}
            >
              <Icon size={22} />
              <span className="text-[10px] font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function PlaceholderTab({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <p className="text-4xl mb-3">🔒</p>
      <p className="text-strava-dark font-semibold">{title}</p>
      <p className="text-sm text-strava-medium mt-1">{description}</p>
    </div>
  );
}

export default function App() {
  const [currentTab, setCurrentTab] = useState(TABS.HOME);

  function handleRecordSuccess() {
    setCurrentTab(TABS.HOME);
  }

  return (
    <div className="bg-strava-light min-h-screen pb-20">
      {currentTab !== TABS.RECORD && <Header currentTab={currentTab} />}

      <main className="max-w-lg mx-auto">
        {currentTab === TABS.HOME && <ActivityFeed />}
        {currentTab === TABS.MAPS && (
          <PlaceholderTab
            title="Maps"
            description="Route mapping coming soon. Stay tuned!"
          />
        )}
        {currentTab === TABS.RECORD && (
          <ActivityForm
            onClose={() => setCurrentTab(TABS.HOME)}
            onSuccess={handleRecordSuccess}
          />
        )}
        {currentTab === TABS.GROUPS && (
          <PlaceholderTab
            title="Groups"
            description="Group challenges coming soon. Stay tuned!"
          />
        )}
        {currentTab === TABS.YOU && <ActivityList />}
      </main>

      <BottomNav currentTab={currentTab} setTab={setCurrentTab} />
    </div>
  );
}

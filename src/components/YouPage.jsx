import { Plus, Settings } from 'lucide-react';

export default function YouPage({ onNavigateToPremium }) {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-strava-border sticky top-0 z-20">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          {/* Left: user avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: '#FC4C02' }}
          >
            VC
          </div>

          {/* Center: title */}
          <h1 className="font-semibold text-strava-dark">You</h1>

          {/* Right: icons */}
          <div className="flex items-center gap-3">
            <button className="text-strava-dark">
              <Plus size={24} />
            </button>
            <button className="text-strava-dark">
              <Settings size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-strava-border bg-white sticky top-[57px] z-10">
        <button className="flex-1 py-3 text-sm font-semibold text-strava-dark border-b-2 border-strava-orange">
          Progress
        </button>
        <button className="flex-1 py-3 text-sm font-medium text-strava-medium">
          Activities
        </button>
      </div>

      {/* Content */}
      <div className="px-4 pb-6">
        {/* Instant Workouts */}
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-strava-orange flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FC4C02"
                strokeWidth="2"
              >
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            <span className="text-sm font-medium text-strava-dark">Instant Workouts</span>
            <span className="text-xs font-bold text-strava-orange bg-orange-50 px-1.5 py-0.5 rounded">
              NEW
            </span>
          </div>
          <button className="text-sm font-medium text-strava-orange">See all</button>
        </div>

        {/* Foundation Strength Card */}
        <div className="bg-white border border-strava-border rounded-lg p-4 mb-4 flex items-start gap-3">
          <div
            className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: '#8B1A1A' }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8.5L12 5l6 3.5M6 15.5L12 19l6-3.5M12 5v6.5M12 12.5V19" />
            </svg>
            <div className="absolute text-white text-[10px] font-bold mt-8">30m</div>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-strava-dark mb-1">Foundation Strength</h3>
            <p className="text-xs text-strava-medium leading-relaxed">
              Build a strong foundation with bodyweight exercises. Develop overall strength, impro...
            </p>
          </div>
          <button className="text-strava-medium flex-shrink-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2 mb-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-strava-orange bg-orange-50">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FC4C02" strokeWidth="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            <span className="text-sm font-medium text-strava-orange">Run</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-strava-border bg-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6D6D6D" strokeWidth="2">
              <circle cx="12" cy="5" r="2" />
              <path d="M8 8h8M8 8l-2 8M16 8l2 8M10 16l-2 6M14 16l2 6" />
            </svg>
            <span className="text-sm font-medium text-strava-medium">Weight Training</span>
          </button>
        </div>

        {/* This Week Stats */}
        <h3 className="text-sm font-semibold text-strava-dark mb-3">This week</h3>
        <div className="flex gap-8 mb-6">
          <div>
            <p className="text-xs text-strava-medium mb-1">Distance</p>
            <p className="text-2xl font-semibold text-strava-dark">0 mi</p>
          </div>
          <div>
            <p className="text-xs text-strava-medium mb-1">Time</p>
            <p className="text-2xl font-semibold text-strava-dark">0 m</p>
          </div>
          <div>
            <p className="text-xs text-strava-medium mb-1">Elev Gain</p>
            <p className="text-2xl font-semibold text-strava-dark">0 ft</p>
          </div>
        </div>

        {/* Past 12 Weeks Graph */}
        <h3 className="text-sm text-strava-medium mb-3">Past 12 weeks</h3>
        <div className="relative h-40 mb-6">
          {/* Y-axis labels */}
          <div className="absolute right-0 top-0 bottom-0 flex flex-col justify-between text-xs text-strava-medium">
            <span>13.0 mi</span>
            <span>6.5 mi</span>
            <span>0 mi</span>
          </div>

          {/* Graph area */}
          <div className="pr-12 h-full">
            <svg viewBox="0 0 240 120" className="w-full h-full">
              {/* Area fill */}
              <path
                d="M 10,80 L 30,50 L 50,55 L 70,60 L 90,70 L 110,65 L 130,75 L 150,35 L 170,40 L 190,50 L 210,55 L 230,85 L 230,120 L 10,120 Z"
                fill="#FFE4D6"
                opacity="0.8"
              />
              {/* Line */}
              <path
                d="M 10,80 L 30,50 L 50,55 L 70,60 L 90,70 L 110,65 L 130,75 L 150,35 L 170,40 L 190,50 L 210,55 L 230,85"
                stroke="#FC4C02"
                strokeWidth="2"
                fill="none"
              />
              {/* Points */}
              {[
                [10, 80],
                [30, 50],
                [50, 55],
                [70, 60],
                [90, 70],
                [110, 65],
                [130, 75],
                [150, 35],
                [170, 40],
                [190, 50],
                [210, 55],
                [230, 85],
              ].map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="3" fill="#FC4C02" />
              ))}
            </svg>
          </div>

          {/* X-axis labels */}
          <div className="flex justify-between text-xs text-strava-medium mt-1 pr-12">
            <span>DEC</span>
            <span>JAN</span>
            <span>FEB</span>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={onNavigateToPremium}
          className="w-full bg-strava-orange text-white font-semibold py-3.5 rounded-md mb-6 hover:bg-orange-600 transition-colors"
        >
          See more of your progress
        </button>

        {/* Calendar Section */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-strava-dark">February 2026</h2>
          <button className="flex items-center gap-1 px-3 py-1.5 border border-strava-border rounded text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
            </svg>
            <span className="font-medium text-strava-dark">Share</span>
          </button>
        </div>

        {/* Stats Icons Row */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <p className="text-xs text-strava-medium mb-2">Your Streak</p>
            <div className="relative">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FC4C02" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-bold text-strava-orange">
                10
              </span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-strava-medium mb-2">Streak Activities</p>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6D6D6D" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            </svg>
          </div>

          <div className="text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6D6D6D" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
          </div>

          <div className="text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6D6D6D" strokeWidth="2">
              <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
            </svg>
          </div>

          <div className="text-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6D6D6D" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

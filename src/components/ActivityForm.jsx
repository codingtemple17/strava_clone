import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { parseDuration } from '../utils/calculations';
import { X } from 'lucide-react';

const ACTIVITY_TYPES = ['Run', 'Ride', 'Swim', 'Hike', 'Walk', 'Other'];

export default function ActivityForm({ onClose, onSuccess }) {
  const { addActivity } = useApp();
  const [form, setForm] = useState({
    title: '',
    description: '',
    type: 'Run',
    distance: '',
    distanceUnit: 'mi',
    hours: '',
    minutes: '',
    seconds: '',
    location: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const h = parseInt(form.hours) || 0;
    const m = parseInt(form.minutes) || 0;
    const s = parseInt(form.seconds) || 0;
    const duration = h * 3600 + m * 60 + s;

    if (!form.title.trim() || !form.distance || duration <= 0) return;

    addActivity({
      title: form.title.trim(),
      description: form.description.trim(),
      type: form.type,
      distance: parseFloat(form.distance),
      distanceUnit: form.distanceUnit,
      duration,
      location: form.location.trim(),
    });

    onSuccess?.();
  }

  return (
    <div className="bg-white min-h-full">
      {/* Form header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-strava-border">
        <button onClick={onClose} className="text-strava-medium">
          <X size={24} />
        </button>
        <h2 className="font-semibold text-strava-dark">Log Activity</h2>
        <button
          onClick={handleSubmit}
          className="text-strava-orange font-semibold text-sm"
        >
          Save
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-5">
        {/* Activity Type */}
        <div>
          <label className="block text-xs font-semibold text-strava-medium uppercase tracking-wide mb-2">
            Activity Type
          </label>
          <div className="flex flex-wrap gap-2">
            {ACTIVITY_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setForm({ ...form, type })}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  form.type === type
                    ? 'bg-strava-orange text-white'
                    : 'bg-strava-light text-strava-dark hover:bg-gray-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-strava-medium uppercase tracking-wide mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder={`${form.type === 'Ride' ? 'Afternoon' : 'Morning'} ${form.type}`}
            className="w-full border border-strava-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-strava-orange"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-strava-medium uppercase tracking-wide mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="How'd it go? Share some details about your activity..."
            rows={3}
            className="w-full border border-strava-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-strava-orange resize-none"
          />
        </div>

        {/* Distance */}
        <div>
          <label className="block text-xs font-semibold text-strava-medium uppercase tracking-wide mb-1">
            Distance
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="distance"
              value={form.distance}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="flex-1 border border-strava-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-strava-orange"
            />
            <select
              name="distanceUnit"
              value={form.distanceUnit}
              onChange={handleChange}
              className="border border-strava-border rounded-lg px-3 py-2.5 text-sm bg-white focus:outline-none focus:border-strava-orange"
            >
              <option value="mi">miles</option>
              <option value="km">km</option>
            </select>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-semibold text-strava-medium uppercase tracking-wide mb-1">
            Duration
          </label>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <input
                type="number"
                name="hours"
                value={form.hours}
                onChange={handleChange}
                placeholder="HH"
                min="0"
                max="99"
                className="w-full border border-strava-border rounded-lg px-3 py-2.5 text-sm text-center focus:outline-none focus:border-strava-orange"
              />
              <p className="text-[10px] text-strava-medium text-center mt-0.5">hours</p>
            </div>
            <span className="text-strava-medium font-bold text-lg pb-4">:</span>
            <div className="flex-1">
              <input
                type="number"
                name="minutes"
                value={form.minutes}
                onChange={handleChange}
                placeholder="MM"
                min="0"
                max="59"
                className="w-full border border-strava-border rounded-lg px-3 py-2.5 text-sm text-center focus:outline-none focus:border-strava-orange"
              />
              <p className="text-[10px] text-strava-medium text-center mt-0.5">min</p>
            </div>
            <span className="text-strava-medium font-bold text-lg pb-4">:</span>
            <div className="flex-1">
              <input
                type="number"
                name="seconds"
                value={form.seconds}
                onChange={handleChange}
                placeholder="SS"
                min="0"
                max="59"
                className="w-full border border-strava-border rounded-lg px-3 py-2.5 text-sm text-center focus:outline-none focus:border-strava-orange"
              />
              <p className="text-[10px] text-strava-medium text-center mt-0.5">sec</p>
            </div>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-strava-medium uppercase tracking-wide mb-1">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Central Park, New York"
            className="w-full border border-strava-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-strava-orange"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-strava-orange text-white font-semibold py-3 rounded-lg hover:bg-strava-orange-hover transition-colors"
        >
          Save Activity
        </button>
      </form>
    </div>
  );
}

import { X, Lock } from 'lucide-react';
import FlyoverPreview from './FlyoverPreview.jsx';

export default function FlyoverModal({ open, onClose, activityId, isPremium }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close flyover"
      />

      <div className="relative max-w-lg mx-auto mt-20 px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-strava-border">
          <div className="flex items-center justify-between px-4 py-3 border-b border-strava-border">
            <div>
              <p className="text-sm font-semibold text-strava-dark">Flyover</p>
              <p className="text-xs text-strava-medium">Map video tour</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-50 border border-strava-border flex items-center justify-center"
              aria-label="Close"
            >
              <X size={18} className="text-strava-dark" />
            </button>
          </div>

          <div className="p-4">
            {isPremium ? (
              <FlyoverPreview activityId={activityId} className="h-72" density={14} />
            ) : (
              <div className="rounded-2xl border border-strava-border bg-gray-50 p-6 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-white border border-strava-border flex items-center justify-center">
                  <Lock size={20} className="text-strava-medium" />
                </div>
                <p className="mt-3 font-semibold text-strava-dark">Premium required</p>
                <p className="text-sm text-strava-medium mt-1">
                  Subscribe to watch Flyover replays in your feed.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { X, MapPin, Target, TrendingUp, Award, Calendar } from 'lucide-react';

export default function PremiumPage({ onClose }) {
  return (
    <div className="bg-white min-h-screen">
      {/* Header with gradient background */}
      <div className="relative bg-gradient-to-br from-orange-200 via-orange-100 to-orange-50 pt-12 pb-8 px-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md"
        >
          <X size={24} className="text-strava-dark" />
        </button>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-strava-dark mb-2 text-center">
          Unlock your full potential.
        </h1>
        <p className="text-center text-strava-medium text-sm">
          Track your progress, train smarter and reach more goals with subscription features.
        </p>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        {/* Pricing Cards */}
        <div className="space-y-3 mb-8 -mt-6">
          {/* Annual Plan */}
          <div className="bg-strava-dark text-white rounded-xl p-5 relative overflow-hidden border-2 border-strava-dark">
            {/* Most Popular Badge */}
            <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-br-lg">
              Most popular
            </div>

            <div className="flex items-center justify-between mt-4">
              <div>
                <h3 className="text-xl font-bold mb-1">Annual</h3>
                <p className="text-sm text-gray-300">Billed at $79.99/year</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 line-through text-sm">$11.99</p>
                <p className="text-2xl font-bold">$6.67/month</p>
              </div>
            </div>
          </div>

          {/* Monthly Plan */}
          <div className="bg-gray-50 rounded-xl p-5 border border-strava-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-strava-dark">Monthly</h3>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-strava-dark">$11.99/month</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-strava-dark text-center mb-6">
            Everything you need,
            <br />
            all in one place
          </h2>

          {/* Features List */}
          <div className="space-y-5">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <MapPin size={28} className="text-strava-dark" />
              </div>
              <p className="text-strava-dark pt-2">Create routes and get smart recommendations</p>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-strava-dark"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18" />
                </svg>
              </div>
              <p className="text-strava-dark pt-2">Set goals and stay on track</p>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <TrendingUp size={28} className="text-strava-dark" />
              </div>
              <p className="text-strava-dark pt-2">Analyze workouts with advanced insights</p>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <Award size={28} className="text-strava-dark" />
              </div>
              <p className="text-strava-dark pt-2">Track all your top performances</p>
            </div>

            {/* Feature 5 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center">
                <Calendar size={28} className="text-strava-dark" />
              </div>
              <p className="text-strava-dark pt-2">See your training history in one place</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white border-t border-strava-border px-6 py-4">
        <button className="w-full bg-strava-orange text-white font-bold py-4 rounded-lg mb-2 hover:bg-orange-600 transition-colors">
          Subscribe Annually
        </button>
        <p className="text-center text-xs text-strava-medium">
          Recurring billing. Cancel anytime.
        </p>
      </div>
    </div>
  );
}

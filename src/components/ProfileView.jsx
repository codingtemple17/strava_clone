import { useMemo, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';
import ActivityCard from './ActivityCard';
import {
  ChevronLeft,
  Share2,
  Search,
  Settings,
  QrCode,
  Pencil,
  Footprints,
  ChevronRight,
  Activity,
  BarChart3,
  Route,
  Pin,
  Medal,
  FileText,
  Bike,
  Trophy,
} from 'lucide-react';
import { getItem, setItem } from '../utils/localStorage';

function HighlightImage({ src, alt, onClick }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-56 h-40 shrink-0 rounded-2xl border border-strava-border bg-gradient-to-br from-white to-strava-light flex items-center justify-center text-xs text-strava-medium focus:outline-none focus:ring-2 focus:ring-strava-orange/40"
        aria-label="Upload highlight image"
      >
        Upload image
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-56 h-40 shrink-0 rounded-2xl border-2 border-strava-orange shadow-sm overflow-hidden bg-white focus:outline-none focus:ring-2 focus:ring-strava-orange/40"
      aria-label="Replace highlight image"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
    </button>
  );
}

function ThisWeekChart() {
  // Lightweight inline SVG to keep the UI feeling complete.
  return (
    <div className="mt-4">
      <svg
        viewBox="0 0 360 140"
        className="w-full h-[140px]"
        role="img"
        aria-label="Weekly activity chart"
      >
        <defs>
          <linearGradient id="stravaArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FC4C02" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FC4C02" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* grid */}
        {Array.from({ length: 7 }).map((_, i) => (
          <line
            key={i}
            x1={20 + i * 50}
            y1={15}
            x2={20 + i * 50}
            y2={125}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={i}
            x1={20}
            y1={15 + i * 35}
            x2={340}
            y2={15 + i * 35}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
        ))}

        {/* line + area (static sample) */}
        <path
          d="M20 120 L70 70 L120 85 L170 120 L220 95 L270 120 L320 35 L340 120"
          fill="none"
          stroke="#FC4C02"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M20 120 L70 70 L120 85 L170 120 L220 95 L270 120 L320 35 L340 120 L20 120 Z"
          fill="url(#stravaArea)"
        />

        {/* points */}
        {[
          [20, 120],
          [70, 70],
          [120, 85],
          [170, 120],
          [220, 95],
          [270, 120],
          [320, 35],
          [340, 120],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === 7 ? 9 : 6}
            fill="#fff"
            stroke="#FC4C02"
            strokeWidth={i === 7 ? 4 : 3}
          />
        ))}

        <text x="20" y="12" fontSize="10" fill="#6B7280">
          2 mi
        </text>
        <text x="330" y="12" fontSize="10" fill="#111827" fontWeight="700">
          0 mi
        </text>
        <text x="85" y="138" fontSize="10" fill="#6B7280">
          DEC
        </text>
        <text x="175" y="138" fontSize="10" fill="#6B7280">
          JAN
        </text>
        <text x="285" y="138" fontSize="10" fill="#6B7280">
          FEB
        </text>
      </svg>
    </div>
  );
}

const HIGHLIGHTS_KEY_PREFIX = 'strava_user_highlights_';

function loadImageFromFile(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

async function fileToCompressedDataUrl(file, { maxWidth = 1000, quality = 0.82 } = {}) {
  const img = await loadImageFromFile(file);
  const scale = img.width > maxWidth ? maxWidth / img.width : 1;
  const width = Math.max(1, Math.round(img.width * scale));
  const height = Math.max(1, Math.round(img.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL('image/jpeg', quality);
}

export default function ProfileView({ userId, onBack, onOpenActivities }) {
  const { users, getUserById, getActivitiesByUserId, setUserProfilePhoto } = useApp();
  const user = getUserById(userId);
  const fileInputRef = useRef(null);
  const highlightSlotInputRef = useRef(null);
  const highlightSlotIndexRef = useRef(0);
  const profilePhotoInputRef = useRef(null);
  const continuationInputRef = useRef(null);

  const followersCount = useMemo(() => {
    if (!userId) return 0;
    return users.filter((u) => Array.isArray(u.following) && u.following.includes(userId)).length;
  }, [users, userId]);

  if (!user) {
    return (
      <div className="px-4 py-10 text-center">
        <p className="text-strava-dark font-semibold">Profile not found</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-3 text-sm text-strava-orange font-semibold"
        >
          Back
        </button>
      </div>
    );
  }

  const isJuanFranco = user.id === 'user-4';
  const storageKey = `${HIGHLIGHTS_KEY_PREFIX}${user.id}`;
  const [uploadedHighlights, setUploadedHighlights] = useState(() => getItem(storageKey) || null);

  const continuationKey = `strava_user_profile_continuation_${user.id}`;
  const [continuationImage, setContinuationImage] = useState(() => getItem(continuationKey) || null);

  const defaultHighlights = isJuanFranco ? [null, null, null] : [];
  const highlights =
    Array.isArray(uploadedHighlights) && uploadedHighlights.length > 0
      ? uploadedHighlights
      : defaultHighlights;

  const highlightsWithAllMedia = highlights.length > 0
    ? [...highlights, highlights[2] || highlights[0]]
    : [];

  const baseActivities = getActivitiesByUserId(userId);
  const userActivities = useMemo(() => {
    if (!isJuanFranco) return baseActivities;
    if (!Array.isArray(uploadedHighlights) || uploadedHighlights.length === 0) return baseActivities;

    const mediaById = {
      'act-10': [uploadedHighlights[0]].filter(Boolean),
      'act-11': [uploadedHighlights[1]].filter(Boolean),
      'act-14': [uploadedHighlights[2]].filter(Boolean),
    };

    return baseActivities.map((a) => {
      const media = mediaById[a.id];
      if (!media) return a;
      return { ...a, media };
    });
  }, [baseActivities, isJuanFranco, uploadedHighlights]);

  async function handleUploadHighlights(e) {
    const files = Array.from(e.target.files || []).slice(0, 3);
    if (files.length === 0) return;

    try {
      const urls = await Promise.all(
        files.map((f) => fileToCompressedDataUrl(f, { maxWidth: 1100, quality: 0.82 }))
      );
      setUploadedHighlights(urls);
      setItem(storageKey, urls);
    } catch (err) {
      console.error('Failed to upload highlights:', err);
    } finally {
      // allow re-uploading the same file
      e.target.value = '';
    }
  }

  async function handleUploadHighlightSlot(e) {
    const file = (e.target.files || [])[0];
    if (!file) return;
    const index = highlightSlotIndexRef.current || 0;
    try {
      const url = await fileToCompressedDataUrl(file, { maxWidth: 1100, quality: 0.82 });
      const next = Array.isArray(uploadedHighlights) ? [...uploadedHighlights] : [...highlights];
      next[index] = url;
      setUploadedHighlights(next);
      setItem(storageKey, next);
    } catch (err) {
      console.error('Failed to upload highlight slot:', err);
    } finally {
      e.target.value = '';
    }
  }

  async function handleUploadProfilePhoto(e) {
    const file = (e.target.files || [])[0];
    if (!file) return;
    try {
      const url = await fileToCompressedDataUrl(file, { maxWidth: 600, quality: 0.85 });
      setUserProfilePhoto(user.id, url);
    } catch (err) {
      console.error('Failed to upload profile photo:', err);
    } finally {
      e.target.value = '';
    }
  }

  async function handleUploadContinuationImage(e) {
    const file = (e.target.files || [])[0];
    if (!file) return;
    try {
      const url = await fileToCompressedDataUrl(file, { maxWidth: 1200, quality: 0.82 });
      setContinuationImage(url);
      setItem(continuationKey, url);
    } catch (err) {
      console.error('Failed to upload continuation image:', err);
    } finally {
      e.target.value = '';
    }
  }

  function handleResetHighlights() {
    setUploadedHighlights(null);
    setItem(storageKey, null);
  }

  const latestActivityDateLabel = useMemo(() => {
    if (!Array.isArray(baseActivities) || baseActivities.length === 0) return '—';
    const ts = baseActivities[0]?.timestamp || baseActivities[0]?.date;
    if (!ts) return '—';
    try {
      return new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(ts));
    } catch {
      return '—';
    }
  }, [baseActivities]);

  const thisYearDistanceLabel = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const start = new Date(year, 0, 1).getTime();
    const end = new Date(year + 1, 0, 1).getTime();
    const miles = (baseActivities || [])
      .filter((a) => {
        const ts = a.timestamp || a.date;
        return typeof ts === 'number' && ts >= start && ts < end;
      })
      .reduce((sum, a) => sum + (Number(a.distance) || 0), 0);
    if (!miles) return '—';
    return `${miles.toFixed(1)} mi`;
  }, [baseActivities]);

  function MenuRow({ icon: Icon, title, subtitle, onClick }) {
    const clickable = typeof onClick === 'function';
    const Tag = clickable ? 'button' : 'div';
    return (
      <Tag
        type={clickable ? 'button' : undefined}
        onClick={onClick}
        className={`w-full flex items-center justify-between py-4 ${
          clickable ? 'active:opacity-80' : ''
        }`}
      >
        <div className="flex items-start gap-4">
          <div className="w-7 h-7 flex items-center justify-center text-strava-dark">
            <Icon size={22} />
          </div>
          <div className="text-left">
            <p className="text-base font-semibold text-strava-dark">{title}</p>
            <p className="text-xs text-strava-medium mt-0.5">{subtitle}</p>
          </div>
        </div>
        <ChevronRight className="text-strava-medium" />
      </Tag>
    );
  }

  // Juan's subscriber profile layout (inspired by the screenshot, but not a pixel-perfect copy).
  if (isJuanFranco) {
    return (
      <div className="bg-white">
        <header className="sticky top-0 z-20 bg-white/60 backdrop-blur border-b border-strava-border">
          <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={onBack}
              className="text-strava-dark p-1 -ml-1"
              aria-label="Back"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-3">
              <button type="button" className="text-strava-dark p-1" aria-label="Share">
                <Share2 size={20} />
              </button>
              <button type="button" className="text-strava-dark p-1" aria-label="Search">
                <Search size={20} />
              </button>
              <button type="button" className="text-strava-dark p-1" aria-label="Settings">
                <Settings size={20} />
              </button>
            </div>
          </div>
        </header>

        <div className="bg-gradient-to-b from-[#f3c0b0] via-[#f7d7cc] to-white">
          <div className="max-w-lg mx-auto px-4 pt-6 pb-5">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() => profilePhotoInputRef.current?.click()}
                className="shrink-0 focus:outline-none focus:ring-2 focus:ring-strava-orange/40"
                aria-label="Change profile photo"
              >
                <div
                  className="w-[86px] h-[92px] border-[3px] overflow-hidden bg-white shadow-sm"
                  style={{
                    borderColor: '#FC4C02',
                    clipPath:
                      'polygon(50% 0%, 92% 18%, 92% 68%, 50% 100%, 8% 68%, 8% 18%)',
                  }}
                >
                  {user.profilePhoto ? (
                    <img
                      src={user.profilePhoto}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white text-lg font-bold"
                      style={{ backgroundColor: user.profileColor || '#6D6D6D' }}
                    >
                      {user.username
                        ?.split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase() || '?'}
                    </div>
                  )}
                </div>
                <input
                  ref={profilePhotoInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUploadProfilePhoto}
                />
              </button>

              <div className="min-w-0 pt-1">
                <p className="text-xs tracking-widest text-strava-dark/70 uppercase">Subscriber</p>
                <h2 className="text-3xl font-extrabold text-strava-dark leading-tight truncate">
                  {user.username}
                </h2>
                <p className="text-strava-dark/70 mt-1">NY, New York</p>
              </div>
            </div>

            <div className="mt-6 flex gap-12">
              <div>
                <p className="text-sm text-strava-dark/70">Following</p>
                <p className="text-3xl font-extrabold text-strava-dark">{user.following?.length || 0}</p>
              </div>
              <div>
                <p className="text-sm text-strava-dark/70">Followers</p>
                <p className="text-3xl font-extrabold text-strava-dark">{followersCount}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-strava-orange/40 bg-white/70 px-4 py-2.5 text-strava-orange font-semibold"
              >
                <QrCode size={18} />
                Share my QR Code
              </button>
              <button
                type="button"
                className="w-[120px] inline-flex items-center justify-center gap-2 rounded-full border border-strava-orange/40 bg-white/70 px-4 py-2.5 text-strava-orange font-semibold"
              >
                <Pencil size={18} />
                Edit
              </button>
            </div>

            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {highlightsWithAllMedia.map((src, idx) => {
                const isAllMedia = idx === 3;
                return (
                  <div key={`${src}-${idx}`} className="relative">
                    <HighlightImage
                      src={src}
                      alt={isAllMedia ? 'All media' : `Highlight ${idx + 1}`}
                      onClick={() => {
                        if (isAllMedia) return;
                        highlightSlotIndexRef.current = idx;
                        highlightSlotInputRef.current?.click();
                      }}
                    />
                    {isAllMedia && (
                      <div className="absolute inset-0 rounded-2xl bg-black/35 flex items-center justify-center">
                        <span className="text-white font-semibold">All media</span>
                      </div>
                    )}
                  </div>
                );
              })}
              <input
                ref={highlightSlotInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadHighlightSlot}
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleUploadHighlights}
              />
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 pb-6">
          <section className="bg-white rounded-2xl">
            <div className="flex items-center gap-2 pt-4">
              <Footprints className="text-strava-dark" size={22} />
              <h3 className="text-2xl font-extrabold text-strava-dark">This week</h3>
            </div>

            <div className="mt-4 flex gap-10">
              <div>
                <p className="text-sm text-strava-dark/70">Distance</p>
                <p className="text-3xl font-extrabold text-strava-dark">0.00 mi</p>
              </div>
              <div>
                <p className="text-sm text-strava-dark/70">Time</p>
                <p className="text-3xl font-extrabold text-strava-dark">0h</p>
              </div>
              <div>
                <p className="text-sm text-strava-dark/70">Elevation</p>
                <p className="text-3xl font-extrabold text-strava-dark">0 ft</p>
              </div>
            </div>

            <ThisWeekChart />
          </section>

          <button
            type="button"
            className="mt-5 w-full flex items-center justify-between rounded-2xl bg-white border border-strava-border px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-strava-orange/30 flex items-center justify-center text-strava-orange font-bold">
                A
              </div>
              <div className="text-left">
                <p className="text-strava-dark font-semibold">Subscription overview</p>
              </div>
            </div>
            <ChevronRight className="text-strava-medium" />
          </button>

          <button
            type="button"
            onClick={onOpenActivities}
            className="mt-3 w-full flex items-center justify-between rounded-2xl bg-white border border-strava-border px-4 py-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl border border-strava-border flex items-center justify-center text-strava-dark font-semibold">
                ≡
              </div>
              <div className="text-left">
                <p className="text-strava-dark font-semibold">Activities</p>
                <p className="text-xs text-strava-medium">{latestActivityDateLabel}</p>
              </div>
            </div>
            <ChevronRight className="text-strava-medium" />
          </button>

          <section className="mt-6 bg-white rounded-2xl border border-strava-border px-4">
            <MenuRow icon={BarChart3} title="Statistics" subtitle={`This year: ${thisYearDistanceLabel}`} />
            <div className="border-t border-strava-border" />
            <MenuRow icon={Route} title="Routes" subtitle="—" />
            <div className="border-t border-strava-border" />
            <MenuRow icon={Pin} title="Segments" subtitle="—" />
            <div className="border-t border-strava-border" />
            <MenuRow icon={Medal} title="Best Efforts" subtitle="See All" />
            <div className="border-t border-strava-border" />
            <MenuRow icon={FileText} title="Posts" subtitle="—" />
            <div className="border-t border-strava-border" />
            <MenuRow icon={Bike} title="Gear" subtitle="—" />
          </section>

          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-strava-dark">Trophy Case</h3>
              <span className="text-sm text-strava-medium">5</span>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-6">
              {[{ n: 20, label: '20th\nActivity' }, { n: 10, label: '10th\nActivity' }, { n: 5, label: 'Fifth\nActivity' }, { n: 3, label: 'Third\nActivity' }].map((t) => (
                <div key={t.n} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f9e3db] to-white border border-strava-border flex items-center justify-center">
                    <div className="w-12 h-12 rounded-2xl border-2 border-strava-orange/50 flex items-center justify-center text-strava-orange font-extrabold text-2xl">
                      {t.n}
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-strava-dark whitespace-pre-line">{t.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 bg-white rounded-2xl border border-strava-border px-4">
            <MenuRow icon={Trophy} title="All trophies" subtitle="" />
          </section>

          <section className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-extrabold text-strava-dark">Clubs</h3>
              <ChevronRight className="text-strava-medium" />
            </div>
            <div className="mt-3 text-sm text-strava-medium">No clubs yet.</div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-strava-border">
        <div className="max-w-lg mx-auto flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={onBack}
            className="text-strava-dark p-1 -ml-1"
            aria-label="Back"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="flex items-center gap-3">
            <button type="button" className="text-strava-dark p-1" aria-label="Share">
              <Share2 size={20} />
            </button>
            <button type="button" className="text-strava-dark p-1" aria-label="Search">
              <Search size={20} />
            </button>
            <button type="button" className="text-strava-dark p-1" aria-label="Settings">
              <Settings size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 pt-5 pb-6">
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            <div
              className="w-20 h-20 rounded-2xl border-2 overflow-hidden bg-white"
              style={{ borderColor: '#FC4C02' }}
            >
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white text-lg font-bold"
                  style={{ backgroundColor: user.profileColor || '#6D6D6D' }}
                >
                  {user.username
                    ?.split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase() || '?'}
                </div>
              )}
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-xs tracking-widest text-strava-medium uppercase">Subscriber</p>
            <h2 className="text-2xl font-extrabold text-strava-dark leading-tight truncate">
              {user.username}
            </h2>
          </div>
        </div>

        {user.bio && <p className="mt-6 text-sm text-strava-dark">{user.bio}</p>}

        <section className="mt-8">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-strava-dark">Recent activity</h3>
            <span className="text-xs text-strava-medium">{userActivities.length} total</span>
          </div>

          {userActivities.length === 0 ? (
            <div className="mt-4 text-sm text-strava-medium">No activities yet.</div>
          ) : (
            <div className="mt-4 -mx-4">
              {userActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

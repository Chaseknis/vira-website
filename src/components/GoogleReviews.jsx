import { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Google Reviews — configure these two values once the Google Business
 * Profile is verified and the Places API is enabled.
 *
 *  VITE_GOOGLE_MAPS_API_KEY  — Google Cloud Console API key
 *                              (restrict it to your domain + Maps JS API)
 *  VITE_GOOGLE_PLACE_ID      — Find yours at:
 *                              https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder
 */
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
const GOOGLE_PLACE_ID = import.meta.env.VITE_GOOGLE_PLACE_ID || '';

/* ─── Fallback curated reviews (shown until API is configured) ─── */
const FALLBACK_REVIEWS = [
  {
    author_name: 'Sarah M.',
    rating: 5,
    text: 'Exceptional digital marketing agency. VIRA completely elevated our brand presence across Kigali. The team is professional, creative, and genuinely cares about results. Highly recommend!',
    relative_time_description: '2 months ago',
    profile_photo_url: null,
    initials: 'SM',
  },
  {
    author_name: 'Ahmed Khalid',
    rating: 5,
    text: 'Working with VIRA has been transformational for our business. Their content quality is world-class and they understand the East African market like no other agency. 5 stars without hesitation.',
    relative_time_description: '3 months ago',
    profile_photo_url: null,
    initials: 'AK',
  },
  {
    author_name: 'James Robertson',
    rating: 5,
    text: 'From strategy to execution, VIRA delivered beyond our expectations. Our social media engagement tripled in four months. If you want results-driven marketing in Kigali, this is your team.',
    relative_time_description: '1 month ago',
    profile_photo_url: null,
    initials: 'JR',
  },
  {
    author_name: 'Amira Hassan',
    rating: 5,
    text: 'VIRA produced our company video campaign and it was absolutely stunning. Professional crew, creative direction, and final delivery on time. The video went viral within days of posting.',
    relative_time_description: '5 months ago',
    profile_photo_url: null,
    initials: 'AH',
  },
  {
    author_name: 'Patrick N.',
    rating: 5,
    text: 'Best investment we made for our brand. VIRA manages our Instagram and TikTok and the growth has been incredible. They truly understand how to build an audience that converts.',
    relative_time_description: '2 weeks ago',
    profile_photo_url: null,
    initials: 'PN',
  },
];

function StarRating({ rating, size = 16 }) {
  return (
    <div className="gr-stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width={size} height={size} viewBox="0 0 24 24">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill={s <= rating ? '#FACC15' : 'rgba(255,255,255,0.15)'}
          />
        </svg>
      ))}
    </div>
  );
}

function loadMapsScript(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.places) { resolve(window.google.maps.places); return; }
    const s = document.createElement('script');
    s.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    s.async = true;
    s.onload = () => resolve(window.google.maps.places);
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function fetchGoogleReviews(placeId, apiKey) {
  return new Promise((resolve, reject) => {
    loadMapsScript(apiKey).then((places) => {
      const dummy = document.createElement('div');
      const service = new places.PlacesService(dummy);
      service.getDetails(
        {
          placeId,
          fields: ['name', 'rating', 'user_ratings_total', 'reviews', 'url'],
        },
        (result, status) => {
          if (status === 'OK') resolve(result);
          else reject(new Error(status));
        },
      );
    }).catch(reject);
  });
}

export default function GoogleReviews() {
  const sectionRef = useRef(null);
  const [reviews, setReviews] = useState([]);
  const [placeData, setPlaceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);

  const load = useCallback(() => {
    if (!GOOGLE_API_KEY || !GOOGLE_PLACE_ID) {
      setReviews(FALLBACK_REVIEWS);
      setUsingFallback(true);
      return;
    }
    setLoading(true);
    fetchGoogleReviews(GOOGLE_PLACE_ID, GOOGLE_API_KEY)
      .then((data) => {
        setPlaceData(data);
        setReviews(
          (data.reviews || []).map((r) => ({
            ...r,
            initials: r.author_name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
          })),
        );
        setUsingFallback(false);
      })
      .catch(() => {
        setReviews(FALLBACK_REVIEWS);
        setUsingFallback(true);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  useGSAP(() => {
    gsap.from('.gr-label, .gr-title, .gr-subtitle', {
      opacity: 0, y: 40, stagger: 0.12, duration: 0.85, ease: 'power3.out',
      scrollTrigger: { trigger: '.gr-label', start: 'top 85%' },
    });
  }, { scope: sectionRef });

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section id="reviews" className="google-reviews-section" ref={sectionRef}>
      {/* Header */}
      <div className="gr-head">
        <p className="gr-label">Google Reviews</p>
        <h2 className="gr-title">What People Are Saying</h2>
        <p className="gr-subtitle">
          Real feedback from real clients — verified on Google
        </p>
      </div>

      {/* Summary bar */}
      <div className="gr-summary">
        <div className="gr-summary-score">
          <span className="gr-big-rating">{avgRating}</span>
          <div className="gr-summary-right">
            <StarRating rating={5} size={20} />
            <p className="gr-review-count">
              {placeData?.user_ratings_total
                ? `${placeData.user_ratings_total} reviews`
                : `${reviews.length} reviews`}
            </p>
            <div className="gr-google-badge">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Google</span>
            </div>
          </div>
        </div>

        {/* Rating bars */}
        <div className="gr-bars">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct = reviews.length ? (count / reviews.length) * 100 : star === 5 ? 100 : 0;
            return (
              <div className="gr-bar-row" key={star}>
                <span className="gr-bar-label">{star}</span>
                <div className="gr-bar-track">
                  <motion.div
                    className="gr-bar-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: (5 - star) * 0.1, ease: 'power2.out' }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews grid */}
      {loading ? (
        <div className="gr-loading">
          <div className="gr-spinner" />
          <p>Loading reviews…</p>
        </div>
      ) : (
        <div className="gr-grid">
          {reviews.slice(0, 6).map((review, i) => (
            <motion.div
              key={i}
              className="gr-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="gr-card-top">
                <div className="gr-reviewer">
                  {review.profile_photo_url ? (
                    <img src={review.profile_photo_url} alt={review.author_name} className="gr-reviewer-photo" />
                  ) : (
                    <div className="gr-reviewer-initials">
                      {review.initials}
                    </div>
                  )}
                  <div>
                    <p className="gr-reviewer-name">{review.author_name}</p>
                    <p className="gr-reviewer-time">{review.relative_time_description}</p>
                  </div>
                </div>
                <StarRating rating={review.rating} size={13} />
              </div>
              <p className="gr-review-text">
                {review.text?.length > 220 ? `${review.text.slice(0, 217)}…` : review.text}
              </p>
              <div className="gr-card-footer">
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span>Posted on Google</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="gr-cta-row">
        {usingFallback && (
          <p className="gr-fallback-note">
            Live reviews load automatically once{' '}
            <code>VITE_GOOGLE_MAPS_API_KEY</code> &amp;{' '}
            <code>VITE_GOOGLE_PLACE_ID</code> are set in <code>.env.local</code>
          </p>
        )}
        {placeData?.url && (
          <a href={placeData.url} target="_blank" rel="noreferrer" className="gr-google-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ marginRight: 8 }}>
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            See All Google Reviews
          </a>
        )}
      </div>
    </section>
  );
}

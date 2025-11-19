/**
 * Utilities for normalizing YouTube URLs into embed URLs.
 *
 * Exports:
 * - normalizeYouTubeEmbedUrl(input: string): string | null
 */

function parseTimestampToSeconds(ts: string | null): number | null {
  if (!ts) return null;
  // Strip leading 't=' or 't' or leading '#'
  const raw = ts.replace(/^#?t=/, "").replace(/^t=/, "");

  // If it's a plain number (seconds)
  if (/^\d+$/.test(raw)) return parseInt(raw, 10);

  // Support formats like 1h2m30s, 2m30s, 90s
  const parts = raw.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/);
  if (!parts) return null;
  const hours = parts[1] ? parseInt(parts[1], 10) : 0;
  const minutes = parts[2] ? parseInt(parts[2], 10) : 0;
  const seconds = parts[3] ? parseInt(parts[3], 10) : 0;
  const total = hours * 3600 + minutes * 60 + seconds;
  return total > 0 ? total : null;
}

/**
 * Extracts a YouTube video id from many common URL formats.
 * Returns `https://www.youtube.com/embed/<ID>` or null if none.
 */
export function normalizeYouTubeEmbedUrl(input: string): string | null {
  if (!input || typeof input !== "string") return null;

  let id: string | null = null;
  let startSeconds: number | null = null;

  try {
    const url = new URL(input, "https://example.com");

    // Hash (#t=1m30s) support
    if (url.hash) {
      const hash = url.hash.replace(/^#/, "");
      const m = hash.match(/(?:t=)(.*)/);
      if (m && m[1]) {
        startSeconds = parseTimestampToSeconds(m[1]);
      }
    }

    const host = url.hostname.toLowerCase();
    const pathname = url.pathname || "";
    const searchParams = url.searchParams;

    // youtu.be short link
    if (host.includes("youtu.be")) {
      id = pathname.replace(/^\//, "").split(/[?#]/)[0] || null;
    }

    // youtube.com variants
    if (!id && host.includes("youtube.com")) {
      // If it's an embed path: /embed/VIDEO_ID
      const embedMatch = pathname.match(/\/embed\/([A-Za-z0-9_-]{6,})/);
      if (embedMatch) {
        id = embedMatch[1];
      }

      // classic watch?v=VIDEO_ID
      if (!id && searchParams.has("v")) {
        id = searchParams.get("v");
      }

      // /v/VIDEO_ID legacy
      if (!id) {
        const vMatch = pathname.match(/\/v\/([A-Za-z0-9_-]{6,})/);
        if (vMatch) id = vMatch[1];
      }
    }

    // timestamp params like ?t= or ?start=
    if (searchParams.has("start")) {
      const s = searchParams.get("start");
      if (s && /^\d+$/.test(s)) startSeconds = parseInt(s, 10);
    }
    if (!startSeconds && searchParams.has("t")) {
      const t = searchParams.get("t");
      startSeconds = parseTimestampToSeconds(t);
    }
  } catch (e) {
    // If URL parsing fails, we'll fallback to regex extraction below
  }

  // Regex fallback to catch many patterns
  if (!id) {
    const re = /(?:v=|embed\/|v\/|youtu\.be\/)([A-Za-z0-9_-]{6,11})/;
    const m = input.match(re);
    if (m && m[1]) id = m[1];
  }

  if (!id) return null;

  const embedBase = `https://www.youtube.com/embed/${id}`;
  if (startSeconds && startSeconds > 0) {
    return `${embedBase}?start=${startSeconds}`;
  }
  return embedBase;
}

export default normalizeYouTubeEmbedUrl;

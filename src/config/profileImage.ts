export const PROFILE_IMAGE_FALLBACK = "/asem-pfp.svg";

const envProfileImage = import.meta.env.VITE_PROFILE_IMAGE_URL;
const configuredProfileImage =
  typeof envProfileImage === "string" && envProfileImage.length > 0
    ? envProfileImage
    : undefined;

/** Primary profile image in public/ */
export const PROFILE_IMAGE_URL = configuredProfileImage ?? "/assempfp.jpeg";

/** Crop focus: horizontal center, extra headroom above subject */
export const PROFILE_IMAGE_OBJECT_POSITION = "50% -12%";

/** Zoom factor inside the frame (1 = no extra zoom) */
export const PROFILE_IMAGE_SCALE = 1.15;

/** Ordered fallback chain when the primary image fails to load */
export const PROFILE_IMAGE_CANDIDATES = [
  PROFILE_IMAGE_URL,
  "/assempfp.jpeg",
  "/asem-pfp.png",
  "/asem-pfp.jpg",
  "/asem-pfp.jpeg",
  "/asem-pfp.webp",
  "/asem pfp.png",
  PROFILE_IMAGE_FALLBACK,
].filter((path, index, list) => list.indexOf(path) === index);

export function flattenAttributes(data) {
  // Check if data is a plain object; return as is if not
  if (
    typeof data !== "object" ||
    data === null ||
    data instanceof Date ||
    typeof data === "function"
  ) {
    return data;
  }

  // If data is an array, apply flattenAttributes to each element and return as array
  if (Array.isArray(data)) {
    return data.map((item) => flattenAttributes(item));
  }

  // Initialize an object with an index signature for the flattened structure
  let flattened = {};

  // Iterate over each key in the object
  for (let key in data) {
    // Skip inherited properties from the prototype chain
    if (!data.hasOwnProperty(key)) continue;

    // If the key is 'attributes' or 'data', and its value is an object, merge their contents
    if (
      (key === "attributes" || key === "data") &&
      typeof data[key] === "object" &&
      !Array.isArray(data[key])
    ) {
      Object.assign(flattened, flattenAttributes(data[key]));
    } else {
      // For other keys, copy the value, applying flattenAttributes if it's an object
      flattened[key] = flattenAttributes(data[key]);
    }
  }

  return flattened;
}

export function getStrapiURL() {
  return process.env.NEXT_PUBLIC_STRAPI_URL ?? "http://localhost:1337";
}

export function getYouTubeVideoId(url) {
  const regex = /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}


export function getYouTubeThumbnail(videoId, size = 'default') {
  const sizes = {
    default: `https://img.youtube.com/vi/${videoId}/default.jpg`, // 120x90
    medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`, // 320x180
    high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`, // 480x360
    standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`, // 640x480
    maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` // 1280x720
  };

  return sizes[size] || sizes.default;
}

export function getStrapiMedia(url) {
  if (url == null) return null;
  if (url.startsWith("data:")) return url;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${getStrapiURL()}${url}`;
}


export function findBlockByComponent(data, componentName) {
  return data.find((item) => item.__component === componentName);
}

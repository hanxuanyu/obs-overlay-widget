/**
 * Utility functions for encoding and decoding widget configurations in URL
 */

/**
 * Encodes widget configuration for URL sharing
 * @param config The configuration object to encode
 * @returns Encoded string for URL
 */
export const encodeConfig = (config: any): string => {
  const jsonString = JSON.stringify(config);
  return btoa(encodeURIComponent(jsonString));
};

/**
 * Decodes widget configuration from URL parameter
 * @param encodedString The encoded configuration string from URL
 * @returns Decoded configuration object
 */
export const decodeConfig = (encodedString: string): any => {
  try {
    const jsonString = decodeURIComponent(atob(encodedString));
    return JSON.parse(jsonString);
  } catch (e) {
    console.error('Failed to decode configuration', e);
    throw new Error('Invalid configuration format');
  }
};

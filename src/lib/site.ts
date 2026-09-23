import copy from '../content/site.json';
export const site = copy;
export const siteUrl =
  import.meta.env.PUBLIC_SITE_URL || 'http://localhost:4325';
export const publicSiteReady = siteUrl.startsWith('https://');

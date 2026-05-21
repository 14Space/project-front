export const getBilingualText = (text: string, lang: string): string => {
  if (!text) return '';
  const parts = text.split(' / ').map(p => p.trim());
  if (lang === 'en' && parts.length > 1) {
    return parts[1];
  }
  return parts[0];
};

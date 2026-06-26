type CreateMetaTitleProps = {
  subtitle?: string;
  title?: string;
};

export function createMetaTitle({ subtitle, title }: CreateMetaTitleProps = {}) {
  const siteName = import.meta.env.VITE_SITE_NAME || "トラッキング";
  const suffix = title ? `${siteName} ${title}` : siteName;
  return subtitle ? `${subtitle} | ${suffix}` : suffix;
}

type CreateMetaTitleProps = {
  subtitle?: string;
  title: string;
};
export function createMetaTitle({ subtitle, title }: CreateMetaTitleProps) {
  const siteName = import.meta.env.VITE_SITE_NAME;
  if (!subtitle) {
    return `${siteName} ${title}`;
  }
  return `${subtitle} | ${siteName} ${title}`;
}

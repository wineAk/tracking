import TypographyH1 from "@/components/typography/h1";

type MainProps = {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export default function Main({ children, title, subtitle }: MainProps) {
  return (
    <main className="max-w-screen-lg mx-auto p-6 pt-16 space-y-6">
      <article className="pt-6">
        <TypographyH1>
          {title}
          {
            subtitle && (
              <p className="text-base text-muted-foreground">
                {subtitle}
              </p>
            )
          }
        </TypographyH1>
      </article>
      {children}
    </main>
  );
}
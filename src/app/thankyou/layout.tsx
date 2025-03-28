export const metadata = {
  title: "Thank You",
  description: "Thank you",
};

export default function MainScreenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-KTK0CQYJVG"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-KTK0CQYJVG');`,
          }}
        />
        {/* End Google Analytics */}
      </head>
      <body>{children}</body>;
    </html>
  );
}

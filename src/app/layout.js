import './globals.css';

export const metadata = {
  title: 'Nipuna Bhanuka | AI Undergraduate',
  description: 'Portfolio of Nipuna Bhanuka - Specialized in MERN, React Native, and AI Automation.',
  openGraph: {
    title: 'Nipuna Bhanuka | AI Undergraduate',
    images: ['/avatar.png'],
  },
  manifest: '/manifest.json', // PWA ready
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

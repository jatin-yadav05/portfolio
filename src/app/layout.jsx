import './globals.css'

export const metadata = {
  title: 'Jatin Yadav - Portfolio',
  description: 'A mystical journey through digital craftsmanship',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&display=swap" rel="stylesheet" />
        
        {/* Preload critical assets */}
        <link rel="preload" href="/grid.png" as="image" />
        <link rel="preload" href="/pc/scene.gltf" as="fetch" crossOrigin="anonymous" />
        
        {/* Initial loading styles to prevent flash */}
        <style dangerouslySetInnerHTML={{ __html: `
          .initial-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            opacity: 1;
            transition: opacity 0.5s ease-out;
          }
          .loading-bar {
            width: 200px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 999px;
            overflow: hidden;
            position: relative;
          }
          .loading-bar::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 40%;
            background: rgba(255, 255, 255, 0.4);
            border-radius: 999px;
            animation: loading 3s ease-in-out infinite;
            box-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
          }
          @keyframes loading {
            0% {
              transform: translateX(-150%);
            }
            50% {
              transform: translateX(150%);
            }
            100% {
              transform: translateX(-150%);
            }
          }
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          .animate-pulse {
            animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          html, body {
            margin: 0;
            padding: 0;
            background: #0a0a0a;
          }
          #initial-loader ~ * {
            visibility: hidden;
          }
          #initial-loader.hidden ~ * {
            visibility: visible;
          }
        `}} />
      </head>
      <body>
        <div id="initial-loader" className="initial-loader">
          <div className="space-y-6 text-center">
            <div className="text-neutral-200 text-2xl tracking-[0.3em] uppercase font-light animate-pulse">
              Entering the Realm
            </div>
            <div className="loading-bar"></div>
          </div>
        </div>
        {children}
      </body>
    </html>
  )
}

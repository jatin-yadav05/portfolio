import './globals.css'
import { Analytics } from "@vercel/analytics/react"

export const metadata = {
  title: 'Jatin Yadav - Portfolio',
  description: 'A mystical journey through digital craftsmanship',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/logo/j-logo.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/logo/j-logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&display=swap" rel="stylesheet" />
        
        
        {/* Meta tags for performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="theme-color" content="#0a0a0a" />
        
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
            transition: opacity 0.8s ease-out;
            will-change: opacity;
            transform: translateZ(0);
          }

          .loader-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
            transform: translateZ(0);
            will-change: transform;
          }

          .loader-text {
            position: relative;
            color: rgba(255, 255, 255, 0.8);
            font-size: 1.2rem;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            animation: textPulse 6s linear infinite;
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
            white-space: nowrap;
            will-change: transform, opacity;
          }

          .loader-container {
            position: relative;
            width: 100%;
            min-width: 300px;
            height: 4px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 2px;
            overflow: hidden;
            transform: translateZ(0);
            will-change: transform;
          }

          .loader-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.2), transparent);
            animation: shimmer 3s infinite;
            transform: translateX(-100%);
            will-change: transform;
          }

          .loader-progress {
            position: absolute;
            top: 0;
            left: 0;
            width: 30%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 2px;
            box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
            animation: progress 4s ease-in-out infinite;
            will-change: transform;
          }

          .loader-glitch {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            mix-blend-mode: difference;
            animation: glitch 6s linear infinite;
            background: repeating-linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.1) 1%,
              transparent 2%,
              rgba(255, 255, 255, 0.1) 3%
            );
            will-change: transform, opacity;
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @keyframes progress {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(200%); }
            100% { transform: translateX(-100%); }
          }

          @keyframes glitch {
            0% {
              transform: translateX(-100%);
              opacity: 0.5;
            }
            10%, 90% { opacity: 0.8; }
            100% {
              transform: translateX(100%);
              opacity: 0.5;
            }
          }

          @keyframes textPulse {
            0%, 100% {
              opacity: 1;
              transform: scale(1);
            }
            50% {
              opacity: 0.7;
              transform: scale(0.98);
            }
          }

          .initial-loader.fade-out {
            opacity: 0;
            pointer-events: none;
          }

          html {
            scroll-behavior: smooth;
          }

          html, body {
            margin: 0;
            padding: 0;
            background: #0a0a0a;
            overscroll-behavior: none;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }

          #initial-loader ~ * {
            visibility: hidden;
          }

          #initial-loader.hidden ~ * {
            visibility: visible;
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}} />

        <script dangerouslySetInnerHTML={{ __html: `
          window.addEventListener('load', function() {
            const loader = document.getElementById('initial-loader');
            const minLoadTime = 3000; // Reduced minimum loading time for better UX
            const startTime = Date.now();

            // Optimize performance by disabling animations during scroll
            let scrollTimeout;
            window.addEventListener('scroll', function() {
              document.body.classList.add('is-scrolling');
              clearTimeout(scrollTimeout);
              scrollTimeout = setTimeout(function() {
                document.body.classList.remove('is-scrolling');
              }, 150);
            }, { passive: true });

            function hideLoader() {
              loader.classList.add('fade-out');
              setTimeout(() => {
                loader.classList.add('hidden');
                // Clean up loader from DOM after animation
                setTimeout(() => {
                  loader.remove();
                }, 100);
              }, 800);
            }

            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < minLoadTime) {
              setTimeout(hideLoader, minLoadTime - elapsedTime);
            } else {
              hideLoader();
            }

            // Optimize performance
            if ('requestIdleCallback' in window) {
              requestIdleCallback(function() {
                // Preload additional resources when idle
                const preloadLink = document.createElement('link');
                preloadLink.rel = 'preload';
                preloadLink.as = 'image';
                document.head.appendChild(preloadLink);
              });
            }
          });
        `}} />
      </head>
      <body>
        <div id="initial-loader" className="initial-loader">
          <div className="loader-content">
            <div className="loader-text">
              Entering the Realm
            </div>
            <div className="loader-container">
              <div className="loader-bar"></div>
              <div className="loader-progress"></div>
              <div className="loader-glitch"></div>
            </div>
          </div>
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

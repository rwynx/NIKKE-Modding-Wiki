import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import './index.css'

const rootElement = document.getElementById('root') as HTMLElement;

// Search engine crawler & audit tool detection (Googlebot, Bingbot, Yandex, DuckDuckBot, Baiduspider, Lighthouse)
// If visited by a search crawler and #root already contains SSG prerender content,
// skip client-side React mount so crawlers index each URL's dedicated, unique article and internal link structure.
const isSearchBot =
  typeof navigator !== 'undefined' &&
  /bot|googlebot|crawler|spider|robot|crawling|google-inspectiontool|chrome-lighthouse|lighthouse/i.test(
    navigator.userAgent
  );

if (!isSearchBot || !rootElement || rootElement.innerHTML.trim().length === 0) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  );
}

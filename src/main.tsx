// Ensure window.fetch is writable and catch external extension injection errors
try {
  let _fetch = window.fetch;
  Object.defineProperty(window, 'fetch', {
    configurable: true,
    enumerable: true,
    get() {
      return _fetch;
    },
    set(newFetch) {
      _fetch = newFetch;
    },
  });
} catch (_) {}

window.addEventListener(
  'error',
  (event) => {
    if (
      event.filename?.includes('chrome-extension://') ||
      event.message?.includes('Cannot set property fetch') ||
      event.message?.includes('has only a getter')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true
);

import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);


import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// might use v2
import 'stream-chat-react/dist/css/v2/index.css';
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryCLient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryCLient}>

        <App />

      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import './styles/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(<App />);
reportWebVitals();

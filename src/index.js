import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App.js';
import LandingPage from "./LandingPage.js";

const root = createRoot(document.getElementById('root'));
root.render(
    <LandingPage />
);

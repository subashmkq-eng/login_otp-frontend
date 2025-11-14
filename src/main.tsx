// main.tsx or index.tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import App from "./App";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <GoogleOAuthProvider clientId="32243481979-6qj78m5phie00bnrfs5v04jgfp4sq2ag.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </Provider>
    </React.StrictMode>
  );
}

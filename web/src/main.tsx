import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { UserProvider } from "./context/UserContext.tsx";
import { SnackbarProvider } from "notistack";
import { I18nProvider } from "./context/I18nContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={8}>
      <UserProvider>
        <I18nProvider>
          <App />
        </I18nProvider>
      </UserProvider>
    </SnackbarProvider>
  </React.StrictMode>
);

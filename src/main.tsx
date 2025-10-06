import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ThemeProvider } from "./components/ui/provider.tsx";
import { SearchProvider } from "./components/SearchProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SearchProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SearchProvider>
  </StrictMode>
);

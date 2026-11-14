import { Component, type ErrorInfo, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

interface ErrorBoundaryState {
  hasError: boolean;
}

class RootErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("HASAD UI Error:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-[#0D1F15] dark:bg-[#01341d] dark:text-white p-6 text-center">
          <h1 className="font-display font-bold text-2xl text-[#01341d] dark:text-[#6fcb3b]">
            HASAD | حصاد
          </h1>
          <p className="mt-2 text-sm text-[#41544A] dark:text-emerald-100/80">
            Actualisez la page pour afficher le site HASAD.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 px-5 py-2.5 rounded-lg bg-[#6fcb3b] hover:bg-[#5eb82c] text-[#01341d] text-sm font-semibold cursor-pointer transition-colors duration-150"
          >
            Actualiser
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {});
  });
}
if (rootElement) {
  createRoot(rootElement).render(
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  );
}

import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { CartProvider } from "./context/CartContext";
import LoadingScreen from "./components/LoadingScreen"; // ✅ Import loading screen

// Lazy loaded pages
const Home = lazy(() => import("./components/Home"));
const PoliciesPage = lazy(() => import("./policies/PoliciesPage"));
const AlgoSignalsPage = lazy(() => import("./AlgoSignals/AlgoSignalsPage"));
const AlgoSignalSetup = lazy(() => import("./Tutorial/AlgoSignalSetup"));
const TradingViewAlert = lazy(() => import("./Tutorial/TradingViewAlert"));
const CheckoutPage = lazy(() => import("./Cart/CheckoutPage"));

function App() {
  return (
    <CartProvider>
      <Router>
        <NavBar />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/algo-signals" element={<AlgoSignalsPage />} />
            <Route path="/algo-signal-setup" element={<AlgoSignalSetup />} />
            <Route path="/trading-view-alert" element={<TradingViewAlert />} />
            <Route path="/cart" element={<CheckoutPage />} />
            <Route
              path="*"
              element={
                <h2 style={{ textAlign: "center" }}>404: Page Not Found</h2>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </CartProvider>
  );
}

export default App;

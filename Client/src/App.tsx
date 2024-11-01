import { useAuth } from "@/contexts/AuthProvider";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
import PageNotFound from "./pages/PageNotFound";

const Authenticate = lazy(() => import("@/pages/Authenticate"));

export default function App() {
  const { status } = useAuth();

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {status ? <></> : <Route path="/" element={<Authenticate />} />}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
}

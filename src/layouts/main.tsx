import Header from "@/components/header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <div className="h-full w-full flex-1 bg-fallback bg-hero-image bg-cover bg-center bg-no-repeat bg-blend-overlay bg-fixed">
        <main className="bg-black bg-opacity-20 bg-blend-overlay flex flex-col  h-full min-h-screen bg-fixed">
          <Header />
          <Outlet />
        </main>
      </div>
    </div>
  );
}

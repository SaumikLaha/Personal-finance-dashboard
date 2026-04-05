import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAppContext } from "../../context/AppContext";
import Toast from "../common/Toast";

// ✅ IMPORT IMAGE
import bg from "../../assets/bg.jpeg";

function Layout({ children }) {
  const { toast, setToast } = useAppContext();

  return (
    <div className="relative flex h-screen overflow-hidden text-black dark:text-white">
      
      {/* 🔥 BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-80 dark:opacity-50"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      />

      {/* 🔥 MAIN CONTENT */}
      <div className="relative z-10 flex w-full">
        
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <Header />

          {/* 🔥 GLASS EFFECT CONTENT */}
          <main className="p-4 md:p-6 flex-1 overflow-y-auto bg-white/30 dark:bg-gray-900/50 backdrop-blur-md">
            {children}
          </main>

          <footer className="text-center text-sm text-gray-700 dark:text-gray-300 py-3 bg-white/40 dark:bg-gray-900/60 backdrop-blur-md border-t">
            © 2026 Finance Dashboard | Built by Saumik
          </footer>

          <Toast 
            message={toast} 
            onClose={() => setToast("")} 
          />
        </div>

      </div>
    </div>
  );
}

export default Layout;
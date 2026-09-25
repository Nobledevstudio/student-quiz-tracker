import { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./SideBar";

const AppLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar */}
      <Sheet
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
      >
        <SheetContent
          side="left"
          className="w-64 p-0"
        >
          <Sidebar
            mobile
            onNavigate={() => setMobileMenuOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {/* Main content */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
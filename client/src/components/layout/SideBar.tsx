import {
  ClipboardList,
  FilePlus2,
  LayoutDashboard,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import logo from "@/assets/logo.png";

interface SidebarProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Quizzes",
    href: "/quizzes",
    icon: ClipboardList,
  },
  {
    label: "Create Quiz",
    href: "/create-quiz",
    icon: FilePlus2,
  },
];

const Sidebar = ({
  mobile = false,
  onNavigate,
}: SidebarProps) => {
  return (
    <aside
      className={
        mobile
          ? "flex h-full w-64 flex-col bg-card"
          : "hidden w-64 shrink-0 border-r border-border bg-card md:flex md:flex-col"
      }
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <div>
          <img
            src={logo}
            alt="QuizTrack"
            className="h-12 w-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.href}
              to={item.href}
              onClick={onNavigate}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                ].join(" ")
              }
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-border p-4">
        <div className="px-3">
          <p className="text-xs font-medium text-muted-foreground">
            QuizTrack
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Version 1.0.0
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

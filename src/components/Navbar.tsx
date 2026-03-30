import { motion } from "framer-motion";
import { campaigns } from "@/data/portalData";
import { useState } from "react";

interface NavbarProps {
  selectedCampaign: string | null;
  onSelectCampaign: (name: string) => void;
}

const Navbar = ({ selectedCampaign, onSelectCampaign }: NavbarProps) => {
  const allOptions = [...campaigns.map((c) => c.name), "Admin", "Others"];
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50">
      <div className="nav-gradient px-4 py-3 md:py-0">
        <div className="container mx-auto flex items-center justify-between h-14">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center text-primary-foreground">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2.2}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18 9.246 18 10.832 18.477 12 19.253zm0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18 14.754 18 13.168 18.477 12 19.253z" 
                />
              </svg>
            </div>
            <span className="text-xl font-heading font-bold text-primary-foreground tracking-wide">
              Resources
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-1">
            {allOptions.map((name) => {
              const isActive = selectedCampaign === name;
              return (
                <button
                  key={name}
                  onClick={() => onSelectCampaign(name)}
                  className="relative px-5 py-1.5 rounded-full font-heading font-semibold text-sm transition-all text-primary-foreground/80 hover:text-primary-foreground whitespace-nowrap"
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "hsla(0,0%,100%,0.25)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{name}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center text-primary-foreground"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
              className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? "rotate-90" : ""}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 py-4 px-4">
            <div className="flex flex-col gap-2">
              {allOptions.map((name) => {
                const isActive = selectedCampaign === name;
                return (
                  <button
                    key={name}
                    onClick={() => {
                      onSelectCampaign(name);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-5 py-3 rounded-2xl font-medium text-base transition-all flex items-center gap-3
                      ${isActive 
                        ? "bg-white/25 text-white" 
                        : "text-primary-foreground/80 hover:bg-white/10 hover:text-white"
                      }`}
                  >
                    {name}
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

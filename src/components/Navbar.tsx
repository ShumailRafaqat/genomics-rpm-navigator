import { motion } from "framer-motion";
import { campaigns } from "@/data/portalData";

interface NavbarProps {
  selectedCampaign: string | null;
  onSelectCampaign: (name: string) => void;
}

const Navbar = ({ selectedCampaign, onSelectCampaign }: NavbarProps) => {
  const allOptions = [...campaigns.map((c) => c.name), "Others"];

  return (
    <nav className="sticky top-0 z-50">
      <div className="nav-gradient px-4">
        <div className="container mx-auto flex items-center justify-between h-14">
          <span className="text-xl font-heading font-bold text-primary-foreground tracking-wide">CF Portal</span>
          <div className="flex gap-1">
            {allOptions.map((name) => {
              const isActive = selectedCampaign === name;
              return (
                <button
                  key={name}
                  onClick={() => onSelectCampaign(name)}
                  className="relative px-5 py-1.5 rounded-full font-heading font-semibold text-sm transition-all text-primary-foreground/80 hover:text-primary-foreground"
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

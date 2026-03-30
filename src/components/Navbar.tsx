import { motion } from "framer-motion";
import { campaigns } from "@/data/portalData";

interface NavbarProps {
  selectedCampaign: string | null;
  onSelectCampaign: (name: string) => void;
}

const Navbar = ({ selectedCampaign, onSelectCampaign }: NavbarProps) => {
  const allOptions = [...campaigns.map((c) => c.name), "Others"];

  return (
    <nav className="sticky top-0 z-50 glass-card">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <span className="text-xl font-heading font-bold text-gradient">CF Portal</span>
        <div className="flex gap-2">
          {allOptions.map((name) => {
            const isActive = selectedCampaign === name;
            return (
              <button
                key={name}
                onClick={() => onSelectCampaign(name)}
                className="relative px-5 py-2 rounded-lg font-heading font-semibold text-sm transition-colors text-foreground hover:text-primary"
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-primary/15 border border-primary/30"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{name}</span>
              </button>
            );
          })}
        </div>
      </div>
      {selectedCampaign && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          className="h-0.5 bg-gradient-to-r from-primary via-secondary to-accent origin-left"
        />
      )}
    </nav>
  );
};

export default Navbar;

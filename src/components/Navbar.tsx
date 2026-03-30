import { motion } from "framer-motion";
import { campaigns } from "@/data/portalData";
import { Dna, Activity, MoreHorizontal, Sparkles } from "lucide-react";

interface NavbarProps {
  selectedCampaign: string | null;
  onSelectCampaign: (name: string) => void;
}

const campaignIcons: Record<string, React.ReactNode> = {
  Geonomics: <Dna className="w-4 h-4" />,
  RPM: <Activity className="w-4 h-4" />,
  Others: <MoreHorizontal className="w-4 h-4" />,
};

const Navbar = ({ selectedCampaign, onSelectCampaign }: NavbarProps) => {
  const allOptions = [...campaigns.map((c) => c.name), "Others"];

  return (
    <nav className="sticky top-0 z-50">
      <div className="nav-gradient px-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-white tracking-wide">
              CF Portal
            </span>
          </motion.div>

          {/* Nav Items */}
          <div className="flex gap-2">
            {allOptions.map((name, i) => {
              const isActive = selectedCampaign === name;
              return (
                <motion.button
                  key={name}
                  onClick={() => onSelectCampaign(name)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full font-heading font-semibold text-sm transition-all ${
                    isActive 
                      ? "text-white" 
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-full bg-white/25 border border-white/30 shadow-[0_0_20px_hsla(0,0%,100%,0.2)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {campaignIcons[name]}
                    {name}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

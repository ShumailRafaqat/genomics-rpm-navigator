import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  selectedCampaign: string | null;
}

const HeroSection = ({ selectedCampaign }: HeroSectionProps) => {
  return (
    <div className="relative h-[45vh] min-h-[320px] overflow-hidden">
      <img
        src={heroBg}
        alt="Mountain landscape"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsla(220,85%,55%,0.3), hsla(0,0%,100%,0.6) 70%, hsl(210,30%,98%) 100%)" }} />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          key={selectedCampaign || "default"}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-gradient drop-shadow-lg"
        >
          {selectedCampaign || "CF Resource Portal"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-foreground/70 max-w-xl font-medium"
        >
          {selectedCampaign
            ? `Access all ${selectedCampaign} campaign resources`
            : "Select a campaign to access your resources"}
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;

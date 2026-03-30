import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  selectedCampaign: string | null;
}

const HeroSection = ({ selectedCampaign }: HeroSectionProps) => {
  return (
    <div className="relative h-[50vh] min-h-[350px] overflow-hidden">
      <img
        src={heroBg}
        alt="Mountain landscape"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={800}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <motion.h1
          key={selectedCampaign || "default"}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-heading font-bold tracking-tight text-gradient"
        >
          {selectedCampaign || "CF Resource Portal"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-lg text-muted-foreground max-w-xl"
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

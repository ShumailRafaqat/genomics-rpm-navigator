import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  selectedCampaign: string | null;
}

const HeroSection = ({ selectedCampaign }: HeroSectionProps) => {
  const title = selectedCampaign || "CF Resource Portal";

  const letters = Array.from(title);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.035,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      scale: 0.6, 
      rotateX: -25 
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
        delay: i * 0.035,
      },
    }),
    exit: {
      opacity: 0,
      y: -40,
      scale: 0.8,
      rotateX: 15,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="relative h-[45vh] min-h-[320px] md:h-[52vh] lg:h-[58vh] overflow-hidden">
      <img
        src={heroBg}
        alt="Mountain landscape"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={100}
      />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0" 
        style={{ 
          background: "linear-gradient(to bottom, hsla(220,85%,55%,0.35), hsla(0,0%,100%,0.65) 65%, hsl(210,30%,98%) 100%)" 
        }} 
      />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
        
        {/* Animated Title */}
        <motion.div
          key={title}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-[-1.5px] md:tracking-[-2px] text-gradient drop-shadow-2xl flex flex-wrap justify-center"
        >
          {letters.map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              custom={index}
              variants={letterVariants}
              className="inline-block origin-bottom"
              style={{ 
                marginRight: char === " " ? "0.35em" : "0.02em",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            filter: "blur(0px)" 
          }}
          transition={{ 
            duration: 0.8, 
            delay: 0.6, 
            ease: "easeOut" 
          }}
          className="mt-4 sm:mt-5 text-base sm:text-lg md:text-xl text-foreground/75 max-w-2xl font-medium tracking-wide px-2"
        >
          {selectedCampaign
            ? `Access all ${selectedCampaign} campaign resources`
            : "Select a campaign to access your resources"}
        </motion.p>

        {/* Subtle shine line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.6 }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="mt-6 h-[1px] w-20 sm:w-24 bg-gradient-to-r from-transparent via-white to-transparent"
        />
      </div>
    </div>
  );
};

export default HeroSection;

import { motion } from "framer-motion";
import { PipelineData } from "@/data/portalData";
import { GitBranch, ArrowLeft } from "lucide-react";

interface PipelineSelectorProps {
  pipelines: PipelineData[];
  onSelect: (pipeline: PipelineData) => void;
  onBack?: () => void;        // ← New optional prop
}

const pipelineStyles = [
  "from-[hsl(220,85%,55%)] to-[hsl(265,75%,58%)]",
  "from-[hsl(340,75%,55%)] to-[hsl(25,95%,55%)]",
  "from-[hsl(160,65%,42%)] to-[hsl(175,65%,45%)]",
];

const PipelineSelector = ({ 
  pipelines, 
  onSelect, 
  onBack 
}: PipelineSelectorProps) => {
  return (
    <div className="container mx-auto px-4 py-14 relative">
      {/* Back to Home Button - Top Right */}
      {onBack && (
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onBack}
          className="absolute top-8 right-8 flex items-center gap-2 px-5 py-2.5 
                     bg-card/80 hover:bg-card border border-border/50 
                     rounded-full text-sm font-medium text-foreground 
                     backdrop-blur-md transition-all duration-200 z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </motion.button>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-heading font-bold text-center mb-10 text-foreground"
      >
        Select Pipeline
      </motion.h2>

      <div className="flex flex-wrap justify-center gap-8">
        {pipelines.map((pipeline, i) => {
          const gradient = pipelineStyles[i % pipelineStyles.length];
          return (
            <motion.button
              key={pipeline.name}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(pipeline)}
              className={`relative w-60 h-44 rounded-3xl bg-gradient-to-br ${gradient} p-[2px] cursor-pointer group overflow-hidden`}
            >
              {/* Shimmer effect */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  background: "linear-gradient(105deg, transparent 40%, hsla(0,0%,100%,0.3) 45%, hsla(0,0%,100%,0.1) 50%, transparent 55%)", 
                  backgroundSize: "200% 100%", 
                  animation: "shimmer 1.5s infinite" 
                }} 
              />

              <div className="relative h-full w-full rounded-[22px] bg-card/90 backdrop-blur-sm flex flex-col items-center justify-center gap-4 overflow-hidden">
                {/* Colored glow behind icon */}
                <div 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br ${gradient} rounded-full opacity-10 blur-2xl group-hover:opacity-25 transition-opacity`} 
                />
                
                <div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                >
                  <GitBranch className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <span className="text-lg font-heading font-bold text-foreground">
                  {pipeline.name}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineSelector;

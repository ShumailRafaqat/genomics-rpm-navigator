import { motion } from "framer-motion";
import { PipelineData } from "@/data/portalData";
import { GitBranch } from "lucide-react";

interface PipelineSelectorProps {
  pipelines: PipelineData[];
  onSelect: (pipeline: PipelineData) => void;
}

const colors = [
  { bg: "bg-primary/10", text: "text-primary", hover: "hover:border-primary/40" },
  { bg: "bg-secondary/10", text: "text-secondary", hover: "hover:border-secondary/40" },
  { bg: "bg-accent/10", text: "text-accent", hover: "hover:border-accent/40" },
];

const PipelineSelector = ({ pipelines, onSelect }: PipelineSelectorProps) => {
  return (
    <div className="container mx-auto px-4 py-14">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-heading font-bold text-center mb-10 text-foreground"
      >
        Select Pipeline
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-6">
        {pipelines.map((pipeline, i) => {
          const c = colors[i % colors.length];
          return (
            <motion.button
              key={pipeline.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              onClick={() => onSelect(pipeline)}
              className={`resource-card rounded-2xl p-8 w-64 flex flex-col items-center gap-4 cursor-pointer group ${c.hover}`}
            >
              <div className={`w-16 h-16 rounded-xl ${c.bg} flex items-center justify-center transition-colors`}>
                <GitBranch className={`w-8 h-8 ${c.text}`} />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">{pipeline.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default PipelineSelector;

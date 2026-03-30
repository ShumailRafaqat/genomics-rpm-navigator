import { motion } from "framer-motion";
import { PipelineData } from "@/data/portalData";
import { GitBranch } from "lucide-react";

interface PipelineSelectorProps {
  pipelines: PipelineData[];
  onSelect: (pipeline: PipelineData) => void;
}

const PipelineSelector = ({ pipelines, onSelect }: PipelineSelectorProps) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-heading font-bold text-center mb-10 text-foreground"
      >
        Select Pipeline
      </motion.h2>
      <div className="flex flex-wrap justify-center gap-6">
        {pipelines.map((pipeline, i) => (
          <motion.button
            key={pipeline.name}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            onClick={() => onSelect(pipeline)}
            className="resource-card rounded-2xl p-8 w-64 flex flex-col items-center gap-4 cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <GitBranch className="w-8 h-8 text-primary" />
            </div>
            <span className="text-xl font-heading font-bold text-foreground">{pipeline.name}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default PipelineSelector;

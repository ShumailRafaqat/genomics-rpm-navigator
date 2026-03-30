import { motion } from "framer-motion";
import { PipelineData } from "@/data/portalData";
import {
  ClipboardList, Brain, ShieldCheck, Search, Briefcase, FileInput,
  FileText, MessageSquare, Scroll, MapPin, Phone, Clock, ExternalLink
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "clipboard-list": ClipboardList,
  "brain": Brain,
  "shield-check": ShieldCheck,
  "search": Search,
  "briefcase": Briefcase,
  "file-input": FileInput,
  "file-text": FileText,
  "message-square": MessageSquare,
  "scroll": Scroll,
  "map-pin": MapPin,
};

const cardColors = [
  { bg: "bg-primary/8", icon: "text-primary" },
  { bg: "bg-secondary/8", icon: "text-secondary" },
  { bg: "bg-accent/8", icon: "text-accent" },
  { bg: "bg-[hsl(25,95%,55%)]/8", icon: "text-[hsl(25,95%,55%)]" },
  { bg: "bg-[hsl(265,75%,58%)]/8", icon: "text-[hsl(265,75%,58%)]" },
  { bg: "bg-[hsl(175,65%,45%)]/8", icon: "text-[hsl(175,65%,45%)]" },
];

interface ResourceGridProps {
  pipeline: PipelineData;
  onBack: () => void;
}

const ResourceGrid = ({ pipeline, onBack }: ResourceGridProps) => {
  return (
    <div className="container mx-auto px-4 py-10">
      {/* Info bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-center gap-6 mb-10 resource-card rounded-xl p-4"
      >
        {pipeline.ltNumber && (
          <div className="flex items-center gap-2 text-primary">
            <Phone className="w-5 h-5" />
            <span className="font-heading font-semibold">LT: {pipeline.ltNumber}</span>
          </div>
        )}
        {pipeline.scheduleInfo && (
          <div className="flex items-center gap-2 text-accent">
            <Clock className="w-5 h-5" />
            <span className="text-sm font-body">{pipeline.scheduleInfo}</span>
          </div>
        )}
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {pipeline.resources.map((resource, i) => {
          const IconComp = iconMap[resource.icon] || FileText;
          const color = cardColors[i % cardColors.length];
          return (
            <motion.a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="resource-card rounded-2xl p-6 flex flex-col items-center text-center gap-3 group cursor-pointer"
            >
              <div className={`w-14 h-14 rounded-xl ${color.bg} flex items-center justify-center transition-colors`}>
                <IconComp className={`w-7 h-7 ${color.icon}`} />
              </div>
              <span className="font-heading font-semibold text-foreground text-sm leading-tight">
                {resource.title}
              </span>
              {resource.description && (
                <span className="text-xs text-muted-foreground line-clamp-2">{resource.description}</span>
              )}
              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          );
        })}
      </div>

      <div className="flex justify-center mt-10">
        <button
          onClick={onBack}
          className="text-sm text-muted-foreground hover:text-primary transition-colors font-body"
        >
          ← Back to pipelines
        </button>
      </div>
    </div>
  );
};

export default ResourceGrid;

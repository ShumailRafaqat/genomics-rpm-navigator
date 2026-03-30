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

const cardGradients = [
  { gradient: "from-[hsl(220,85%,55%)] to-[hsl(240,70%,60%)]", glow: "hsl(220,85%,55%)" },
  { gradient: "from-[hsl(340,75%,55%)] to-[hsl(320,65%,50%)]", glow: "hsl(340,75%,55%)" },
  { gradient: "from-[hsl(160,65%,42%)] to-[hsl(175,70%,40%)]", glow: "hsl(160,65%,42%)" },
  { gradient: "from-[hsl(25,95%,55%)] to-[hsl(35,90%,50%)]", glow: "hsl(25,95%,55%)" },
  { gradient: "from-[hsl(265,75%,58%)] to-[hsl(280,70%,55%)]", glow: "hsl(265,75%,58%)" },
  { gradient: "from-[hsl(175,65%,45%)] to-[hsl(190,70%,42%)]", glow: "hsl(175,65%,45%)" },
  { gradient: "from-[hsl(200,80%,50%)] to-[hsl(220,85%,55%)]", glow: "hsl(200,80%,50%)" },
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
        className="flex flex-wrap items-center justify-center gap-6 mb-10 rounded-2xl p-5"
        style={{ background: "linear-gradient(135deg, hsl(220,85%,55%,0.08), hsl(340,75%,55%,0.08))" }}
      >
        {pipeline.ltNumber && (
          <div className="flex items-center gap-2 text-primary font-heading">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Phone className="w-4 h-4" />
            </div>
            <span className="font-semibold">LT: {pipeline.ltNumber}</span>
          </div>
        )}
        {pipeline.scheduleInfo && (
          <div className="flex items-center gap-2 text-accent font-body">
            <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <span className="text-sm">{pipeline.scheduleInfo}</span>
          </div>
        )}
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {pipeline.resources.map((resource, i) => {
          const IconComp = iconMap[resource.icon] || FileText;
          const style = cardGradients[i % cardGradients.length];
          return (
            <motion.a
              key={resource.title}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.04, y: -6 }}
              whileTap={{ scale: 0.97 }}
              className="relative rounded-2xl p-[1.5px] cursor-pointer group overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${style.glow}, transparent)` }}
            >
              <div className="relative h-full bg-card rounded-[15px] p-5 flex flex-col items-center text-center gap-3 overflow-hidden">
                {/* Background glow */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full opacity-10 group-hover:opacity-25 blur-2xl transition-opacity duration-300"
                  style={{ background: style.glow }}
                />

                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
                  <IconComp className="w-7 h-7 text-primary-foreground" />
                </div>
                <span className="font-heading font-semibold text-foreground text-sm leading-tight">
                  {resource.title}
                </span>
                {resource.description && (
                  <span className="text-xs text-muted-foreground line-clamp-2">{resource.description}</span>
                )}
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-auto" />
              </div>
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

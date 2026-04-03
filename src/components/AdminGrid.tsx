import { motion } from "framer-motion";
import {
  FileText,
  Stethoscope,
  ExternalLink,
} from "lucide-react";

const adminCardGradients = [
  { gradient: "from-[hsl(265,75%,58%)] to-[hsl(280,70%,55%)]", glow: "hsl(265,75%,58%)" },
  { gradient: "from-[hsl(25,95%,55%)] to-[hsl(35,90%,50%)]", glow: "hsl(25,95%,55%)" },
];

const AdminGrid = () => {
  const resources = [
    { 
      title: "Production Form", 
      icon: FileText, 
      url: "https://docs.google.com/spreadsheets/d/19CHp1YQIeVMJDBH3A2XH9W_gZtsNI5u3pU-MQ0NzBQU/edit?gid=154209", 
      description: "Daily Production Tracking Sheet" 
    },
    { 
      title: "Eligibility Portal", 
      icon: Stethoscope, 
      url: "https://episodealert.com/login.aspx?ReturnUrl=%2fsecure%2fMyEligibility.aspx", 
      description: "Patient Eligibility Check Portal" 
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-heading font-bold text-center mb-12"
      >
        Admin Portal
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {resources.map((res, i) => {
          const style = adminCardGradients[i];
          const IconComp = res.icon;

          return (
            <motion.a
              key={res.title}
              href={res.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.04, y: -8 }}
              whileTap={{ scale: 0.97 }}
              className="relative rounded-2xl p-[1.5px] cursor-pointer group overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${style.glow}, transparent)` }}
            >
              <div className="relative h-full bg-card rounded-[15px] p-6 flex flex-col items-center text-center gap-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${style.gradient} flex items-center justify-center shadow-lg`}>
                  <IconComp className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="font-heading font-semibold text-lg">{res.title}</span>
                <span className="text-sm text-muted-foreground">{res.description}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground mt-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default AdminGrid;

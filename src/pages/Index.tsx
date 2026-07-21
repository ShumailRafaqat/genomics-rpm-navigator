import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trainingRpmPipeline, trainingHomeHealthPipeline, PipelineData } from "@/data/portalData";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PipelineSelector from "@/components/PipelineSelector";
import ResourceGrid from "@/components/ResourceGrid";

type Step = "home" | "pipeline" | "resources";

const Index = () => {
  const [step, setStep] = useState<Step>("home");
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineData | null>(null);
  const [isTraining, setIsTraining] = useState(false);

  const handleSelectCampaign = (name: string) => {
    if (name === "Training") {
      setIsTraining(true);
      setSelectedPipeline(null);
      setStep("pipeline");
      return;
    }
  };

  const handleBackHome = () => {
    setStep("home");
    setSelectedPipeline(null);
    setIsTraining(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar 
        selectedCampaign={isTraining ? "Training" : null} 
        onSelectCampaign={handleSelectCampaign} 
      />
      <HeroSection 
        selectedCampaign={isTraining ? "Training" : null} 
      />

      <AnimatePresence mode="wait">
        {/* Training - Direct Select Campaign */}
        {step === "pipeline" && isTraining && (
          <motion.div key="training-pipelines" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <PipelineSelector
              pipelines={[
                trainingRpmPipeline,
                trainingHomeHealthPipeline
              ]}
              onSelect={(pipeline) => {
                setSelectedPipeline(pipeline);
                setStep("resources");
              }}
              onBack={handleBackHome}
              title="Select Campaign"
            />
          </motion.div>
        )}

        {/* Resources Page */}
        {step === "resources" && selectedPipeline && (
          <motion.div key="resources" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <ResourceGrid 
              pipeline={selectedPipeline} 
              onBack={handleBackHome} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { campaigns, CampaignData, PipelineData } from "@/data/portalData";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PipelineSelector from "@/components/PipelineSelector";
import PinEntry from "@/components/PinEntry";
import ResourceGrid from "@/components/ResourceGrid";

type Step = "home" | "pipeline" | "pin" | "resources";

const Index = () => {
  const [step, setStep] = useState<Step>("home");
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineData | null>(null);

  const handleSelectCampaign = (name: string) => {
    const campaign = campaigns.find((c) => c.name === name);
    if (!campaign) return;

    setSelectedCampaign(campaign);
    setSelectedPipeline(null);
    setStep("pipeline");
  };

  const handleSelectPipeline = (pipeline: PipelineData) => {
    setSelectedPipeline(pipeline);
    setStep("pin");
  };

  const handlePinSuccess = () => {
    setStep("resources");
  };

  const handleBackToPipelines = () => {
    setSelectedPipeline(null);
    setStep("pipeline");
  };

  const handleBackHome = () => {
    setSelectedCampaign(null);
    setSelectedPipeline(null);
    setStep("home");
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50, scale: 0.98 },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    },
    exit: { 
      opacity: 0, 
      y: -40,
      scale: 0.98,
      transition: { duration: 0.35, ease: "easeIn" }
    },
  };

  const backButtonVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    exit: { 
      opacity: 0, 
      x: 100,
      transition: { duration: 0.3 }
    },
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar
        selectedCampaign={selectedCampaign?.name || null}
        onSelectCampaign={handleSelectCampaign}
      />

      <HeroSection selectedCampaign={selectedCampaign?.name || null} />

      <AnimatePresence mode="wait">
        {step === "home" && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="container mx-auto px-4 py-24 text-center"
          >
            <div className="max-w-lg mx-auto">
              <h2 className="text-4xl font-semibold text-foreground mb-6 tracking-tight">
                Welcome to CF Resource Portal
              </h2>
              <p className="text-muted-foreground text-xl leading-relaxed">
                Select a campaign from the navigation bar to access resources.
              </p>
            </div>
          </motion.div>
        )}

        {step === "pipeline" && selectedCampaign && (
          <motion.div
            key="pipeline"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PipelineSelector
              pipelines={selectedCampaign.pipelines}
              onSelect={handleSelectPipeline}
            />
          </motion.div>
        )}

        {step === "pin" && selectedPipeline && (
          <motion.div
            key="pin"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PinEntry
              correctPin={selectedPipeline.pin}
              onSuccess={handlePinSuccess}
              onBack={handleBackToPipelines}
            />
          </motion.div>
        )}

        {step === "resources" && selectedPipeline && (
          <motion.div
            key="resources"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ResourceGrid 
              pipeline={selectedPipeline} 
              onBack={handleBackToPipelines} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smaller Colored Floating Back Button */}
      <AnimatePresence>
        {step !== "home" && (
          <motion.div
            variants={backButtonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed bottom-6 right-6 z-50"   // Slightly adjusted position
          >
            <button
              onClick={
                step === "pipeline" 
                  ? handleBackHome 
                  : handleBackToPipelines
              }
              className="group flex items-center gap-2 px-5 py-2.5 
                         bg-primary hover:bg-primary/90 
                         text-primary-foreground text-sm font-medium
                         rounded-xl shadow-md hover:shadow-lg 
                         active:scale-[0.96] transition-all duration-300"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform duration-200 text-base">
                ←
              </span>
              {step === "pipeline" ? "Back to Home" : "Back"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

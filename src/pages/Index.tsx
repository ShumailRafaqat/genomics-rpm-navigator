// src/pages/Index.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { campaigns, CampaignData, PipelineData } from "@/data/portalData";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PipelineSelector from "@/components/PipelineSelector";
import PinEntry from "@/components/PinEntry";
import ResourceGrid from "@/components/ResourceGrid";
import AdminGrid from "@/components/AdminGrid";

type Step = "home" | "pipeline" | "pin" | "resources" | "admin";

const Index = () => {
  const [step, setStep] = useState<Step>("home");
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineData | null>(null);

  // Handle Campaign Selection (including Admin)
  const handleSelectCampaign = (name: string) => {
    if (name === "Admin") {
      setSelectedCampaign(null);
      setSelectedPipeline(null);
      setStep("pin");
      return;
    }

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
    if (!selectedCampaign) {
      // Admin PIN success
      setStep("admin");
    } else {
      // Normal campaign PIN success
      setStep("resources");
    }
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

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar
        selectedCampaign={selectedCampaign?.name || null}
        onSelectCampaign={handleSelectCampaign}
      />

      <HeroSection 
        selectedCampaign={
          selectedCampaign?.name || (step === "admin" ? "Admin Portal" : null)
        } 
      />

      <AnimatePresence mode="wait">
        {/* Home Page */}
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

        {/* Pipeline Selector */}
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
              onBack={handleBackHome}
            />
          </motion.div>
        )}

        {/* PIN Entry */}
        {step === "pin" && (
          <motion.div
            key="pin"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <PinEntry
              correctPin={!selectedCampaign ? "0055" : selectedPipeline?.pin || ""}
              onSuccess={handlePinSuccess}
              onBack={selectedCampaign ? handleBackToPipelines : handleBackHome}
            />
          </motion.div>
        )}

        {/* Resources Grid (Normal Campaigns) */}
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

        {/* Admin Portal */}
        {step === "admin" && (
          <motion.div
            key="admin"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <AdminGrid />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Back Button */}
      <AnimatePresence>
        {step !== "home" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <button
              onClick={
                step === "admin" || step === "pipeline"
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
              {step === "admin" || step === "pipeline" ? "Back to Home" : "Back"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

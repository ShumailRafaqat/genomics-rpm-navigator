import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { campaigns, mgsRpmPipeline, trainingPipeline, CampaignData, PipelineData } from "@/data/portalData";
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
  const [isMgsRpm, setIsMgsRpm] = useState(false);
  const [isHomeHealth, setIsHomeHealth] = useState(false);
  const [isTraining, setIsTraining] = useState(false);

  const handleSelectCampaign = (name: string) => {
    if (name === "Home Health Services") {
      setIsMgsRpm(false);
      setIsHomeHealth(true);
      setIsTraining(false);
      setSelectedCampaign(null);
      setSelectedPipeline(null);
      setStep("pin");
      return;
    }

    if (name === "MGs RPM") {
      setIsMgsRpm(true);
      setIsHomeHealth(false);
      setIsTraining(false);
      setSelectedCampaign(null);
      setSelectedPipeline(null);
      setStep("pin");
      return;
    }

    if (name === "Training") {
      setIsMgsRpm(false);
      setIsHomeHealth(false);
      setIsTraining(true);
      setSelectedCampaign(null);
      setSelectedPipeline(null);
      setStep("pin");
      return;
    }

    if (name === "Admin") {
      setIsMgsRpm(false);
      setIsHomeHealth(false);
      setIsTraining(false);
      setSelectedCampaign(null);
      setSelectedPipeline(null);
      setStep("pin");
      return;
    }

    const campaign = campaigns.find((c) => c.name === name);
    if (!campaign) return;

    setIsMgsRpm(false);
    setIsHomeHealth(false);
    setIsTraining(false);
    setSelectedCampaign(campaign);
    setSelectedPipeline(null);
    setStep("pipeline");
  };

  const handleSelectPipeline = (pipeline: PipelineData) => {
    setSelectedPipeline(pipeline);
    setStep("pin");
  };

  const handlePinSuccess = () => {
    if (isMgsRpm) {
      setSelectedPipeline(mgsRpmPipeline);
      setStep("resources");
    } else if (isHomeHealth) {
      const homeHealthCampaign = campaigns.find(c => c.name === "Home Health Services");
      const homeHealthPipeline = homeHealthCampaign?.pipelines[0] || null;
      if (homeHealthPipeline) setSelectedPipeline(homeHealthPipeline);
      setStep("resources");
    } else if (isTraining) {
      setSelectedPipeline(trainingPipeline);
      setStep("resources");
    } else if (!selectedCampaign) {
      setStep("admin");
    } else {
      setStep("resources");
    }
  };

  const handleBackToPipelines = () => {
    setSelectedPipeline(null);
    if (isMgsRpm || isHomeHealth || isTraining) {
      setStep("home");
      setIsMgsRpm(false);
      setIsHomeHealth(false);
      setIsTraining(false);
    } else {
      setStep("pipeline");
    }
  };

  const handleBackHome = () => {
    setSelectedCampaign(null);
    setSelectedPipeline(null);
    setIsMgsRpm(false);
    setIsHomeHealth(false);
    setIsTraining(false);
    setStep("home");
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -40, scale: 0.98, transition: { duration: 0.35, ease: "easeIn" } },
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar
        selectedCampaign={
          isMgsRpm ? "MGs RPM" :
          isHomeHealth ? "Home Health Services" :
          isTraining ? "Training" :
          selectedCampaign?.name || null
        }
        onSelectCampaign={handleSelectCampaign}
      />

      <HeroSection
        selectedCampaign={
          isMgsRpm ? "MGs RPM" :
          isHomeHealth ? "Home Health Services" :
          isTraining ? "Training" :
          (selectedCampaign?.name || (step === "admin" ? "Admin Portal" : null))
        }
      />

      <AnimatePresence mode="wait">
        {step === "home" && (
          <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="container mx-auto px-4 py-24 text-center">
            <div className="max-w-lg mx-auto">
              <h2 className="text-4xl font-semibold text-foreground mb-6 tracking-tight">Welcome to CF Resource Portal</h2>
              <p className="text-muted-foreground text-xl leading-relaxed">Select a campaign from the navigation bar to access resources.</p>
            </div>
          </motion.div>
        )}

        {step === "pipeline" && selectedCampaign && (
          <motion.div key="pipeline" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <PipelineSelector
              pipelines={selectedCampaign.pipelines}
              onSelect={handleSelectPipeline}
              onBack={handleBackHome}
            />
          </motion.div>
        )}

        {step === "pin" && (
          <motion.div key="pin" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <PinEntry
              correctPin={
                isMgsRpm ? "5567" :
                isHomeHealth ? "1128" :
                isTraining ? "1234" :
                (!selectedCampaign ? "0055" : selectedPipeline?.pin || "")
              }
              onSuccess={handlePinSuccess}
              onBack={isMgsRpm || isHomeHealth || isTraining || !selectedCampaign ? handleBackHome : handleBackToPipelines}
            />
          </motion.div>
        )}

        {step === "resources" && selectedPipeline && (
          <motion.div key="resources" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ResourceGrid pipeline={selectedPipeline} onBack={handleBackToPipelines} />
          </motion.div>
        )}

        {step === "admin" && (
          <motion.div key="admin" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <AdminGrid />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {step !== "home" && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 right-6 z-50">
            <button
              onClick={step === "admin" || step === "pipeline" || isMgsRpm || isHomeHealth || isTraining ? handleBackHome : handleBackToPipelines}
              className="group flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-xl shadow-md hover:shadow-lg active:scale-[0.96] transition-all duration-300"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform duration-200 text-base">←</span>
              {step === "admin" || step === "pipeline" || isMgsRpm || isHomeHealth || isTraining ? "Back to Home" : "Back"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;

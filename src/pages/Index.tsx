import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { campaigns, mgsRpmPipeline, trainingPipeline, trainingRpmPipeline, trainingHomeHealthPipeline, CampaignData, PipelineData } from "@/data/portalData";
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
  const [isTrainingRpm, setIsTrainingRpm] = useState(false);
  const [isTrainingHomeHealth, setIsTrainingHomeHealth] = useState(false);

  const handleSelectCampaign = (name: string) => {
    if (name === "Home Health Services") {
      setIsMgsRpm(false); setIsHomeHealth(true); setIsTraining(false);
      setIsTrainingRpm(false); setIsTrainingHomeHealth(false);
      setStep("pin"); return;
    }
    if (name === "MGs RPM") {
      setIsMgsRpm(true); setIsHomeHealth(false); setIsTraining(false);
      setIsTrainingRpm(false); setIsTrainingHomeHealth(false);
      setStep("pin"); return;
    }
    if (name === "Training") {
      setIsMgsRpm(false); setIsHomeHealth(false); setIsTraining(true);
      setIsTrainingRpm(false); setIsTrainingHomeHealth(false);
      setStep("pin"); return;
    }
    if (name === "Admin") {
      setIsMgsRpm(false); setIsHomeHealth(false); setIsTraining(false);
      setIsTrainingRpm(false); setIsTrainingHomeHealth(false);
      setStep("pin"); return;
    }

    const campaign = campaigns.find((c) => c.name === name);
    if (campaign) {
      setIsMgsRpm(false); setIsHomeHealth(false); setIsTraining(false);
      setIsTrainingRpm(false); setIsTrainingHomeHealth(false);
      setSelectedCampaign(campaign);
      setStep("pipeline");
    }
  };

  const handlePinSuccess = () => {
    if (isMgsRpm) { setSelectedPipeline(mgsRpmPipeline); setStep("resources"); }
    else if (isHomeHealth) {
      const hh = campaigns.find(c => c.name === "Home Health Services");
      setSelectedPipeline(hh?.pipelines[0] || null);
      setStep("resources");
    }
    else if (isTraining) { setStep("pipeline"); }
    else if (isTrainingRpm) { setSelectedPipeline(trainingRpmPipeline); setStep("resources"); }
    else if (isTrainingHomeHealth) { setSelectedPipeline(trainingHomeHealthPipeline); setStep("resources"); }
    else if (!selectedCampaign) { setStep("admin"); }
    else { setStep("resources"); }
  };

  const handleBackHome = () => {
    setSelectedCampaign(null); setSelectedPipeline(null);
    setIsMgsRpm(false); setIsHomeHealth(false); setIsTraining(false);
    setIsTrainingRpm(false); setIsTrainingHomeHealth(false);
    setStep("home");
  };

  const pageVariants = {
    initial: { opacity: 0, y: 50, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -40, scale: 0.98 }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar selectedCampaign={isMgsRpm ? "MGs RPM" : isHomeHealth ? "Home Health Services" : isTraining ? "Training" : isTrainingRpm ? "RPM Training" : isTrainingHomeHealth ? "Home Health Training" : selectedCampaign?.name || null} onSelectCampaign={handleSelectCampaign} />
      <HeroSection selectedCampaign={isMgsRpm ? "MGs RPM" : isHomeHealth ? "Home Health Services" : isTraining ? "Training" : isTrainingRpm ? "RPM Training" : isTrainingHomeHealth ? "Home Health Training" : selectedCampaign?.name || null} />

      <AnimatePresence mode="wait">
        {step === "pipeline" && isTraining && (
          <motion.div key="training-pipelines" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <PipelineSelector
              pipelines={[
                { ...trainingRpmPipeline, pin: "2346" },
                { ...trainingHomeHealthPipeline, pin: "5698" }
              ]}
              onSelect={(pipeline) => {
                if (pipeline.name === "RPM") setIsTrainingRpm(true);
                else setIsTrainingHomeHealth(true);
                setSelectedPipeline(pipeline);
                setStep("pin");
              }}
              onBack={handleBackHome}
              title="Select Campaign"
            />
          </motion.div>
        )}

        {step === "pin" && (
          <motion.div key="pin" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <PinEntry
              correctPin={
                isMgsRpm ? "5567" : isHomeHealth ? "1128" : 
                isTrainingRpm ? "2346" : isTrainingHomeHealth ? "5698" : 
                isTraining ? "6693" : (!selectedCampaign ? "0055" : selectedPipeline?.pin || "")
              }
              onSuccess={handlePinSuccess}
              onBack={handleBackHome}
            />
          </motion.div>
        )}

        {step === "resources" && selectedPipeline && (
          <motion.div key="resources" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ResourceGrid pipeline={selectedPipeline} onBack={handleBackHome} />
          </motion.div>
        )}

        {step === "admin" && <AdminGrid />}
      </AnimatePresence>
    </div>
  );
};

export default Index;

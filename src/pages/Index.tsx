import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { campaigns, mgsRpmPipeline, trainingRpmPipeline, trainingHomeHealthPipeline, CampaignData, PipelineData } from "@/data/portalData";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PipelineSelector from "@/components/PipelineSelector";
import PinEntry from "@/components/PinEntry";
import ResourceGrid from "@/components/ResourceGrid";
import AdminGrid from "@/components/AdminGrid";

type Step = "home" | "pipeline" | "pin" | "resources" | "admin";

const Index = () => {
  const [step, setStep] = useState<Step>("home");
  const [selectedPipeline, setSelectedPipeline] = useState<PipelineData | null>(null);

  const [isMgsRpm, setIsMgsRpm] = useState(false);
  const [isHomeHealth, setIsHomeHealth] = useState(false);
  const [isTraining, setIsTraining] = useState(false);
  const [isTrainingRpm, setIsTrainingRpm] = useState(false);
  const [isTrainingHomeHealth, setIsTrainingHomeHealth] = useState(false);

  const handleSelectCampaign = (name: string) => {
    if (name === "Training") {
      setIsTraining(true);
      setIsMgsRpm(false);
      setIsHomeHealth(false);
      setIsTrainingRpm(false);
      setIsTrainingHomeHealth(false);
      setSelectedPipeline(null);
      setStep("pin");
      return;
    }
    if (name === "MGs RPM") {
      setIsMgsRpm(true);
      setIsTraining(false);
      setIsHomeHealth(false);
      setIsTrainingRpm(false);
      setIsTrainingHomeHealth(false);
      setStep("pin");
      return;
    }
    if (name === "Home Health Services") {
      setIsHomeHealth(true);
      setIsTraining(false);
      setIsMgsRpm(false);
      setIsTrainingRpm(false);
      setIsTrainingHomeHealth(false);
      setStep("pin");
      return;
    }
    // Other campaigns
    const campaign = campaigns.find((c) => c.name === name);
    if (campaign) {
      setIsTraining(false);
      setIsMgsRpm(false);
      setIsHomeHealth(false);
      setIsTrainingRpm(false);
      setIsTrainingHomeHealth(false);
      setStep("pipeline");
    }
  };

  const handlePinSuccess = () => {
    if (isTrainingRpm) {
      setSelectedPipeline(trainingRpmPipeline);
      setStep("resources");
    } else if (isTrainingHomeHealth) {
      setSelectedPipeline(trainingHomeHealthPipeline);
      setStep("resources");
    } else if (isTraining) {
      setStep("pipeline");
    } else if (isMgsRpm) {
      setSelectedPipeline(mgsRpmPipeline);
      setStep("resources");
    } else if (isHomeHealth) {
      const homeHealthCampaign = campaigns.find(c => c.name === "Home Health Services");
      setSelectedPipeline(homeHealthCampaign?.pipelines[0] || null);
      setStep("resources");
    } else {
      setStep("resources");
    }
  };

  const handleBackHome = () => {
    setStep("home");
    setSelectedPipeline(null);
    setIsMgsRpm(false);
    setIsHomeHealth(false);
    setIsTraining(false);
    setIsTrainingRpm(false);
    setIsTrainingHomeHealth(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar
        selectedCampaign={
          isTrainingRpm ? "RPM Training" :
          isTrainingHomeHealth ? "Home Health Training" :
          isTraining ? "Training" :
          isMgsRpm ? "MGs RPM" :
          isHomeHealth ? "Home Health Services" : null
        }
        onSelectCampaign={handleSelectCampaign}
      />
      <HeroSection
        selectedCampaign={
          isTrainingRpm ? "RPM Training" :
          isTrainingHomeHealth ? "Home Health Training" :
          isTraining ? "Training" : null
        }
      />

      <AnimatePresence mode="wait">
        {/* Training - Select Campaign */}
        {step === "pipeline" && isTraining && (
          <motion.div key="training-pipelines" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PipelineSelector
              pipelines={[
                { ...trainingRpmPipeline, pin: "2346" },
                { ...trainingHomeHealthPipeline, pin: "5698" }
              ]}
              onSelect={(pipeline) => {
                if (pipeline.name === "RPM") {
                  setIsTrainingRpm(true);
                  setIsTrainingHomeHealth(false);
                } else {
                  setIsTrainingRpm(false);
                  setIsTrainingHomeHealth(true);
                }
                setSelectedPipeline(pipeline);
                setStep("pin");
              }}
              onBack={handleBackHome}
              title="Select Campaign"
            />
          </motion.div>
        )}

        {/* PIN Entry Page */}
        {step === "pin" && (
          <motion.div key="pin" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <PinEntry
              correctPin={
                isTrainingRpm ? "2346" :
                isTrainingHomeHealth ? "5698" :
                isTraining ? "6693" :
                isMgsRpm ? "5567" :
                isHomeHealth ? "1128" : "0000"
              }
              onSuccess={handlePinSuccess}
              onBack={handleBackHome}
            />
          </motion.div>
        )}

        {/* Resources Page */}
        {step === "resources" && selectedPipeline && (
          <motion.div key="resources" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ResourceGrid 
              pipeline={selectedPipeline} 
              onBack={handleBackHome} 
            />
          </motion.div>
        )}

        {step === "admin" && <AdminGrid />}
      </AnimatePresence>
    </div>
  );
};

export default Index;

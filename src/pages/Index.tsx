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
  const [selectedCampaign, setSelectedCampaign] = useState<CampaignData | null>(null);
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
      setSelectedCampaign(null);
      setSelectedPipeline(null);
      setStep("pin");
      return;
    }
    if (name === "MGs RPM") {
      setIsMgsRpm(true);
      setIsHomeHealth(false);
      setIsTraining(false);
      setIsTrainingRpm(false);
      setIsTrainingHomeHealth(false);
      setSelectedCampaign(null);
      setSelectedPipeline(null);
      setStep("pin");
      return;
    }
    if (name === "Home Health Services") {
      setIsHomeHealth(true);
      setIsMgsRpm(false);
      setIsTraining(false);
      setIsTrainingRpm(false);
      setIsTrainingHomeHealth(false);
      setSelectedCampaign(null);
      setSelectedPipeline(null);
      setStep("pin");
      return;
    }
    if (name === "Admin") {
      setIsMgsRpm(false);
      setIsHomeHealth(false);
      setIsTraining(false);
      setIsTrainingRpm(false);
      setIsTrainingHomeHealth(false);
      setSelectedCampaign(null);
      setSelectedPipeline(null);
      setStep("pin");
      return;
    }

    const campaign = campaigns.find((c) => c.name === name);
    if (campaign) {
      setIsMgsRpm(false);
      setIsHomeHealth(false);
      setIsTraining(false);
      setIsTrainingRpm(false);
      setIsTrainingHomeHealth(false);
      setSelectedCampaign(campaign);
      setSelectedPipeline(null);
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
      const homeHealthPipeline = homeHealthCampaign?.pipelines[0] || null;
      if (homeHealthPipeline) setSelectedPipeline(homeHealthPipeline);
      setStep("resources");
    } else if (!selectedCampaign) {
      setStep("admin");
    } else {
      setStep("resources");
    }
  };

  const handleBackToPipelines = () => {
    setSelectedPipeline(null);
    if (isMgsRpm || isHomeHealth || isTrainingRpm || isTrainingHomeHealth) {
      setStep("home");
    } else if (isTraining) {
      setStep("pin");
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
    setIsTrainingRpm(false);
    setIsTrainingHomeHealth(false);
    setStep("home");
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar
        selectedCampaign={
          isMgsRpm ? "MGs RPM" :
          isHomeHealth ? "Home Health Services" :
          isTraining ? "Training" :
          isTrainingRpm ? "RPM Training" :
          isTrainingHomeHealth ? "Home Health Training" :
          selectedCampaign?.name || null
        }
        onSelectCampaign={handleSelectCampaign}
      />
      <HeroSection
        selectedCampaign={
          isMgsRpm ? "MGs RPM" :
          isHomeHealth ? "Home Health Services" :
          isTraining ? "Training" :
          isTrainingRpm ? "RPM Training" :
          isTrainingHomeHealth ? "Home Health Training" :
          (selectedCampaign?.name || null)
        }
      />

      <AnimatePresence mode="wait">
        {step === "home" && (
          <motion.div key="home" className="container mx-auto px-4 py-24 text-center">
            <h2 className="text-4xl font-semibold text-foreground mb-6">Welcome to CF Resource Portal</h2>
          </motion.div>
        )}

        {step === "pipeline" && selectedCampaign && !isTraining && (
          <PipelineSelector
            pipelines={selectedCampaign.pipelines}
            onSelect={(p) => { setSelectedPipeline(p); setStep("pin"); }}
            onBack={handleBackHome}
          />
        )}

        {step === "pipeline" && isTraining && (
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
        )}

        {step === "pin" && (
          <PinEntry
            correctPin={
              isTrainingRpm ? "2346" :
              isTrainingHomeHealth ? "5698" :
              isMgsRpm ? "5567" :
              isHomeHealth ? "1128" :
              (!selectedCampaign ? "0055" : selectedPipeline?.pin || "")
            }
            onSuccess={handlePinSuccess}
            onBack={handleBackHome}
          />
        )}

        {step === "resources" && selectedPipeline && (
          <ResourceGrid pipeline={selectedPipeline} onBack={handleBackToPipelines} />
        )}

        {step === "admin" && <AdminGrid />}
      </AnimatePresence>
    </div>
  );
};

export default Index;

import { useState } from "react";
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        selectedCampaign={selectedCampaign?.name || null}
        onSelectCampaign={handleSelectCampaign}
      />
      <HeroSection selectedCampaign={selectedCampaign?.name || null} />

      {step === "home" && (
        <div className="container mx-auto px-4 py-16 text-center">
          <p className="text-muted-foreground text-lg font-body">
            Choose a campaign from the navigation bar to get started
          </p>
        </div>
      )}

      {step === "pipeline" && selectedCampaign && (
        <PipelineSelector
          pipelines={selectedCampaign.pipelines}
          onSelect={handleSelectPipeline}
        />
      )}

      {step === "pin" && selectedPipeline && (
        <PinEntry
          correctPin={selectedPipeline.pin}
          onSuccess={handlePinSuccess}
          onBack={handleBackToPipelines}
        />
      )}

      {step === "resources" && selectedPipeline && (
        <ResourceGrid pipeline={selectedPipeline} onBack={handleBackToPipelines} />
      )}

      {step !== "home" && (
        <div className="flex justify-center pb-10">
          <button
            onClick={handleBackHome}
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default Index;

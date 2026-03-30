export interface ResourceItem {
  title: string;
  icon: string;
  url: string;
  description?: string;
}

export interface PipelineData {
  name: string;
  pin: string;
  resources: ResourceItem[];
  ltNumber?: string;
  scheduleInfo?: string;
}

export interface CampaignData {
  name: string;
  pipelines: PipelineData[];
}

export const campaigns: CampaignData[] = [
  {
    name: "Geonomics",
    pipelines: [
      {
        name: "GM Pipeline",
        pin: "6654",
        ltNumber: "2394021344",
        resources: [
          { title: "CLM Immune Form", icon: "clipboard-list", url: "https://docs.google.com/forms/d/e/1FAIpQLSfZtnWdfDkkJAPCd8GDIRQ3ai62uEm7ZGvgE2kkTkofrhTdvQ/viewform", description: "Immune campaign intake form" },
          { title: "CLM Neuro Form", icon: "brain", url: "https://docs.google.com/forms/d/e/1FAIpQLSc-hoyMB_ag_jNQvViXr-TLs0hsgdO23OaRdT4x0kpyi2xvkw/viewform", description: "Neuro campaign intake form" },
          { title: "CF Insurance Check", icon: "shield-check", url: "https://docs.google.com/forms/d/e/1FAIpQLScTwxR2kGg2EQGUJrMeJdA4StHTdki5LdeIVjHDxpGIjnpaiw/viewform", description: "Insurance verification form" },
          { title: "TMD Dupe Checker", icon: "search", url: "https://zorixs.com/", description: "Check for duplicate entries" },
          { title: "Sales CRM", icon: "briefcase", url: "https://biznexuss.com/", description: "Sales management portal" },
          { title: "Sales CRM Intake", icon: "file-input", url: "https://biznexuss.com/form/genomics/7k18mgta", description: "Genomics intake form" },
          { title: "Quality Guidelines", icon: "file-text", url: "https://docs.google.com/document/d/1Ptl0Mt3pBjDS1Kw9zVoDQfq8pVo8L5qKHwR_2YDNS0Y/edit?tab=t.0", description: "Quality standards document" },
        ],
      },
      {
        name: "GA Pipeline",
        pin: "6654",
        ltNumber: "813-725-2063",
        resources: [
          { title: "CL Intake Form", icon: "clipboard-list", url: "https://dna-formvcm.netlify.app/", description: "GA marketing intake" },
          { title: "States Coverage", icon: "map-pin", url: "https://docs.google.com/spreadsheets/d/1bIgfdk_12rDJ8Swy_MnNl0Hh_8uKJNG9v2ec3meiyuw/edit?gid=147741", description: "Service coverage by state" },
          { title: "Quality Guidelines", icon: "file-text", url: "https://docs.google.com/document/d/1Ptl0Mt3pBjDS1Kw9zVoDQfq8pVo8L5qKHwR_2YDNS0Y/edit?tab=t.0", description: "Quality standards document" },
         
        ],
      },
    ],
  },
  {
    name: "RPM",
    pipelines: [
      {
        name: "RPM Campaign",
        pin: "6654",
        ltNumber: "989-250-5964",
        scheduleInfo: "Lunch: 12:30 EST – 1:00 PM EST | Break: 3:15 EST – 3:30 EST",
        resources: [
          { title: "RPM Main Form", icon: "clipboard-list", url: "https://crm-dev.acudial.com/marketing/index.php?source=36025", description: "Primary RPM form" },
          { title: "SMS Consent Tool", icon: "message-square", url: "https://programmingspecialistsmsapirelay-ekfjevaaapgnfrcy.eastus-01.azurewebsites.net/", description: "SMS consent management" },
          { title: "Sales CRM", icon: "briefcase", url: "https://biznexuss.com/", description: "Sales management portal" },
          { title: "Sales CRM Intake", icon: "file-input", url: "https://biznexuss.com/form/genomics/7k18mgta", description: "Genomics intake form" },
          { title: "Quality Guidelines", icon: "file-text", url: "#", description: "Yet to be uploaded" },
          { title: "Script", icon: "scroll", url: "https://onedrive.live.com/?cid=eef37504b43a5cea&id=EEF37504B43A5CEA!s5c6921b177754b5f9184a2849e35a1", description: "Campaign script document" },
          { title: "States Coverage", icon: "map-pin", url: "https://docs.google.com/spreadsheets/d/1BXA195rmg4B_PIe4kEsQPRDhP9Obmfl-JgH88FvjTNk/edit?gid=147741", description: "Service coverage by state" },
        ],
      },
    ],
  },
];

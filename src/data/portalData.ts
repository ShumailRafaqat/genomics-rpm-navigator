export interface Resource {
  title: string;
  icon: string;
  url: string;
  description: string;
  isAudio?: boolean;
  isVideo?: boolean;
}

export interface PipelineData {
  name: string;
  pin: string;
  ltNumber?: string;
  scheduleInfo?: string;
  resources: Resource[];
}

export interface CampaignData {
  name: string;
  pipelines: PipelineData[];
}

// ====================== ADMIN RESOURCES ======================
export const adminResources = [
  {
    title: "Production Form",
    icon: "file-text",
    url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdRo6WzIEhk_vomOTHJmMveIL5qvvFMHLO0q_YZs0LoL4hlTQ/formResponse",
    description: "Daily Production Tracking Sheet"
  },
  {
    title: "Eligibility Portal",
    icon: "user-check",
    url: "https://episodealert.com/login.aspx?ReturnUrl=%2fsecure%2fMyEligibility.aspx",
    description: "Patient Eligibility Check Portal"
  },
];

// ====================== CAMPAIGNS ======================
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
          { title: "Doctors Clinic", icon: "stethoscope", url: "https://mdl.gs.care/Account/Login", description: "Doctor's Clinic Portal" },
          { title: "CLM Neuro Form", icon: "brain", url: "https://docs.google.com/forms/d/e/1FAIpQLSc-hoyMB_ag_jNQvViXr-TLs0hsgdO23OaRdT4x0kpyi2xvkw/viewform", description: "Neuro campaign intake form" },
          { title: "CF Insurance Check", icon: "shield-check", url: "https://docs.google.com/forms/d/e/1FAIpQLScTwxR2kGg2EQGUJrMeJdA4StHTdki5LdeIVjHDxpGIjnpaiw/viewform", description: "Insurance verification form" },
          { title: "TMD Dupe Checker", icon: "search", url: "https://zorixs.com/", description: "Check for duplicate entries" },
          { title: "Sales CRM", icon: "briefcase", url: "https://biznexuss.com/", description: "Sales management portal" },
          { title: "Sales CRM Intake", icon: "file-input", url: "https://biznexuss.com/form/genomics/7k18mgta", description: "Genomics intake form" },
          { title: "Production Form", icon: "file-text", url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdRo6WzIEhk_vomOTHJmMveIL5qvvFMHLO0q_YZs0LoL4hlTQ/formResponse", description: "Daily Production Tracking Sheet" },
          { title: "Quality Guidelines", icon: "file-text", url: "https://docs.google.com/document/d/1Ptl0Mt3pBjDS1Kw9zVoDQfq8pVo8L5qKHwR_2YDNS0Y/edit?tab=t.0", description: "Quality standards document" },
        ],
      },
      {
        name: "GA Pipeline",
        pin: "6654",
        ltNumber: "813-725-2063",
        resources: [
          { title: "CL Intake Form", icon: "clipboard-list", url: "https://dna-formvcm.netlify.app/", description: "GA marketing intake" },
          { title: "Doctors Clinic", icon: "stethoscope", url: "https://mdl.gs.care/Account/Login", description: "Doctor's Clinic Portal" },
          { title: "States Coverage", icon: "map-pin", url: "https://docs.google.com/spreadsheets/d/1bIgfdk_12rDJ8Swy_MnNl0Hh_8uKJNG9v2ec3meiyuw/edit?gid=147741", description: "Service coverage by state" },
          { title: "Production Form", icon: "file-text", url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdRo6WzIEhk_vomOTHJmMveIL5qvvFMHLO0q_YZs0LoL4hlTQ/formResponse", description: "Daily Production Tracking Sheet" },
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
        scheduleInfo: "Lunch: 12:30 EST – 1:00 PM EST (9:30 – 10:00 PK) | Break: 3:15 EST – 3:30 EST (12:15 - 12:30 PK)",
        resources: [
          { title: "RPM Intake Form", icon: "file-input", url: "https://biznexuss.com/form/rpm/ilsw9zvh", description: "RPM intake form" },
          { title: "SMS Consent Tool", icon: "message-square", url: "https://programmingspecialistsmsapirelay-ekfjevaaapgnfrcy.eastus-01.azurewebsites.net/", description: "SMS consent management" },
          { title: "Sales CRM", icon: "briefcase", url: "https://biznexuss.com/", description: "Sales management portal" },
          { title: "AcuDial Portal", icon: "globe", url: "https://crm.acudial.com/marketing/portal.php", description: "AcuDial Marketing / RPM Portal" },
          { title: "Production Form", icon: "file-text", url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSdRo6WzIEhk_vomOTHJmMveIL5qvvFMHLO0q_YZs0LoL4hlTQ/formResponse", description: "Daily Production Tracking Sheet" },
          { title: "Quality Guidelines", icon: "file-text", url: "#", description: "Yet to be uploaded" },
          { title: "Script", icon: "scroll", url: "https://1drv.ms/b/c/eef37504b43a5cea/IQCxIWlcdXdfS5GEooSeNaHCAXFmwmWuellYDqJ2yvG1wPQ", description: "Campaign script document" },
          { title: "States Coverage", icon: "map-pin", url: "https://docs.google.com/spreadsheets/d/1BXA195rmg4B_PIe4kEsQPRDhP9Obmfl-JgH88FvjTNk/edit?gid=147741", description: "Service coverage by state" },
          {
            title: "Jordan Smith Form",
            icon: "file-text",
            url: "https://docs.google.com/forms/u/8/d/e/1FAIpQLSfalVIgNlnMGgkkYXVY4nH4/viewform",
            description: "Jordan Smith Intake Form"
          },
        ],
      },
    ],
  },
  {
    name: "Home Health Services",
    pipelines: [
      {
        name: "Home Health Pipeline",
        pin: "1128",
        scheduleInfo: "Campaign Timing: California 9 AM - 5 PM PST",
        resources: [
          {
            title: "LNS",
            icon: "file-text",
            url: "https://docs.google.com/forms/d/e/1FAIpQLSfalVIgNlnMGgkkYXVY4nH4-DF_vyVy-xWH9C4r-bSQ5uYY9A/viewform?pli=1&pli=1",
            description: "LNS Request Form"
          },
          {
            title: "Home health CA Zip codes coverage",
            icon: "map-pin",
            url: "https://docs.google.com/spreadsheets/d/1dnOqKnw9xsiVfJgwhXYMuIygp0_9BYc0wKR0QLAJy_A/edit?usp=sharing",
            description: "California Zip Codes Coverage"
          },
          {
            title: "Qualification Criteria",
            icon: "file-text",
            url: "https://drive.google.com/file/d/1hspPqBLiezwY5dQPtEUhm6FhhOhnFl1w/view?usp=sharing",
            description: "Home Health Qualification Criteria"
          },
          {
            title: "Home Health Services",
            icon: "file-text",
            url: "https://drive.google.com/file/d/1BaaIDX4hdKiwGWgntwomUFcKqCO9RBQn/view?usp=sharing",
            description: "Home Health Services Call Script"
          }
        ],
      },
    ],
  },
];

// ====================== MGs RPM ======================
export const mgsRpmPipeline: PipelineData = {
  name: "MGs RPM",
  pin: "5567",
  ltNumber: "989-250-5964",
  scheduleInfo: "Lunch: 12:30 EST – 1:00 PM EST (9:30 – 10:00 PK) | Break: 3:15 EST – 3:30 EST (12:15 - 12:30 PK)",
  resources: [
    { title: "RPM Intake Form", icon: "file-input", url: "https://biznexuss.com/form/rpm/ilsw9zvh", description: "RPM intake form" },
    { title: "RPM Main portal", icon: "globe", url: "https://crm.acudial.com/marketing/login/2fa.php", description: "RPM Main Portal Login" },
    { title: "Quality Guidelines", icon: "file-text", url: "#", description: "Yet to be uploaded" },
    { title: "Script", icon: "scroll", url: "https://1drv.ms/b/c/eef37504b43a5cea/IQCxIWlcdXdfS5GEooSeNaHCAXFmwmWuellYDqJ2yvG1wPQ", description: "Campaign script document" },
    { title: "States Coverage", icon: "map-pin", url: "https://docs.google.com/spreadsheets/d/1BXA195rmg4B_PIe4kEsQPRDhP9Obmfl-JgH88FvjTNk/edit?gid=147741", description: "Service coverage by state" },
    {
      title: "Elizabeth-bah-RPM",
      icon: "file-text",
      url: "/opening-script.mp3",
      description: "Sample Recording",
      isAudio: true
    },
    {
      title: "Jane-Fishkoff-RPM",
      icon: "file-text",
      url: "/benefits-pitch.mp3",
      description: "Sample Recording",
      isAudio: true
    },
    {
      title: "RPM Criteria",
      icon: "file-text",
      url: "https://drive.google.com/file/d/1xuLcc9KI6r6Lz6W6lEMHgLbSQ2Jly9HA/view?usp=sharing",
      description: "RPM Criteria ",
    },
  
  ],
};

// ====================== TRAINING ======================
export const trainingPipeline: PipelineData = {
  name: "Training",
  pin: "6693",                    // ← Updated PIN
  scheduleInfo: "Training Videos & Resources",
  resources: [
    {
      title: "Home Health Initial Outreach Script",
      icon: "scroll",
      url: "https://1drv.ms/b/c/eef37504b43a5cea/IQAxbsrsCK4xT5-PX89xIF3dAdGPAjS34gMpaYjvX490NsI", // OneDrive link (shortened)
  
    },
    {
      title: "Home Health Script Training",
      icon: "video",
      url: "https://res.cloudinary.com/dyxql7jwr/video/upload/v1784584370/Home_health_script_training_1_pygfdk.mp4",
      isVideo: true
    },
    {
      title: "Dialing Pattern ",
      icon: "video",
      url: "https://res.cloudinary.com/dyxql7jwr/video/upload/v1784584817/Dialing_Pattern_odrqir.mp4",
      isVideo: true
    },
    {
      title: "Training Video ",
      icon: "video",
      url: "",
      isVideo: true
    },
  ],
};

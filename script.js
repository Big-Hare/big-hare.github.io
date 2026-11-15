const projects = {
  birdfun: {
    label: "PROJECT NOTE / 001", eyebrow: "WEB · BIRDS · EDUCATION",
    title: "Nankai Birdfun",
    description: "A campus birding project that grew into a bilingual digital field guide. It brings together bird observations, species information, QR-linked pages, and a little help from code to make the birds around campus easier to notice.",
    tags: ["WEB DEVELOPMENT", "BIRDING", "NODE.JS", "EDUCATION"],
    url: "https://nankai-birds.com/"
  },
  vocab: {
    label: "PROJECT NOTE", eyebrow: "SOFTWARE · EDUCATION · FULL-STACK",
    title: "Vocabulary Trainer",
    description: "A full-stack vocabulary-learning application built to make English word practice more interactive and organized. It pairs a React frontend with a Node.js and Express backend, using SQLite to manage vocabulary and learning data. The app runs locally and brings its study and quiz features together in one place.",
    tags: ["SOFTWARE", "EDUCATION", "FULL-STACK"],
    links: [
      { label: "FRONTEND REPOSITORY", url: "https://github.com/Big-Hare/toefl-vocabulary-app_frontend" },
      { label: "BACKEND REPOSITORY", url: "https://github.com/Big-Hare/toefl-vocabulary-app" }
    ]
  },
  twoey: {
    label: "PROJECT NOTE / 003", eyebrow: "ARDUINO · PUPPETRY · THEATRE",
    title: "Twoey",
    description: "An Audrey II-inspired puppet experiment for the stage. The idea is to combine an expressive plant character with Arduino-controlled movement, exploring how mechanisms can help bring a theatrical illusion to life.",
    tags: ["ARDUINO", "SERVOS", "PUPPETRY", "THEATRE TECH"]
  },
  art: {
    label: "PROJECT NOTE / 004", eyebrow: "ILLUSTRATION · FANART",
    title: "Art & other oddities",
    description: "A little corner for drawings, fanart, visual experiments, and things that don't need to justify themselves as engineering projects. This collection will grow whenever I have something I want to share.",
    tags: ["ILLUSTRATION", "FANART", "VISUAL EXPERIMENTS"]
  },
  knee: {
    label: "PROJECT NOTE / 005", eyebrow: "EMG · MECHANICAL · PROTOTYPING",
    title: "Knee Rehabilitation Device",
    description: "A wearable knee-rehabilitation prototype exploring how real-time EMG signals from the rectus femoris can inform assisted knee movement. The work has involved signal processing, mechanical design, prototyping, and iteration.",
    tags: ["EMG", "SIGNAL PROCESSING", "MECHANICAL DESIGN", "PROTOTYPING"]
  },
  vex: {
    label: "PROJECT NOTE / 006", eyebrow: "ROBOTICS · CAD · CONTROL",
    title: "VEX Robotics",
    description: "A team robotics project involving mechanism design, assembly, competition preparation, engineering documentation, and autonomous control. One particularly satisfying rabbit hole: using gyro feedback and PID control to make autonomous turns more consistent.",
    tags: ["VEX V5", "ROBOTICS", "PID CONTROL", "MECHANISMS"]
  },
  hamilton: {
    label: "PROJECT NOTE / 007", eyebrow: "LIGHTING · PROPS · STAGECRAFT",
    title: "Hamilton",
    description: "A school production that brought together stagecraft, props, costumes, lighting, and technical problem-solving. From planning the stage to working through the lighting-console setup, this was a very hands-on production experience.",
    tags: ["MUSICAL THEATRE", "LIGHTING", "PROPS", "TECHNICAL DIRECTION"]
  },
  theatre: {
    label: "PROJECT NOTE / 008", eyebrow: "SIX · DEH · TECH THEATRE",
    title: "Other theatre work",
    description: "A growing archive of backstage work across productions, including SIX and Dear Evan Hansen. A place for the practical details: sound, stage management, technical preparation, accessibility, and the many small jobs that help a show happen.",
    tags: ["SIX", "DEAR EVAN HANSEN", "BACKSTAGE", "THEATRE TECH"]
  }
};

const windowLabel = document.querySelector("#window-label");
const windowContent = document.querySelector("#window-content");
const projectButtons = [...document.querySelectorAll("[data-project]")];

function showProject(key) {
  const project = projects[key];
  if (!project) return;

  projectButtons.forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.project === key));
  });

  windowLabel.textContent = project.label;
  windowContent.innerHTML = "";

  const eyebrow = document.createElement("p");
  eyebrow.className = "eyebrow";
  eyebrow.textContent = project.eyebrow;

  const title = document.createElement("h2");
  title.textContent = project.title;

  const description = document.createElement("p");
  description.className = "window-description";
  description.textContent = project.description;

  const tags = document.createElement("div");
  tags.className = "detail-tags";
  project.tags.forEach(tag => {
    const chip = document.createElement("span");
    chip.textContent = tag;
    tags.append(chip);
  });

  const actions = document.createElement("div");
  actions.className = "project-actions";
  if (project.links?.length) {
    project.links.forEach(link => {
      const anchor = document.createElement("a");
      anchor.className = "detail-button";
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.textContent = link.label + " ↗";
      actions.append(anchor);
    });
  } else {
    const button = project.url ? document.createElement("a") : document.createElement("button");
    button.className = "detail-button";
    if (project.url) {
      button.href = project.url;
      button.target = "_blank";
      button.rel = "noreferrer";
      button.textContent = "VISIT THE WEBSITE ↗";
    } else {
      button.type = "button";
      button.disabled = true;
      button.textContent = "DETAILED PROJECT PAGE — IN PROGRESS";
    }
    actions.append(button);
  }

  const foot = document.createElement("div");
  foot.className = "window-foot";
  const note = document.createElement("span");
  note.textContent = "MORE NOTES BEING PUT TOGETHER";
  const mark = document.createElement("span");
  mark.textContent = "✳";
  foot.append(note, mark);

  windowContent.append(eyebrow, title, description, tags, actions, foot);
}

projectButtons.forEach(button => {
  button.addEventListener("click", () => showProject(button.dataset.project));
});


// Contact menu and copyable email dialog.
const contactMenu = document.querySelector(".contact-menu");
const emailDialog = document.querySelector("#email-dialog");
const openEmail = document.querySelector("#open-email");
const closeEmail = document.querySelector("#close-email");
const copyEmail = document.querySelector("#copy-email");
const emailAddress = document.querySelector("#email-address");
const copyStatus = document.querySelector("#copy-status");

openEmail?.addEventListener("click", () => {
  if (contactMenu) contactMenu.open = false;
  emailDialog?.showModal();
});
closeEmail?.addEventListener("click", () => emailDialog?.close());
emailDialog?.addEventListener("click", event => {
  if (event.target === emailDialog) emailDialog.close();
});
copyEmail?.addEventListener("click", async () => {
  const address = emailAddress?.textContent?.trim() || "";
  try {
    await navigator.clipboard.writeText(address);
    copyStatus.textContent = "COPIED TO CLIPBOARD ✓";
  } catch {
    copyStatus.textContent = "PLEASE SELECT AND COPY THE EMAIL ABOVE.";
  }
});

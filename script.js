const caseFiles = [
  {
    number: "N.01",
    title: "Spotify Lyrics Flow",
    tool: "Web",
    description: "A Spotify-inspired web project focused on presenting lyrics in a smooth, readable flow.",
    url: "https://github.com/ranfyazz/Spotify-Lyrics-Flow-like-project"
  },
  {
    number: "N.02",
    title: "Shell Operations",
    tool: "Bash",
    description: "A collection of Bash experiments for navigating systems, inspecting processes, and practicing cleaner operations."
  },
  {
    number: "N.03",
    title: "Personal Dossier",
    tool: "Web",
    description: "This portfolio site: a responsive HTML and CSS case file for documenting web development work."
  },
  {
    number: "N.04",
    title: "Security Study",
    tool: "Security",
    description: "A learning track focused on understanding how software fails so it can be designed and tested more carefully."
  }
];

function filterCaseFiles(searchTerm) {
  if (typeof searchTerm !== "string") return [];

  const normalizedTerm = searchTerm.trim().toLowerCase();
  if (!normalizedTerm) return [];

  return caseFiles.filter(file => {
    const searchableText = `${file.title} ${file.tool} ${file.description}`.toLowerCase();
    return searchableText.includes(normalizedTerm);
  });
}

function renderCaseFiles(files) {
  const results = document.querySelector("#archive-results");
  const status = document.querySelector("#archive-status");
  if (!results || !status) return;

  results.replaceChildren();
  if (!Array.isArray(files) || files.length === 0) {
    status.textContent = "No matching case files found. Try Python, web, or security.";
    return;
  }

  status.textContent = `${files.length} case file${files.length === 1 ? "" : "s"} found.`;
  files.forEach(file => {
    if (!file || !file.number || !file.title || !file.tool || !file.description) return;

    const card = document.createElement("article");
    card.className = "case-card";

    const number = document.createElement("span");
    number.className = "case-num";
    number.textContent = `Case ${file.number} — ${file.tool}`;

    const title = document.createElement("h3");
    if (file.url) {
      const link = document.createElement("a");
      link.href = file.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = file.title;
      title.appendChild(link);
    } else {
      title.textContent = file.title;
    }

    const description = document.createElement("p");
    description.textContent = file.description;

    card.append(number, title, description);
    if (file.url) {
      const repositoryLink = document.createElement("a");
      repositoryLink.className = "case-link";
      repositoryLink.href = file.url;
      repositoryLink.target = "_blank";
      repositoryLink.rel = "noopener";
      repositoryLink.textContent = "Open repository ->";
      card.appendChild(repositoryLink);
    }
    results.appendChild(card);
  });
}

document.querySelectorAll(".level-track").forEach(track => {
  const pct = Number.parseInt(track.dataset.pct, 10);
  const segments = 10;
  for (let i = 0; i < segments; i += 1) {
    const segment = document.createElement("div");
    segment.className = "level-seg";
    track.appendChild(segment);
  }
  track._filled = Number.isFinite(pct) ? Math.round((pct / 100) * segments) : 0;
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const track = entry.target;
      track.querySelectorAll(".level-seg").forEach((segment, index) => {
        setTimeout(() => {
          if (index < track._filled) segment.classList.add("on");
        }, index * 60);
      });
      observer.unobserve(track);
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll(".level-track").forEach(track => observer.observe(track));

const searchInput = document.querySelector("#case-search");
if (searchInput) {
  searchInput.addEventListener("input", event => {
    const searchTerm = event.target.value.trim();
    if (!searchTerm) {
      renderCaseFiles([]);
      return;
    }
    renderCaseFiles(filterCaseFiles(searchTerm));
  });
}
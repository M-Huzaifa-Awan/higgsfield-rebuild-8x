"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  Aperture,
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Download,
  Film,
  FolderClock,
  Heart,
  ImageIcon,
  Layers3,
  Menu,
  Plus,
  Settings2,
  Sparkles,
  Upload,
  WandSparkles,
  X,
} from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type View = "discover" | "create" | "projects";
type Mode = "image" | "video";

const inspiration = [
  {
    title: "Afterhours atelier",
    category: "Editorial",
    prompt: "A couture silhouette in a brutalist gallery at blue hour, sharp flash, editorial grain",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=85",
    accent: "#d7ff35",
  },
  {
    title: "Chrome coast",
    category: "Campaign",
    prompt: "A chrome concept car on a black volcanic beach, overcast sky, cinematic product campaign",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85",
    accent: "#8eb8ff",
  },
  {
    title: "Glass orchard",
    category: "Surreal",
    prompt: "Translucent fruit growing inside a midnight glasshouse, macro lens, luminous condensation",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=85",
    accent: "#ff936b",
  },
  {
    title: "Signal / 04",
    category: "Motion",
    prompt: "A lone dancer under red projection light, slow dolly in, fabric moving in wind, 35mm",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85",
    accent: "#ff68d4",
  },
];

const resultImages = [
  "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=90",
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1600&q=90",
];

type Generation = { id: number; prompt: string; mode: Mode; model: string; image: string; favorite: boolean };

const initialGenerations: Generation[] = [
  { id: 1, prompt: inspiration[0].prompt, mode: "image", model: "Prism 2", image: resultImages[0], favorite: true },
  { id: 2, prompt: inspiration[1].prompt, mode: "video", model: "Motion 01", image: resultImages[1], favorite: false },
];

export function StudioShell() {
  const [view, setView] = useState<View>("discover");
  const [mode, setMode] = useState<Mode>("image");
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("Prism 2");
  const [ratio, setRatio] = useState("4:5");
  const [duration, setDuration] = useState("5s");
  const [advanced, setAdvanced] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generations, setGenerations] = useState(initialGenerations);
  const [uploadName, setUploadName] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [toast, setToast] = useState("");

  const currentModels = mode === "image" ? ["Prism 2", "Soul Editorial", "Typecraft"] : ["Motion 01", "Kinetic XL", "Scene Flow"];
  const estimate = mode === "image" ? "2 demo credits" : duration === "5s" ? "12 demo credits" : "20 demo credits";
  const status = progress < 34 ? "Reading your direction" : progress < 72 ? "Composing the scene" : "Finishing details";

  const filteredGenerations = useMemo(() => generations, [generations]);

  function chooseInspiration(item: (typeof inspiration)[number]) {
    setPrompt(item.prompt);
    setMode(item.category === "Motion" ? "video" : "image");
    setView("create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function switchMode(next: Mode) {
    setMode(next);
    setModel(next === "image" ? "Prism 2" : "Motion 01");
  }

  function generate() {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);
    setProgress(12);
    const steps = [36, 68, 92, 100];
    steps.forEach((step, index) => {
      window.setTimeout(() => {
        setProgress(step);
        if (step === 100) {
          const next: Generation = {
            id: Date.now(),
            prompt: prompt.trim(),
            mode,
            model,
            image: resultImages[generations.length % resultImages.length],
            favorite: false,
          };
          setGenerations((items) => [next, ...items]);
          setIsGenerating(false);
          setToast("Sample output added to Projects");
          window.setTimeout(() => setToast(""), 2800);
        }
      }, 520 * (index + 1));
    });
  }

  function onUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) setUploadName(file.name);
  }

  function toggleFavorite(id: number) {
    setGenerations((items) => items.map((item) => (item.id === id ? { ...item, favorite: !item.favorite } : item)));
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setView("discover")} aria-label="Go to discovery">
          <span className="brand-mark"><Aperture size={19} /></span>
          <span>FRAMEFIELD</span>
          <span className="beta">BETA</span>
        </button>
        <nav className="desktop-nav" aria-label="Main navigation">
          <NavButton active={view === "discover"} onClick={() => setView("discover")}>Discover</NavButton>
          <NavButton active={view === "create"} onClick={() => setView("create")}>Create</NavButton>
          <NavButton active={view === "projects"} onClick={() => setView("projects")}>Projects</NavButton>
        </nav>
        <div className="top-actions">
          <div className="credit-pill"><Sparkles size={14} /> 48 demo credits</div>
          <Button size="sm" onClick={() => setView("create")}><Plus size={16} /> New creation</Button>
          <button className="menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle menu"><Menu /></button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenu ? (
          <motion.div className="mobile-sheet" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>
            <button onClick={() => setMobileMenu(false)} aria-label="Close menu"><X /></button>
            {(["discover", "create", "projects"] as View[]).map((item) => (
              <button key={item} onClick={() => { setView(item); setMobileMenu(false); }}>{item}</button>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main>
        <AnimatePresence mode="wait">
          {view === "discover" && <Discover key="discover" onChoose={chooseInspiration} onCreate={() => setView("create")} />}
          {view === "create" && (
            <motion.section key="create" className="create-page" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="page-heading">
                <div><p className="eyebrow">Creative workspace</p><h1>Make the idea tangible.</h1></div>
                <p>One focused surface for direction, settings, and results. This is an interactive demo; no AI API is connected.</p>
              </div>
              <div className="studio-grid">
                <section className="composer-panel">
                  <div className="mode-tabs" role="tablist" aria-label="Creation type">
                    <button className={mode === "image" ? "active" : ""} onClick={() => switchMode("image")}><ImageIcon size={17} /> Image</button>
                    <button className={mode === "video" ? "active" : ""} onClick={() => switchMode("video")}><Film size={17} /> Video</button>
                  </div>
                  <label className="field-label" htmlFor="prompt">Describe your scene</label>
                  <div className="prompt-box">
                    <textarea id="prompt" value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="A quiet impossible moment, framed like a campaign..." maxLength={600} />
                    <div className="prompt-footer">
                      <label className="upload-control"><Upload size={16} /><span>{uploadName || "Add reference"}</span><input type="file" accept="image/*" onChange={onUpload} /></label>
                      <span>{prompt.length}/600</span>
                    </div>
                  </div>
                  <div className="quick-prompts">
                    {["Editorial light", "Product macro", "Soft motion"].map((chip) => <button key={chip} onClick={() => setPrompt((value) => `${value}${value ? ", " : ""}${chip.toLowerCase()}`)}>{chip}</button>)}
                  </div>
                  <div className="settings-grid">
                    <SelectField label="Model" value={model} onChange={setModel} options={currentModels} />
                    <SelectField label="Aspect ratio" value={ratio} onChange={setRatio} options={["1:1", "4:5", "16:9", "9:16"]} />
                    {mode === "video" && <SelectField label="Duration" value={duration} onChange={setDuration} options={["5s", "8s"]} />}
                  </div>
                  <button className="advanced-toggle" onClick={() => setAdvanced(!advanced)} aria-expanded={advanced}><Settings2 size={16} /> Advanced direction <ChevronDown className={advanced ? "rotated" : ""} size={16} /></button>
                  <AnimatePresence>
                    {advanced && <motion.div className="advanced-panel" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><label>Creative adherence <input type="range" min="0" max="100" defaultValue="72" /></label><label>Variation <input type="range" min="0" max="100" defaultValue="38" /></label></motion.div>}
                  </AnimatePresence>
                  <div className="generate-row">
                    <div><strong>{estimate}</strong><span>Honest demo estimate</span></div>
                    <Button disabled={!prompt.trim() || isGenerating} onClick={generate}><WandSparkles size={17} /> {isGenerating ? "Creating sample..." : `Create ${mode}`}</Button>
                  </div>
                </section>
                <section className="result-panel" aria-live="polite">
                  {isGenerating ? (
                    <div className="progress-state"><div className="orb"><span /></div><p className="eyebrow">{progress}% complete</p><h2>{status}</h2><p>Sample generation usually takes about two seconds in this demo.</p><div className="progress-track"><motion.span animate={{ width: `${progress}%` }} /></div></div>
                  ) : generations[0] ? <ResultCard generation={generations[0]} onFavorite={toggleFavorite} /> : <EmptyResult />}
                </section>
              </div>
            </motion.section>
          )}
          {view === "projects" && <Projects key="projects" items={filteredGenerations} onFavorite={toggleFavorite} onCreate={() => setView("create")} />}
        </AnimatePresence>
      </main>

      <nav className="bottom-nav" aria-label="Mobile navigation">
        <button className={view === "discover" ? "active" : ""} onClick={() => setView("discover")}><Layers3 /><span>Discover</span></button>
        <button className={view === "create" ? "active" : ""} onClick={() => setView("create")}><WandSparkles /><span>Create</span></button>
        <button className={view === "projects" ? "active" : ""} onClick={() => setView("projects")}><FolderClock /><span>Projects</span></button>
      </nav>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>{toast}</motion.div>}</AnimatePresence>
    </div>
  );
}

function NavButton({ active, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { active: boolean }) {
  return <button className={active ? "active" : ""} {...props} />;
}

function Discover({ onChoose, onCreate }: { onChoose: (item: (typeof inspiration)[number]) => void; onCreate: () => void }) {
  return (
    <motion.section className="discover-page" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="hero">
        <div className="hero-copy"><p className="eyebrow">Image + motion, one workspace</p><h1>Make work<br />worth <em>stopping for.</em></h1><p>Explore a direction, shape the prompt, and keep every iteration together. A focused recreation of the essential creative loop.</p><div className="hero-actions"><Button onClick={onCreate}><WandSparkles size={17} /> Start creating</Button><button className="text-link" onClick={() => document.getElementById("inspiration")?.scrollIntoView({ behavior: "smooth" })}>Explore the feed <ArrowUpRight size={16} /></button></div></div>
        <div className="hero-art"><Image src={inspiration[0].image} fill priority sizes="(max-width: 800px) 100vw, 48vw" alt="Editorial fashion portrait used as sample inspiration" /><div className="art-caption"><span>FEATURED DIRECTION / 01</span><strong>Afterhours atelier</strong></div><div className="floating-note"><Sparkles size={14} /> Ready to remix</div></div>
      </div>
      <section id="inspiration" className="feed-section"><div className="section-heading"><div><p className="eyebrow">Curated starting points</p><h2>Steal the direction.<br />Make it yours.</h2></div><p>Every card is actionable. Open one to move its prompt directly into the studio.</p></div><div className="inspiration-grid">{inspiration.map((item, index) => <button className={`inspiration-card card-${index + 1}`} key={item.title} onClick={() => onChoose(item)}><Image src={item.image} fill sizes="(max-width: 760px) 100vw, 40vw" alt="" /><span className="card-shade" /><span className="card-index">0{index + 1}</span><span className="card-copy"><small style={{ color: item.accent }}>{item.category}</small><strong>{item.title}</strong><span>Use this direction <ArrowUpRight size={15} /></span></span></button>)}</div></section>
      <section className="principle-strip"><p>THE SHORTER PATH FROM</p><div><span>REFERENCE</span><ArrowUpRight /><span>RESULT</span></div><p>No model maze. No blank-canvas anxiety.</p></section>
    </motion.section>
  );
}

function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="select-field"><span>{label}</span><select value={value} onChange={(event) => onChange(event.target.value)}>{options.map((option) => <option key={option}>{option}</option>)}</select><ChevronDown size={15} /></label>;
}

function ResultCard({ generation, onFavorite }: { generation: Generation; onFavorite: (id: number) => void }) {
  return <div className="result-card"><div className="result-image"><Image src={generation.image} fill sizes="(max-width: 900px) 100vw, 48vw" alt="Sample output for the current prompt" /><span className="sample-badge">SAMPLE OUTPUT · NOT AI GENERATED</span><div className="result-actions"><button onClick={() => onFavorite(generation.id)} aria-label="Favorite output"><Heart fill={generation.favorite ? "currentColor" : "none"} /></button><Button variant="secondary" size="icon" asChild><a href={generation.image} target="_blank" rel="noreferrer" aria-label="Open sample image"><Download /></a></Button></div></div><div className="result-meta"><div><p>{generation.mode} · {generation.model}</p><h2>Current direction</h2></div><span>Ready</span></div><p className="result-prompt">“{generation.prompt}”</p></div>;
}

function EmptyResult() {
  return <div className="empty-result"><Sparkles /><h2>Your result lands here</h2><p>Write a prompt and configure the scene to create an honest sample output.</p></div>;
}

function Projects({ items, onFavorite, onCreate }: { items: Generation[]; onFavorite: (id: number) => void; onCreate: () => void }) {
  const [filter, setFilter] = useState<"all" | "favorite">("all");
  const shown = filter === "favorite" ? items.filter((item) => item.favorite) : items;
  return <motion.section className="projects-page" initial={false} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><div className="page-heading"><div><p className="eyebrow">Your creative memory</p><h1>Projects, not a pile of files.</h1></div><Button onClick={onCreate}><Plus size={17} /> New creation</Button></div><div className="project-toolbar"><div><button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All work</button><button className={filter === "favorite" ? "active" : ""} onClick={() => setFilter("favorite")}>Favorites</button></div><span><Clock3 size={15} /> Updated just now</span></div>{shown.length ? <div className="project-grid">{shown.map((item) => <article key={item.id} className="project-card"><div><Image src={item.image} fill sizes="(max-width: 700px) 100vw, 33vw" alt="Sample project output" /><span className="sample-badge">SAMPLE</span><button onClick={() => onFavorite(item.id)} aria-label="Favorite project"><Heart fill={item.favorite ? "currentColor" : "none"} /></button></div><p>{item.mode} · {item.model}</p><h2>{item.prompt.slice(0, 48)}{item.prompt.length > 48 ? "…" : ""}</h2></article>)}</div> : <div className="empty-projects"><Heart /><h2>No favorites yet</h2><p>Save the directions you want to revisit.</p></div>}</motion.section>;
}

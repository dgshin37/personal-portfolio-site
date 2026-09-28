export interface Project {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  status: string;
  period: string;
  description: string[];
  tags: string[];
  links: { label: string; href: string }[];
  detailLabel: string;
  details: { title: string; text: string }[];
}

export const projects: Project[] = [
  {
    id: 'melosofia', name: 'Melosofia', subtitle: 'Knowledge, set to music.',
    category: 'Learning & product engineering', status: 'Founder & Product Engineer',
    period: '2025–present',
    description: [
      'A learning platform that brings together original music and interactive study to make complex subjects more engaging and approachable.',
      'I design and build the product and the systems behind it, spanning full-stack engineering, AI orchestration, and multimodal learning design. The work connects AI models, structured educational content, and the learning experience, combining AI-assisted workflows with human review.',
      'The goal is to make studying something students look forward to.',
    ],
    tags: ['Product design', 'Full-stack engineering', 'AI orchestration'],
    links: [{ label: 'Explore Melosofia', href: 'https://melosofia.com' }, { label: 'Open the app', href: 'https://app.melosofia.com' }],
    detailLabel: 'About the work', details: [],
  },
  {
    id: 'crossflame', name: 'Crossflame', subtitle: 'A competitive arena game with self-play AI.',
    category: 'Game engineering & reinforcement learning', status: 'Independent project',
    period: '2026',
    description: [
      'A competitive 1v1 arena game built around responsive movement, precise timing, and the mechanics of full-power Power Bomberman duels. I engineered a deterministic Rust simulation shared by browser play and batched training, with rollback multiplayer and versioned replays. Recreating the game’s feel involved measuring gameplay recordings and carefully refining movement, cornering, and bomb interactions.',
      'For the AI, I designed and trained recurrent neural networks using PPO and self-play against a league of historical opponents, including targeted training drills reconstructed from losses to human players. The work spans neural architecture, training design, and evaluation, through to deploying the learned opponents directly in the browser.',
    ],
    tags: ['Rust · WebAssembly', 'PyTorch · recurrent PPO', 'Self-play', 'ONNX', 'Rollback multiplayer'],
    links: [{ label: 'Play Crossflame', href: 'https://crossflame.net' }],
    detailLabel: 'Inside the game & the AI',
    details: [
      { title: 'A deliberately narrow format', text: 'Two players, full-power starting loadouts, and no initial destructible-block farming. I focused on the movement, timing, and bomb play of Power Bomberman duels, with the goal of owning the complete playing environment needed to train an AI opponent.' },
      { title: 'Recreating the feel', text: 'I analyzed gameplay recordings to measure movement, action timing, and bomb behavior, accounting for variable timestamps and dropped frames. Cornering required particular attention: early versions felt sticky, and the original implementation was not available. I developed a movement model combining sub-tile positions, collision slack, corridor alignment, and fast corner correction, then iteratively refined its responsiveness.' },
      { title: 'One simulation, two environments', text: 'The rules live in a fixed-timestep, integer-state Rust simulation, compiled to WebAssembly for browser play and exposed to Python through PyO3 for batched training. Rollback netcode supports online matches; state hashing and versioned replays support determinism checks and reproducible debugging. Simulator and observation versions matter when evaluating policies trained at different stages of development.' },
      { title: 'The neural architecture', text: 'The FullRes2 policy keeps the full 11×13 board resolution through a 128-channel convolutional trunk with six residual blocks. Spatial features combine with a scalar-feature branch before entering a 640-unit LSTM and a policy head with 22 actions. Inputs include structured game-state features and engineered hazard projections. A training-only auxiliary head predicts the opponent’s action. Compared with the earlier roughly 17-million-parameter design, FullRes2 reduces dense and recurrent layers while preserving the spatial trunk, bringing the model to approximately 8 million parameters.' },
      { title: 'Learning from competition', text: 'Training uses recurrent PPO and self-play against a league of historical policies. Opponent sampling favors competitive matchups while retaining variety. In one training continuation, I reconstructed 255 starting positions from 85 human wins against the bot, rewinding each game to several points before defeat. These became reinforcement-learning drills, rather than demonstrations for copying human actions.' },
      { title: 'Evaluation & browser deployment', text: 'Evaluation exposed observation-version mismatches and nontransitive matchups: one policy could beat a second, which beat a third, which beat the first. Replay analysis helped separate different failure modes instead of treating every loss as a reason to train longer. Policies export to ONNX for client-side inference, with tooling to compare outputs against PyTorch. I also play against the bot myself, using those matches and their replays to identify failure modes and guide further iteration.' },
    ],
  },
  {
    id: 'salsasofia', name: 'Salsasofia', subtitle: 'Salsa as a graph.',
    category: 'Dance & interactive visualization', status: 'Prototype / in development',
    period: '2026',
    description: [
      'What if every position in partner dancing were a node, and every move an edge? Salsasofia explores salsa as a graph of positions and transitions, making it possible to reason about how moves connect and discover new combinations.',
      'The work brings together structured dance notation and a procedural 3D partner-animation prototype. These are the building blocks of the learning experience I’m developing.',
    ],
    tags: ['Graph modeling', 'Three.js', 'Procedural animation'], links: [], detailLabel: 'About the work', details: [],
  },
  {
    id: 'voxsofia', name: 'Voxsofia', subtitle: 'A weekend-built, on-device dictation tool.',
    category: 'Local AI & developer tools', status: 'Personal tool',
    period: '2026',
    description: [
      'Press a key, speak naturally, and cleaned-up text appears wherever you’re typing. Voxsofia pairs Apple’s on-device speech recognition with a local Gemma 4 model and custom vocabulary for names and technical terms. I built it over a weekend with AI coding assistance and use it for my own dictation.',
      'In my daily use, its transcription quality is at least as good as Wispr Flow’s. The tradeoff: roughly 7 GB of model memory and somewhat slower processing in exchange for offline operation, on-device privacy, and no subscription or paid inference API.',
    ],
    tags: ['SwiftUI', 'Apple Speech', 'MLX Swift · Gemma', 'Model evaluation'], links: [],
    detailLabel: 'The pipeline, experiments & tradeoffs',
    details: [
      { title: 'Why I built it', text: 'I wanted useful AI dictation without sending my voice to a server or paying a subscription. The result is a personal macOS menu-bar app, built with AI coding assistance. It is not currently distributed as a download or open-source project.' },
      { title: 'How it works', text: 'Apple’s on-device recognizer transcribes the recording, then a quantized Gemma 4 12B model running through MLX Swift cleans up filler words, false starts, punctuation, and misheard terms. Custom vocabulary supplies recurring names—including Melosofia—and their common mishearings. The result is inserted at the cursor, with a fallback to the original transcript.' },
      { title: 'Choosing the pipeline', text: 'I compared about ten speech-recognition configurations and seven cleanup-model candidates using personal recordings and written edge cases. Candidates included Apple’s recognizers, Whisper variants, Parakeet, and other models. I weighed accuracy against latency and memory, with particular attention to preserving meaning. Prompt refinements and edit validation address unwanted changes, including dropped negations.' },
      { title: 'Making it faster', text: 'Reusing a cached instruction-and-vocabulary prefix reduced median cleanup time from 9.64 seconds to 4.01 seconds in a saved 24-case comparison—about a 58% reduction—with identical output on 23 of 24 cases. This measures the cleanup stage, not total recording-to-insertion time.' },
      { title: 'The tradeoff', text: 'The Wispr Flow comparison is my personal assessment, not a controlled head-to-head benchmark. The local model uses roughly 7 GB of memory, and processing is slower in my use. After initial model setup, audio and text processing runs on-device, without a paid inference API or subscription. For my workflow, that tradeoff is worthwhile.' },
    ],
  },
];

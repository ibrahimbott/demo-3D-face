# 3D Face Avatar Engine

A real-time 3D face avatar system with audio-driven lip-sync, facial expressions, and dynamic animations. Built with Three.js and WebGL for high-fidelity browser-based rendering.

---

## Overview

This project provides a modular, embeddable 3D avatar capable of:

- **Real-time lip-sync** driven by audio input (URL or file upload)
- **Facial expression control** via mood presets (neutral, happy, angry, sad, etc.)
- **Dynamic bone physics** for natural hair/accessory movement
- **Full-body animation support** using Mixamo FBX files
- **Multiple avatar model support** (GLB format with ARKit + Oculus blend shapes)

The system is designed to be integrated into any web application — whether it's a conversational AI interface, a virtual assistant, or an interactive media experience.

---

## Quick Start

### 1. Clone & Serve

```bash
git clone <your-repo-url>
cd demo-3D-face
# Serve with any static file server
npx serve .
```

### 2. Open in Browser

Navigate to `http://localhost:3000` (or whichever port your server uses). The avatar will load automatically.

### 3. Test Audio Playback

Use the on-screen controls to either:
- Click **"Play Dummy Audio URL"** to test with a remote audio file
- Click **"Or Upload File"** to test with a local audio file

---

## Architecture

```
├── AvatarController.js    # High-level API wrapper for the rendering engine
├── index.html             # Entry point with embedded test controls
├── siteconfig.js          # Avatar presets, voice configs, and asset paths
├── modules/               # Core engine modules
│   ├── talkinghead.mjs    # Main 3D avatar rendering & animation engine
│   ├── dynamicbones.mjs   # Physics simulation for dynamic bones
│   ├── retargeter.mjs     # Skeleton retargeting utilities
│   ├── lipsync-en.mjs     # English lip-sync module
│   ├── lipsync-de.mjs     # German lip-sync module
│   ├── lipsync-fr.mjs     # French lip-sync module
│   ├── lipsync-fi.mjs     # Finnish lip-sync module
│   ├── lipsync-lt.mjs     # Lithuanian lip-sync module
│   └── playback-worklet.js # Audio worklet for low-latency playback
├── avatars/               # 3D avatar models (GLB)
├── animations/            # Mixamo animation files (FBX)
├── poses/                 # Pose presets (FBX)
├── audio/                 # Impulse response files & ambient audio
├── views/                 # Background images/videos
├── fonts/                 # Custom typography
└── blender/               # Blender scripts for avatar preparation
```

---

## API Reference

### `AvatarController`

The main interface for embedding the avatar in your application.

```javascript
import { AvatarController } from "./AvatarController.js";

const avatar = new AvatarController();
const container = document.getElementById('avatar');

// Initialize with default model
await avatar.initialize(container);

// Play audio with lip-sync
await avatar.speakFromUrl("https://example.com/speech.mp3");

// Change expression
avatar.setMood("happy");
```

#### Methods

| Method | Description |
|---|---|
| `initialize(element, modelUrl?)` | Mount the 3D avatar into a DOM element. Optional custom model path. |
| `speakFromUrl(audioUrl)` | Fetch and play audio with automatic lip-sync animation. |
| `setMood(mood)` | Set facial expression. Options: `neutral`, `happy`, `angry`, `sad`, `fear`, `disgust`, `love`, `sleep` |

---

## Avatar Models

The system supports GLB models with the following requirements:

- **Rig**: Mixamo-compatible bone structure
- **Blend shapes**: ARKit (52 shapes) + Oculus viseme (15 shapes)
- **Root**: Named `"Armature"` by default

### Included Presets

| Avatar | Body | Notes |
|---|---|---|
| AvatarSDK | M | Default head model, realistic male |
| Brunette | F | Full-body female with A-pose |
| Avaturn | F | Photo-realistic female with retargeting |
| MPFB | F | Open-source female with dynamic bones |
| VRoid | F | Anime-style female with hair physics |

---

## Configuration

Edit `siteconfig.js` to customize:

- **Avatar presets** — model paths, body type, mood, baseline corrections
- **Voice configurations** — Google, ElevenLabs, and Microsoft TTS voice IDs
- **Scene assets** — backgrounds, animations, poses, ambient audio
- **Dynamic bones** — physics parameters for hair/accessory simulation

---

## Lip-sync Languages

Built-in support for:
- 🇬🇧 English
- 🇩🇪 German
- 🇫🇷 French
- 🇫🇮 Finnish
- 🇱🇹 Lithuanian

Additional languages can be added by creating new `lipsync-xx.mjs` modules or by using Microsoft Azure Speech SDK for 100+ language support via viseme output.

---

## Dynamic Bones

The engine includes a built-in physics simulation using spring-damper models and velocity Verlet integration. Configure per-bone properties like stiffness, damping, limits, and collision exclusion zones.

```javascript
modelDynamicBones: [
  {
    bone: "ponytail1",
    type: "full",
    stiffness: 20,
    damping: 2,
    limits: [null, null, [null, 0.01], null]
  }
]
```

---

## Blender Scripts

The `blender/` directory contains Python scripts for avatar preparation:

| Script | Purpose |
|---|---|
| `build-avatarsdk-eyes.py` | Build eye meshes for AvatarSDK models |
| `build-extras-from-arkit.py` | Generate extra blend shapes from ARKit data |
| `build-visemes-from-arkit.py` | Generate Oculus visemes from ARKit blend shapes |
| `rename-*-shapekeys.py` | Rename shape keys for various model formats |

---

## Tech Stack

- **Three.js** (v0.180) — 3D rendering
- **Web Audio API** — Audio processing and playback
- **AudioWorklet** — Low-latency audio streaming
- **WebGL** — GPU-accelerated graphics

---

## Browser Support

Tested on latest versions of:
- Chrome
- Firefox
- Safari
- Edge
- iPad (Safari)

---

## License

MIT License — See [LICENSE](./LICENSE) for details.

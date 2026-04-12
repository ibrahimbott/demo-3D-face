import { TalkingHead } from "./modules/talkinghead.mjs";

/**
 * AvatarController
 * A clean, modular wrapper for the TalkingHead 3D Avatar.
 * Designed to be easily embedded in React or any modern UI framework.
 */
export class AvatarController {
  
  constructor() {
    this.head = null;
  }

  /**
   * Initialize the 3D Face Avatar inside a given DOM element.
   * @param {HTMLElement} containerElement - The div where the canvas should be rendered.
   * @param {string} modelUrl - Path to the avatarsdk.glb file (relative to your public folder).
   */
  async initialize(containerElement, modelUrl = './avatars/avatarsdk.glb') {
    // 1. Instantiate TalkingHead with the exact framing parameters needed for the face
    this.head = new TalkingHead(containerElement, {
      cameraDistance: 0.55
    });

    if (this.head.cameraCenter) {
      this.head.cameraCenter = [0, 1.65, 0];
    }

    // 2. Load the stripped 3D Head model
    await this.head.showAvatar({
      url: modelUrl,
      body: 'M',
      lipsyncLang: 'en',
      avatarMood: 'neutral'
    });

    console.log("AvatarController initialized successfully.");
    return this;
  }

  /**
   * Fetch an audio file from a URL and play it with automated lip-sync.
   * @param {string} audioUrl - URL of the .mp3 or .wav file.
   */
  async speakFromUrl(audioUrl) {
    if (!this.head) {
      console.error("AvatarController: Cannot speak, avatar not initialized.");
      return;
    }

    try {
      console.log(`AvatarController: Fetching audio from ${audioUrl}...`);
      const response = await fetch(audioUrl);
      
      if (!response.ok) {
         throw new Error(`Failed to fetch audio: ${response.statusText}`);
      }
      
      const arrayBuffer = await response.arrayBuffer();
      
      console.log("AvatarController: Audio fetched, starting lip-sync playback...");
      // speakAudio natively processes the ArrayBuffer, generates visemes, and plays it
      await this.head.speakAudio(arrayBuffer);
    } catch (error) {
      console.error("AvatarController: Playback failed", error);
    }
  }

  /**
   * Set mood or facial expression
   * @param {string} mood - e.g. 'neutral', 'happy', 'angry', 'sad', 'fear', 'disgust', 'love', 'sleep'
   */
  setMood(mood) {
    if(this.head && this.head.setMood) {  
        this.head.setMood(mood);
    }
  }
}

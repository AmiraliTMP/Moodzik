export type Track = {
  id: number;
  title: string;
  artist: string;
  album: string;
  cover: string;
  audioUrl: string;
  duration: string;
  isLocal?: boolean;
  fileName?: string;
};

export type ImportedAudioTrack = {
  file: File;
  title: string;
  artist: string;
  album: string;
  cover: Blob | null;
  duration: number;
};

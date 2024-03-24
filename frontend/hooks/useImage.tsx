import { create } from "zustand";

interface VehicleMetadata {
  airplane: number;
  boat: number;
  bus: number;
  car: number;
  motorcycle: number;
  train: number;
  truck: number;
}

type ImageState = {
  image: File | null;
  annotatedImage: string | null;
  metadata: Record<string, unknown> | null;
  setImage: (image: File) => void;
  setAnnotatedImage: (image: string) => void;
  setMetadata: (metadata: Record<string, VehicleMetadata>) => void;
  clearImage: () => void;
};

const useImage = create<ImageState>((set) => ({
  image: null,
  annotatedImage: null,
  metadata: null,
  setImage: (image) => set({ image }),
  setAnnotatedImage: (image) => set({ annotatedImage: image }),
  setMetadata: (metadata) => set({ metadata }),
  clearImage: () => set({ image: null, annotatedImage: null, metadata: null }),
}));

export default useImage;

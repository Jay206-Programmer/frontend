import create from "zustand";

export const useStore = create((set) => ({
  accuracy: [],
  loss: [],
  updateMetrics: (epoch, acc, lss) =>
    set((state) => ({
      accuracy: state.accuracy.concat([[epoch, acc]]),
      loss: state.loss.concat([[epoch, lss]]),
    })),
  // removeAllBears: () => set({ bears: 0 })
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { posthog } from '@/lib/posthog';

interface ProgressStore {
  streakCount: number;
  dailyXp: number;
  dailyXpGoal: number;
  completedLessonIds: string[];
  _hasHydrated: boolean;
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  incrementStreak: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      streakCount: 12,
      dailyXp: 15,
      dailyXpGoal: 20,
      completedLessonIds: [],
      _hasHydrated: false,
      addXp: (amount) =>
        set((state) => {
          const newXp = Math.min(state.dailyXp + amount, state.dailyXpGoal);
          posthog.capture('xp_earned', { xp_amount: amount, total_xp: newXp });
          return { dailyXp: newXp };
        }),
      completeLesson: (lessonId) =>
        set((state) => {
          if (state.completedLessonIds.includes(lessonId)) return state;
          posthog.capture('lesson_completed', { lesson_id: lessonId });
          return { completedLessonIds: [...state.completedLessonIds, lessonId] };
        }),
      incrementStreak: () =>
        set((state) => ({ streakCount: state.streakCount + 1 })),
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: 'progress-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        streakCount: state.streakCount,
        dailyXp: state.dailyXp,
        dailyXpGoal: state.dailyXpGoal,
        completedLessonIds: state.completedLessonIds,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

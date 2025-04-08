import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Skill {
  id: number;
  name: string;
  level: string;
}

interface SkillsState {
  list: Skill[];
}

const initialState: SkillsState = {
    list: [
      { id: 1, name: 'JavaScript', level: 'Avancé' },
      { id: 2, name: 'React', level: 'Intermédiaire' },
      { id: 3, name: 'SQL', level: 'Débutant' },
      { id: 4, name: 'Redux', level: 'Intermédiaire' },
      { id: 5, name: 'Next.js', level: 'Avancé' },
      { id: 6, name: 'Bootstrap', level: 'Intermédiaire' },
      { id: 7, name: 'TailwindCSS', level: 'Débutant' },
      { id: 8, name: 'Chart.js', level: 'Débutant' },
      { id: 9, name: 'Firebase', level: 'Débutant' },
      { id: 10, name: 'MongoDB', level: 'Intermédiaire' },
      { id: 11, name: 'Node.js', level: 'Intermédiaire' },
      { id: 12, name: 'Vue.js', level: 'Débutant' },
      { id: 13, name: 'TypeScript', level: 'Intermédiaire' },
      { id: 14, name: 'LocalStorage', level: 'Avancé' },
    ],
  };
  

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    addSkill: (state, action: PayloadAction<Skill>) => {
      state.list.push(action.payload);
    },
    updateSkill: (state, action: PayloadAction<Skill>) => {
      const index = state.list.findIndex(s => s.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteSkill: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(s => s.id !== action.payload);
    },
  },
});

export const { addSkill, updateSkill, deleteSkill } = skillsSlice.actions;
export default skillsSlice.reducer;

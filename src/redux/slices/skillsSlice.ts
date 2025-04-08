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

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
}

interface ProjectsState {
  list: Project[];
}

const initialState: ProjectsState = {
    list: [
      {
        id: 1,
        title: 'BookFinder',
        description: 'Une application qui permet de rechercher des livres via l’API Google Books et de gérer sa bibliothèque personnelle.',
        technologies: ['React', 'Redux', 'TailwindCSS'],
      },
      {
        id: 2,
        title: 'MyBudget',
        description: 'Application de gestion budgétaire avec graphiques dynamiques, catégorisation des dépenses et notifications.',
        technologies: ['Next.js', 'Chart.js', 'LocalStorage'],
      },
      {
        id: 3,
        title: 'DevJobs',
        description: 'Plateforme de recherche d’emploi pour développeurs avec filtres par stack, région et télétravail.',
        technologies: ['Next.js', 'Typescript', 'Firebase'],
      },
      {
        id: 4,
        title: 'QuickNotes',
        description: 'Application de prise de notes rapide avec marquage, archivage, et recherche en temps réel.',
        technologies: ['React', 'Redux Toolkit', 'Bootstrap'],
      },
    ],
  };
  

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.list.push(action.payload);
    },
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.list.findIndex(p => p.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteProject: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(p => p.id !== action.payload);
    },
  },
});

export const { addProject, updateProject, deleteProject } = projectsSlice.actions;
export default projectsSlice.reducer;

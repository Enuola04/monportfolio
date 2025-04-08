import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Testimonial {
  id: number;
  author: string;
  message: string;
}

interface TestimonialsState {
  list: Testimonial[];
}

const initialState: TestimonialsState = {
  list: [
    { id: 1, author: 'Alice', message: 'Excellent développeur !' },
    { id: 2, author: 'Bob', message: 'Portfolio très professionnel.' },
    { id: 3, author: 'Jean', message: 'Travailleur profesionel.' },
  ],
};

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    addTestimonial: (state, action: PayloadAction<Testimonial>) => {
      state.list.push(action.payload);
    },
    updateTestimonial: (state, action: PayloadAction<Testimonial>) => {
      const index = state.list.findIndex(t => t.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteTestimonial: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(t => t.id !== action.payload);
    },
  },
});

export const {
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = testimonialsSlice.actions;
export default testimonialsSlice.reducer;

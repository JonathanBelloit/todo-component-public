import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { Project } from "../components/todo/interface";
import { getCurrentUserEmail } from "../hooks/useCurrentUserCollection";

export const addProject = createAsyncThunk("projects/addProject", async (project: string) => {
  const userEmail = getCurrentUserEmail();
  const projectsCollectionRef = collection(db, `users/${userEmail}/projects`);
  const newProject = {
    title: project
  }
  const docRef = await addDoc(projectsCollectionRef, newProject);
  return { ...newProject, id: docRef.id}
})

export const getProjects = createAsyncThunk("projects/getProjects", async () => {
  const userEmail = getCurrentUserEmail();
  const projectsCollectionRef = collection(db, `users/${userEmail}/projects`);
  const querySnapshot = await getDocs(projectsCollectionRef);
  const projects = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    title: doc.data().title,
    ...doc.data(),
  }));
  return projects;
});

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [] as Project[],
    loading: 'idle' as 'idle' | 'pending' | 'succeeded' | 'failed',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProject.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addProject.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.projects.push(action.payload);
      })
      .addCase(addProject.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to add project';
      })
      .addCase(getProjects.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getProjects.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.projects = action.payload;
        console.log(`Here are the projects: ${state.projects}`);
      })
  }
})

export default projectSlice.reducer;
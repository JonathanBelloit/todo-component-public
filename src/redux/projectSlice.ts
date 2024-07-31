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
import { Todo } from "../components/todo/interface";
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
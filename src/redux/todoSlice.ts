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

// const todosCollectionRef = collection(db, "Todos");

export const addTodo = createAsyncThunk("todos/addTodo", async (todo: Todo) => {
  const userEmail = getCurrentUserEmail();
  if (!userEmail) {
    throw new Error("You must be logged in to add a todo");
  }
  const todosCollectionRef = collection(db, `users/${userEmail}/todos`);
  const docRef = await addDoc(todosCollectionRef, todo);
  return { ...todo, id: docRef.id };
});

export const getTodos = createAsyncThunk("todos/getTodos", async () => {
  const userEmail = getCurrentUserEmail();
  if (!userEmail) {
    throw new Error("You must be logged in to get todos");
  }
  const todosCollectionRef = collection(db, `users/${userEmail}/todos`);
  const querySnapshot = await getDocs(todosCollectionRef);
  const todos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Todo[];
  console.log(`Here are the todos: ${todos}`);
  return todos;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (todo: Todo) => {
    const userEmail = getCurrentUserEmail();
    if (!userEmail) {
      throw new Error("You must be logged in to update a todo");
    }
    const todoDocRef = doc(db, `users/${userEmail}/todos/${todo.id}`);
    await updateDoc(todoDocRef, { ...todo });
    return todo;
  }
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id: string) => {
  const userEmail = getCurrentUserEmail();
  if (!userEmail) {
    throw new Error("You must be logged in to delete a todo");
  }
  const todoDocRef = doc(db, `users/${userEmail}/todos/`, id);
  await deleteDoc(todoDocRef);
  return id;
});

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [] as Todo[],
    loading: 'idle' as 'idle' | 'pending' | 'succeeded' | 'failed',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTodo.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.todos.push(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to add todo';
      })
      .addCase(getTodos.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to fetch todos';
      })
      .addCase(updateTodo.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to update todo';
      })
      .addCase(deleteTodo.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'Failed to delete todo';
      });
  },
});

export default todoSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';

import { setupListeners } from '@reduxjs/toolkit/query';
import { projectsApi } from './todo';

export const store = configureStore({
  reducer: { [projectsApi.reducerPath]: projectsApi.reducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectsApi.middleware),
});

setupListeners(store.dispatch);

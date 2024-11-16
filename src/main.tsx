import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store.ts';
import { Error } from './pages/error.tsx';
import { Tasks } from './pages/tasks.tsx';
import { Projects } from './pages/projects.tsx';
import Layout from './components/layout.tsx';

import './scss/app.scss';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      { path: '/', element: <Projects /> },
      { path: 'tasks/:taskId', element: <Tasks /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);

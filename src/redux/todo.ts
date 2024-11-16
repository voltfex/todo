import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Projects, subProjects } from '../types/apiTypes';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://3beb7155a94beff9.mokky.dev/' }),
  endpoints: (builder) => ({
    getAllProjects: builder.query<Projects[], string>({
      query: (name) => `${name}`,
    }),
    getProjectsById: builder.query<Projects, string>({
      query: (id) => `projects/${id}`,
    }),
    getSubProjectsById: builder.query<subProjects[], string>({
      query: (id) => `subProjects?porojectId=${id}`,
    }),
    getSubProjectById: builder.query<subProjects, string>({
      query: (id) => `subProjects/${id}`,
    }),
    createTask: builder.mutation({
      query: ({ url, newProject }) => ({
        url,
        method: 'POST',
        body: newProject,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ url, editProject }) => ({
        url: `${url}/${editProject.id}`,
        method: 'PATCH',
        body: editProject,
      }),
    }),
    delTask: builder.mutation({
      query: ({ url, id }) => ({
        url: `${url}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllProjectsQuery,
  useGetProjectsByIdQuery,
  useGetSubProjectsByIdQuery,
  useGetSubProjectByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDelTaskMutation,
} = projectsApi;

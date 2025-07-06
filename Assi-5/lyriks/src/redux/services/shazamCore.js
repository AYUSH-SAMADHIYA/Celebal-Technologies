import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shazamCoreApi = createApi({
  reducerPath: 'shazamCoreApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', '6db6d8eb21msh9ac4687549931fep1801ddjsn3c3d318c0b36');
      headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => '/charts/country?country_code=US',
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
      keepUnusedDataFor: 3600,  // 1 hour caching
    }),
    getSongDetails: builder.query({
      query: (songid) => `/tracks/details?track_id=${songid}`,
      refetchOnMountOrArgChange: false,
      refetchOnReconnect: false,
      refetchOnFocus: false,
      keepUnusedDataFor: 3600,  // 1 hour caching
    }),
  }),
});

export const { 
  useGetTopChartsQuery,
  useGetSongDetailsQuery
} = shazamCoreApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Создаём кусочик функционала который будет включаться в Store

/*  аргументы createApi
  1. Путь (строка) (не обязательный подставляется сам)
  2. baseQuery - функция которая будет делать запрос (обязательная)
  3. endpoints - те операции которые мы будем проводить по базовому адресу
*/
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
  tagTypes: ['Heroes'],  // типы наших тегов (типо такие меточки)
  // получение персонажей от сервера
  endpoints: builder => ({
    getHeroes: builder.query({          // query просто запрашивает данные
      query: () => '/heroes',
      providesTags: ['Heroes']
    }),
    // запись персонажей на сервер (мутация)
    createHero: builder.mutation({
      query: hero => ({
        url: '/heroes',
        method: 'POST',
        body: hero
      }),
      invalidatesTags: ['Heroes']
    }), 
    // удаление персонажей на сервере (мутация)
    deleteHero: builder.mutation({
      query: id => ({
        url: `/heroes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Heroes']
    })
  })
})

export const {useGetHeroesQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice;
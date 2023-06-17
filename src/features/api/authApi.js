import apiSlice from "./apiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (data) => ({
                method: "POST",
                url: "/user",
                body: data,
            }),
        }),
    }),
})

export const { useRegisterMutation } = authApi;
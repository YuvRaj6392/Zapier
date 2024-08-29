import {z} from 'zod'

export const signupSchema=z.object({
  email:z.string().min(5),
  password:z.string().min(6),
  name:z.string()
})

export const signInSchema=z.object({
  email:z.string(),
  password:z.string(),
})
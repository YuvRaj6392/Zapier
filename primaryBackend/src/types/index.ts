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

export const zapCreateSchema=z.object({
  availableTriggerId:z.string(),
  triggerMetadata:z.any().optional(),
  actions:z.array(z.object({
    actionId:z.string(),
    actionMetaData:z.any().optional()
  }))
})


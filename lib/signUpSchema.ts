import {z} from "zod";

export const Name=z.string().min(2,'name must be at least 2 characters').max(20,"name must be less than 20 characters").regex(/^[a-zA-Z0-9_]+$/,"name must not contain special characters")

const signUpSchema=z.object({
  firstname:Name,
  lastname:Name,
  email:z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters long').regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?_&])[A-Za-z\d@$!%#_*?&]{8,}$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  ),
})

export type signUpSchema = z.infer<typeof signUpSchema>;
export default signUpSchema
import {z} from "zod";

 const VerifySchema=z.object({
  code:z.string(),
})
export type VerifySchema=z.infer<typeof VerifySchema>;
export default VerifySchema;

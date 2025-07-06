import type { IBook} from "@/types";
import { z } from "zod";


export const createBorrowSchema = (book: IBook) => z.object({
  quantity: z.coerce
    .number({ invalid_type_error: "Quantity is required" })
    .min(1, "Quantity must be at least 1")
    .max(book.copies, `Only ${book.copies} copies available`),
  dueDate: z.string().min(1, "Due date is required"),
});

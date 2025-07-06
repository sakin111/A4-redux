import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { useBorrowBooksMutation } from "@/redux/api/baseApi";
import { useNavigate } from "react-router";
import { createBorrowSchema } from "@/components/Schema/borrow.schema";
import type { IBook } from "@/types";



type BorrowProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  book:  IBook
};

type BorrowFormValues = {
  quantity: number;
  dueDate: string;
};

const BorrowModal = ({ open, setOpen, book }: BorrowProps ) => {

  const navigate = useNavigate();
  const [borrowBooks] = useBorrowBooksMutation();

  const form = useForm<BorrowFormValues>({
  resolver: zodResolver(createBorrowSchema(book)),
    defaultValues: {
      quantity: 1,
      dueDate: "",
    },
  });

const onSubmit = async (data: BorrowFormValues) => {
  try {
    await borrowBooks({
      
      quantity: Number(data.quantity),
      dueDate: data.dueDate,
    }).unwrap();

    toast.success("📚 Book borrowed successfully!");
    navigate("/borrowSummary");
    setOpen(false);
  } catch (err) {
    toast.error("❌ Failed to borrow book. Please check the quantity and due date.");
    console.error("Borrow failed:", err);
  }
};


  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Borrow Book</DialogTitle>
          <DialogDescription>
            Fill in the quantity and due date to borrow this book.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity (Available: {book.copies})</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} max={book.copies} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit">Confirm Borrow</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowModal;

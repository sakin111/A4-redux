import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookSchema, type bookData} from "@/components/Schema/book.schema";
import { useUpdateBooksMutation } from "@/redux/api/baseApi";
import { toast } from "sonner";
import type { IBook } from "@/types";

interface EditBookFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialData: IBook
}

const EditBookForm = ({ open, setOpen, initialData }: EditBookFormProps) => {
  const [updateBook, { isLoading }] = useUpdateBooksMutation();

const form = useForm<bookData>({
  resolver: zodResolver(BookSchema),
  defaultValues: initialData as bookData,
});

  const onSubmit = async (data: bookData) => {
    try {
      await updateBook({ id: initialData._id, ...data }).unwrap();
      toast.success("✅ Book updated successfully");
      setOpen(false);
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("❌ Failed to update book");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] w-full">
        <DialogHeader>
          <DialogTitle>Edit Book</DialogTitle>
          <DialogDescription>Update the book details below.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="genre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Genre</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="w-full border rounded px-3 py-2 focus:outline-none"
                    >
                      <option value="">Select genre</option>
                      <option value="FICTION">Fiction</option>
                      <option value="NON_FICTION">Non-Fiction</option>
                      <option value="SCIENCE">Science</option>
                      <option value="HISTORY">History</option>
                      <option value="BIOGRAPHY">Biography</option>
                      <option value="FANTASY">Fantasy</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isbn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ISBN</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="copies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input type="number" min={1} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Book"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBookForm;

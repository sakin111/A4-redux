import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useCreateBooksMutation } from "@/redux/api/baseApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { BookSchema, type bookData } from "@/components/Schema/book.schema";
import { toast, Toaster } from "sonner";






const defaultValues: bookData = {

  title: "",
  author: "",
  genre: "FICTION" ,
  isbn: "",
  description: "",
  copies: 1,
  available: true,
};

const AddBooks = () => {
  const [createBooks, { isLoading }] = useCreateBooksMutation();
  const [open, setOpen] = useState(false); // For dialog control

  const form = useForm<bookData>({
    resolver: zodResolver(BookSchema),
    defaultValues,
  });

  const onSubmit = async (data: bookData) => {
    const bookData = {
      ...data,
      available: true,
    };
    try {
      const res = await createBooks(bookData).unwrap();
       toast.success("✅ Book added successfully!");
      console.log("Book added:", res);
      form.reset();
      setOpen(false);
    } catch (err) {
       toast.error("something went wrong, please try");
      console.error("Error adding book:", err);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto my-8 p-6 shadow-xl border rounded-lg">
      <Toaster richColors position="top-center" />
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
          📚 Library Dashboard
        </CardTitle>
        <CardDescription className="text-base md:text-lg text-gray-600">
          Manage your books easily
        </CardDescription>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 mt-4 bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-5 h-5" />
              Add Book
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] w-full">
            <DialogHeader>
              <DialogTitle className="text-lg md:text-xl">Add New Book</DialogTitle>
              <DialogDescription>
                Fill in the details to add a book to the library.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter title" {...field} />
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
                        <Input placeholder="Enter author" {...field} />
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
                        <Input placeholder="Enter ISBN" {...field} />
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
                        <Input placeholder="Optional description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Adding..." : "Add Book"}

                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardHeader>

      <CardContent>
        {/* Add content like book list here later */}
      </CardContent>
    </Card>
  );
};

export default AddBooks;

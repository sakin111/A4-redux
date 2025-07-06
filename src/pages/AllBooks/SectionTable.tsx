import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {

  useDeleteBooksMutation,
  useGetAllBooksQuery,

} from "@/redux/api/baseApi";
import { Link } from "react-router";
import { useState } from "react";
import { toast } from "sonner";
import type { IBook } from "@/types";
import EditBookForm from "./EditBookForm";
import BorrowModal from "./Borrowmodel";
import { MoreVertical, Eye, Pencil, Trash2, BookOpen } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";



const SectionTable = () => {
  const { data: bookData, isLoading, error } = useGetAllBooksQuery(undefined, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const [editOpen, setEditOpen] = useState(false);
  const [borrowOpen, setBorrowOpen] = useState(false);
  const [borrowBookAll, setBorrowBookAll] = useState<IBook | null>(null);

  const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
  const [deleteBooks] = useDeleteBooksMutation();


  const handleDelete = async (id: string) => {
    try {
      await deleteBooks(id).unwrap();
      toast.success("✅ Book deleted successfully");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("❌ Failed to delete book");
    }
  };

  if (isLoading) {
    return (
      <Card className="max-w-7xl mx-auto p-6 mt-4 flex justify-center items-center h-48">
        <p className="text-lg text-muted-foreground">Loading books...</p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="max-w-7xl mx-auto p-6 mt-4 flex justify-center items-center h-48">
        <p className="text-lg text-destructive">Error loading books. Please try again later.</p>
      </Card>
    );
  }

  return (
    <Card className="max-w-7xl mx-auto p-4 sm:p-6 mt-4 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center gap-2">
          📚 All Books
        </h1>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white self-end sm:self-auto">
          <Link to="/addBooks">+ Add New Book</Link>
        </Button>
      </div>


      <CardContent className="p-0 border rounded-md">
   
        <div className="w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <Table className="w-full table-auto text-xs sm:text-sm md:text-base">

              <TableHeader className="text-xs sm:text-sm md:text-base font-semibold text-gray-700 px-2 sm:px-3 md:px-4 py-2">
                <TableRow>
                  <TableHead className="w-[150px] truncate">Title</TableHead>
                  <TableHead className="truncate">Author</TableHead>
                  <TableHead className="truncate">Genre</TableHead>
                  <TableHead className="truncate">ISBN</TableHead>
                  <TableHead className="text-center truncate">Copies</TableHead>
                  <TableHead className="text-center truncate">Status</TableHead>
                  <TableHead className="text-center truncate">Actions</TableHead>
                </TableRow>
              </TableHeader>


              <TableBody>
                {bookData.data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                      No books found matching your criteria.
                    </TableCell>
                  </TableRow>
                ) : (
                  bookData.data.map((book: IBook) => (
                    <TableRow key={book._id} className="hover:bg-gray-50 transition-colors">
                      <TableCell className="font-medium text-gray-900">{book.title}</TableCell>
                      <TableCell className="text-gray-700">{book.author}</TableCell>
                      <TableCell className="text-gray-700">{book.genre}</TableCell>
                      <TableCell className="text-gray-700">{book.isbn}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className="px-3 py-1 text-sm font-semibold">
                          {book.copies}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {book.copies > 0 ? (
                          <Badge variant="default" className="bg-green-500 hover:bg-green-600 px-3 py-1">
                            Available
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="px-3 py-1">
                            Unavailable
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" aria-label="Actions menu">
                              <MoreVertical className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem asChild>
                              <Link to={`/books/${book._id}`} className="flex items-center gap-2">
                                <Eye className="h-4 w-4" /> View
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedBook(book);
                                setEditOpen(true);
                              }}
                              className="flex items-center gap-2"
                            >
                              <Pencil className="h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setBorrowBookAll(book);
                                setBorrowOpen(true);
                              }}
                              className="flex items-center gap-2"
                              disabled={book.copies === 0}
                            >
                              <BookOpen className="h-4 w-4" /> Borrow
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(book._id)}
                              className="flex items-center gap-2 text-red-600"
                            >
                              <Trash2 className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>


                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>


      {selectedBook && (
        <EditBookForm open={editOpen} setOpen={setEditOpen} initialData={selectedBook}/>
      )}
      {borrowBookAll && (
        <BorrowModal open={borrowOpen} setOpen={setBorrowOpen} book={borrowBookAll} />
      )}
    </Card>


  );
};

export default SectionTable;

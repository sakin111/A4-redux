import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { useGetAllBooksQuery } from "@/redux/api/baseApi";
import { Link } from "react-router";





const SectionTable = () => {

  const { data: bookData, isLoading, error } = useGetAllBooksQuery(undefined,{
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true, 
    refetchOnFocus: true, 
    refetchOnReconnect: true, 
  });


  // Assuming you have a deleteBook mutation
  // const [deleteBook] = useDeleteBookMutation(); // Uncomment and integrate with your RTK Query setup

//   const handleDelete = async (id: string) => {
//     // In a real application, you'd use your RTK Query mutation here
//     // try {
//     //   await deleteBook(id).unwrap();
//     //   toast.success("Book deleted successfully");
//     // } catch (error) {
//     //   console.error("Delete failed:", error);
//     //   toast.error("Failed to delete book");
//     // }
//     console.log(`Deleting book with ID: ${id}`); // Placeholder for actual delete logic
//     toast.success("Book deletion initiated (placeholder)"); // Placeholder toast
//   };

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
    <Card className="max-w-7xl mx-auto p-6 mt-4 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          📚 All Books
        </h1>
        <div className="flex items-center gap-4">
      
          <Button  className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link to="/addBooks">  + Add New Book</Link>
          </Button>
        </div>
      </div>
      <CardContent className="overflow-x-auto p-0 border rounded-md">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[250px] font-semibold text-gray-700">Title</TableHead>
              <TableHead className="font-semibold text-gray-700">Author</TableHead>
              <TableHead className="font-semibold text-gray-700">Genre</TableHead>
              <TableHead className="font-semibold text-gray-700">ISBN</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Copies</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Status</TableHead>
              <TableHead className="text-center font-semibold text-gray-700">Actions</TableHead>
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
             bookData.data.map((book) => (
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
                      <Badge variant="default" className="bg-green-500 hover:bg-green-600 px-3 py-1">Available</Badge>
                    ) : (
                      <Badge variant="destructive" className="px-3 py-1">Unavailable</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                
                      className="text-blue-600 border-blue-300 hover:bg-blue-50"
                    >
                      Edit
                    </Button>
                    
                    <Button
                      size="sm"
                 
                      disabled={book.copies === 0}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Borrow
                    </Button>
                    <Button
                      size="sm"
                 
                      disabled={book.copies === 0}
                      className="bg-red-600 hover:bg-purple-700 text-white"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SectionTable;
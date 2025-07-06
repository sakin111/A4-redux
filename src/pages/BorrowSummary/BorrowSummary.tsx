import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useBorrowSummeryQuery } from "@/redux/api/baseApi";

const BorrowSummary = () => {
  const { data, isLoading, error } = useBorrowSummeryQuery(undefined, {
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  type Book = {
  title: string;
  isbn: string;
};

type BorrowSummaryEntry = {
  book: Book;
  totalQuantity: number;
};



  if (isLoading) return <p className="text-center mt-10">Loading summary...</p>;
  if (error || !data?.data) return <p className="text-center mt-10 text-red-500">Failed to load borrow summary</p>;

  return (
    <Card className="max-w-5xl mx-auto p-4 my-6 min-h-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center sm:text-left">📊 Borrow Summary</h2>
      
      {/* Table visible on md and above */}
      <CardContent className="p-0 hidden md:block overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="w-[250px]">Title</TableHead>
              <TableHead>ISBN</TableHead>
              <TableHead>Total Borrowed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.data.map((entry: BorrowSummaryEntry, index: number) => (
              <TableRow key={index} className="even:bg-gray-50">
                <TableCell className="font-medium">{entry.book.title}</TableCell>
                <TableCell>{entry.book.isbn}</TableCell>
                <TableCell>{entry.totalQuantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Card list visible on small screens */}
      <div className="md:hidden space-y-4">
        {data.data.map((entry: BorrowSummaryEntry, index : number) => (
          <Card key={index} className="p-4 shadow-sm">
            <p><strong>Title:</strong> {entry.book.title}</p>
            <p><strong>ISBN:</strong> {entry.book.isbn}</p>
            <p><strong>Total Borrowed:</strong> {entry.totalQuantity}</p>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default BorrowSummary
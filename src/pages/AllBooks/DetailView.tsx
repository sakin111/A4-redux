import { useGetBookByIdQuery } from "@/redux/api/baseApi";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router";
import { Loader2, BookOpen, User, Tag, Barcode, Layers } from "lucide-react";

const DetailView = () => {
  const { id } = useParams<{id : string}>();
  const { data, isLoading, error } = useGetBookByIdQuery(id!, {
  skip: !id,});

if (!id) {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-red-100 to-pink-100">
      <p className="text-xl text-red-600 font-semibold">
        Error: Book ID is missing from the URL.
      </p>
    </div>
  );
}


  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-100 to-purple-100">
        <Loader2 className="animate-spin h-8 w-8 text-indigo-500 mr-2" />
        <p className="text-xl font-semibold text-indigo-700">Loading book details...</p>
      </div>
    );

  if (error || !data?.data)
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-red-100 to-pink-100">
        <p className="text-xl text-red-600 font-semibold">
          Error: Book not found or could not be loaded.
        </p>
      </div>
    );

  const book = data.data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <Card className="p-8 max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl border border-gray-200">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text text-center mb-8">
          {book.title}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base text-gray-800">
          <p className="flex items-center gap-2">
            <User className="text-blue-600" size={20} />
            <span>
              <strong className="text-gray-900">Author:</strong> {book.author}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Tag className="text-purple-600" size={20} />
            <span>
              <strong className="text-gray-900">Genre:</strong> {book.genre}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Barcode className="text-green-600" size={20} />
            <span>
              <strong className="text-gray-900">ISBN:</strong> {book.isbn}
            </span>
          </p>
          <p className="flex items-center gap-2">
            <Layers className="text-teal-600" size={20} />
            <span>
              <strong className="text-gray-900">Available:</strong>{" "}
              <span className="font-semibold text-teal-700">{book.copies}</span>
            </span>
          </p>
        </div>

        <div className="mt-10 border-t pt-8 border-gray-300">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
            <BookOpen className="text-blue-500" size={24} /> Description
          </h2>
          <p className="text-gray-700 leading-relaxed text-justify">
            {book.description ||
              "No description available for this book. Please check back later."}
          </p>
        </div>
      </Card>
    </div>
  );
};

export default DetailView;

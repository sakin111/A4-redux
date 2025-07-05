
import { Button } from "@/components/ui/button";
import { Book, BookOpen, Clock, Plus, Users } from "lucide-react";
import { Link } from "react-router";


const Banner = () => {
    return (
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                        Your Gateway to
                        <span className="bg-clip-text text-transparent  bg-gradient-to-l
            from-teal-500 to-cyan-500 block">Knowledge & Discovery</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Explore our vast collection of books, digital resources, and community programs.
                        Whether you're researching, learning, or seeking entertainment, we're here to support your journey.
                    </p>

                    {/* add section */}
                    <section className="container mx-auto px-4 py-16 text-center">
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="bg-emerald-500 hover:bg-blue-700">
                                <Link to="/allBooks">
                                    <Book className="mr-2 h-5 w-5" />
                                    Browse Books
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg">
                                <Link to="/addBooks">
                                    <Plus className="mr-2 h-5 w-5" />
                                    Add New Book
                                </Link>
                            </Button>
                        </div>
                    </section>


                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <BookOpen className="h-8 w-8 text-teal-400 mx-auto mb-3" />
                            <h3 className="text-2xl font-bold text-gray-900">150,000+</h3>
                            <p className="text-gray-600">Books & Digital Resources</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Users className="h-8 w-8 text-teal-400 mx-auto mb-3" />
                            <h3 className="text-2xl font-bold text-gray-900">25,000+</h3>
                            <p className="text-gray-600">Active Members</p>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <Clock className="h-8 w-8 text-teal-400 mx-auto mb-3" />
                            <h3 className="text-2xl font-bold text-gray-900">24/7</h3>
                            <p className="text-gray-600">Digital Access</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
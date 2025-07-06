import { createBrowserRouter } from "react-router";
import Home from "../pages/Home/Home";
import AllBooks from "@/pages/AllBooks/AllBooks";
import AddBooks from "@/pages/AddBooks/AddBooks";
import BorrowSummary from "@/pages/BorrowSummary/BorrowSummary";
import Root from "./Root";
import DetailView from "@/pages/AllBooks/DetailView";




const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children:[
            {
                index: true,
                element: <Home/>
            },
            {
                path:"/allBooks",
                element: <AllBooks/>
            },
            {
                path:"/addBooks",
                element: <AddBooks></AddBooks>
            },
            {
                path:"/books/:id",
                element:<DetailView></DetailView>
            },
            {
                path:"/borrowSummary",
                element:<BorrowSummary></BorrowSummary>
            }
        ]
    }
])

export default router
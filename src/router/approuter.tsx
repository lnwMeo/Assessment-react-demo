import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "@/layout/mainlayout";

import Homepage from "@/pages/homepage";
import Employee from "@/pages/employee";
import Assessment from "@/pages/assessment";
import Loginpage from "@/pages/loginpage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout />,
        children: [
            { index: true, element: <Homepage /> },
            { path: "/employee", element: <Employee /> },
            { path: "/assessment", element: <Assessment /> },
            { path: "/loginpage", element: <Loginpage /> }
        ]
    }
])

const approuter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};
export default approuter
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Mainlayout from "@/layout/mainlayout";
import Adminlayout from "@/layout/adminlayout"
import Homepage from "@/pages/homepage";
import Employee from "@/pages/employee";
import Assessment from "@/pages/assessment";
import Loginpage from "@/pages/loginpage";
import DashBordUsers from "@/pages/admins/dashbordusers";
import Documents from "@/pages/admins/documents";
import ReviewPage from "@/pages/review";
import JobDetailPage from "@/pages/admins/JobDetailPage";
const router = createBrowserRouter([
    {
        path: "/",
        element: <Mainlayout />,
        children: [
            { index: true, element: <Homepage /> },
            { path: "/employee", element: <Employee /> },
            { path: "/assessment", element: <Assessment /> },
            { path: "/loginpage", element: <Loginpage /> },{
                    path: "/review", element: <ReviewPage />
            }
        ]
    },
    {
        path: "/admins",
        element: <Adminlayout />,
        children: [
            { index: true, element: <DashBordUsers /> },
            { path: "/admins/createdocuments", element: <Documents /> },
            { path: "/admins/jobdetails", element: <JobDetailPage /> }
        ]
    },
 
])

const approuter = () => {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
};
export default approuter
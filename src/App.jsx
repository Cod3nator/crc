import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AppLayout } from "./components/Layout/AppLayout";

import "./App.css";
import { Home } from "./pages/Home";



const router = createBrowserRouter([
  {
    path:"/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      
    ],
  }


	
]);

const App = () => {
	return <RouterProvider router={router}></RouterProvider>;
}

export default App;
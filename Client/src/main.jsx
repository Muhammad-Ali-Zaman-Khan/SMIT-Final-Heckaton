import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout.jsx';

// const router = createBrowserRouter([
//   {
//     path: ``,
//     element: <Layout />,
//     children: [
//       {
//         path: ``,
//         element: <Home />,
//       },
//       {
//         path: `/login`,
//         element: <Login />,
//       },
//       {
//         path: `/register`,
//         element: <Register />,
//       },
//       {
//         path: `/dashboard`,
//         element: <ProtectedRoutes component={<Dashboard />} />,
//       },
//       {
//         path: `/profile`,
//         element:<ProtectedRoutes component={<Profile />} />
//       },
//       {
//         path: `/singleuser`,
//         element: <ProtectedRoutes component={<Singleuser/>}/>,
//       },
//     ]
//   }
// ]);

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
  
)
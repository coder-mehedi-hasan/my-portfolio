import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Work from './components/Work'
import Testimonial from './components/Testimonial';
import Services from './components/Services';
import Error from './components/Error';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: '/',
          element: (<Home></Home>)
        },
        {
          path:"about",
          element:<About/>
        },
        {
          path:"contact",
          element:<Contact/>
        },
        {
          path:"work",
          element:<Work />
        },
        {
          path:"services",
          element:<Services />
        },
        {
          path:"testimonial",
          element:<Testimonial />
        },
        {
          path:"*",
          element:<Error />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

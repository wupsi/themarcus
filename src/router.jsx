import {createBrowserRouter} from 'react-router-dom';
import Home from './views/Home.jsx';
import Portfolio from './views/Portfolio';
import NotFound from './views/NotFound';
import PageLayout from './components/PageLayout.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PageLayout />,
        children: [
            {
                path: '/portfolio/:id',
                element: <Portfolio /> 
            },
        ] 
    },
    {
        path: '/home',
        element: <Home /> 
    },
    {
        path: '*',
        element: <NotFound /> 
    },
])

export default router;
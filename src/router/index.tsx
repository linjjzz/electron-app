import React from 'react';
import { createHashRouter } from 'react-router-dom';

// import MainLayout from '../layouts/MainLayout';
import ResizeLayout from '../layouts/ResizeLayout';


const router = createHashRouter([
    {
        path: '/',
        element: <ResizeLayout />,
    },
]);

export default router;

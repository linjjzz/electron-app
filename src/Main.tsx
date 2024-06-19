import React from 'react'
import { RouterProvider } from "react-router-dom";
import routerConfig from "./router"


type Props = {}

const main = (props: Props) => {
    return <RouterProvider router={routerConfig} />;
}

export default main
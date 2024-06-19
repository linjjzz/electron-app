import React from 'react'
import ReactDOM from 'react-dom/client'
import { ConfigProvider } from 'antd';
import Main from './Main'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ConfigProvider
    theme={{
      token: {
        // Seed Token，影响范围大
        colorPrimary: '#333333',
        borderRadius: 2,
      },
    }}
  >
    <Main />
  </ConfigProvider>
  // </React.StrictMode>,
)

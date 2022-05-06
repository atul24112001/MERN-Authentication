import React from 'react';

import App from './App';
import Store from './store';
import { Provider } from "react-redux"
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'


import ReactDom from 'react-dom';
const container = document.getElementById('root');
// const root = createRoot(container);


ReactDom.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>, container
);


// const rootElement = document.getElementById("root");
// const root = createRoot(rootElement);

// root.render(
//   <StrictMode>
//     <BrowserRouter>
//       <Provider store={Store}>
//         <ChakraProvider>
//           <App />
//         </ChakraProvider>
//       </Provider>
//     </BrowserRouter>
//   </StrictMode>
// );
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
    }
    html,#root{
        min-height: 100%;
    }
    body{
        min-height: 100%;
        font-family: Raleway, sans-serif;
        margin: 0;
        color: #1d1f22;
    }
 
    .container{
        padding: 1em;
        width: 100%;
       
        @media (max-width:1536px){
            max-width: 1536px;
            padding: 0 6rem;
        }
        @media (max-width:1280px){
            max-width: 1280px;
            padding:0 4rem ;
        }
        @media (max-width:1024px){
            max-width: 1024px;
            padding: 0 2rem;
        }
        @media (max-width:768px){
            max-width: 768px;
            
        }
        @media (max-width:640px){
            max-width: 640px;
            padding: 0 1rem;
        }

    }
     button {
               cursor: pointer;
          }

    a{
        text-decoration: none;
        color: #1d1f22;
        
    }

`;

export type Theme = {
     primary: string;
};

export const theme: Theme = {
     primary: '#5ECE7B',
};

export default GlobalStyles;

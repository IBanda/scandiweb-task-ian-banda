import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    *{
        box-sizing: border-box;
    }

    body{
        font-family: Raleway, sans-serif;
        margin: 0;
    }
 
    .container{
        padding: 1em;
        width: 100%;
        @media (max-width:640px){
            max-width: 640px;
        }
        @media (max-width:768px){
            max-width: 768px;
        }
        @media (max-width:1024px){
            max-width: 1024px;
            padding: 0 2rem;
        }
        @media (max-width:1280px){
            max-width: 1280px;
            padding:0 4rem ;
        }
        @media (max-width:1536px){
            max-width: 1536px;
            padding: 0 6rem;
        }

    }

`;

export type Theme = {
     primary: string;
};

export const theme: Theme = {
     primary: '#5ECE7B',
};

export default GlobalStyles;

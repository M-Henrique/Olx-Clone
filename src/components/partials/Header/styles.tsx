import styled from 'styled-components';

export const HeaderArea = styled.div`
   height: 60px;
   background-color: white;

   .container {
      max-width: 1000px;
      margin: auto;
      display: flex;
   }

   a {
      text-decoration: none;
   }

   .logo {
      flex: 1;
      display: flex;
      align-items: center;

      .logo-1,
      .logo-2,
      .logo-3 {
         font-size: 27px;
         font-weight: bold;
      }

      .logo-1 {
         color: #ff0000;
      }
      .logo-2 {
         color: #00ff00;
      }
      .logo-3 {
         color: #0000ff;
      }
   }

   nav {
      padding: 10px 0;

      ul,
      li {
         list-style: none;
      }

      ul {
         display: flex;
         align-items: center;
         height: 40px;
      }

      li {
         margin: 0 20px;

         a,
         button {
            border: 0;
            background: none;
            cursor: pointer;
            outline: 0;
            color: black;
            font-size: 14px;

            &:hover {
               color: #999;
            }

            &.button {
               background: #ff8100;
               border-radius: 4px;
               color: #fff;
               padding: 5px 10px;

               &:hover {
                  background: #e57706;
               }
            }
         }
      }
   }

   @media (max-width: 600px) {
      & {
         height: auto;
      }

      .container {
         flex-direction: column;
      }

      .logo {
         justify-content: center;
         margin: 20px 0;
      }

      nav ul {
         flex-direction: column;
         height: auto;
      }

      nav li {
         margin: 10px 20px;
      }
   }
`;

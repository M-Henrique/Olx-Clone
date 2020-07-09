import styled from 'styled-components';

interface Props {
   height: number;
}

export const Fake = styled.div<Props>`
   background: #ddd;
   height: ${(props) => props.height || 20}px;
`;

export const PageArea = styled.div`
   display: flex;
   margin-top: 20px;

   .box {
      background: #fff;
      border-radius: 5px;
      box-shadow: 0px 0px 4px #999;
      margin-bottom: 20px;
   }

   .box--padding {
      padding: 10px;
   }

   .leftSide {
      flex: 1;
      margin-right: 20px;

      .box {
         display: flex;
      }

      .adImage {
         width: 320px;
         height: 320px;
         margin-right: 20px;

         .each-slide img {
            display: flex;
            align-items: center;
            justify-content: center;
            background-size: cover;
            height: 320px;
         }
      }

      #adInfo {
         flex: 1;

         .adName {
            margin-bottom: 20px;

            h2 {
               margin: 0;
               margin-top: 20px;
            }

            small {
               color: #999;
            }
         }

         .adDescription {
            hr {
               margin: 10px 0;
            }

            small {
               color: #999;
            }
         }
      }
   }
   .rightSide {
      width: 250px;

      .price span {
         color: #0000ff;
         display: block;
         font-size: 27px;
         font-weight: bold;
      }

      .contactSellerLink {
         background: #0000ff;
         color: #fff;
         height: 30px;
         border-radius: 5px;
         box-shadow: 0px 0px 4px #999;
         display: flex;
         justify-content: center;
         align-items: center;
         text-decoration: none;
         margin-bottom: 20px;
      }

      .createdby small {
         display: block;
         color: #999;
         margin-top: 10px;
      }
   }

   @media (max-width: 600px) {
      & {
         flex-direction: column;
      }

      .leftSide {
         margin: 0;

         .box {
            width: 320px;
            margin: auto;
            flex-direction: column;
         }

         #adInfo {
            padding: 10px;
         }
      }

      .rightSide {
         width: auto;
         margin-top: 20px;

         .box {
            width: 320px;
            margin: auto;
         }

         .contactSellerLink {
            width: 320px;
            margin: 20px auto;
         }
      }
   }
`;

export const OthersArea = styled.div`
   h2 {
      font-size: 20px;
   }

   .list {
      display: flex;
      flex-wrap: wrap;

      .aditem {
         width: 25%;
      }
   }

   @media (max-width: 600px) {
      & {
         margin: 10px;
      }

      .list .aditem {
         width: 50%;
      }
   }
`;

export const BreadCrumb = styled.div`
   font-size: 13px;
   margin-top: 20px;

   a {
      display: inline-block;
      text-decoration: underline;
      margin: 0 5px;
      color: #000;
   }

   @media (max-width: 600px) {
      & {
         margin: 20px;
      }
   }
`;

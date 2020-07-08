import styled from 'styled-components';

export const SearchArea = styled.div`
   background: #ddd;
   border-bottom: 1px solid #ccc;
   padding: 20px 0;

   .searchBox {
      background: #9bb83c;
      padding: 20px 15px;
      border-radius: 5px;
      box-shadow: 1px 1px 1px 0.3px rgba(0, 0, 0, 0.3);
      display: flex;

      form {
         flex: 1;
         display: flex;

         input,
         select {
            height: 40px;
            border: 0;
            border-radius: 5px;
            outline: 0;
            font-size: 15px;
            color: #000;
            margin-right: 20px;
         }

         input {
            flex: 1;
            padding: 0 10px;
         }

         select {
            width: 100px;
         }

         button {
            background: #49aeef;
            font-size: 15px;
            border: 0;
            border-radius: 5px;
            color: #fff;
            height: 40px;
            padding: 0 20px;
            cursor: pointer;
         }
      }
   }

   .categoryList {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;

      .categoryItem {
         width: 25%;
         display: flex;
         align-items: center;
         justify-content: center;
         color: #000;
         text-decoration: none;
         height: 50px;
         margin-bottom: 10px;

         &:hover {
            color: #999;
         }

         img {
            width: 45px;
            height: 45px;
            margin-right: 10px;
         }
      }
   }
`;

export const PageArea = styled.div`
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

   .seeAllLink {
      color: #000;
      text-decoration: none;
      font-weight: bold;
      display: inline-block;
      margin-top: 10px;
   }

   p {
      text-align: justify;
   }
`;

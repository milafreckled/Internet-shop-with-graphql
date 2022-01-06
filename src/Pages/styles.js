import styled from "styled-components";
// PRODUCT DESCRIPTION
export const PageWrapper = styled.section`
  display: grid;
  grid-template-columns: 97px repeat(2, 1fr);
  margin: 72px 101px 0;
  position: relative;
  min-height: calc(100vh - 80px);
`;
export const ImageColumn = styled.div`
  display: flex;
  gap: 32px;
  flex-direction: column;
  max-width: 97px;
  margin-right: 32px;
`;
export const DescriptionColumn = styled.div`
  margin-left: 32px;
  max-width: 336px;
  word-break: break-word;
`;
export const DetailsLine = styled.p`
  font: var(--size-price-font);
  text-transform: uppercase;
`;
export const Brand = styled.h2`
  font: var(--product-description-name-font);
`;
export const Name = styled.h2`
  font: var(--product-description-subname-font);
`;
export const Price = styled.p`
  font: var(--price-bold-font);
`;
export const AttributesWrapper = styled.div`
  display: flex;
  gap: 4px;
  margin-top: 27px;
`;
export const AttributeBox = styled.div`
  width: 63px;
  border: 1px solid var(--text-color);
  font: var(--attribute-font);
  height: 100%;
  min-height: 45px;
  margin-right: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  &.active {
    background: var(--text-color);
    color: #fff;
  }
  &.active-color {
    border: 2px inset var(--text-color);
  }
`;
export const AddToCartBtn = styled.button`
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 16px 32px;
      min-height: 52px;
      width: 292px;
      background: #5ece7b;
      color: white;
      text-transform: uppercase;
      margin 20px 0 40px;
    `;
export const Description = styled.article`
  font: var(--product-description-font);
  max-height: 103px;
`;
export const ProductImage = styled.div`
  max-width: calc(100% - 97px);
  & img {
    width: 100%;
    height: auto;
  }
`;
// HOME
export const ProductsLayout = styled.section`
  padding: 103px 101px;
  display: flex;
  justify-content: normal;
  flex-wrap: wrap;
`;
export const CategoryName = styled.h2`
  font: var(--category-name-font);
  margin-left: 101px;
  text-transform: capitalize;
`;
// CART
export const CartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 80px 243px 80px 101px;
  background: #fff;
`;
export const Divider = styled.hr`
  height: 1px;
  width: 100%;
  background: var(--disabled-color);
`;
export const CartTitle = styled.h2`
  font: var(--cart-name-font);
  font-weight: bold important!;
  margin-block: 0 60px;
`;

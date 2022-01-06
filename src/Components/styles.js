import styled from "styled-components";
// CART OVERLAY
export const Overlay = styled.div`
  width: fit-content;
  min-width: 300px;
  height: auto;
  max-height: 540px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding: 8px 16px 20px;
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  position: absolute;
  top: 32px;
  right: 0;
  z-index: 2;
  background: #fff;
`;
export const Button = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px 32px;
  width: 145px;
  height: 43px;
  box-sizing: border-box;
  flex: none;
  order: 0;
  flex-grow: 0;
  font: var(--button-font);
  &.view-bag-btn {
    background: #ffffff;
    border: 1px solid #1d1f22;
    color: #1d1f22;
    margin-right: 4px;
  }
  &.checkout-btn {
    background: #5ece7b;
    color: #fff;
    border: none;
    margin-left: 4px;
  }
`;
export const ButtonsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
export const Title = styled.p`
  font: var(--my-bag-bold-font);
  &.left {
    text-align: left;
  }
  &.right {
    text-align: right;
  }
  & span {
    font: var(--my-bag-normal-font);
  }
`;
// NAVIGATION
export const Navbar = styled.nav`
  display: flex;
  overflow: hidden;
  padding: 24px 101px 0;
  left: 0;
  top: 0;
  min-height: 80px;
`;
export const CategoriesWrapper = styled.ul`
  padding-inline-start: 0;
  list-style: none;
  display: flex;
  top: 28.5px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  max-width: 234px;
  font: var(--navigation-regular-font);
  text-transform: uppercase;
`;
export const ActionsWrapper = styled.ul`
  list-style: none;
  justify-content: flex-end;
  height: 40px;
  right: 101px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 0px;
  position: absolute;
  width: 204px;
`;
export const CurrencyDropdown = styled.button`
  width: 32px;
  height: 29px;
  left: 149px;
  top: 5.5px;
  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 0px 22px;
  font: var(--price-regular-font);
  cursor: pointer;
  outline: none;
  background: transparent;
  border: none;
  display: flex;
`;
export const CartButton = styled.button`
  background: transparent;
  border: none;
  outline: none;
  width: 20px;
  height: 20px;
  right: 0px;
  top: calc(50% - 20px / 2);
  flex: none;
  order: 3;
  flex-grow: 0;
  margin: 0px 22px;
  cursor: pointer;
`;
export const CartBadge = styled.div`
  color: #fff;
  position: absolute;
  width: 20px;
  height: 20px;
  left: 90%;
  right: 6.11%;
  bottom: 43.75%;
  border-radius: 50%;
  background-color: #1d1f22;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const Logo = styled.div`
  position: relative;
  align-self: center;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  display: block;
  width: 41px;
  height: 41px;
  top: 23px;
`;
export const CategoryLink = styled.a`
  display: block;
  text-decoration: none;
  padding: 0 16px 32px;
  &.active {
    border-bottom: 2px solid var(--primary-color);
    color: var(--primary-color);
    font: var(--navigation-active-font);
  }
`;
export const CurrencyOptions = styled.div`
  filter: drop-shadow(0px 4px 35px rgba(168, 172, 176, 0.19));
  position: absolute;
  height: fit-content;
  width: 114px;
  z-index: 2;
  overflow: visible;
  top: 32px;
  display: flex;
  flex-direction: column;
  padding: 20px 40px 0 20px;
  border: none;
  outline: none;
  background: #fff;
  text-align: right;
  & li {
    white-space: nowrap;
    display: inline-block;
    width: 100%;
    position: relative;
    margin-bottom: 21px;
  }
`;
export const Arrow = styled.img`
  cursor: pointer;
  display: inline;
  width: 6px;
  height: 3px;
  margin: 6px 0 0 3px;
  align-self: center;
  vertical-align: middle;
`;
// PRODUCT CARD
export const OutOfStock = styled.p`
  position: absolute;
  left: 25.42%;
  right: 25.71%;
  top: 44.24%;
  bottom: 43.94%;
  font: var(--out-of-stock-font);
  display: flex;
  align-items: center;
  text-transform: uppercase;
  color: #8d8f9a;
`;
export const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 16px;
  margin-bottom: 103px;
  min-width: 30%;
  flex: 0 0 33%;
  height: 444px;
  &.unavailable {
    pointer-events: none;
  }
  & > .cart-btn {
    display: none;
  }
  &:hover {
    box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
  }
  &:hover > .cart-btn {
    display: inline-block;
    border: none;
    outline: none;
    background: transparent;
    position: absolute;
    z-index: 2;
    width: 52px;
    height: 52px;
    right: 57px;
    bottom: 84px;
    filter: drop-shadow(0px 4px 11px rgba(29, 31, 34, 0.1));
    cursor: pointer;
  }
`;
export const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  width: 354px;
  height: 58px;
  flex: none;
  order: 2;
  align-self: stretch;
  flex-grow: 0;
  margin-top: 24px;
`;
export const ImageBox = styled.div`
  max-height: 338px;
  height: 338px;
  width: auto;
  & > img {
    max-height: 100%;
  }
`;
export const ProductTitle = styled.div`
  height: 29px;
  display: flex;
  align-items: center;
  color: #1d1f22;
  font: var(--product-name-font);
`;
export const Price = styled.div`
  font: var(--price-regular-font);
  color: var(--text-color);
`;

// PRODUCT IN CART
export const SwitchArrow = styled.img`
  position: absolute;
  width: 6px;
  height: 12px;
  z-index: 1;
  &:hover {
    transform: matrix(-1, 0, 0, 1, 0, 0);
    cursor: pointer;
  }
  &.right {
    right: 0;
    left: 90%;
    top: 50%;
    transform: translateY(-50%);
    bottom: 25%;
  }
  &.left {
    left: 20%;
    right: 25%;
    top: 50%;
    transform: translateY(-50%);
    bottom: 25%;
  }
`;
export const ItemWrapper = styled.div`
  display: flex;
  margin-block: 21px;
  position: relative;
`;
export const LeftPart = styled.div`
  flex: 1 1 60%;
  align-self: center;
`;
export const Brand = styled.h2`
  margin-block-start: 0;
  margin-block-end: 0;
  font: var(--product-description-name-font);
`;
export const Name = styled.h2`
  font: var(--product-description-subname-font);
`;
export const PriceInCart = styled.div`
  font: var(--price-bold-font);
  color: var(--text-color);
  font-weight: bold important!;
`;
export const AttributesWrapper = styled.div`
  display: flex;
  max-width: 300px;
  margin-top: 27px;
`;
export const AttributeBox = styled.div`
  cursor: pointer;
  width: 63px;
  border: 1px solid var(--text-color);
  font: var(--attribute-font);
  height: 100%;
  min-height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 4px;
  &.active {
    background: var(--text-color);
    color: #fff;
  }
  &.active-color {
    border: 2px inset var(--text-color);
  }
`;
export const MiddlePart = styled.div`
  flex: 0 0 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  min-height: 185px;
  max-width: 45px;
  position: relative;
  align-self: center;
  left: -2%;
  & > .plus-box,
  .minus-box {
    width: 45px;
    height: 45px;
    border: 1px solid #1d1f22;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
  }
  & > .quantity {
    flex: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    align-self: center;
    font: var(--price-regular-font);
  }
`;
export const RightPart = styled.div`
  align-self: center;
  position: relative;
  flex: 0 0 30%;
  max-width: 141px;
  > .product-img {
    height: 100%;
    max-height: 185px;
    max-width: 141px;
    float: right;
  }
`;
// PRODUCT IN OVERLAY
export const ProductWrapper = styled.div`
  flex: 50%;
  display: flex;
  margin-block: 23px;
  max-height: 137px;
`;
export const LeftSection = styled.div`
  flex: 50%;
  & > .product-name {
    display: flex;
    text-align: left;
    align-items: center;
    width: 136px;
    height: 52px;
    margin-block: 5px;
    word-wrap: break-word;
    font: var(--product-name-font);
  }
  & > .product-price {
    width: 52px;
    height: 26px;
    margin-top: 10px;
    text-align: left;
    font: var(--price-regular-font);
  }
  & > .attributes-wrapper {
    display: flex;
    gap: 4px;
    margin-top: 20px;
  }
  & > .attributes-wrapper div {
    width: auto;
    min-width: 24px;
    height: 24px;
    border: 1px solid #1d1f22;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > .attributes-wrapper div.active {
    background-color: #1d1f22;
    color: white;
  }
  & > .attributes-wrapper div.active-color {
    border: 2px inset var(--text-color);
  }
`;
export const MiddleSection = styled.div`
  flex: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  height: 100%;
  min-height: 137px;
  & > .plus-box,
  .minus-box {
    width: 24px;
    height: 24px;
    border: 1px solid #1d1f22;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  & > .quantity {
    flex: 60%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    margin: 0 auto;
    align-self: center;
    font: var(--price-regular-font);
  }
`;
export const RightSection = styled.div`
    flex: 40%;
    > img {
      width: 100%;
      height: 100%;
      max-width: 105px;
      max-height: 137px;
    }
}`;

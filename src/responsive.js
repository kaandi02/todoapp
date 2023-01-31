import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (min-width: 320px) and (max-width: 600px) {
      ${props}
    }
  `;
};
export const mobileland = (props) => {
  return css`
    @media only screen and (max-height: 550px) {
      ${props}
    }
  `;
};
export const mmobile = (props) => {
  return css`
    @media only screen and (min-width: 601px) and (max-width: 767px) {
      ${props}
    }
  `;
};
export const landdis = (props) => {
  return css`
    @media only screen and (min-width: 768px) and (max-width: 991px) {
      ${props}
    }
  `;
};
export const pc = (props) => {
  return css`
    @media only screen and (min-width: 992px) and (max-width: 1199px) {
      ${props}
    }
  `;
};
export const ld = (props) => {
  return css`
    @media only screen and (min-width: 1200px) {
      ${props}
    }
  `;
};

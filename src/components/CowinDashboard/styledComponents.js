import styled from 'styled-components/macro'

export const NavBarContainer = styled.div`
  width: 100%;
  height: 20%;
  padding-left: 10%;
  background-color: #161625;
  padding-top: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`
export const ImgElement = styled.img`
  width: 30px;
  height: 30px;
`
export const BgContainerElement = styled.div`
  background-color: #161625;
  background-size: cover;
  padding: 20px;
  width: 100%;
  font-family: 'Roboto';
`
export const HeaderElement = styled.h1`
  font-size: 20px;
  color: ${props => (props.web ? ' #2cc6c6' : '#fff')};
  margin: 10px;
  margin-left: 40px;
`
export const LoaderDivContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 25%;
`
export const UnorderedListContainer = styled.div`
  background-color: #1c1c2b;
  border-radius: 30px;
  margin: 50px;
  padding: 30px;
`
export const ParagraphElement = styled.p`
  font-size: 20px;
  color: #fff;
`
export const FailureImageElement = styled.img`
  width: 50%;
  height: 50%;
  margin: 10%;
`

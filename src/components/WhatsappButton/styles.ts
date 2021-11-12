import styled from 'styled-components'

export const Container = styled.div`
  position: sticky;
  left: 100%;
  float: right;
  /* background-image: linear-gradient(30deg, #075E54, #25D366, #25D366 ); */
  background-color: #25D366;
  width: 80px;
  height: 80px;
  order: 0px;
  padding: 10px;
  /* position: fixed; */
  z-index: 99999;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 1.5em;
  margin: 0.5em;
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  bottom: 0.5em;
  > a {
    padding: 0;
    margin: 0;
    line-height: 0;
    width: fit-content;
    height: fit-content;
  }
`

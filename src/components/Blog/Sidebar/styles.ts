import styled from 'styled-components';

export const Container = styled.div`
  h3 {
    text-transform: uppercase;
  }
  border-radius: 10px;
  background-color: #ffffff;
  border: solid 1px ${({theme}) => theme.colors.white};
  padding: 1rem;
  height: inherit;
  display: flex;
  flex-grow: 1;
  height: 100%;

  .sidebar-wrapper {
    text-align: center;
    position: relative;
    float: left;
    width: 100%;
    display: flex;
    flex-direction: column;
    > h2 {
      margin-bottom: 2rem;
    }

    .filter-content {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 2rem;
      flex-wrap: wrap;
      width: 100%;
      max-width: 100%;
      :nth-child(n){
        padding-top: 1rem;
        content: '';
        border-top: 2px solid ${({theme}) => theme.colors.gray_1000};
      }

      .filter-title {
        font: ${({theme}) => theme.texts.sub_title};
      }
      .filters {
        display:flex;
        gap: 0.5em;
        flex-wrap: wrap;
        div {
          display: inline-block;
          padding: 0.5em;
          border-radius: 0.25rem;
          background-color: ${({theme}) => theme.colors.gray_900};
          transition: background-color 0.2s;
          cursor: pointer;
          > a {
            font: ${({theme}) => theme.texts.main_text};
            color: ${({theme}) => theme.colors.white};
            text-align: left;
          }
          :hover {
            background-color: ${({theme}) => theme.colors.gray_800};
          }
        }
        .active-filter {
          background-color: ${({theme}) => theme.colors.gray_800};
        }
      }
      &+div {
        margin-top: 2rem;
        :nth-child(n) {
          padding-top: 1rem;
          content: '';
          border-top: 2px solid ${({theme}) => theme.colors.gray_1000};
        }
      }
    }

  }
`;

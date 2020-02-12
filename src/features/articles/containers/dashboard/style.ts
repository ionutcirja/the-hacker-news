import styled from 'styled-components';

export const Button = styled.button`
  width: 200px;
  height: 40px;
  padding: 0;
  border: none;
  outline: none;
  font-size: 0.8rem;
  text-transform: uppercase;
  text-align: center;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.red};
  color: ${(props) => props.theme.colors.white};
  text-decoration: none;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:hover {
      text-decoration: none;
    }
  }

  &:hover {
    text-decoration: underline;
  }
`;

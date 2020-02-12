import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const BackLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.blue};
  
  &:hover {
    text-decoration: underline;
  }
`;

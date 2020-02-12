import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ArticleLink = styled(Link)`
  text-decoration: none;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.darkBlue};
  
  &:hover {
    text-decoration: underline;
  }
`;

export const ListItem = styled.li`
  margin-bottom: 10px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const List = styled.ul`
  max-width: 800px;
`;

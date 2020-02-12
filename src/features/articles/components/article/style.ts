import styled from 'styled-components';

export const Title = styled.h1`
  font-size: 2rem;
  max-width: 800px;
  color: ${(props) => props.theme.colors.turquoise};
  margin-bottom: 20px;
`;

export const Author = styled.h2`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.darkBlue};
  margin-bottom: 5px;
`;

export const Date = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.darkBlue};
  margin-bottom: 40px;
`;

export const Rating = styled.p`
  font-size: 1rem;
  color: ${(props) => props.theme.colors.darkBlue};
  margin-bottom: 5px;
`;

export const Link = styled.a`
  text-decoration: underline;
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.blue};
`;

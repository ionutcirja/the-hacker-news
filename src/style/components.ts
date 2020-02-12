import styled from 'styled-components';

export const Row = styled.div`
  margin-bottom: 40px;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
`;


export const Loader = styled.span`
  color: ${(props) => props.theme.colors.blue};
  font-size: 1.2rem;
`;

export const Error = styled.p`
  color: ${(props) => props.theme.colors.red};
  font-size: 1.2rem;
`;

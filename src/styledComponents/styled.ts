import styled from "styled-components/native"; 
import { colors } from "../Colors/colors";



export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${colors.corPrincipal}; 
  

`;

export const CardDesign = styled.View`
  background-color: ${colors.corPrincipal};
  width: 90%;
  height: 650px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${colors.corBtn};
`;
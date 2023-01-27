import styled from 'styled-components';
import {
  space,
  layout,
  color,
  typography,
  flexbox,
  background,
  border,
} from 'styled-system';

export const Box = styled('div')(
  color,
  space,
  layout,
  typography,
  flexbox,
  background,
  border
);

import PropTypes from 'prop-types';
import { Box } from 'components/Box';
import { Button } from './Button.styled';

export const LoadMoreBtn = ({ onLoadMoreClick }) => {
  return (
    <Box display="flex" justifyContent="center" mt="15px">
      <Button type="button" onClick={onLoadMoreClick}>
        Load more
      </Button>
    </Box>
  );
};

LoadMoreBtn.propTypes = {
  onLoadMoreClick: PropTypes.func.isRequired,
};

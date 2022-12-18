import {
  NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem, Badge, styled } from '@mui/material';

const NavItem = ({
  href,
  icon: Icon,
  title,
  ...rest
}) => {
  const location = useLocation();

  const active = href ? !!matchPath({
    path: href,
    end: true
  }, location.pathname) : false;

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      marginRight: '25px'
    },
  }));

  return (
    <ListItem
      disableGutters
      sx={{
        display: 'flex',
        py: 0,
        pr: 0
      }}
      secondaryAction={!!rest.badge && <StyledBadge badgeContent={rest.badge.content} color={rest.badge.color} />}
      {...rest}
    >
      <Button
        component={RouterLink}
        sx={{
          color: 'text.secondary',
          fontWeight: 'medium',
          justifyContent: 'flex-start',
          letterSpacing: 0,
          py: 1.25,
          textTransform: 'none',
          width: '100%',
          ...(active && {
            color: 'primary.main'
          }),
          '& svg': {
            mr: 1
          }
        }}
        to={href}
      >
        {Icon && (
          <Icon size="20" />
        )}
        <span>
          {title}
        </span>
      </Button>
    </ListItem>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;

import { FC } from 'react';
import { AppBar, Container, Toolbar, Grid } from '@mui/material';
import { IconButton } from '@atoms/buttons';
import Link from '@atoms/links/Link';
import { useAppSelector, useAppDispatch } from '@/hooks';
import { selectMode, toggleColorMode } from '@/redux/features/colorMode';
import { Brightness4Icon, Brightness7Icon, AddIcon } from '@/assets/icons';

const Header: FC = () => {
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();
  return (
    <AppBar position="static" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense">
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={3} sm={2}>
              <Link href="/" variant="h6" noWrap color="textPrimary" underline="none">
                CrowdCoin
              </Link>
            </Grid>
            <Grid item xs={6} container alignItems="center" justifyContent="flex-end">
              <Link
                href="/"
                color="textPrimary"
                underline="none"
                sx={{ textTransform: 'uppercase' }}
              >
                Campaigns
              </Link>
              <IconButton href="/campaigns/new" sx={{ color: 'text.primary' }}>
                <AddIcon />
              </IconButton>
              <IconButton onClick={() => dispatch(toggleColorMode())}>
                {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

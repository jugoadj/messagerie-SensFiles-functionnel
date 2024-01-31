import { AppBar, Toolbar, Box, InputBase, styled } from '@mui/material';
import { Menu as MenuIcon, Tune, HelpOutlineOutlined, SettingsOutlined, 
    AppsOutlined, AccountCircleOutlined, Search } from '@mui/icons-material'

import { gmailLogo } from '../constants/constant';

const StyledAppBar = styled(AppBar)`
    background: black;
    box-shadow: none;
    height: 62px;
    justify-content: space-between;

    @media (max-width: 600px) {
        height: 56px; // Adjust the height for smaller screens
    }
`;

const SearchWrapper = styled(Box)`
    background: #EAF1FB;
    margin-left: 25px;
    border-radius: 9px;
    min-width: 300px; // Adjust the minimum width for smaller screens
    max-width: 720px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;

    @media (max-width: 600px) {
        min-width: 200px; // Adjust the minimum width for smaller screens
    }
`;

const OptionsWrapper = styled(Box)`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    & > svg {
        margin-left: 20px;
    }

    @media (max-width: 600px) {
        & > svg {
            margin-left: 10px; // Adjust the margin for smaller screens
        }
    }
`;

const Header = ({ toggleDrawer }) => {
    return (
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon color="white" onClick={toggleDrawer} />
                <img src={gmailLogo} alt="logo" style={{ width: 160, marginLeft: 35 }} />
                <SearchWrapper>
                    <Search color="action" />
                    <InputBase />
                    <Tune color="action"/>
                </SearchWrapper>

                <OptionsWrapper>
                    <HelpOutlineOutlined color="white" />
                    <SettingsOutlined color="white" />
                    <AppsOutlined color="white" />
                    <AccountCircleOutlined color="white" />
                </OptionsWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

export default Header;
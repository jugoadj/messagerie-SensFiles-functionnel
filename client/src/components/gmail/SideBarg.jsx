
import { Drawer, styled } from "@mui/material";
import SideBarContentg from "./SideBarContentg";

const StyledDrawer = styled(Drawer)`
    margin-top: 54px;
`

const SideBarg = ({ toggleDrawer, openDrawer, mailboxEndpoint }) => {

    return (
        <StyledDrawer
            anchor='left'
            open={openDrawer}
            onClose={toggleDrawer}
            hideBackdrop={true}
            ModalProps={{
                keepMounted: true,
            }}
            variant="persistent"
            sx={{
                '& .MuiDrawer-paper': { 
                    width: 200,
                    marginLeft:8,
                    borderRight: 'none',
                    background: '#f5F5F5',
                    marginTop: '64px',
                    height: 'calc(100vh - 64px)'
                },
            }}
          >
            <SideBarContentg  mailboxEndpoint={mailboxEndpoint} />
        </StyledDrawer>
    )
}

export default SideBarg;
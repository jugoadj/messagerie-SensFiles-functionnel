import { useState } from 'react';
import { Button, List, ListItem, Box, styled } from '@mui/material';
import { SIDEBAR_DATA } from '../../config/sidebar.config';
import { CreateOutlined } from '@mui/icons-material';
import { NavLink, useParams } from 'react-router-dom';
import ComposeGmail from './ComposeGmail';


const Container = styled(Box)`
    padding: 15px;
    & > ul {
        padding: 10px 0 0 5px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        & > a {
            text-decoration: none;
            color: inherit;
        }
        & > a > li > svg {
            margin-right: 20px;
        }
    }
`

const ComposeButton = styled(Button)`
    background: #c2e7ff;
    color: #001d35;
    border-radius: 16px;
    padding: 15px;
    min-width: 150px;
    text-transform: none;
    font-size: 16px;
    font-weight: 700;
`

const SideBarContentg = ({mailboxEndpoint}) => {

    const [openDrawer, setOpenDrawer] = useState(false);

    const { type } = useParams();

    const onComposeClick = () => {
        setOpenDrawer(true);
    }

    return (
        <Container>
            <ComposeButton onClick={() => onComposeClick()}>
                <CreateOutlined style={{ marginRight: 10 }} />Compose
            </ComposeButton>
            <List>
                {
                    SIDEBAR_DATA.map(data => (
                        <NavLink key={data.name} to={`/email/${data.name}`}>
                            <ListItem style={ mailboxEndpoint === "api/email/" + data.name.toLowerCase() ? {
                                backgroundColor: '#d3e3fd',
                                borderRadius: '0 16px 16px 0'
                            } : {}}><data.icon fontSize="small" />{data.title}</ListItem>
                        </NavLink>
                    ))
                }
            </List>
            <ComposeGmail open={openDrawer} setOpenDrawer={setOpenDrawer} />
        </Container>
    )
}

export default SideBarContentg;
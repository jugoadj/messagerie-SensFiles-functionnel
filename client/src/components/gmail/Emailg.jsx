import React, { useState, useEffect, useContext } from 'react';
import { ListItem, Checkbox, Typography, Box, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UidContext } from '../AppContext';

const Wrapper = styled(ListItem)`
    padding: 0 0 0 10px;
    background: #f2f6fc;
    cursor: pointer;
    overflow: hidden;

    & > div {
        display: flex;
        flex-wrap: wrap;  /* Added to wrap the content to the next line */
        width: 100%;
    }

    & > div > p {
        font-size: 14px;
        max-width: 100%;  /* Set maximum width for paragraphs */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 5px;  /* Add margin to separate lines */
    }
`;


const Indicator = styled(Typography)`
    font-size: 12px !important;
    background: #ddd;
    color: #222;
    border-radius: 4px;
    margin-right: 6px;
    padding: 0 4px;
`;

const DateText = styled(Typography)({
    marginLeft: 'auto',
    marginRight: 20,
    fontSize: 12,
    color: '#5F6368',
});



const Emailg = ({ email, selectedEmails, setSelectedEmails }) => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const uid = useContext(UidContext);

   

    const handleChange = () => {
        if (selectedEmails.includes(email._id)) {
            setSelectedEmails((prevState) => prevState.filter((id) => id !== email._id));
        } else {
            setSelectedEmails((prevState) => [...prevState, email._id]);
        }
    };

    return (
        <Wrapper>
            <Checkbox size="small" checked={selectedEmails.includes(email._id)} onChange={handleChange} />
            <Box
                onClick={() => navigate("/email/view", { state: { email: email } })}
            >
                <Typography style={{ width: 200 }}>{email.from.split('@')[0]}</Typography>

                <Typography>
                    {email.subject && <strong>{email.subject}</strong>}
                    {email.subject && email.body ? ' - ' : '(no subject) - '}
                    {/* {email.body.length > 64 ? email.body.substring(0, 64) + '...' : email.body} */}
                </Typography>

                <DateText>
                    {new window.Date(email.sentAt).getDate()}&nbsp;
                    {new window.Date(email.sentAt).toLocaleString('default', {
                        month: 'long',
                    })}
                </DateText>
            </Box>
        </Wrapper>
    );
};

export default Emailg;

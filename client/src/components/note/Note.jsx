import React, { useState, useEffect, useContext } from 'react';
import { ListItem, Checkbox, Typography, Box, styled } from '@mui/material';
import { StarBorder, Star } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UidContext } from '../AppContext';

const Wrapper = styled(ListItem)`
    padding: 10px;
    background: #ffd86c;
    cursor: pointer;
    overflow: hidden;
    border-radius: 12px;
    margin-bottom: 16px;

    & > div {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    & > div > p {
        font-size: 15px;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 10px;
    }
`;



const Note = ({ note, selectedNotes, setSelectedNotes }) => {
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;
    const uid = useContext(UidContext);

    const handleChange = () => {
        if (selectedNotes.includes(note._id)) {
            setSelectedNotes((prevState) => prevState.filter((id) => id !== note._id));
        } else {
            setSelectedNotes((prevState) => [...prevState, note._id]);
        }
    };

    return (
        
        <Wrapper>
            
            <Checkbox size="small" checked={selectedNotes.includes(note._id)} onChange={handleChange} />
           <Typography variant="h6" style={{ marginBottom: 3, marginRight: 15, fontSize: 20, fontWeight: 700 }}>
                {note.subject}
            </Typography>
            <Box style={{ flex: 1, marginBottom: -10 }}  >
                <Typography variant="body1" style={{ width: '100%', whiteSpace: 'pre-wrap' }}>
                    {note.body}
                </Typography>
            </Box>
        </Wrapper>
    );
};

export default Note;

import React, { useState, useContext, useEffect } from 'react';
import { Dialog, styled, Typography, Box, InputBase, TextField, Button, IconButton } from '@mui/material'; 
import { Close, DeleteOutline, AttachFileOutlined, FormatBoldOutlined, FormatItalicOutlined, FormatAlignLeftOutlined } from '@mui/icons-material';
import axios from 'axios';
import { UidContext } from '../AppContext';

const dialogStyle = {
  width: '80%',
  maxWidth: '100%',
  maxHeight: '100%',
  boxShadow: 'none',
  '&::-webkit-scrollbar': {
    display: 'none', // Hide the scrollbar for Webkit browsers (Chrome, Safari)
  }
};
const TextFieldStyle = styled(TextField)`
 
`
const DialogWrapper = styled(Dialog)`
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 690px) {
    margin-left: 16px;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  
`;
const Header = styled(Box)`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background: #f2f6fc;
  & > p {
    font-size: 15px;
    font-weight: 500;
  }
`;

const RecipientWrapper = styled(Box)`
    display: flex;
    flex-direction: column;
    padding: 0 15px;
    & > div {
        font-size: 14px;
        border-bottom: 1px solid #F5F5F5;
        margin-top: 10px;
    }
`;

const Footer = styled(Box)`
justify-content: space-between;
padding: 18px;
align-items: center;
display: 'flex';
`;

const SendButton = styled(Button)`
background: #FFB603;
color: #fff;
font-weight: 500;
text-transform: none;
border-radius: 18px;
width: 100px;
`;
const ComposeMail = ({ open, setOpenDrawer }) => {
  const [data, setData] = useState({});
  const [attachments, setAttachments] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;
  const uid = useContext(UidContext);

  useEffect(() => {
    const fetchUserEmail = async () => {
  
      try {
        const response = await axios.get(`${apiUrl}api/user/${uid}`);
        setUserEmail(response.data.email);
      } catch (error) {
        console.error('Error fetching user email:', error);
        // Handle error
      }
    };
  
    fetchUserEmail();
  }, [uid]);

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    const newAttachments = [...attachments, ...e.target.files];
    setAttachments(newAttachments);

    // Add the attachments to the data object
    setData({ ...data, attachments: newAttachments });
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);

    // Remove the attachment from the data object
    setData({ ...data, attachments: newAttachments });
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    try {
      const emailData = {
        ...data,
        from: userEmail,
        folders: [
          { user: data.to, starred: false, read: false },
          { user: userEmail, starred: false, read: false },
        ],
        labels: [],
        sentAt: new Date(),
      };

      if (attachments.length > 0) {
        emailData.attachments = attachments.map((attachment) => ({
          filename: attachment.name,
          content: attachment,
        }));
      }

      await axios.post(`${apiUrl}api/email/save`, emailData);

  
      // Close the compose mail dialog
      setOpenDrawer(false);
      setData({});
  
      setAttachments([]);
    } catch (error) {
      console.error('Error sending email:', error);
      // Handle error
    }
  };

  const closeComposeMail = (e) => {
    e.preventDefault();

    // Close the compose mail dialog
    setOpenDrawer(false);
    setData({});
    setAttachments([]);
  };

  return (
    <DialogWrapper open={open} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography>New Message</Typography>
        <Close fontSize="small" onClick={(e) => closeComposeMail(e)} />
      </Header>
      <RecipientWrapper>
        <InputBase
          placeholder="Recipients"
          name="to"
          onChange={(e) => onValueChange(e)}
          value={data.to}
        />
         <InputBase
          placeholder="Subject"
          name="subject"
          onChange={(e) => onValueChange(e)}
          value={data.subject}
        />
      </RecipientWrapper>
      <TextFieldStyle
        multiline
        rows={15}
        sx={{ '& .MuiOutlinedInput-notchedOutline': { border: 'none' } }}
        name="body"
        onChange={(e) => onValueChange(e)}
        value={data.body}
      />
      <Box display="flex"> 
        {attachments.map((attachment, index) => (
          <Box key={index} display="flex" alignItems="center">
            <Typography>{attachment.name}</Typography>
            <IconButton onClick={() => removeAttachment(index)}>
              <DeleteOutline />
            </IconButton>
          </Box>

        ))}
        </Box>
      <Footer>
        <SendButton onClick={(e) => sendEmail(e)}>Send</SendButton>

        <Button>
          <DeleteOutline style={{ marginLeft: '20px' }} onClick={() => setOpenDrawer(false)} />
        </Button>
        <Button onClick={() => document.getElementById('attachmentInput').click()}>
          <AttachFileOutlined />
        </Button>



        <Button>
          <FormatBoldOutlined />
        </Button>
        <Button>
          <FormatItalicOutlined />
        </Button>
        <Button>
          <FormatAlignLeftOutlined />
        </Button>
      </Footer>
      {/* Hidden file input for attaching files */}
      <input
        type="file"
        accept="*/*"
        multiple
        onChange={onFileChange}
        style={{ display: 'none' }}
        id="attachmentInput"
      />
    </DialogWrapper>
  );
};

export default ComposeMail;
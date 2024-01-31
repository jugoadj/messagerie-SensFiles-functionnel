import React, { useEffect, useState, useContext, useCallback } from "react";
import { Box, List, Checkbox, CircularProgress, IconButton } from "@mui/material";
import { DeleteOutline, Refresh } from "@mui/icons-material";
import { UidContext } from "../AppContext";
import axios from "axios";
import { EMPTY_TABS } from "../constants/constant";
import NoMails from "./common/NoMails";
import Emailg from "./Emailg";

const Emailsg = ({ openDrawer, mailboxEndpoint }) => {
  const [receivedEmails, setReceivedEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_API_URL;
  const uid = useContext(UidContext);

  const fetchReceivedEmails = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiUrl}api/gmail/mail/list/krimouking007@`
      );
      setReceivedEmails(response.data);
      setLoading(false);
    } catch (error) {
      console.error(
        `Error fetching received emails from ${mailboxEndpoint}:`,
        error
      );
      setLoading(false);
    }
  }, [apiUrl, mailboxEndpoint, userEmail]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const response = await axios.get(`${apiUrl}api/user/${uid}`);
        setUserEmail(response.data.email);
      } catch (error) {
        console.error("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
    fetchReceivedEmails();
  }, [uid, apiUrl, fetchReceivedEmails]);

  const selectAllEmails = (e) => {
    if (e.target.checked) {
      const allEmailIds = receivedEmails.map((email) => email._id);
      setSelectedEmails(allEmailIds);
    } else {
      setSelectedEmails([]);
    }
  };

  const deleteSelectedEmails = async () => {
    try {
      await axios.post(`${apiUrl}api/email/setbin/${userEmail}`, {
        emailIds: selectedEmails,
      });
      fetchReceivedEmails();
      setSelectedEmails([]);
    } catch (error) {
      console.error("Error moving/deleting selected emails:", error);
    }
  };

  const refreshEmails = useCallback(() => {
    setLoading(true);
    fetchReceivedEmails();
  }, [fetchReceivedEmails]);

  return loading ? (
    <CircularProgress
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
  ) : (
    <Box
      style={
        openDrawer
          ? { marginLeft: 200, width: "84%" }
          : { marginLeft: 16, width: "98%" }
      }
    >
      <Box
        style={{
          padding: "20px 10px 0px 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox size="small" onChange={selectAllEmails} />
        <IconButton onClick={deleteSelectedEmails} color="black">
        <DeleteOutline />
        </IconButton>
        <IconButton onClick={refreshEmails} color="black">
          <Refresh />
        </IconButton>
      </Box>
      <List style={{ maxHeight: "500px", overflowY: "auto" }}>
        {receivedEmails.map((email) => (
          <Emailg
            email={email}
            key={email._id}
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
          />
        ))}
      </List>
      {receivedEmails.length === 0 && (
        <NoMails message={EMPTY_TABS[mailboxEndpoint]} />
      )}
    </Box>
  );
};

export default Emailsg;

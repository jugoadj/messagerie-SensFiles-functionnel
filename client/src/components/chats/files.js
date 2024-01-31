import './style.css';
import { SelectedChatContext } from '../../context/ChatProvider'; 
import { UidContext } from "../AppContext";
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { Box} from "@mui/material";
import { GoX } from "react-icons/go";



const ChatFiles = ({ children , isOpen, onClose }) => {

    const [isDrawerOpen, setDrawerOpen] = useState(false);
    const [messages, setMessages] = useState([]); 
    const apiUrl = process.env.REACT_APP_API_URL;
    const uid = useContext(UidContext);

    const { 
      selectedChat,
      user,
      chats,
      setChats, } = useContext(SelectedChatContext);


        const fetchfiles = async () => {

            if (!selectedChat) { //Si aucun chat n'est sélectionné, la fonction se termine immédiatement.
            return;
            }

            try {

            

            const { data } = await axios.get( //envoie une requête GET à l'API pour récupérer les messages du chat sélectionné.
                //data contient la réponse du serveur à la requête GET  
            `${apiUrl}api/message/${selectedChat._id}/files`,
                
            );

            setMessages(data);
            

            } catch (error) { 
            console.log(error);

            }
        };

  useEffect(() => {
    fetchfiles();
  }, [selectedChat]); // Exécute fetchfiles chaque fois que selectedChat change


    



    function getFileType(file) {
    const extension = file.split('.').pop();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'image';
      case 'pdf':
      case 'doc':
      case 'docx':
      case 'txt':
      case 'ppt':
      case 'pptx':
      case 'xls':
      case 'xlsx':
      case 'csv':
      case 'py':
      case 'js':
      case 'html':
      case 'css':
      case 'odp':
        return 'document';
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'flv':
        return 'video';
      case 'mp3':
        return 'audio';
      default:
        return 'unknown';
    }
  }

  const [isOpenn, setIsOpen] = useState(false);

    return (
<>
<span onClick={() => setIsOpen(isOpen)}>{children}</span>
        {isOpen && (
        <div className="drawer" >
            <div className="drawer-overlay">
                <div className="drawer-content">
                <div className="modal-close-button-files">                
                    <GoX className="close-icon" style={{ fontSize: '2em' }} onClick={onClose}/>
                </div>
                <div className="drawer-header">contenu multimedia</div>

                <div className="boxfiles">
                    {selectedChat && messages.every(m => getFileType(m.file) !== 'image' && getFileType(m.file) !== 'video') ? (
                            <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            w="100%"
                            h="100%"
                            bg="#4E4F50"
                            color={"white"}
                            >
                            <p>Pas de contenu multimedia disponible</p>
                            </Box>
                        ) : (
                            <Box
                            display="grid"
                            gridTemplateColumns="repeat(2, 1fr)"
                            gridAutoRows="150px"
                            gap={2}
                            w="100%"
                            h="100%"
                            bg="#4E4F50"
                            color={"white"}
                            >
                            {messages.map((m, index) => {
                                let fileUrl = '';
                                let fileType = 'unknown'; // Définir fileType par défaut à 'unknown'
                                let fileName = ''; // Définir fileName par défaut à une chaîne vide
                                let fileExtension = ''; // Définir fileExtension par défaut à une chaîne vide
                                if (m.file) {
                                fileType = getFileType(m.file); // Si m.file est défini, obtenir le type de fichier
                                fileUrl = `${apiUrl}${m.file.replace(/\\/g, '/')}`; // Si m.file est défini, obtenir l'URL du fichier
                                fileName = m.file.split('\\').pop(); // Si m.file est défini, extraire le nom du fichier
                                fileExtension = fileName.split('.').pop(); // Si m.file est défini, extraire l'extension du fichier
                                }
                                return (
                                fileType === 'image' ? (
                                    <a key={index} href={fileUrl} target="_blank" rel="noopener noreferrer" >
                                    <img src={fileUrl} alt="Message content" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </a>
                                ) : fileType === 'video' ? (
                                    <video style={{ width: '100%', height: '100%', objectFit: 'cover' }}  controls>
                                    <source src={fileUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                    </video>
                                ) : fileType === 'document' ? (
                                  <a key={index} href={fileUrl} target="_blank" rel="noopener noreferrer">
    <p>{fileName.split('.')[0].substring(0, 10)}.{fileName.split('.')[1]}</p>
                                  </a>
                                ) : null
                                );
                            })}
                            </Box>
                        )}
                </div>
                <div className="drawer-header">
                  {selectedChat.isGroupChat ? ' membres du groupe' : null}
                <p className="user-list-membres">
                  {selectedChat.isGroupChat ? selectedChat.users.map((u) => u.pseudo).join(', ') : null}
                </p>                
                </div>
                </div>
            </div>
            </div>
            )}
            </>

    );
};

export default ChatFiles;
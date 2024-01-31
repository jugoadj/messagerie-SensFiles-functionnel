const router = require('express').Router();
const emailController = require ('../controllers/email.controller.js');

router.post('/save', emailController.saveSendEmails);
//router.post('/save-draft', emailController.saveSendEmails);

router.get('/inbox/:email', emailController.getReceivedEmails);
router.get('/sent/:email', emailController.getSentEmails);

router.post('/setstarred/:email', emailController.toggleStarredEmail);
router.post('/setunstarred/:email', emailController.untoggleStarredEmail);
router.get('/starred/:email', emailController.getStarredEmails);

router.post('/setbin/:email', emailController.moveEmailsToBin);
router.post('/setunbin/:email', emailController.removeEmailsFromBin);
router.get('/bin/:email', emailController.displayBinEmails);

router.put('/delete/:email', emailController.deleteEmail);



module.exports = router;
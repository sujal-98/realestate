import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import Lbar from '../comp/loggesNavbar/Lbar';

const TermsAndConditions = () => {
  return (
    <div className='w-full'>
      <Lbar />
      <Container sx={{ backgroundColor: '#f5f5f5',minWidth:'100vh', minHeight: '100vh', paddingTop: 8, paddingBottom: 8 }}>
        <Paper elevation={3} sx={{ padding: 6,  backgroundColor: '#ffffff', borderRadius: '15px',width:'100%' }}>
          <Typography variant="h4" gutterBottom>
            Terms and Conditions
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to our real estate website. By accessing or using our site, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.
          </Typography>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              1. Acceptance of Terms
            </Typography>
            <Typography variant="body1" paragraph>
              By using this site, you agree to these terms and conditions and any modifications made to them. If you do not agree, please do not use this site.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              2. Description of Services
            </Typography>
            <Typography variant="body1" paragraph>
              We provide users with access to real estate listings, related information, and other services. We reserve the right to modify or discontinue, temporarily or permanently, the services provided without notice.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              3. User Obligations
            </Typography>
            <Typography variant="body1" paragraph>
              Users agree to use this site in accordance with all applicable laws and regulations. Users must not engage in any conduct that could harm the site, its functionality, or its reputation.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              4. Intellectual Property
            </Typography>
            <Typography variant="body1" paragraph>
              All content on this site, including text, graphics, logos, and images, is the property of the site owner and is protected by intellectual property laws.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              5. Limitation of Liability
            </Typography>
            <Typography variant="body1" paragraph>
              We are not liable for any damages arising from the use or inability to use this site or the services provided. This includes, but is not limited to, direct, indirect, incidental, punitive, and consequential damages.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              6. Changes to Terms
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to change these terms and conditions at any time. Your continued use of the site following any changes indicates your acceptance of the new terms.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              7. Contact Information
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions about these terms, please contact us at [contact information].
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              8. User Accounts
            </Typography>
            <Typography variant="body1" paragraph>
              Users may be required to create an account to access certain features of the site. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              9. Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
              Your use of this site is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              10. Governing Law
            </Typography>
            <Typography variant="body1" paragraph>
              These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which our company is established, without regard to its conflict of law principles.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              11. Termination
            </Typography>
            <Typography variant="body1" paragraph>
              We reserve the right to terminate or suspend your access to the site, without prior notice or liability, for any reason, including if you breach the terms.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              12. Severability
            </Typography>
            <Typography variant="body1" paragraph>
              If any provision of these terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary so that the remaining provisions will remain in full force and effect.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              13. Entire Agreement
            </Typography>
            <Typography variant="body1" paragraph>
              These terms and conditions constitute the entire agreement between you and us regarding the use of the site and supersede any prior agreements between you and us.
            </Typography>
          </Box>

          <Box sx={{ marginTop: 6, paddingLeft: 3, borderLeft: '6px solid #1976d2' }}>
            <Typography variant="h5" gutterBottom sx={{ marginBottom: 2, color: '#1976d2' }}>
              14. Feedback
            </Typography>
            <Typography variant="body1" paragraph>
              We welcome your feedback and suggestions. By providing feedback, you grant us the right to use it without restriction or compensation to you.
            </Typography>
          </Box>

        </Paper>
      </Container>
    </div>
  );
};

export default TermsAndConditions;


import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { MdOutlineLock } from "react-icons/md"
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { CiMobile2 } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";

export default function Automation() {
    return (
        <Box sx={{
            width: '304px',
            bgcolor: 'background.paper',
        }}>
            <Box>
                <h3 className='flex justify-center'>Change Visibility</h3>
            </Box>
            <Box>
                <Card sx={{ 
                    width: '100%',
                    border: 'none',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    marginTop: '10px',
                    '&:hover': {
                        bgcolor: 'rgba(54, 55, 61, 0.2)',
                    }
                 }}>
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" alignItems="center">
                            <HiOutlineAdjustmentsHorizontal className='mr-1'/>
                            <Typography component="div" sx={{fontWeight: '400', fontSize: '14px' }}>
                                Rules
                            </Typography>
                        </Stack>
                        <Typography color="text.secondary" variant="body2" sx={{fontSize: '13px'}}>
                            Create rules that automatically respond to actions, schedules, or a card's due date.
                        </Typography>
                    </Box>
                </Card>
                <Card sx={{ 
                    width: '100%',
                    border: 'none',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                        bgcolor: 'rgba(54, 55, 61, 0.2)',
                    }
                 }}>
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" alignItems="center">
                            <CiMobile2 className='mr-1'/>
                            <Typography component="div" sx={{fontWeight: '400', fontSize: '14px' }}>
                                Buttons
                            </Typography>
                        </Stack>
                        <Typography color="text.secondary" variant="body2" sx={{fontSize: '13px'}}>
                            Create custom buttons on the back of every card or at the top of the board.
                        </Typography>
                    </Box>
                </Card>
                <Card sx={{ 
                    width: '100%',
                    border: 'none',
                    boxShadow: 'none',
                    cursor: 'pointer',
                    '&:hover': {
                        bgcolor: 'rgba(54, 55, 61, 0.2)',
                    }
                 }}>
                    <Box sx={{ p: 2 }}>
                        <Stack direction="row" alignItems="center">
                            <MdOutlineEmail className='mr-1'/>
                            <Typography component="div" sx={{fontWeight: '400', fontSize: '14px' }}>
                                Email reports
                            </Typography>
                        </Stack>
                        <Typography color="text.secondary" variant="body2" sx={{fontSize: '13px'}}>
                            Set up email reports, such as a weekly summary of all cards that are due within 7 days.
                        </Typography>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}
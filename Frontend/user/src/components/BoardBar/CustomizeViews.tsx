
import { Box, Checkbox, FormControlLabel, FormGroup, } from '@mui/material';
import { MdOutlineLock } from "react-icons/md"
import GroupTrelloIcon from "~/assets/GroupTrelloIcon.svg"
import { CiViewTable } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import { MdOutlineViewTimeline } from "react-icons/md";

export default function CustomizeViews() {
    return (
        <Box sx={{
            width: '304px',
            bgcolor: 'background.paper',
        }}>
            <Box>
                <h3 className='flex justify-center'>Upgrade for veiws</h3>
            </Box>
            <Box>
                <FormGroup>
                    <Box sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover':{
                            bgcolor: 'rgba(54, 55, 61, 0.2)',
                        }
                        
                    }}>
                        <Checkbox />
                        <img src={GroupTrelloIcon} alt="NavBarIcon" className="rounded-md w-4 h-4 mr-2"/>
                        <p className='font-normal'>Board</p>

                    </Box>
                    <Box sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover':{
                            bgcolor: 'rgba(54, 55, 61, 0.2)',
                        }
                        
                    }}>
                        <Checkbox />
                        <CiViewTable className='font-semibold text-lg mr-2'/>
                        <p className='font-normal'>Table</p>

                    </Box>

                    <Box sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover':{
                            bgcolor: 'rgba(54, 55, 61, 0.2)',
                        }
                        
                    }}>
                        <Checkbox />
                        <SlCalender className='font-semibold text-lg mr-2'/>
                        <p className='font-normal'>Calender</p>

                    </Box>

                    <Box sx={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover':{
                            bgcolor: 'rgba(54, 55, 61, 0.2)',
                        }
                        
                    }}>
                        <Checkbox />
                        <MdOutlineViewTimeline className='font-semibold text-lg mr-2'/>
                        <p className='font-normal'>TimeLine</p>

                    </Box>

                </FormGroup>
            </Box>
        </Box>
    );
}
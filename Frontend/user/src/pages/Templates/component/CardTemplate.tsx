import { Card, CardContent, CardMedia, CardActions, IconButton,Button  } from "@mui/material";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';
import React from 'react';
import '../../../styles/templates.css';

function CardTemplate() {
  return (
    <div className="detail-card-container">
        <div className="features">
            <div className="title-features">
                <label>Featured categories</label>
                <div className="search-container">
                    <input id="inputSearch" placeholder="Tìm mẫu"></input>
                    <span className="search-icon">
                        <SearchIcon fontSize="small" />
                    </span>
                </div>
            </div>
            <div className="nameFeatures">
                <div className="item-feature" style={{ border: 'none' }}>
                    <Card className="detail-item">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello.com/assets/3919e0fe0976de0298b4.svg"
                        />
                        Business
                    </Card>
                </div>
                <div className="item-feature">
                    <Card className="detail-item">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello.com/assets/157c58403db677619bea.svg"
                        />
                        Design
                    </Card>
                </div>
                <div className="item-feature">
                    <Card className="detail-item">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello.com/assets/dea39a045ff4c4d1d9b1.svg"
                        />
                        Education
                    </Card>
                </div>
                <div className="item-feature">
                    <Card className="detail-item">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello.com/assets/e0b1e866de40a5468aaa.svg"
                        />
                        Engineering
                    </Card>
                </div>
                <div className="item-feature">
                    <Card className="detail-item">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello.com/assets/757286ddcfc9b405911a.svg"
                            alt="Marketing"
                        />
                        Marketing
                    </Card>
                </div>
                <div className="item-feature">
                    <Card className="detail-item">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello.com/assets/7d80b8fac2bac70d9e72.svg"
                            alt="Quản Lý Dự Án"
                        />
                        Project management
                    </Card>
                </div>
                <div className="item-feature">
                    <Card className="detail-item">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello.com/assets/f03ecb89626f72d4a0aa.svg"
                            alt="Làm Việc Từ Xa"/>
                        Remote work
                    </Card>
                </div>
            </div>
        </div>

        <div className="newTemplate">
            <div className="title">
                <img src="https://trello.com/assets/32ad10f52fc078a76ea4.svg" width="24px" height="24px"></img>
                <label>New and notable templates</label>
            </div>
            <div className="detail-newTemplate">
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/53baf533e697a982248cd73f/480x480/e4982f6fdaab05c018747688b167997f/shutterstock_261269042.jpg"
                            alt="New Hire Onboarding"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/c58e11193c6dada6aa672b3c72345860/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">New Hire Onboarding</Typography>
                        <Typography className="content">by Trello Team</Typography>
                        <Typography className="content">Help new employees start strong with this onboarding template</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small"/>18.3N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>131.3N
                        </IconButton>
                    </CardActions>    
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/alien.svg"
                            alt="Tier List"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/c58e11193c6dada6aa672b3c72345860/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Tier List</Typography>
                        <Typography className="content">by Trello Engineering Team</Typography>
                        <Typography className="content">Use this template to create a tier list for anything you want. A tier list is a way to rank items in a category from best to worst. This could be: best NBA players, GOAT’d pasta dishes, and tastiest fast food joints.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small"/>2.9N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>23.3N
                        </IconButton>
                    </CardActions>
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/5ea92d56642ad37917862ea4/480x322/255c5f56ccf2b7bd68aaf9f51d0dbcc5/Asset_1%404x.png"
                            alt="Better Work Habits Challenge"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/c58e11193c6dada6aa672b3c72345860/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Better Work Habits Challenge</Typography>
                        <Typography className="content">by Trello Team</Typography>
                        <Typography className="content">Track, reflect, and celebrate new effective habits that you want to build at work.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />3.1N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small" />28N
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        </div>

        <div className="business">
            <div className="title">
                <img src="https://trello.com/assets/6b1a625e841b96791d68.svg" width="24px" height="24px"></img>
                <label>Business</label>
                <Button>More templates for Business</Button>
            </div>
            <div className="detail-newTemplate">
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/5e627d9fa6c99f7637f32c47/480x270/c0d295ff3ef480a03090b113f1eae301/crmble_trello_order-mgmt.png"
                            alt="A Lead Management Pipeline by Crmble"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/e4816f3c4e30318dc91ee7f3f4938c86/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">A Lead Management Pipeline by Crmble</Typography>
                        <Typography className="content">by Toni, Founder @ Crmble</Typography>
                        <Typography className="content">Use this board to manage inventory or swag requests with the Crmble Power-Up!</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small"/>30.3N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>185.8N
                        </IconButton>
                    </CardActions>    
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/320x480/842930275c7de22dfabb6bb21b3cb8cd/photo-1590978553854-f1c0fe76ca70.jpg"
                            alt="Lean Canvas"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/8aead7e9602e1842a63cae0ed20fadd0/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Lean Canvas</Typography>
                        <Typography className="content">by Syarfandi Achmad</Typography>
                        <Typography className="content">Lean Canvas is a 1-page business plan template created by Ash Maurya that helps you deconstruct your idea into its key assumptions. </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />34.9N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small" />205.2N
                        </IconButton>
                    </CardActions>
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/7f16c6eb93506d217fd0954458890909/photo-1537134394103-214adc4bd836.jpg"
                            alt="Nonprofit Project Management"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/11e69d07ced16df3e48576a6c2deb0e4/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Nonprofit Project Management</Typography>
                        <Typography className="content">by Atlassian</Typography>
                        <Typography className="content">Turn big dreams into bigger results. Use this Trello template to build your nonprofit team's ideal workflow, for projects big or small.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />2.1N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>10.3N
                        </IconButton>
                    </CardActions>
                </Card>
            </div>

        </div>

        <div className="design">
            <div className="title">
                <img src="https://trello.com/assets/e617072931480fdd44da.svg" width="24px" height="24px"></img>
                <label>Design</label>
                <Button>More templates for Design</Button>
            </div>
            <div className="detail-newTemplate">
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/a28f730ef16a7f6a7e1062c8a7953f14/photo-1487446929682-f62f73984006.jpg"
                            alt="A Lead Management Pipeline by Crmble"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/397f35cc809d533f37e0d9a574ba570d/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Design Project Template</Typography>
                        <Typography className="content">by Kene Ohiaeri, Product Designer</Typography>
                        <Typography className="content">An easy to use template for planning and monitoring your branding and product design projects online.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small"/>29.7N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>175.6N
                        </IconButton>
                    </CardActions>    
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/5d42cf624a724294c34b89383f9ec56e/photo-1523726491678-bf852e717f6a.jpg"
                            alt="Lean Canvas"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/c089ea8a89b9ce4634a98d30c86542b4/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Design System Checklist</Typography>
                        <Typography className="content">by Rahul JR, Senior Product Manager @ Zoho Corp</Typography>
                        <Typography className="content">A design system unites product teams around a common visual language.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />21.9N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small" />114.5N
                        </IconButton>
                    </CardActions>
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/3ffe7acdb8d4c2082e873e8a416bdc52/photo-1452860606245-08befc0ff44b.jpg"
                            alt="Nonprofit Project Management"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/0acbbe9e46da578719a99d9b33f8f14d/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Freelance Branding Project</Typography>
                        <Typography className="content">by Stu Smith, Designer @ Trello</Typography>
                        <Typography className="content">Use this template to run your next Branding project. </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />22.9N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>114.5N
                        </IconButton>
                    </CardActions>
                </Card>
            </div>

        </div>

        <div className="education">
            <div className="title">
                <img src="https://trello.com/assets/070ebae9f7177f08cff6.svg" width="24px" height="24px"></img>
                <label>Education</label>
                <Button>More templates for Education</Button>
            </div>
            <div className="detail-newTemplate">
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/8454170bfcb74380b54c38a28ff21e2f/photo-1428908728789-d2de25dbd4e2.jpg"
                            alt="Remote Class Template"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-members.s3.amazonaws.com/58c313da1e4f0958a7420422/270d013b21f247c40563a552abf989a9/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Remote Class Template</Typography>
                        <Typography className="content">by Kelly Theisen, Assistant Professor of Chemistry</Typography>
                        <Typography className="content">Stay organized in a remote learning environment.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small"/>48.9N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>217.8N
                        </IconButton>
                    </CardActions>    
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/95c7551fff2e76c2d9bdfb50e5ee19b6/photo-1481627834876-b7833e8f5570.jpg"
                            alt="Academic Literature Review"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/e3f1c82f9f445ccd63033a73fec215d5/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Academic Literature Review</Typography>
                        <Typography className="content">by Ann Gillian Chu, PhD researcher @ the University of St. Andrews</Typography>
                        <Typography className="content">Keep track of what you've read and your notes in one place for long writing projects, like dissertations.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />23.9N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small" />91.4N
                        </IconButton>
                    </CardActions>
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/575584dacedaafdf0d8660c2/480x272/02a67bbc2d5b879d912dad85eb5f3a05/asset_3.png"
                            alt="Teaching: Weekly Planning"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/993e0e3c1aa46cabf6261b33e599d7ce/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Teaching: Weekly Planning</Typography>
                        <Typography className="content">bt Emma Trentman, Associate Professor of Arabic @ University of New Mexico</Typography>
                        <Typography className="content">A board per class. The lists are the weeks of the semester, cards are things I need to do for class each week.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />200.8N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>351.4N
                        </IconButton>
                    </CardActions>
                </Card>
            </div>

        </div>

        <div className="technique">
            <div className="title">
                <img src="https://trello.com/assets/457121414fa10aa6029a.svg" width="24px" height="24px"></img>
                <label>Engineering</label>
                <Button>More templates for Engineering</Button>
            </div>
            <div className="detail-newTemplate">
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x322/47f09f0e3910259568294477d0bdedac/photo-1576502200916-3808e07386a5.jpg"
                            alt="Kanban Template"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/c58e11193c6dada6aa672b3c72345860/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Kanban Template</Typography>
                        <Typography className="content">by Trello Engineering Team</Typography>
                        <Typography className="content">Use this simple Kanban template to improve the productivity of your engineering team and help them build better products, faster.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small"/>972.2N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>2.2N
                        </IconButton>
                    </CardActions>    
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/4e8eb47da16fe58f9dbdf7d0/480x300/0f299a7485408e6ad3daac75476be678/background.png"
                            alt="Scrum Board"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/9fc92f1c34baf0830db02f0ecbefedba/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Scrum Board</Typography>
                        <Typography className="content">by Robin Warren, Founder of Cherry Wood Software</Typography>
                        <Typography className="content">From &quot;to do&quot; to &quot;done&quot;, Trello's scrum board template helps your software development team use the popular agile framework to finish work faster.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />31.8N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small" />127.1N
                        </IconButton>
                    </CardActions>
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x270/c9ada8526a0585ddf17441d7e68dc9ac/photo-1593689217914-19621b0eac82.jpg"
                            alt="Software Development [Web App, iOS App, Android App]"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/a2466e003e7bb315c4e14c74c26cb090/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Software Development [Web App, iOS App, Android App]</Typography>
                        <Typography className="content">by iLyas Farawe, CTO @ Techbarn</Typography>
                        <Typography className="content">Manage tasks and deadlines for software development projects.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />33.8N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>133.7N
                        </IconButton>
                    </CardActions>
                </Card>
            </div>

        </div>

        <div className="Marketing">
            <div className="title">
                <img src="https://trello.com/assets/3695bf4ae87a54c23f88.svg" width="24px" height="24px"></img>
                <label>Marketing</label>
                <Button>More templates for Marketing</Button>
            </div>
            <div className="detail-newTemplate">
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/88badc718574e79916d2330ccd49a75a/photo-1587270804625-48c99a3cc707.jpg"
                            alt="Speaker guide for online events"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/befe8bb32309834ba82c815b5db0b84e/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Speaker guide for online events</Typography>
                        <Typography className="content">by Josip Lisec, Head of Product @ SpotMe</Typography>
                        <Typography className="content">Prep for your next virtual event with precision! </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small"/>9.9N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>60.8N
                        </IconButton>
                    </CardActions>    
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x281/4ff956445063b6458ae044342d2e76b2/photo-1507842217343-583bb7270b66.jpg"
                        alt="Marketing Content Catalog"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/629d2d986dcf14f797466aff0c754f69/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Marketing Content Catalog</Typography>
                        <Typography className="content">by Nicholas Bouchard, Content Marketer @ Unito</Typography>
                        <Typography className="content">Centralize all the content your marketing teams create and make it easily searchable.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />8.1N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small" />67.9N
                        </IconButton>
                    </CardActions>
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/purty_wood_dark.png"
                            alt="Marketing Overview"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/c58e11193c6dada6aa672b3c72345860/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Marketing Overview</Typography>
                        <Typography className="content">by Stella Garber, Head of Marketing @ Trello</Typography>
                        <Typography className="content">Use this board to create a stronger sense of transparency within your marketing team and the company.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />35.4N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>187.1N
                        </IconButton>
                    </CardActions>
                </Card>
            </div>

        </div>

        <div className="projectManagement">
            <div className="title">
                <img src="https://trello.com/assets/627d9e9f69fc255752cf.svg" width="24px" height="24px"></img>
                <label>Project management</label>
                <Button>More templates for Project management</Button>
            </div>
            <div className="detail-newTemplate">
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/368bc33f2c374599a45888b7ce4f9c5a/photo-1472289065668-ce650ac443d2.jpg"
                            alt="Client Workflow Management"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/0d659e2e05eeaa22649da35f91db4d4d/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Client Workflow Management</Typography>
                        <Typography className="content">by Jordan L. Couch, Attorney @ Palace Law</Typography>
                        <Typography className="content">Use a Trello board to go paperless while managing a client workflow.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small"/>46.9N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>311.9N
                        </IconButton>
                    </CardActions>    
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/575584dacedaafdf0d8660c2/480x480/81aa04d295723176cd358fa887e92596/UN074431_2.JPG.jpg"
                            alt="UNICEF Global Innovation Centre"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/ab03474aa7d6b6177f191aa2fc63ca63/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">UNICEF Global Innovation Centres</Typography>
                        <Typography className="content">by UNICEF</Typography>
                        <Typography className="content">Working with any number of countries at any given time, UNICEF is able to keep track of every location, including all points of contact and every important document, on dedicated Trello boards.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />3.2N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small" />47.4N
                        </IconButton>
                    </CardActions>
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/5423102a85612209a94bcde8/480x270/575c4d97c9004f4f38e6a248ef8ac3ba/Budget_Full_HD.jpg"
                            alt="Advanced Project Budgeting and Time Tracking"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/785ad28a54f1fb5f6b13989aff10f0e9/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Advanced Project Budgeting and Time Tracking</Typography>
                        <Typography className="content">by Vitaly Andrianov, Maker of SmartFields for Trello Power-Up</Typography>
                        <Typography className="content">Track time and budget for your projects with ease and less manual work.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />15.9N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>110.2N
                        </IconButton>
                    </CardActions>
                </Card>
            </div>

        </div>

        <div className="workRemotely">
            <div className="title">
                <img src="https://trello.com/assets/338e484944b19a8df667.svg" width="24px" height="24px"></img>
                <label>Remote work</label>
                <Button>More templates for Remote work</Button>
            </div>
            <div className="detail-newTemplate">
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x320/3bb7c04dcf6a14b2351fbd41e219bc8f/photo-1454117096348-e4abbeba002c.jpg"
                            alt="Work From Home Daily Planner"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/dd955d422af18db1a6edcb339a5e13b6/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Work From Home Daily Planner</Typography>
                        <Typography className="content">by Sarah Costello @ TalentHub</Typography>
                        <Typography className="content">Plan, collaborate and monitor your work-from-home schedule.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small"/>101.7N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>281N
                        </IconButton>
                    </CardActions>    
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/53454f575358c015080ef729/480x480/7007009bc4fc68614e4d8c21dc20c62d/photo-1416592525293-e65266465eb7.jpeg.jpg"
                            alt="Mr. Rogers: “Watercooler” Video Chat Planner"/>
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/c58e11193c6dada6aa672b3c72345860/170.png')"}}></span>
                    </div>
                    <CardContent>
                        <Typography className="content-title">Mr. Rogers: “Watercooler” Video Chat Planner</Typography>
                        <Typography className="content">by Trello Team</Typography>
                        <Typography className="content">A simple way to build team culture.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />2.5N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small" />32N
                        </IconButton>
                    </CardActions>
                </Card>
                <Card className="item-newTemplate">
                    <div className="cardContainer">
                        <CardMedia
                            component="img"
                            height="140"
                            image="https://trello-backgrounds.s3.amazonaws.com/SharedBackground/480x480/b10c8bd87b80f7abeb56820f50c4db66/photo-1474487548417-781cb71495f3.jpg"
                            alt="Remote Team Hub"
                        />
                        <span className="circle" style={{backgroundImage: "url('https://trello-logos.s3.amazonaws.com/c58e11193c6dada6aa672b3c72345860/170.png')"}}>
                        </span>
                    </div>
                    <CardContent>
                        <Typography className="content-title font-bold">Remote Team Hub</Typography>
                        <Typography className="content">by Trello Team	</Typography>
                        <Typography className="content">A mission control center for your team productivity.</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton className="icon" aria-label="add to favorites">
                            <ContentCopyOutlinedIcon fontSize="small" />55.3N
                        </IconButton>
                        <IconButton className="icon" aria-label="share">
                            <VisibilityOutlinedIcon fontSize="small"/>645.7N
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        </div>
    </div>

  );
}

export default CardTemplate;

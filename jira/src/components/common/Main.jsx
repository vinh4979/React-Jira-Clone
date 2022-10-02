import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import CssBaseline from '@mui/material/CssBaseline'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'

const drawerWidth = 240

const MainBox = styled('main', { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end'
}))

export default function Main() {
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box'
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <MainBox open={open}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum facilisis leo vel. Risus at
          ultrices mi tempus imperdiet. Semper risus in hendrerit gravida rutrum
          quisque non tellus. Convallis convallis tellus id interdum velit
          laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed
          adipiscing. Amet nisl suscipit adipiscing bibendum est ultricies
          integer quis. Cursus euismod quis viverra nibh cras. Metus vulputate
          eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo
          quis imperdiet massa tincidunt. Cras tincidunt lobortis feugiat
          vivamus at augue. At augue eget arcu dictum varius duis at consectetur
          lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien
          faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
          ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
          elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse
          sed nisi lacus sed viverra tellus. Purus sit amet volutpat consequat
          mauris. Elementum eu facilisis sed odio morbi. Euismod lacinia at quis
          risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas
          purus viverra accumsan in. In hendrerit gravida rutrum quisque non
          tellus orci ac. Pellentesque nec nam aliquam sem et tortor. Habitant
          morbi tristique senectus et. Adipiscing elit duis tristique
          sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus, quam
        ipsam! Architecto error maiores aliquam accusamus quaerat dolorem non
        blanditiis? Reiciendis quos unde quidem quae pariatur aperiam maxime
        nihil facere possimus et accusamus, error nobis. Non ex optio, rerum
        illo voluptatibus laborum dignissimos quos ad a voluptas numquam rem
        quidem maiores cupiditate magnam itaque tenetur eum tempora nostrum
        quaerat libero porro sunt sapiente velit. Quis, hic magni mollitia quia
        totam dolorum explicabo? Fugiat dignissimos reiciendis veritatis modi a
        repudiandae est, aspernatur suscipit laborum non hic illo delectus
        distinctio earum qui expedita beatae voluptate dolore! Est quia
        asperiores ullam in non, tenetur autem, doloribus exercitationem facere
        quos dolorem libero officiis tempora ea unde. Quasi explicabo molestias
        minus suscipit voluptate reprehenderit cum deserunt doloribus dolore
        cupiditate saepe nostrum, consequatur pariatur accusamus maxime rerum
        eaque error in repellendus qui sed sit, ducimus est! At, aliquam et
        facere suscipit, ea cum eligendi, voluptate cupiditate dolorum id alias
        nobis soluta delectus minima aperiam reiciendis natus sed pariatur
        neque. Aliquam necessitatibus, odit voluptates tempora dolorem est
        itaque fugiat accusamus eligendi accusantium similique omnis eveniet
        reprehenderit perferendis non doloribus molestiae. Incidunt sunt nisi
        voluptate labore quas sint inventore rerum error necessitatibus aperiam
        tempore porro nemo, ex numquam repudiandae quo aliquid earum dignissimos
        vel maxime. Fuga, maxime quasi omnis ex, voluptatem deserunt sint
        nesciunt, cumque perferendis impedit officia delectus possimus
        voluptatibus reprehenderit neque voluptatum! Velit perferendis eaque
        soluta necessitatibus nobis adipisci magnam aut maiores odit laborum
        voluptatibus sunt totam, voluptates odio! Fugit delectus quis qui earum
        quidem unde, blanditiis perferendis exercitationem beatae saepe corrupti
        natus eos temporibus cum numquam ab cupiditate aspernatur error
        molestias dicta animi repudiandae at quasi. Iusto optio aliquid quas
        ipsum! Aspernatur assumenda qui aliquid! Incidunt voluptas libero nemo
        enim totam voluptatum, delectus dolorem, dolore debitis in neque
        voluptate veniam unde cum soluta dolor itaque earum culpa? Quo deleniti
        cupiditate fugiat amet id dolores distinctio nisi inventore facilis
        perspiciatis possimus saepe rerum similique alias esse recusandae hic
        iusto, voluptatum adipisci! Expedita impedit quibusdam tenetur earum
        quos placeat reprehenderit suscipit quae tempore, possimus mollitia,
        animi eius at ipsum reiciendis magnam quo, asperiores dignissimos nobis
        praesentium dolorum! Optio incidunt fuga, commodi accusantium esse animi
        molestiae qui, repellendus est in inventore nam nobis aut excepturi
        sapiente maxime sint. Esse eligendi nemo eos cumque accusamus, sint
        quasi quo vitae reprehenderit, alias corporis, perspiciatis corrupti
        saepe! Magni odit animi blanditiis, eligendi ex dolor eaque quibusdam
        exercitationem sint. Et quo laudantium, nostrum sed placeat architecto,
        expedita illum dolorem quibusdam ipsam incidunt, esse obcaecati totam
        tenetur? Quod voluptatem ducimus eveniet officia quo. Voluptatem
        voluptate nisi magnam quaerat inventore repudiandae nobis quod dicta
        esse sint corporis assumenda rerum, harum fuga perspiciatis maiores
        corrupti doloribus omnis fugit veritatis laborum aliquam illum
        reprehenderit. Similique rerum perspiciatis eum eaque consectetur sed
        officia quas iusto adipisci asperiores! Aliquam perspiciatis ea expedita
        facere. Voluptatibus esse magnam amet accusamus? Quam natus non
        voluptatibus optio illo eligendi itaque hic officiis esse est tempore
        asperiores doloribus, dolore nulla dolorum quasi alias quis! Dignissimos
        repellat laborum expedita neque fugit veniam nam accusantium, qui porro
        at quasi itaque nobis autem incidunt deleniti ipsum eveniet quidem,
        nihil magni. Mollitia laudantium, maiores ipsa itaque esse laboriosam
        minima repellat modi, quam corrupti, eveniet voluptate enim eos.
        Molestias in itaque voluptatum optio! Non exercitationem laborum commodi
        culpa autem odio rerum, eum cupiditate dolores illum, veniam fugit est
        adipisci accusamus quaerat inventore quasi amet molestiae nam totam
        sequi ad sint. Doloribus, fugiat perferendis, repudiandae quisquam quia
        consequatur veritatis esse nulla facere aspernatur, ex eum? Dolores
        velit ducimus blanditiis aut dicta harum, perferendis ab nesciunt
        explicabo sunt eveniet cum corrupti consectetur quia et, nihil accusamus
        nulla delectus dignissimos voluptates natus saepe pariatur sint dolore.
        Vitae nobis dignissimos sapiente, pariatur quae dolor illum quis
        tempore, blanditiis, modi laborum quasi maxime quisquam iste! Maxime est
        veniam dolores quis quia voluptas voluptate facilis, omnis in minus vel
        nihil quae neque? Eius illo laudantium, molestias accusamus quibusdam
        autem voluptate deserunt, voluptatibus, sed velit quidem sunt. Quod
        similique ipsa id reiciendis maxime ex earum necessitatibus atque magnam
        tempore autem beatae iusto vitae, tenetur sapiente, a quia minus omnis
        numquam vel? Accusamus quis eveniet ex magni similique, doloremque
        adipisci molestiae rerum facilis autem sequi. Pariatur nulla totam
        rerum, quisquam nostrum, error eveniet distinctio cum eligendi
        necessitatibus possimus non atque reiciendis, mollitia doloremque? Quia
        perspiciatis excepturi deserunt numquam distinctio aspernatur, earum
        natus temporibus atque eligendi vitae aliquam. Vitae quisquam sed nihil
        aspernatur quasi expedita dolorum dolor consectetur maxime, labore fugit
        aliquid, commodi iure accusantium ipsa laudantium tenetur numquam
        recusandae blanditiis quas modi cumque. Iusto facere animi amet odit
        inventore a ratione voluptatum omnis! Accusamus, aperiam id et voluptate
        facilis sapiente, sint temporibus voluptatem nam nobis laborum vel
        eligendi dolorem adipisci ex atque rerum vitae sed, quidem esse? Alias
        eius vitae ipsum error minus, voluptas nesciunt quos temporibus!
        Delectus quo aut facilis porro quos perspiciatis, dolorem possimus id ut
        officia, ea, culpa dolorum? Blanditiis repellendus amet nemo commodi
        quidem placeat perferendis ullam numquam eos aliquid libero facere,
        accusamus sapiente, expedita obcaecati? Exercitationem quas voluptate,
        atque eveniet doloribus ex voluptas voluptates ipsa consectetur,
        dignissimos, quibusdam repellat magnam nemo tenetur maiores temporibus
        veritatis excepturi obcaecati fugiat reiciendis? Fugit quidem et
        consectetur, dignissimos ducimus ullam ut ad odit nemo quasi unde atque
        magnam similique exercitationem nisi recusandae excepturi harum iusto ex
        esse quibusdam quos ea itaque. Accusamus sapiente voluptatum et optio
        laboriosam consequuntur eos tempora quaerat omnis iste hic, mollitia
        dolore voluptates ex doloremque quasi, alias corrupti? Autem nobis iure,
        expedita libero neque ea tenetur aperiam suscipit odit itaque mollitia
        dicta assumenda ut eligendi unde recusandae optio corrupti, dolorum
        iusto voluptatum reiciendis aut in aliquam architecto. Esse possimus
        beatae assumenda officia, blanditiis quidem a facere ab omnis aliquid.
        Obcaecati dolorem architecto vitae quibusdam vero sit voluptate amet?
        Quae qui id aut est harum cupiditate ad illo impedit quisquam expedita
        minus, delectus aliquid provident deserunt perspiciatis iure neque
        voluptas ipsum. Voluptatibus deserunt, consectetur perspiciatis
        asperiores illum corrupti amet mollitia aliquam laboriosam veritatis,
        facere ipsa saepe atque esse impedit dolore incidunt cum odio velit
        sint? Porro, incidunt unde. Error nihil similique facere.
      </MainBox>
    </Box>
  )
}

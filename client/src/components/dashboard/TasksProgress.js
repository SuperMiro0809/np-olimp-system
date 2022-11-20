import { 
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';
import { orange } from '@mui/material/colors';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';

const TasksProgress = (props) => (
  <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="h6"
          >
            TASKS PROGRESS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h3"
          >
            75.5%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: orange[600],
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={75.5}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
);

export default TasksProgress;

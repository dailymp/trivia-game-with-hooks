import * as React from 'react';
import { QuestionsContainerComponent } from './components/questionsContainer';
import { Card, CardHeader, CardContent, WithStyles, createStyles, withStyles, Button, ButtonBase, StepButton } from "@material-ui/core";


const styles = theme =>
  createStyles({
    card: {
      maxWidth: 400,
      margin: "0 auto",
      alignContent: 'center'
    },
    cardHeader: {
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      padding: 30,
      marginBottom: 60,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'Arial'      
    },
    button: {
marginBottom: 20,
    }
  });
interface State {
  begin: boolean;
}
interface Props extends WithStyles<typeof styles> { }
export class AppInner extends React.Component<Props, State> {

  /**
   *
   */
  constructor(props: Props) {
    super(props);
this.state = { begin: false }
  }

  public render() {
    const { classes } = this.props;

    return (
      <>
        <Card className={classes.card}>
          <CardHeader className= {classes.cardHeader}  title="Welcome to the trivia challenge" />
          <CardContent>
            <div   className={classes.cardHeader} >
              <div className={classes.cardHeader}>You will be presented with 10 true or false questions</div>
              <div className={classes.cardHeader}>Can you score 100%?</div>

              <div  className={classes.card}>
              <Button onClick= { () => this.setState({ begin: true})} 
               variant="contained" color="secondary" className={classes.button}>Begin</Button>
              </div>               
              
            </div>

            { this.state.begin && <QuestionsContainerComponent /> }
          </CardContent>
        </Card>
      </>
    );
  }
}


export const App = withStyles(styles)(AppInner)
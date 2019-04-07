import * as React from 'react';
import { QuestionsContainerComponent } from './components/questionsContainer';
import { Card, CardHeader, CardContent, WithStyles, createStyles, withStyles } from "@material-ui/core";


const styles = theme =>
  createStyles({
    card: {
      maxWidth: 400,
      margin: "0 auto",
      alignContent:'center'
    },
    cardHeader: {
      display: 'flex',
      alignContent: 'center'
    }
  });

interface Props extends WithStyles<typeof styles> { }
export class AppInner extends React.Component<Props> {

  /**
   *
   */
  constructor(props: Props) {
    super(props);
    
  }

  public render() {
    const { classes } = this.props;

    return (
      <>
        <Card className={classes.card}>
          <CardHeader /* className= {classes.cardHeader}  */title="Welcome to the trivia challenge" />
          <CardContent>
            <QuestionsContainerComponent />
          </CardContent>
        </Card>
      </>
    );
  }
}


export const App = withStyles(styles)(AppInner)
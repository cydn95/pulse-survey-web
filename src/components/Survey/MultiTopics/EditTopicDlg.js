import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class EditTopicDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topicName: props.topicName,
      topicComment: props.topicComment,
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      topicName: props.topicName,
      topicComment: props.topicComment,
    });
  }

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSave = () => {
    const { topicName, topicComment } = this.state;
    const { onSave } = this.props;
    if (topicName !== "" && topicComment !== "") {
      onSave(topicName, topicComment);
    }
  };
  render() {
    const { open, onClose } = this.props;
    return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Topic</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Topic Name"
            type="text"
            fullWidth
            name="topicName"
            value={this.state.topicName}
            onChange={(e) => this.handleInput(e)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Topic Comment"
            type="text"
            multiline
            rows={5}
            fullWidth
            name="topicComment"
            value={this.state.topicComment}
            onChange={(e) => this.handleInput(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => onClose(e)} color="primary">
            Cancel
          </Button>
          <Button onClick={(e) => this.handleSave()} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditTopicDialog;

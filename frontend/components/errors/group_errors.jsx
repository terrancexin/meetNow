import React from 'react';

class GroupErrors extends React.Component {
  errorList() {
    const { errors } = this.props;
    if (Array.isArray(errors)) {
    return  errors.map((error, idx) => {
      if (error === "First name") {
        error = "Name can't be blank.";
      } else {
        error += ".";
      }

      return (
        <li className='group-flash-error' key={idx}>
          { error }
        </li>
      );
    });
  }

    return Object.keys(errors).map((error, idx) => {
      let formattedError = error.split("_").join(" ");
      if (formattedError === "email address or password") {
        formattedError += ". Please try again.";
      } else {
        formattedError += ".";
      }

      return (
        <li className='group-flash-error' key={idx}>
          { errors[error].join(", ") + " " + formattedError}
        </li>
      );
    });
  }

  render() {
    if (this.props.errors.length === 0) return null;

    return (
      <div className='group-errors-box'>
        { this.errorList() }
      </div>
    );
  }
}

export default GroupErrors;

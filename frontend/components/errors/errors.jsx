import React from 'react';

class Errors extends React.Component {
  errorList() {
    const { errors } = this.props;
    // debugger
    if (Array.isArray(errors)) {
    return  errors.map((error, idx) => {
      if (error === "First name") {
        error = "Name can't be blank.";
      } else {
        error += ".";
      }

      return (
        <li className='flash-error' key={idx}>
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
        <li className='flash-error' key={idx}>
          { errors[error].join(", ") + " " + formattedError}
        </li>
      );
    });
  }

  render() {
    if (this.props.errors.length === 0) return null;

    return (
      <div className='errors-box'>
        <ul>{ this.errorList() }</ul>
      </div>
    );
  }
}

export default Errors;

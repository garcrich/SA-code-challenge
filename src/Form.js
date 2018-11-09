import React, { Component } from 'react'
import axios from 'axios'
import ReactModal from 'react-modal';
import './App.css'


const ErrorMessage = (props) => (
  <small className="form-error-message">
    {props.message}
  </small>
)

class ContactForm extends Component {

  state = {
    name: '',
    email: '',
    email_2: '',
    telephone: '',
    subject: '',
    message: '',

    emptyName: false,
    emptyEmail: false,
    emptyEmail_2: false,
    emptyTelephone: false,
    emptySubject: false,
    emptyMessage: false,

    emailMismatch: false,
    emailInvalid: false,
    email_2_Invalid: false,

    showModal: false,
    submissionMessage: '',
    submissionErrorMessage: '',
    submissionErrormessageExists: false
  }

  handleCloseModal = () => {
    this.setState({ showModal: false });
  }

  handleInputChange = (event) => {
    const target = event.target
    const value = target.value
    const name = target.name
    this.setState({
      [name]: value
    })
  }

  validateForm = () => {
    const { name, email, email_2, subject, message, emptyName, emptyEmail, emptyEmail_2, emptySubject, emptyMessage, emailMismatch, emailInvalid } = this.state

    let self = this;

    if (
      emptyName === false &&
      emptyEmail === false &&
      emptyEmail_2 === false &&
      emptySubject === false &&
      emptyMessage === false &&
      emailMismatch === false &&
      emailInvalid === false
    ) {
      axios.post('/form-submission', this.state).then(function (response) {
        console.log(response.data);
        self.setState({


          submissionMessage: response.data,
          showModal: true
        })
      }).catch(function (error) {
        self.setState({
          submissionErrormessageExists: true,
          submissionErrorMessage: error
        })
      })
    }
  }

  handleSubmit = (event, callback) => {
    event.preventDefault()

    const validateEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const { name, email, email_2, subject, message, emptyName, emptyEmail, emptyEmail_2, emptySubject, emptyMessage, emailMismatch, emailInvalid } = this.state

    let emptyNameValue, emptyEmailValue, emptyEmail_2Value, emptySubjectValue, emptyMessageValue, emailMismatchValue, emailInvalidValue

    if (name.length <= 0) {
      emptyNameValue = true
    } else {
      emptyNameValue = false
    }

    if (email.length <= 0) {
      emptyEmailValue = true
    } else {
      emptyEmailValue = false
    }

    if (validateEmail.test((this.state.email).toLowerCase()) === false) {
      emailInvalidValue = true
    } else {
      emailInvalidValue = false
    }

    if (email_2.length <= 0) {
      emptyEmailValue = true
    } else {
      emptyEmailValue = false
    }

    if (validateEmail.test((this.state.email_2).toLowerCase()) === false) {
      emptyEmail_2Value = true
    } else {
      emptyEmail_2Value = false
    }

    if (email !== email_2 && (emptyEmail === false || emptyEmail_2 == false)) {
      emailMismatchValue = true
    } else {
      emailMismatchValue = false
    }

    if (subject.length <= 0) {
      emptySubjectValue = true
    } else {
      emptySubjectValue = false
    }

    if (message.length <= 0) {
      emptyMessageValue = true
    } else {
      emptyMessageValue = false
    }

    this.setState({
      emptyName: emptyNameValue,
      emptyEmail: emptyEmailValue,
      emptyEmail_2: emptyEmail_2Value,
      emptySubject: emptySubjectValue,
      emptyMessage: emptyMessageValue,
      emptyName: emptyNameValue,
      emptyEmail: emptyEmailValue,
      emptyEmail_2: emptyEmail_2Value,
      emptySubject: emptySubjectValue,
      emptyMessage: emptyMessageValue,
      emailMismatch: emailMismatchValue,
      emailInvalid: emailInvalidValue
    }, this.validateForm)
  }


  render() {
    const { name, email, email_2, telephone, subject, message, emptyName, emptyEmail, emptyEmail_2, emptyTelephone, emptySubject, emptyMessage, emailMismatch, emailInvalid, email_2_Invalid } = this.state
    return (
      <div>
        <ReactModal
          isOpen={this.state.showModal}
          className="Modal"
          contentLabel="Minimal Modal Example"
        >
        {!this.state.submissionErrormessageExists ? 
          <div className="modal-text-container">
            <h2>{this.state.submissionMessage}</h2>
            <p>We'll get back to you within three to five business days.</p>
            <button className="btn btn-primary send-email-button margin-top-lg" onClick={this.handleCloseModal}>Close Window</button>
          </div>
          :
          <div className="modal-text-container">
            <h2>Our apologies, something went wrong</h2>
            <p>feel free to send us an email or resubmit your message</p>
            <p>email: <a href="mailto:support@silhouetteamerica.com">support@silhouetteamerica.com</a></p>
            <p style={{color: "red"}}>error message: {this.state.submissionErrorMessage} </p>
            <button className="btn btn-primary send-email-button margin-top-lg" onClick={this.handleCloseModal}>Close Window</button>
          </div>
        }
        </ReactModal>
        <form id="form-contact" className="row form-horizontal margin-top-xl col-sm-12" onSubmit={(e) => {
          this.handleSubmit(e, this.sendForm)
        }}>
          <div className="form-group row">
            <label className="control-label text-left col-sm-2">Name:</label>
            <div className="col-sm-8">
              {emptyName === true ?
                <ErrorMessage message="name field empty" /> : ""
              }
              <input type="text" className={`input form-control ${emptyName ? "form-input-invalid" : ""}`} name="name" value={this.state.name} placeholder="Please enter your name" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className="control-label text-left col-sm-2">Email:</label>
            <div className="col-sm-8">

              {emptyEmail ?
                <ErrorMessage message="email address field empty" /> : ""
              }

              {emailInvalid === true && emptyEmail === false ?
                <ErrorMessage message="invalid email address entered" /> : ""
              }
              <input type="text" className={`input form-control ${emptyEmail ? "form-input-invalid" : ""} ${emailInvalid ? "form-input-invalid" : ""}`} name="email" value={this.state.email} placeholder="Please enter your email address" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className="control-label text-left col-sm-2">Verify Email:</label>
            <div className="col-sm-8">

              {emptyEmail_2 ?
                <ErrorMessage message="email address field empty" /> : ""
              }

              {email_2_Invalid === true && emptyEmail_2 === false ?
                <ErrorMessage message="invalid email address entered" /> : ""
              }

              {emailMismatch === true && email_2_Invalid === false && emptyEmail_2 === false ?
                <ErrorMessage message="emails do not match" /> : ""
              }

              <input type="text" className={`input form-control ${emptyEmail_2 === true ? "form-input-invalid" : ""} ${email_2_Invalid === true ? "form-input-invalid" : ""} ${emailMismatch === true ? "form-input-invalid" : ""}`} name="email_2" value={this.state.email_2} placeholder="Re-enter your email for verification" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className="control-label text-left col-sm-2">Telephone: <i>(optional)</i></label>
            <div className="col-sm-8">
              <input type="text" className="input form-control" name="telephone" value={this.state.telephone} placeholder="Please enter your telephone number" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className="control-label text-left col-sm-2">Subject:</label>
            <div className="col-sm-8">
              {emptySubject ?
                <ErrorMessage message="subject field is empty" /> : ""}
              <input type="text" className={`input form-control ${emptySubject ? "form-input-invalid" : ""}`} name="subject" value={this.state.subject} placeholder="Please enter a subject" onChange={this.handleInputChange} />
            </div>
          </div>
          <div className="form-group row">
            <label className="control-label text-left col-sm-2">Message:</label>
            <div className="col-sm-8">
              {emptyMessage ? <ErrorMessage message="message field empty" /> : ""}
              <textarea className={`input email-textarea form-control ${emptyMessage ? "form-input-invalid" : ""}`} name="message" rows="5" value={this.state.message} onChange={this.handleInputChange}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2">
              {/* <div className="g-recaptcha" data-sitekey="6LeqSxMUAAAAABRozidQHaN4gHeEc_I74gW27PWJ">
            <div style={{width: "304px", height: "78px"}}>
              <div>
                <iframe src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LeqSxMUAAAAABRozidQHaN4gHeEc_I74gW27PWJ&amp;co=aHR0cHM6Ly93d3cuc2lsaG91ZXR0ZWFtZXJpY2EuY29tOjQ0Mw..&amp;hl=en&amp;v=v1540794797339&amp;size=normal&amp;cb=agnz9r2fb06v" width="304" height="78" role="presentation" name="a-2nsrfvjgu7df" frameBorder="0" scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox"></iframe>
              </div>
              <textarea id="g-recaptcha-response" name="g-recaptcha-response" className="g-recaptcha-response" style={{width: "250px", height: "40px", border: "1px solid rgb(193, 193, 193)", margin: "10px 25px", padding: "0px", resize: "none", display: "none"}}></textarea>
            </div>
            </div> */}
              <input type="button" className="btn btn-primary send-email-button margin-top-lg" type="submit" value="Submit" />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default ContactForm;
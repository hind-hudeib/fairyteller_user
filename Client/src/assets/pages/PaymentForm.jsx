import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/payment.css";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setCardName(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    const inputCardNumber = e.target.value.replace(/\s/g, "");
    const formattedCardNumber = inputCardNumber
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})/g, "$1 ");

    setCardNumber(formattedCardNumber);
  };

  const handleExpirationDateChange = (e) => {
    let inputExpirationDate = e.target.value.replace(/\s/g, "");

    if (inputExpirationDate.length === 2 && expirationDate.length < 3) {
      inputExpirationDate += "/";
    }

    if (inputExpirationDate.length > 5) {
      inputExpirationDate = inputExpirationDate.substring(0, 5);
    }

    setExpirationDate(inputExpirationDate);
  };

  const handleSecurityCodeChange = (e) => {
    const inputSecurityCode = e.target.value.replace(/\D/g, "");
    const limitedSecurityCode = inputSecurityCode.substring(0, 3);

    setSecurityCode(limitedSecurityCode);
  };

  const validateCardNumber = (string) => /^[0-9]{16}$/.test(string);
  const validateCardCVC = (string) => /^[0-9]{3}$/.test(string);
  const validateNameHolder = (string) => /^[a-zA-Z\s]+$/.test(string);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);

    try {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await axios.get("http://localhost:8000/Verify_token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userId = res.data.userId;
        const userEmail = res.data.email;

        const formData = {
          userId: userId,
          name: cardName,
          email: userEmail,
          cardNumber: cardNumber.replace(/\s/g, ""),
          expirationDate: expirationDate,
          securityCode: securityCode,
          paymentDetails: 10,
        };

        const isCardNumberValid = validateCardNumber(formData.cardNumber);
        const isCardCVCValid = validateCardCVC(formData.securityCode);
        const isNameValid = validateNameHolder(formData.name);

        if (isCardNumberValid && isCardCVCValid && isNameValid) {
          await axios.post("http://localhost:8000/new_subscription", formData);
          console.log("New subscription created!");

          await axios.put(`http://localhost:8000/userSubscription/${userId}`);
          console.log("Subscription updated!");

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Approval Granted Successfully",
            showConfirmButton: false,
            timer: 1800,
          }).then(() => {
            navigate(`/startwrite/${userId}`);
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container-fluid paymentContainer pt-5">
      <div className="container p-5">
        <div className="mb-4 pt-5">
          <h4 className="display-6">Confirm order and pay</h4>
          <span>
            please make the payment, after that you can enjoy all the features
            and benefits.
          </span>
        </div>

        <div className="row">
          <div className="col-md-8">
            <div className="card paymentCard p-3 mb-3">
              <h6 className="text-uppercase">Payment details</h6>
              <div className="inputbox inputPayment mt-3">
                <input
                  type="text"
                  name="card_name"
                  className="form-control paymentForm"
                  required
                  onChange={handleNameChange}
                />
                {isFormSubmitted && !validateNameHolder(cardName) && (
                  <p className="text-danger">
                    enter your fullname should contain no number
                  </p>
                )}
                <span>Name on card</span>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="inputbox inputPayment mt-3 mr-2">
                    <input
                      placeholder="0000 0000 0000 0000"
                      type="text"
                      required
                      onChange={handleCardNumberChange}
                      name="cardNumber"
                      className="form-control"
                      value={cardNumber}
                    />

                    {isFormSubmitted && cardNumber.length < 19 && (
                      <p className="text-danger">
                        Your card number must have 14 valid digits
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-row">
                    <div className="inputbox inputPayment mt-3 mx-2">
                      <input
                        type="text"
                        name="expirationDate"
                        className={`form-control ${
                          isFormSubmitted && !expirationDate ? "pWrong" : ""
                        }`}
                        required
                        onChange={handleExpirationDateChange}
                        value={expirationDate} // Update the value attribute
                      />

                      {isFormSubmitted && !expirationDate && (
                        <p className="text-danger">
                          Please enter a valid expiration date.
                        </p>
                      )}
                      <span>Expiry</span>
                    </div>

                    <div className="inputbox inputPayment mt-3 mr-2">
                      <input
                        placeholder="000"
                        type="text"
                        required
                        onChange={handleSecurityCodeChange}
                        name="securityCode"
                        className="form-control"
                        value={securityCode} // Update the value attribute
                      />

                      {isFormSubmitted && !validateCardCVC(securityCode) && (
                        <p className="text-danger">
                          your card number must have 3 digits only
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="sideCard p-3 mb-3 rounded">
              <span>You have to pay</span>
              <div className="d-flex flex-row align-items-end mb-3">
                <h1 className="mb-0 yellow">$10</h1> <span>.00</span>
              </div>

              <span>
                Enjoy all the features and perks after you complete the payment
              </span>
            </div>

            <div className="mt-4 mb-4 d-flex justify-content-between">
              <button className="btn btn-success px-3" onClick={handleSubmit}>
                Pay $10
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;

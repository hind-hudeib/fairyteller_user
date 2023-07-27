import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/payment.css";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const [card_name, setCardName] = useState("");
  const [card_number, setCardNumber] = useState("");
  const [expiration_date, setExpirationDate] = useState("");
  const [security_code, setSecurityCode] = useState("");
  const [pcardnumber, setCardNum] = useState("pvalidate");
  const [pcvc, setCardCVC] = useState("pvalidate");
  const [pholder, setHolder] = useState("pvalidate");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleNameChange = (e) => {
    setCardName(e.target.value);
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value);
  };

  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value);
  };

  const handleSecurityCodeChange = (e) => {
    setSecurityCode(e.target.value);
  };

  function cardNumber(string) {
    let pattern = /^[0-9]{14}$/;
    return pattern.test(string);
  }

  function cardCVC(string) {
    let pattern = /^[0-9]{3}$/;
    return pattern.test(string);
  }

  function nameHolder(string) {
    let pattern = /^[a-zA-Z\s]*$/;
    return pattern.test(string);
  }
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token") || false;

      if (token) {
        const res = await axios.get(`http://localhost:8000/Verify_token`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });

        const userId = res.data.userId;
        const userEmail = res.data.email;

        const formData = {
          userId: userId,
          name: card_name,
          email: userEmail,
          cardNumber: card_number,
          expirationDate: expiration_date,
          securityCode: security_code,
          paymentDetails: 10,
        };

        // Assuming these are validation functions
        const isCardNumberValid = cardNumber(formData.cardNumber);
        const isCardCVCValid = cardCVC(formData.securityCode);
        const isNameValid = nameHolder(formData.name);

        if (isCardNumberValid && isCardCVCValid && isNameValid) {
          await axios.post("http://localhost:8000/new_subscription", formData);
          console.log("New subscription created!");

          await axios.put(
            `http://localhost:8000/userSubscription/${formData.userId}`
          );
          console.log("Subscription updated!");

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Approval Granted Successfully",
            showConfirmButton: false,
            timer: 1800,
          }).then(() => {
            const savedText = sessionStorage.getItem("content");
            navigate(`/startwrite/${userId}`);
          });
        } else {
          if (!isCardNumberValid) {
            setCardNum("pWrong");
          }
          if (!isCardCVCValid) {
            setCardCVC("pWrong");
          }
          if (!isNameValid) {
            setHolder("pWrong");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

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
                {isFormSubmitted && !nameHolder(card_name) && (
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
                      name="card_number"
                      className="form-control"
                    />
                    {isFormSubmitted && !cardNumber(card_number) && (
                      <p className="text-danger">
                        your card number must have 14 valid digits
                      </p>
                    )}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="d-flex flex-row">
                    <div className="inputbox inputPayment mt-3 mr-2">
                      <input
                        type="text"
                        name="expiration_date"
                        className="form-control"
                        required
                        onChange={handleExpirationDateChange}
                      />
                      <span>Expiry</span>
                    </div>

                    <div className="inputbox inputPayment mt-3 mr-2">
                      <input
                        placeholder="000"
                        type="text"
                        required
                        onChange={handleSecurityCodeChange}
                        name="security_code"
                        className="form-control"
                      />
                      {isFormSubmitted && !cardCVC(security_code) && (
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

import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { HomeContext } from "../../providers/HomeProvider";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useContext(HomeContext);

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [constructedDate, setConstructedDate] = useState();
  const [purchaseDate, setPurchaseDate] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const registerClick = (e) => {
     e.preventDefault();
      if (password && password !== confirmPassword) {
        alert("Passwords don't match. Do better.");
      } else {
        const homeProfile = { firstName, lastName, email, constructedDate };
        register(homeProfile, password)
          .then(() => navigate("/select"));
      }
   
 };

  return (
    <Form onSubmit={registerClick}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="constructedDate">What year was your home constructed?</Label>
          <Input id="constructedDate" type="date" onChange={e => setConstructedDate(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="purchaseDate">Closing Date</Label>
          <Input id="purchaseDate" type="date" onChange={e => setPurchaseDate(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Register</Button>
        </FormGroup>
      </fieldset>
    </Form>
  );
}
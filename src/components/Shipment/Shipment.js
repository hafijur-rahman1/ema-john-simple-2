import React, { useContext } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { userContext } from '../../App';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
   const [loggedInUser, setLoggedInUser] = useContext(userContext)
   
    const onSubmit = data => console.log(data);

  console.log(watch("example")); // watch input value by passing the name of it

  return (
   
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      
      <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Name"/>
      {errors.name && <span>Name is required</span>}

      <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })}  placeholder="Email" />
      {errors.email && <span>Email is required</span>}

      <input name="phone" ref={register({ required: true })}  placeholder="Phone" />
      {errors.phone && <span>Phone is required</span>}

      <input name="address" ref={register({ required: true })}  placeholder="Address" />
      {errors.address && <span>Address is required</span>}
   
      
      <input type="submit" />
    </form>
  );
};

export default Shipment;
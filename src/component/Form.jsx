import * as React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import *  as yup from 'yup'
// import "yup-phone-lite"; C:\Program Files\MongoDB\Server\6.0\data\
import { yupResolver } from '@hookform/resolvers/yup'
import "yup-phone";
const Container = styled.div`
  background: #a2ccd3;
  height: 135vh;
  padding-left:50px;
  padding-right:0px;
`
const Details = styled.div`
  flex-wrap:wrap;
  padding:0;
  width: fit-content;
  justify-content: space-evenly;

`
const Buttoncontain = styled.div`
   background: #a2ccd3;
`
const Button = styled.button`
  width: 100px;
  height: 50px;
  margin:20px;
  position: absolute; 
`
const Head = styled.h3`
  margin-top:0px;
  padding-top:20px;
  padding-left:10px;
  text-decoration:underline;
`
const Pcontainer = styled.div`
  display: inline-flex;
  flex:wrap;
  margin-right:30px;
  height: 50%;
  padding-left:20px;
  
`
const Label = styled.label`
  padding-left:20px;
  margin-top:5px;
  
`
const Input = styled.input`
  padding: 5px;
  margin: 0.5em;
  /* border: none; */
  border-radius: 3px;
  width: 300px;
`;
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object({
  name: yup.string().required('name is required').required(),
  age: yup.string().required('age is required').required(),
  sex: yup.string().required('gender is required').required(),
  phone:yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  address:yup.string().required("adresss").required(),
  // govtId:yup.string().required("enter adagr")
})
export default function From() {
  const [value, setValue] = React.useState("");
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [cont, setcont] = React.useState("India");
  const contClear = () => {
    setcont("");
  };

  const handleClear = () => {
    setValue("");
  };
  
  const onSubmit = async (values) => {
    // e.preventDefault();
    console.log(values);
    const formData = {
      name:values.name,
      sex:values.sex,
      age:values.age,
      phone:values.phone,
      address:values.address,
      govtIdType:values.govtIdType,
      govtId:values.govtId,
      guardian:values.guardian,
      guardianName:values.guardianName,
      nationality:values.nationality
    };

    const response = await fetch('http://localhost:5000/api/formdata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message)
    console.log(data);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Details>
          <Head>Personal Details</Head>
          <Pcontainer style={{ flex: 2 }}>
            <Label htmlFor='name'>Name</Label>
            <span style={{ color: "red" }}>*</span>
            <Input placeholder='Enter your name' type='text' className='form-control' {...register("name", { required: "true" })} />
            {errors.name && (<div style={{ color: "red", display: "block" }}>{errors.name.message}</div>)}
          </Pcontainer>
          <Pcontainer style={{ flex: 2 }}>
            <Label htmlFor='age'>Date of Birth or Age</Label>
            <span style={{ color: "red" }}>*</span>
            <Input placeholder='enter your age' type='number' {...register("age", { required: "true" })} />
            {errors.age && (<div style={{ color: "red", display: "block" }}>{errors.age.message}</div>)}
          </Pcontainer>
          <Pcontainer style={{ flex: 1 }}>
            <Label htmlFor='sex'>Sex</Label>
            <span style={{ color: "red" }}>*</span>
            <select {...register("sex", { required: "true" })} style={{ paddingTop: "0px", margin: "5px", height: "28px", }}>
              <option  value="">Sex</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.sex && (<div style={{ color: "red", display: "block" }}>{errors.sex.message}</div>)}
          </Pcontainer>
          <Pcontainer style={{ flex: 2 }}>
            <Label htmlFor='phone'>Mobile</Label>
            <Input placeholder='enter mobile number' {...register("phone", { required: "true" })} />
            {errors.phone && (<div style={{ color: "red", display: "block" }}>{errors.phone.message}</div>)}
          </Pcontainer>
          <Pcontainer style={{ flex: 2 }}>
            <Label htmlFor='govtIdType'>Govt Issued ID</Label>
            <select {...register("govtIdType", { required: "true" })} style={{ paddingTop: "0px", margin: "5px", height: "28px", }}>
              <option placeholder='ID Type' value="">ID Type</option>
              <option value="Aadhar">Adhar Card</option>
              <option value="PAN">Pan Card</option>
            </select>
            <Input placeholder='enter id' type="text" {...register("govtId", { required: "true" })} />
            {/* {errors.sex && (<div style={{ color: "red", display: "block" }}>{errors.govtId.message}</div>)} */}
          </Pcontainer>
        </Details>
        <Details>
          <Head>Contact Details</Head>
          <Pcontainer>
            <Label htmlFor='guardian'>Guardian Details</Label>
            <select  {...register("guardian", { required: "true" })} style={{ paddingTop: "0px", margin: "5px", height: "28px", }}>
              <option  value="">Enter Guardian</option>
              <option value="father">Father</option>
              <option value="mother">Mother</option>
              <option value="other">Other</option>
            </select>
            <Input placeholder='enter name' {...register("guardianName", { required: "true" })}/>
          </Pcontainer>
          <Pcontainer style={{ flex: 1 }}>
            <Label>Email</Label>
            <Input placeholder='enter email' />
          </Pcontainer>
          <Pcontainer style={{ flex: 1 }}>
            <Label>Emergency Contact Number</Label>
            <Input placeholder='emergancy contact number' />
          </Pcontainer>
        </Details>
        <Details>
          <Head>Address Details</Head>
          <Pcontainer style={{ flex: 1 }}>
            <Label htmlFor='address'>Address</Label>
            <Input placeholder='enter address' {...register("address", { required: "true" })} />
          </Pcontainer>
          <Pcontainer style={{ flex: 1 }}>
            <Label>State</Label>
            <select placeholder='ID Type' style={{ paddingTop: "0px", margin: "5px", height: "28px", }}>
              <option placeholder='ID Type' value="">Enter State</option>
              <option value="assm">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Uttar Pradesh">uttar prAdesh</option>
              <option value="Madhya Pradesh">Madhya prAdesh</option>
            </select>
          </Pcontainer>
          <Pcontainer style={{ flex: 1 }}>
            <Label>City</Label>
            <select placeholder='ID Type' name="pets" id="pet-select" style={{ paddingTop: "0px", margin: "5px", height: "28px", }}>
              <option placeholder='ID Type' value="">Enter City</option>
              <option value="assm">Assam</option>
              <option value="Bihar">Bihar</option>
              <option value="Uttar pradesh">uttar prAdesh</option>
              <option value="Madhya pradesh">Madhya prAdesh</option>
            </select>
          </Pcontainer>
          <Pcontainer>
            <Label>Country</Label>
            <input  type="text" value={cont} onChange={handleChange} />
            {/* {value && ( */}
            <button type="button" onClick={contClear}>
              X
            </button>
            {/* // )} */}
          </Pcontainer>
          <Pcontainer style={{ flex: 1 }}>
            <Label>Pincode</Label>
            <Input placeholder='enter pincode' />
          </Pcontainer>
        </Details>
        <Details>
          <Head>Other Details</Head>
          <Pcontainer style={{ flex: 1 }}>
            <Label>Occupation</Label>
            <Input placeholder='enter occupation' />
          </Pcontainer>
          <Pcontainer style={{ flex: 1 }}>
            <Label>Religion</Label>
            <select placeholder='ID Type' name="pets" id="pet-select" style={{ paddingTop: "0px", margin: "5px", height: "28px", }}>
              <option placeholder='ID Type' value="">Enter religion</option>
              <option value="indian">Indian</option>
              <option value="an card">Muslim</option>
            </select>
          </Pcontainer>
          <Pcontainer style={{ flex: 1 }}>
            <Label>Marital Status</Label>
            <select placeholder='ID Type' name="pets" id="pet-select" style={{ paddingTop: "0px", margin: "5px", height: "28px", }}>
              <option placeholder='ID Type' value="">Marital status</option>
              <option value="adhar card">Always Single</option>
              <option value="an card">Single</option>
              <option value="an card">Married</option>
            </select>
          </Pcontainer>
          <Pcontainer style={{ flex: 1 }}>
            <Label>Blood Group</Label>
            <select placeholder='ID Type' name="pets" id="pet-select" style={{ paddingTop: "0px", margin: "5px", height: "28px", }}>
              <option placeholder='ID Type' value="">Enter Blood Group </option>
              <option value="adhar card">O+</option>
              <option value="an card">O-</option>
            </select>
          </Pcontainer>
          <Pcontainer style={{ flex: 1 }}>
            <Label htmlFor='nationality'>Nationality</Label>
            <Input  {...register("nationality", { required: "true" })} placeholder='enter nationality' />
          </Pcontainer>
        </Details>
        <Buttoncontain>
          <Button style={{ color: "red", right: "200px" }} type='reset'> CANCEL   (ESC)</Button>
          <Button style={{ color: "white", backgroundColor: "darkgreen", right: "50px" }}> SUBMIT     (X.S)</Button>
        </Buttoncontain>
      </form>
    </Container>
  );
} 

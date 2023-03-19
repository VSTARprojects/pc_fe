import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "react-bootstrap";
import { MdLogin } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function FormDetail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  //state for image
  let [img, setImg] = useState(null);

  //on image select
  const onImageSelect = (event) => {
    
    setImg(event.target.files[0]);
    // setFile(event.target.files[0])
    //console.log(event.target.files[0]);
  //  console.log(event);
  };

  const navigate = useNavigate();

  const onFormSubmit = (sample) => {
    let config = {
      headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": "Token ce3b119c6856ae942772f8c1693ddff40d574959",
      }
    }

    console.log(sample)
    // TODO: replace the hardcoded data below with sample attributes, once frontend is done

    let formData = new FormData();
    formData.append("owner", 2);
    formData.append("patient", 2);
    formData.append("date_collected", "2023-03-01T14:23:10Z");
    formData.append("diagnosis_code", "23432");
    formData.append("type", "biopsy");
    formData.append("origin", "Urine");
    formData.append("comments", "");
    formData.append("symptoms", "");
    formData.append("image", img);
    // formData.append("human_label", "adenocarcinoma");

    axios
      .post("http://127.0.0.1:8000/api/v1/samples/", formData, config)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
        alert("Something went wrong in creating the sample");
      });

    

   };

  return (
    <Container>
      <div className="display-2 text-center text-info">Form</div>
      <div className="row  ">
        <div className="col-12 col-sm-8 col-md-6  mx-auto">
          <Form onSubmit={handleSubmit(onFormSubmit)} >
            {/* username */}
            <Form.Group className="mb-3">
              <Form.Label>patient Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...register("patientName", { required: true })}
              />
              {/* validation error message for username */}
              {errors.patientName && (
                <p className="text-danger">* name is required</p>
              )}
            </Form.Group>

            {/* patientId */}
            <Form.Group className="mb-3">
              <Form.Label>Id</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter patient ID"
                {...register("pid", { required: true })}
              />
              {/* validation error message for patientId */}
              {errors.pid && (
                <p className="text-danger">* ID is required</p>
              )}
            </Form.Group>

            {/* email */}
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                {...register("email", { required: true })}
              />
              {/* validation error message for password */}
              {errors.email && (
                <p className="text-danger">* Email is required</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Collection</Form.Label>
              <Form.Control
                type="date"
                placeholder="select date"
                {...register("collection_date", { required: true })}
              />
              {/* validation error message for date */}
              {errors.collection_date && (
                <p className="text-danger">* date is required</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter type"
                {...register("type", { required: true })}
              />
              {/* validation error message for password */}
              {errors.type && <p className="text-danger">* City is required</p>}
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Select image</Form.Label>
              <Form.Control
                type="file"
                {...register("photo", { required: true })}
                 onChange={(event) => onImageSelect(event)}

              />
              {/* validation error message for password */}
              {errors.photo && (
                <p className="text-danger">* image is required</p>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Predict <MdLogin />
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}

export default FormDetail
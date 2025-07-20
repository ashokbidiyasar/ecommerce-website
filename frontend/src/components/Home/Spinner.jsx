import { Spinner } from "react-bootstrap";

const NewSpinner = ()=>{
  return (  
  <div className="flex justify-center w-full items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}


export default NewSpinner;
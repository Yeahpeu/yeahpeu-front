import { Link } from "react-router-dom";

const TestResultPage = () => {
  return (
    <>
      <div>Test Result</div>
      <p>test success!</p>
      <Link to="/test">Back</Link>
    </>
  );
};

export default TestResultPage;

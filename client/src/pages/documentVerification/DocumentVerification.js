import Iframe from "react-iframe";
import "./docuCss.css";
function DocumentVerification() {
  return (
    <div className="iframeContainer">
      <Iframe
        url="https://form.jotform.com/223367236310247"
        allowFullScreen
        frameBorder={0}
        className="iframe"
        title="DocumentVerification"
      />
    </div>
  );
}

export default DocumentVerification;

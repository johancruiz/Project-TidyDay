import { Row, Col } from "react-bootstrap";
import Searchbar from "./Searchbar";
import Icon from "./Icon";

function TopBar() {
  return (
    <>
      <div className="mode-user">
        <div className="top-bar" id="color_carts">
          <Row>
            {" "}
            <Col md={5} >
              <Searchbar />
            </Col>
            <Col md={3}></Col>
            <Col md={4}>
              <Icon />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
export default TopBar;

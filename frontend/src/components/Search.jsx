import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Search = () => {
    return (
        <div
            className='px-2'>
            <Form inline
            >
                <Row>
                    <Col xs="auto">
                        <Form.Control
                            style={{
                                border: "solid 2px #0DCAF0",
                                borderRadius: "20px"
                            }}
                            type="search"
                            placeholder="Search"
                        />
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Search

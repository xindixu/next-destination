import React, {useState} from "react";
import { Toast } from "react-bootstrap";

const ToastNote = (message) => {
    const [showA, setShowA] = useState(true);
    const toggleShowA = () => setShowA(!showA);

    return (
        <Toast show={showA} onClose={toggleShowA} style={{margin: 'auto'}}
        >
            <Toast.Header style={{margin:'auto'}}>
                <strong style={{color:'red'}}>Error</strong>
            </Toast.Header>
            <Toast.Body>
                Data is not found.
            </Toast.Body>
        </Toast>
        );
};
    
export default ToastNote;
import React, { useState } from 'react';
import { Badge, Button, Image } from 'react-bootstrap';
import { ReactComponent as ArrowUp } from '../../static/images/svg/Arrow bar up.svg';
import { ReactComponent as Edit } from '../../static/images/svg/Pencil square.svg';

const ImageUpload = ({ handleChange, product }) => {
    const [image, setImage] = useState(product ? product.image : null);

    const handleUploadClick = () => {
        // Trigger the file selection dialog when the button is clicked
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (function() { return function(e) { setImage(e.target.result); }; })(file);
            reader.readAsDataURL(file);
        }
        handleChange(e);
    };

    return (
        <div className='border rounded'>
            <input id='fileInput' type="file" className='d-none' name="image" accept="image/*" onChange={handleFileChange} />
            {!image ? (
                <>
                    <div className='d-flex justify-content-center'>
                        <ArrowUp className='mt-4' />
                    </div>
                    <div className='d-block d-flex justify-content-center'>
                        <Button onClick={handleUploadClick} className='mt-5 mb-3 w-75' variant='primary'>
                            Upload
                        </Button>
                    </div>
                </>
            ) : (
                <div style={{ position: 'relative' }}>
                    <Image src={image} alt='Product' className='w-100' style={{ height: '179px'}} />
                    <Badge className='position-absolute bottom-0 start-0 rounded-circle' style={{ cursor: 'pointer' }}>
                        <Edit onClick={handleUploadClick} stroke="white"/>
                    </Badge>
                </div>
            )}
        </div>
    );
};

export default ImageUpload;

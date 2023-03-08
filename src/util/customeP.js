import Paragraph from 'antd/es/typography/Paragraph';
import {React, useState} from 'react';

function CustomeP(props) {
    const [visible, setVisible] = useState(false);
    const {description} = props;
    
    return(
        <Paragraph ellipsis={!visible}>
            <a onClick={()=>setVisible(!visible)}>{visible ? "show less":"show more"} </a>

            {description}
            
        </Paragraph>
    )
}

export default CustomeP
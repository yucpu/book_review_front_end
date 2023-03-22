import Paragraph from 'antd/es/typography/Paragraph';
import { useEffect } from 'react';
import {React, useState} from 'react';
import { useData } from '../data';

function CustomeP(props) {
    const context = useData();
    const [visible, setVisible] = useState(false);
    const {description} = props;

    useEffect(()=>{
        setVisible(false);
    },[context.result, context.commentShow])
    
    return(
        <Paragraph ellipsis={!visible}>
            <a onClick={()=>setVisible(!visible)}>{visible ? "show less":"show more"} </a>

            {description}
            
        </Paragraph>
    )
}

export default CustomeP
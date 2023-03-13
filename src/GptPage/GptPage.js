import React, { useMemo } from 'react';
import { useData } from '../data';
import '../GptPage/GptPage.css';
import { List, Typography } from 'antd';


const { Text } = Typography;
function GptPage() {
    const context = useData();
    return useMemo(() => {
        return <div className='RelatedBook'>
            <List
                header={<Text strong>ChatGPT Book Suggestion</Text>}
                bordered
                itemLayout="vertical"
                split={true}
                dataSource={context.gptSuggest}
                loading={context.chatLoading}
                renderItem={(item, index) => (
                    <List.Item>
                        <Text
                            ellipsis={{ tooltip: item }}
                            onClick={() => context.setQuery(item)}
                            style={{ color: '#1890ff' }}
                        >
                            {index+1 + ". " + item}
                        </Text>
                    </List.Item>
                )}
            />
        </div>
    }, [context.gptSuggest, context.chatLoading, context.query])
}

export default GptPage
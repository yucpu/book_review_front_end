import { List, Modal, Avatar} from 'antd';
import React, { useMemo } from 'react';
import '../BookDetail/Comments.css';
import { useData } from '../data';


function Comments() {
    const context = useData();


    return useMemo(() => {
        return (
            <Modal id='BookDetail' open={context.commentShow} 
            onCancel={() => context.setCommentShow(false)}
            footer={null}
            >
                <List
                    itemLayout="horizontal"
                    dataSource={context.comments}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={require("../resources/gamer.png")} />}
                                title={<a href="https://ant.design">{item.user}</a>}
                                description={item.comments}
                            />
                        </List.Item>
                    )}
                />
            </Modal>
        )
    }, [context.book, context.commentShow])
}
export default Comments;
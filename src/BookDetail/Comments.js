import { List, Modal, Avatar} from 'antd';
import React, { useMemo } from 'react';
import '../BookDetail/Comments.css';
import { useData } from '../data';


function Comments() {
    const context = useData();

    const pagination = {
        position: 'bottom',
        align: 'center',
        pageSize: 10,
        size: 'default',
        total: context.comments.length,
        showSizeChanger: false
      }

    return useMemo(() => {
        return (
            <Modal id='BookDetail' open={context.commentShow} 
            onCancel={() => context.setCommentShow(false)}
            footer={null}
            width={"50%"}
            bodyStyle={{height:"500px"}}
            title="Reader Comments"
            >
                <List
                    itemLayout="horizontal"
                    pagination={pagination}
                    split={true}
                    dataSource={context.comments}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={require("../resources/gamer.png")} />}
                                title={item.user}
                                description={item.comment}
                            />
                            {item.comment}
                        </List.Item>
                    )}
                />
            </Modal>
        )
    }, [context.book, context.commentShow, context.comments])
}
export default Comments;
import { List, Modal, Avatar, Rate} from 'antd';
import React, { useMemo } from 'react';
import '../BookDetail/Comments.css';
import { useData } from '../data';
import Graph from '../GraphPage/Graph';

import CustomeP from '../util/customeP';


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
                    itemLayout="vertical"
                    pagination={pagination}
                    split={true}
                    dataSource={context.comments}
                    renderItem={(item, index) => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={require("../resources/gamer.png")} />}
                                title={item.user_id}
                                description={<Rate defaultValue={item.score} allowHalf={true} disabled/>}
                            />
                            {<CustomeP description={item.review_text}/>}
                        </List.Item>
                    )}
                />
                {/* <Graph/> */}
            </Modal>
        )
    }, [context.book, context.commentShow, context.comments])
}
export default Comments;
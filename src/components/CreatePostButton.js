import React, {Component} from 'react';
import { Modal, Button, message } from 'antd';
import CreatePostForm from "./CreatePostForm";

class CreatePostButton extends Component {
    state = {
        visible: true,
        confirmLoading: false
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        console.log('ok')
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    getFormRef = () => {

    }

    render() {
    const { visible, confirmLoading } = this.state;
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Create New Post
                </Button>
                <Modal
                    title="Create New Post"
                    visible={visible}
                    onOk={this.handleOk}
                    okText='Create'
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <CreatePostForm ref={this.getFormRef}/>
                </Modal>
            </div>

        );
    }
}

export default CreatePostButton;
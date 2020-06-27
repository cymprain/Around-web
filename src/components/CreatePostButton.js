import React, {Component} from 'react';
import { Modal, Button, message } from 'antd';
import {TOKEN_KEY, API_ROOT, AUTH_HEADER, POS_KEY} from "../constants";
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
        this.form.validateFields((err, values) => {
            console.log(values);

            // send files to the server
            if (!err) {
                // url (token, position)
                const token = localStorage.getItem(TOKEN_KEY);
                const { lat, lon } = JSON.parse(localStorage.getItem(POS_KEY));

                // file
                const formdata = new FormData();
                formdata.set('lat', lat);
                formdata.set('lon', lon);
                formdata.set('message', values.message);
                formdata.set('image', values.image[0].originFileObj);

                // send
                fetch(`${API_ROOT}/post`, {
                    method: "POST",
                    headers: {
                        Authorization: `${AUTH_HEADER} ${token}`
                    },
                    body: formdata
                }).then( response => {
                    if (response.ok) {
                        return this.props.loadNearbyPosts();
                    }
                    throw new Error('Failed to create post.');
                }).then(() => {
                        this.setState({ visible: false, confirmLoading: false });
                        this.form.resetFields();
                        message.success('Post created successfully!');
                }).catch((e) => {
                    console.error(e);
                    message.error('Failed to create post.');
                    this.setState({ confirmLoading: false });
                })
            }
        })
    };

    handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };

    getFormRef = (formInstance) => {
        this.form = formInstance;
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
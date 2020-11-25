import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuestions, selectModalVisible, selectModalLoading } from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions, Button, Divider, Input, Form, Modal } from 'antd';

const QAAddQuestion = ({ productId }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const visible = useSelector(selectModalVisible);
  const loading = useSelector(selectModalLoading);

  var showModal = () => {
    dispatch({type: 'SET_MODAL_VISIBLE', payload: true});
  };

  var handleSubmit = (values) => {
    console.log(values);
    values['product_id'] = productId;
    dispatch({type: 'SET_MODAL_LOADING', payload: true});
    fetch('http://3.21.164.220/qa/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then((res) =>{
        console.log(res);
        dispatch(fetchQuestions(productId));
        dispatch({type: 'SET_MODAL_LOADING', payload: false});
        dispatch({type: 'SET_MODAL_VISIBLE', payload: false});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var authenticateSubmit = () => {

  };

  var validateEmail = function(address) {
    var letters = address.split('');
    var split = address.split('@');
    var username = split[0];
    var domainName = split[1];
    var splitAtPeriod = address.split('.');
    if (address.length <= 5) {
      return false;
    } else if (split.length !== 2) {
      return false;
    } else if (username.length < 1 || domainName.length < 1) {
      return false;
    } else if (domainName[domainName.length - 1] === '.') {
      return false;
    } else if (splitAtPeriod.indexOf('') !== -1 || letters.indexOf(' ') !== -1) {
      return false;
    } else {
      return true;
    }
  };

  var handleCancel = () => {
    dispatch({type: 'SET_MODAL_VISIBLE', payload: false});
  };

  return (
    <>
      <Button onClick={showModal}>Ask A Question</Button>
      <Modal
        visible={visible}
        title="Add a question"
        onCancel={handleCancel}
        footer={[
        ]}
      >
        <Form
          form={form}
          layout="horizontal"
          name='questionForm'
          onFinish={handleSubmit}
        >
          <Form.Item name="body" label="Question">
            <Input.TextArea rows={5} placeholder="Please ask a question"></Input.TextArea>
          </Form.Item>
          <Form.Item name="name" label="Username">
            <Input.TextArea placeholder="Example: jackson11!"></Input.TextArea>
          </Form.Item>
          <p style={{fontSize: '10px'}}>For privacy reasons, do not use your full name or email address</p>
          <Form.Item name="email" label="Email">
            <Input.TextArea placeholder="Please enter your email"></Input.TextArea>
          </Form.Item>
          <p style={{fontSize: '10px'}}>For authentication reasons, you will not be emailed</p>
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>
          <Button key="submit" loading={loading} htmlType="submit">
          Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default QAAddQuestion;
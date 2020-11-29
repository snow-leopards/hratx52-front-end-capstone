import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Button, Modal, Form, Input, Radio, Upload, DatePicker, Rate } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { selectMetaData, selectReview, postReview } from '../../reducers/ratingsReducers';

//form itself
const NewReviewForm = ({ visible, onCreate, onCancel }) => {
  //form instance
  const [form] = Form.useForm();
  //data from store
  const metaData = useSelector(selectMetaData);

  //Photo upload action
  const normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  //conditional rendering of product characteristics radio group
  const ProductCharacteristics = () => {
    var characteristicsArray = [];
    //Put each characteristic obj in array with new item of title[key]
    for (var category in metaData.characteristics) {
      var newChar = metaData.characteristics[category];
      newChar.charName = category;
      characteristicsArray.push(newChar);
    }
    return <div>
      {
        characteristicsArray.map((char) => (
          <div key={char.id}>
            <Form.Item
              key={char.id * 23}
              name={char.id}
              label={char.charName}
              rules={[
                {
                  required: true,
                  message: 'Please select an answer'
                }
              ]}>
              <Radio.Group key={char.id * 13}>
                <Radio value="1">Poor</Radio>
                <Radio value="2">Below Average</Radio>
                <Radio value="3">Average</Radio>
                <Radio value="4">Great</Radio>
                <Radio value="5">Perfect</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        ))
      }
    </div>;
  };

  return (
    <Modal
      visible={visible}
      title="Create a new review!"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please input Name',
            },
          ]}
        >
          <Input
            placeholder="Example: jackson11!"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          extra="For authentication reasons, you will not be emailed."
          rules={[
            {
              required: true,
              message: 'Please input email.',
            },
          ]}
        >
          <Input
            placeholder="Example: jackson11@email.com"
          />
        </Form.Item>

        <Form.Item
          name="date"
          label="Select Date"
          rules={[{ type: 'object', required: true, message: 'Please select a date' }]}>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>

        <Form.Item
          name="rating"
          label="Rate"
          rules={[
            {
              required: true,
              message: 'Please rate product'
            }
          ]}>
          <Rate />
        </Form.Item>

        <Form.Item
          name="summary"
          label="Review Summary"
          rules={[
            {
              max: 60,
              message: 'Please keep summaries at max 60 chars',
            },
          ]}
        >
          <Input
            type="textarea"
            placeholder="Example: Best purchase ever!"
          />
        </Form.Item>

        <Form.Item
          name="body"
          label="Review Body"
          rules={[
            {
              required: true,
              min: 50,
              max: 1000,
              message: 'Please submit review with max 1000 chars',
            },
          ]}
        >
          <Input
            type="textarea"
            placeholder="Why did you like the product or not?"
          />
        </Form.Item>

        <Form.Item
          name="recommend"
          className="recommend"
          label="Would you recommend this product?"
          rules={[
            {
              required: true,
              message: 'Please select an answer'
            }
          ]}
        >
          <Radio.Group>
            <Radio value="true">Yes</Radio>
            <Radio value="false">No</Radio>
          </Radio.Group>
        </Form.Item>

        <ProductCharacteristics/>

        <Form.Item
          name="photos"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          extra="max of 5 pictures"
        >
          <Upload
            name="logo"
            action="/upload.do"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Click to upload a photo</Button>
          </Upload>
        </Form.Item>

      </Form>
    </Modal>
  );
};

//Logic for form functionality/what should be referenced from parent component
const NewReview = (props) => {
  //onclick make form visible
  const [visible, setVisible] = useState(false);
  //dispatch invocation
  const dispatch = useDispatch();
  const review = useSelector(selectReview);
  //successful submit of form
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setVisible(false);
    //dispatch values to review
    var review = {
      characteristics: {}
    };

    for (var key in values) {
      // console.log("loglogloglog", parseInt(key).toString() !== 'NaN', parseInt(key).toString());
      if (parseInt(key).toString() !== 'NaN') {
        // add to characteristics object
        review.characteristics[key] = values[key];
      } else if (values.photos === undefined) {
        review.photos = [];
      } else if (key !== 'date') {
        review[key] = values[key];
      }
    }

    console.log('reviewBefore', review);
    review['product_id'] = props.productId;
    dispatch({ type: 'SET_REVIEW', payload: review });
    dispatch(postReview(review));
    console.log('reviewComplete', review);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Create New Review
      </Button>
      <NewReviewForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default NewReview;
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchQuestions } from '../reducers/QAReducers';
import { selectProduct } from '../reducers/overviewReducers';
import { Layout, Row, Col, Image, Descriptions, Button, Divider, Input } from 'antd';

const QASearch = ({ questions, productId }) => {
  const { Search } = Input;
  const dispatch = useDispatch();

  const searchQuestions = (event) => {
    if (event.target.value.length >= 3) {
      var filtered = [];
      var target = event.target.value.toUpperCase();
      for (var i = 0; i < questions.length; i++ ) {
        var body = questions[i].question_body.toUpperCase();
        if (body.indexOf(target) !== -1) {
          var alreadyFiltered = false;
          for (var k = 0; k < filtered.length; k++) {
            if (questions[i].question_id === filtered[k].question_id) {
              alreadyFiltered = true;
            }
          }
          if (!alreadyFiltered) {
            filtered.push(questions[i]);
          }
        }
      }
      dispatch({type: 'SET_QA', payload: filtered});
    } else {
      dispatch(fetchQuestions(productId, 4));
    }
  };

  //create state component for the searched text that updates using onChange

  return (
    <Search
      placeholder="Have a question? Search for answers..."
      allowClear
      onChange={searchQuestions}
    ></Search>
  );
};

export default QASearch;

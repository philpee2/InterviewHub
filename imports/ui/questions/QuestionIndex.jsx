import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data';
import { Questions } from '../../api/questions/questions.js';
import QuestionShape from '../shapes/QuestionShape';

const propTypes = {
  questions: PropTypes.arrayOf(QuestionShape).isRequired,
};

function QuestionIndex({ questions }) {
  return (
    <div>
      <ul>
        {questions.map(({ _id, title }) => {
          return (
            <li key={_id}>
              <Link to={`/${_id}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

QuestionIndex.propTypes = propTypes;

export default createContainer((props) => {
  Meteor.subscribe('questions.approved');
  return Object.assign(
    { questions: Questions.find({ status: 'approved' }).fetch() },
    // Pass through everything that came from the router
    props
  );
}, QuestionIndex);

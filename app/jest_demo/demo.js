import React from 'react';

const CommentItem = props => (
  <div>
    {
      props.list.map((item, index) => <p key={index}>{item}</p>)
    }
    <button className={props.list.length > 3 ? 'btn-expand' : ''}>展开/收起</button>
  </div>
)
export default CommentItem

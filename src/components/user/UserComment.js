import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
function UserComment({ replies }) {
  const { Column } = Table;
  return (
    <div>
      <Table pagination={true} dataSource={replies}>
        <Column
          title="카테고리"
          dataIndex="id"
          key="id"
          render={(text, record) => record.Post?.Board?.title}
        />
        <Column
          title="내가 쓴 댓글"
          key="content"
          render={(text, record) => (
            <Link
              to={`/board/${record?.Post?.Board?.title}/${record?.Post?.id}`}
            >
              {record.content.length > 25
                ? record.content.slice(0, 25)
                : record.content}
            </Link>
          )}
        />{' '}
      </Table>
    </div>
  );
}

export default UserComment;

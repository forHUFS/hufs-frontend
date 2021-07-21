import React from 'react';
import { PUBLIC_IP } from '../../config';
import { Button, message, Popconfirm, Table } from 'antd';

import { Link } from 'react-router-dom';
import useScrap from '../../hooks/useScrap';
import { mutate } from 'swr';
import { deleteScrap } from '../../functions/postFunctions';
function UserScrap() {
  const { Column } = Table;
  const { scrapData, isLoading, isError } = useScrap();
  console.log(scrapData);
  const onRemove = (recordId) => {
    deleteScrap(recordId)
      .then(() => {
        mutate(`${PUBLIC_IP}/user/scrap`);
        message.success('스크랩 삭제');
      })
      .catch((error) => {
        switch (error.response?.data.message) {
          case 'UNAUTHORIZED':
            message.error('로그인하지 않은 사용자');
          case 'FORBIDDEN_SUSPENSION':
            message.error('정지된 사용자');
          case 'FORBIDDEN_BEFORE':
            message.error('이메일 인증이 되지 않은 사용자');
          case 'QUERY':
            message.error('쿼리 스트링 에러, 운영진에게 연락바랍니다.');
          default:
            break;
        }
      });
  };
  if (isLoading) return <>loading..</>;
  return (
    <div>
      <Table pagination={true} dataSource={scrapData}>
        <Column
          title="카테고리"
          dataIndex="id"
          key="id"
          style={{ textAlign: 'center' }}
          render={(text, record) => record.Post.Board.title}
        />
        <Column
          style={{ textAlign: 'center' }}
          title="제목"
          key="content"
          render={(text, record) => (
            <Link
              to={`board/${record?.Post?.Board?.title}/${record?.Post?.id}`}
            >
              {record.Post ? (
                record.Post?.title?.slice(0, 25)
              ) : (
                <> 삭제된 게시글입니다</>
              )}
            </Link>
          )}
        />{' '}
        <Column
          title="삭제하기"
          key="content"
          render={(text, record) => (
            <Popconfirm
              title="스크랩을 삭제하시겠습니까?"
              onConfirm={(e) => onRemove(record.id)}
              okText="Yes"
              cancelText="No"
              value={record.id}
            >
              <Button
                style={{ marginRight: '33%' }}
                type="link"
                value={record.id}
              >
                삭제하기
              </Button>
            </Popconfirm>
          )}
        />
      </Table>
    </div>
  );
}
export default UserScrap;

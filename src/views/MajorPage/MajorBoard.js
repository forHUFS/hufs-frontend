import React, { useEffect, useState } from 'react';
import { postSave } from '../../functions/postFunctions';
import useBoard from '../../hooks/useBoard';
import useErrorHandling from '../../hooks/useErrorHandling';

function MajorBoard(props) {
  const { board, isLoading, isError } = useBoard('24');
  const errorHandling = useErrorHandling();
  // const [posts, setPosts] = useState([]);
  // const [listPerPage, setListPerPage] = useState(10);
  // const [currentPage, setCurrentPage] = useState(1);
  // const lastIndex = currentPage * listPerPage; // 10, 20, 30
  // const firstIndex = currentPage * listPerPage - listPerPage; // 1, 11, 21..
  // useEffect(() => {
  //   if (!isError && !isLoading) {
  //     const postKey = board.map((post, key) => {
  //       return { ...post, key: key + 1 };
  //     });
  //     setPosts(postKey.reverse());
  //   }
  // }, [props.match.params.major, isLoading, board]);

  console.log(props);
  console.log(board);
  if (isLoading) return <>loading..</>;
  if (isError) {
    return errorHandling(isError.response?.data.message);
  }
  return (
    <>
      {/* <table className="community-main">
        <PostSub match={match} />
        <div className="community-box">
          <PostSearch setPosts={setPosts} match={match} />
          <TableBody
            currentList={posts.slice(firstIndex, lastIndex)}
            match={match}
            loading={!isLoading}
          />
          <Button
            className="makepost"
            onClick={(e) =>
              history.push({
                pathname: `${match.path}/edit`,
                state: { detail: match.path },
              })
            }
          >
            글 작성
          </Button>
          <div className="bottom">
            <Pagination
              className="postpagination"
              defaultCurrent={currentPage}
              total={posts.length}
              onChange={(e) => setCurrentPage(e)}
              pageSize={listPerPage}
              showSizeChanger={false}
            />
          </div>
        </div>
      </table> */}
    </>
  );
}

export default MajorBoard;

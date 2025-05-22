import { useEffect, useCallback, useRef } from 'react';
import { fetchComments } from "/src/apis/postApi.js";

import CommentItem from './CommentItem';

import useInfiniteList from '/src/hooks/userInfiniteList.js';
import "./commentList.css";

export default function CommentList({ postId, setCommentCount, commentRefreshTrigger }) {
    const isInit = useRef(true);

    const commentsFetcher = useCallback(async (offset, limit) => {
        return fetchComments(postId, offset, limit);
    }, []);

    const {
        items: comments,
        hasMore,
        loading,
        lastRef,
        resetList
    } = useInfiniteList(commentsFetcher, 10);

    useEffect(() => {
        // useInfiniteList 와의 중복 조회 방지
        if (isInit.current) {
            isInit.current = false;
            return;
        }

        resetList();
    }, [commentRefreshTrigger])

    return (
        <>
            <div className="comment_list">
                {
                    comments.map((comment, index) => {
                        const isLastComment = comments.length === index + 1; // for useInfiniteList
                        return (
                            <CommentItem
                                key={comment.commentId} 
                                ref={isLastComment ? lastRef : null}
                                comment={comment}
                                setCommentCount={setCommentCount}
                                resetList={resetList}
                            />
                        )
                    })
                }
                {loading && <p>댓글 로딩 중...</p>}
            </div>
        </>
    );
}
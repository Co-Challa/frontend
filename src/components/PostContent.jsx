import React from "react";

import "./PostContent.css";

export default function PostContent({post}) {
    return (
        <>
            <div className="post_section">
              {post.content}
            </div>
        </>
    )
}
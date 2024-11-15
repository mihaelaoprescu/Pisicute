import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import styles from "./Feed.module.scss";
import LeftSide from "./leftside/LeftSide";
import NewsFeed from "./newsfeed/Newsfeed";
import RightSide from "./rightside/RightSide";
import postService from "../../services/postService";

const Feed = () => {
  const posts = useFetch("https://jsonplaceholder.typicode.com/posts");
  const [postList, setPostList] = useState([])

  useEffect( () => {
    async function  getPosts() {
      const response = await postService.get()
      setPostList(response)
      return response;  
    }

    getPosts().catch(error => {
      console.log(error)
    })
  }, [])
  return (
    <div className={styles.mainContainer}>
      <aside className={styles.leftSide}>
        <LeftSide />
      </aside>
      <section className={styles.newsfeed}>
        {postList &&
          postList.map((post) => {
            return <NewsFeed postData={post} key={post.id} />;
          })}
      </section>
      <aside className={styles.rightSide}>
        <RightSide />
      </aside>
    </div>
  );
};

export default Feed;

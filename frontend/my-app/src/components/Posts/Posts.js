import React from 'react';
import { useSelector } from "react-redux"
import { Grid, CircularProgress } from "@material-ui/core"
import Post from './Post/Post';
import useStyle from './styles';

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts)

    const classes = useStyle();

    return (
        !posts.length ? <CircularProgress /> : (
            <div styles={{ padding: '10px' }}>
                <Grid className={classes.container} container alignItems="stretch" spacing={1} margin={2}>
                    {posts.map((post) => (
                        <Grid key={post._id} items xs={12} sm={6} md={6}>
                            <Post post={post} setCurrentId={setCurrentId} />
                        </Grid>
                    ))}
                </Grid>
            </div>
        )
    )
}
export default Posts;
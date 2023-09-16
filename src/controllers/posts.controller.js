// todo 비지니스 계층과 연결하기
import { PostsService } from "../services/posts.service.js";

export class PostsController {
    postsService = new PostsService();

    //* 게시글 조회 API
    //클라이언트에게 전달받는 데이터 없음
    getPosts = async (req, res, next) => {
        try {
            const posts = await this.postsService.findAllPosts();

            return res.status(200).json({ data: posts });
        } catch (err) {
            next(err);
        }
    }

    //* 게시글 생성 API
    // 클라이언트에게 전달받는 데이터 있음
    createPost = async (req, res, next) => {
        try {
            // 클라이언트에개 전달받은 데이터를 객체구조 분해 할당 함.
            const { nickname, password, title, content } = req.body;

            const createPost = await this.postsService.createPost(
                nickname, password, title, content
            );

            return res.status(200).json({ data: createPost })
        } catch (err) {
            next(err)
        }
    }

}

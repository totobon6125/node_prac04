//# 저장소 계층과 연결하기
import { PostsRepository } from "../repositories/posts.repository.js"

export class PostsService {
    postsRepository = new PostsRepository();

    //* 게시글 조회 API
    findAllPosts = async () => {
        const posts = await this.postsRepository.findAllPosts();
        //! posts 에는 contents 와 password 가 함께 조회되기 때문에 아래에서 map 을 통해 두 값을 제외한 나머지를 출력함.

        // 게시글을 생성 날짜로 부터 내림차순으로 정렬함.
        //# 정렬작업 하기 sort 로 인해 원본이 정렬 됨!!
        posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        // password 와 content 를 뺀 상태로, controller 에게 Reponse를 전달한다.
        return posts.map((post) => {
            return {
                postId: post.postId,
                nickname: post.nickname,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt
            }
        })
    }

    createPost = async (nickname, password, title, content) => {
        const createdPost = await this.postsRepository.createPost(
            nickname, password, title, content
        );

        return {
            postId: createdPost.postId,
            nickname: createdPost.nickname,
            title: createdPost.title,
            content: createdPost.content,
            createdAt: createdPost.createdAt,
            updatedAt: createdPost.updatedAt
        }

    }

}

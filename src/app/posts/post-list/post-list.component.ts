import {Component, OnDestroy, OnInit} from '@angular/core';
import {Post} from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  private postSub: Subscription;
  onLoading = false;

  constructor(public postService: PostsService) {
  }

  ngOnInit() {
    this.postService.getPosts();
    this.onLoading = true;
    this.postSub = this.postService.getPostUpdateListener()
      .subscribe(
        (posts) => {
          this.onLoading = false;
          this.posts = posts;
        }
      );
  }

  onDelete(postId: string) {
    console.log('PostID', postId);
    this.postService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postSub.unsubscribe();
  }
}

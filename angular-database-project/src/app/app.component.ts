import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,OnDestroy {
  loadedPosts:Post[] = [];
  isfetching=false;
  error=null;
  private errorSub: Subscription=new Subscription;
  ;

  constructor(private http: HttpClient,private postsService:PostsService) {}

  ngOnInit() {
    this.postsService.error.subscribe(errorMessage=>{
      this.error==errorMessage;
    });
    this.isfetching=true;
    this.postsService.fetchPosts().subscribe(posts=>{
      this.isfetching=false;
      this.loadedPosts=posts;
    },error=>{
      this.error=error.message; 
    });

  }

  onCreatePost(postData: Post) {
    // Send Http request
   // console.log(postData);
     
   this.postsService.createAndStorePost(postData.title,postData.content);
 
  }

  onFetchPosts() {
    // Send Http request
    this.isfetching=true;
    this.postsService.fetchPosts().subscribe(posts=>{
      this.isfetching=false;
      this.loadedPosts=posts;
      console.log(posts);
  },error=>{
    this.isfetching=false;
    this.error=error.message; 
    console.log(error);
  });

  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe((posts: any)=>{
      this.loadedPosts=[];
    })
  }
  onHandleError(){
    this.error=null;
  }
  ngOnDestroy(){
      this.errorSub.unsubscribe();
  }

}

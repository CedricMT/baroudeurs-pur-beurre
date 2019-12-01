import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DbService } from '@services/db.service';
import { DataService } from '@services/data.service';
import { ToastService } from '@services/toast.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalCarouselComponent } from './modal-carousel/modal-carousel.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  @Input() articleId: number;
  @Input() title: string;
  @Input() number: number;
  @Input() text: string;
  @Input() imgNb: number;
  @Input() imgDirLabel: string;
  @Input() comments: Array<string>;

  isCommentsCollapsed = true;
  isNewCommentCollapsed = true;
  isOverviewMode = true;

  imagesPath: string[] = [];

  commentForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private db: DbService,
    private toastService: ToastService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    // Create images path array
    this.imagesPath = Array.from({ length: this.imgNb }, (v, i) => this.imgDirLabel + '/' + (i + 1) + '.jpg');

    this.commentForm = this.fb.group({
      author: ['', Validators.required],
      text: ['', Validators.required]
    });
  }

  public open(title, imagesPath) {
    const options = {
      centered: true,
      size: 'xl' as 'lg' // Compiler does not accept 'xl'
    };
    const modalRef = this.modalService.open(ModalCarouselComponent, options);
    let instance = modalRef.componentInstance;
    instance.title = title;
    instance.imagesPath = imagesPath;
  }

  addComment() {
    const comment = Object.assign({ articleId: this.articleId }, this.commentForm.value);
    this.db.addComment(comment).subscribe(
      (results: any) => {
        this.showSuccess('Merci, le commentaire à bien été ajouté !')
        this.data.updateComments();
      },
      (err) => {
        this.showError('Oups, une erreur s\'est produite lors de l\'ajout du commentaire... ')
        console.error('Error while adding comments', err);
      }
    );

    // Collapse new comment form
    this.isNewCommentCollapsed = true;
  }

  HandleOverviewButton(id) {
    // Go to the begining of article
    if (!this.isOverviewMode) {
      location.href = '/flow#article-' + id;
    }

    // Toggle overview mode
    this.isOverviewMode = !this.isOverviewMode
  }

  showSuccess(message: string) {
    this.toastService.show(message, {
      classname: 'bg-success text-light',
      delay: 4000,
      autohide: true,
      headertext: 'Ajout de commentaire :'
    });
  }

  showError(message: string) {
    this.toastService.show(message, {
      classname: 'bg-danger text-light',
      delay: 5000,
      autohide: true,
      headertext: 'Ajout de commentaire :'
    });
  }
}

import { Component, OnInit, Renderer2  } from '@angular/core';
import {SessionStorage} from '../_services/SessionService';
import {Router} from '@angular/router';
import {DatabaseService} from './../_services/DatabaseService';
import {DialogComponent} from './../dialog/dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material';
import {PasswordModalComponent} from '../password-modal/password-modal.component'


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
    
    constructor(private renderer: Renderer2, private router: Router,public alrt:MatDialog, public ses: SessionStorage, public db: DatabaseService , public dialog: DialogComponent) { 
        console.log(db);
    }
    
    ngOnInit() {
        this.get_abacus_con();        
    }
    
    status:boolean = false;
    toggleHeader() {
        this.status = !this.status;
        if(this.status) {
            this.renderer.addClass(document.body, 'active');
        }
        else {
            this.renderer.removeClass(document.body, 'active');
        }
    }
    
    task_cn:any=0;
    get_abacus_con()
    {
        this.db.post_rqst( {}, 'abacusConnect')
        .subscribe(resp=> {
            console.log(resp);
            this.task_cn = resp.result.task_count;
        });
    }
    logout(): void {
        this.ses.logoutSession();
        this.router.navigate(['/']);
    }
    password_modal()
    {
        const dialogRef = this.alrt.open(PasswordModalComponent,{
            width: '500px',
           
           
            data: {
                // 'id' : id,
                // 'mode' : string,
            }
        });
    }
    gotoAbacusConnect()
    {
        window.open("http://crmsupport.abacusdesk.com/projecttaskdetail/djBmSjN1bUZQT0hpOXZnZjB5Q2pPUT09","_blank");
    }
    
    show_actions:any={};
    
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/service/function/categoty.service';
import { Category } from 'src/app/class/category';
import { ToastrService } from 'ngx-toastr';
import { EventService } from 'src/service/function/event.service';

@Component({
  selector: 'app-categoty-admin',
  templateUrl: './categoty-admin.component.html',
  styleUrls: ['./categoty-admin.component.scss']
})
export class CategotyAdminComponent implements OnInit {
  @Output() OutPutCategirytoMenuLeft= new EventEmitter();
  listCategory=[];
  listChild=[];
  idParents:string;
  empty=false;
  edit=false;
  itemEdit:Category= new Category();
  itemCategory:Category=new Category();
  constructor(private categoryservice:CategoryService,    private toastr: ToastrService, private eventService:EventService
    ) { }


  ngOnInit() {
    this.categoryservice.getList().subscribe(res=>{
      this.listCategory=res.data;
      // this.listChild[0].push(res.data);
      // res.data.forEach(el => {

        // });
      console.log(this.listCategory)
    })

    this.categoryservice.watcher.subscribe(data=>{
      this.categoryservice.getList().subscribe(res=>{
        this.listCategory=res.data;
      })
    })
    document.onmousemove=e => {

       let x = e.clientX;
       let y = e.clientY;

       let windowWidth = window.innerWidth;
       let windowHeight = window.innerHeight;
       let mouseXpercentage = Math.round(e.pageX / windowWidth * 100);
       let mouseYpercentage = Math.round(e.pageY / windowHeight * 100);

    }
    document.getElementById('load1').style.display='block';
    document.getElementById('admin1').style.display='none';
    setTimeout(function(){
      document.getElementById('load1').style.display='none';
      document.getElementById('admin1').style.display='block';
    }, 1000);
  }
  clearCoor() {
    document.getElementById("demo1").innerHTML = "";

  }

  updateDB(){
    console.log('da chos');
    this.categoryservice.update();
  }
  addItem(){

  }
  deleteCategory(id){

    this.categoryservice.delete(id).subscribe(res=>{
      console.log(res);
      if(res.data.message='Success'){
        this.toastr.success('Delete categoty Success','Delete success')
      }
      this.categoryservice.update();
    });
  }
  turn(item){
    console.log(item);
    let acts= (item.action==0?1:0)||(item.action==1?0:1);
    let data={
      'idDM': Number(item.idDM),
      'DanhMuc': item.DanhMuc,
      'parentId':item.parent_id,
      'action': acts
    }

   this.OutPutCategirytoMenuLeft.emit(item.idDM);
    this.categoryservice.updateIF(JSON.stringify(data)).subscribe(res=>{
      this.categoryservice.update();
    });
  }
  getCategoryChild(idDM){
    console.log(idDM);
    this.listChild=[];
    console.log(this.listChild)
    this.listCategory.forEach(el => {
      if(el.parent_id==idDM){
        this.listChild.push(el);
      }
    });
    if(this.listChild.length<=1){
      this.empty=false;
    }
    else{
      this.empty=true;
    }
    console.log(this.empty);
  }
  setIdParen(x){
    this.idParents=x;
    console.log(x)
  }
  update(e){
    this.categoryservice.update();
  }
  sentIdUpdate(item){
    this.itemEdit=item;
    this.edit=!this.edit;
    console.log(item);
  }
  updateCate(){
    console.log(this.itemEdit);
    this.categoryservice.updateIF(JSON.stringify(this.itemEdit)).subscribe(res=>{
        this.edit=false;
        this.itemEdit={
          DanhMuc:'',
          action:1,
          idDM:0,
          id_childe:'',
          parent_id:'',
        }
    })
  }



}

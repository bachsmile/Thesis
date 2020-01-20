import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { EventService } from 'src/service/function/event.service';
import { CharityFundService } from 'src/service/function/charity-fund.service';

@Component({
  selector: 'app-manage-fund-public',
  templateUrl: './manage-fund-public.component.html',
  styleUrls: ['./manage-fund-public.component.scss']
})
export class ManageFundPublicComponent  implements OnInit {
  MoneyInput=[];
  MoneyOutput=[];
  AllINPut=0;
  AllOutPut=0;
  PagIn=[];
  PagOut=[];
  active=0;
  active2=0;
  place=[];
  money=0;
  addForm: FormGroup;
  constructor(private charityFund:CharityFundService, private evenService: EventService, private fb: FormBuilder) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      placeS:FormControl
    });
    let  modal = document.getElementById('id01');
    window.onclick=function(event){
      if (event.target == modal) {
        modal.style.display = "none";
    }
    }
    this.evenService.getPlace().subscribe(res=>{
      this.place=res.data;
    })
    this.charityFund.getFund().subscribe(res=>{
      if(res!=null){
        console.log(res);

      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].Status==='1'){
          this.MoneyInput.push(res.data[i]);
        }
        else{
          this.MoneyOutput.push(res.data[i])
        }
      }
      for (let k = 0; k < this.MoneyInput.length; k++) {
        console.log(this.MoneyInput[k])
        this.AllINPut+=parseInt(this.MoneyInput[k].Money);
      }
      for (let o = 0; o < this.MoneyOutput.length; o++) {
        console.log(this.MoneyOutput[o])
        this.AllOutPut+=parseInt(this.MoneyOutput[o].Money);
      }
      this.divPage();
      this.divPage2();
      console.log(this.MoneyOutput);
      }
    });
    this.charityFund.watcher.subscribe(res=>{
      this.MoneyInput=[];
      this.MoneyOutput=[];
      this.AllINPut=0;
      this.AllOutPut=0;
      this.evenService.getPlace().subscribe(res=>{
        this.place=res.data;
      })
      this.charityFund.getFund().subscribe(res=>{
        if(res!=null){
          console.log(res);

        for (let i = 0; i < res.data.length; i++) {
          if(res.data[i].Status==='1'){
            this.MoneyInput.push(res.data[i]);
          }
          else{
            this.MoneyOutput.push(res.data[i])
          }
        }
        for (let k = 0; k < this.MoneyInput.length; k++) {
          console.log(this.MoneyInput[k])
          this.AllINPut+=parseInt(this.MoneyInput[k].Money);
        }
        for (let o = 0; o < this.MoneyOutput.length; o++) {
          console.log(this.MoneyOutput[o])
          this.AllOutPut+=parseInt(this.MoneyOutput[o].Money);
        }
        this.divPage();
        this.divPage2();
        console.log(this.MoneyOutput);
        }
      });
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

  divPage(){
    this.PagIn=[];
    console.log(this.MoneyInput)
    let a=Math.ceil( this.MoneyInput.length/8);
    console.log(a)
    let b=[];
    let c=this.MoneyInput;
    let i = 0;
    let e=8;
    for (let k = 0; k < a; k++) {
      if(e<=c.length){
        for ( i; i < e; i++) {
          b.push(c[i]);
        }
        this.PagIn.push(b);
        e+=8;
        b=[];
      }else{
        e=c.length;
        for ( i; i < e; i++) {
          b.push(c[i]);
        }
        this.PagIn.push(b);
      }
    }
    console.log(this.PagIn);
  };
  page(i){
    this.active=i;
  }
  divPage2(){
    this.PagOut=[];
    console.log(this.MoneyOutput)
    let a=Math.ceil( this.MoneyOutput.length/8);
    console.log(a)
    let b=[];
    let c=this.MoneyOutput;
    let i = 0;
    let e=8;
    for (let k = 0; k < a; k++) {
      if(e<=c.length){
        for ( i; i < e; i++) {
          b.push(c[i]);
        }
        this.PagOut.push(b);
        e+=8;
        b=[];
      }else{
        e=c.length;
        for ( i; i < e; i++) {
          b.push(c[i]);
        }
        this.PagOut.push(b);
      }
    }
    console.log(this.PagOut);
  };
  page2(i){
    this.active2=i;
  }
  datetime(){
    const date = new Date();
    const dateSendingToServer = new DatePipe('en-US').transform(date, 'yyyy/MM/dd hh:mm:ss');
    return dateSendingToServer;
  }
  outFund(){
    let out;
    console.log(this.addForm.value.placeS);
    this.evenService.getPlace().subscribe(res=>{
      let a=[];
      a=res.data;
      a.forEach(x=>{
        if(x.ID_Place==this.addForm.value.placeS){
          out={
            'ID_Shop':'Admin',
            'Name':x.Place,
            'Time':this.datetime(),
            'Money':this.money,
            'Percent':0,
            'Status':0
          };
          this.charityFund.create(JSON.stringify(out)).subscribe(res=>{
            console.log(res);
            this.charityFund.update();
            let  modal = document.getElementById('id01');
            modal.style.display='none';
          })
        }
      })
    })
  }
}

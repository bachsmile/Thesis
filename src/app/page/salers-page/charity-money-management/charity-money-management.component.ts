import { Component, OnInit } from '@angular/core';
import { CharityFundService } from 'src/service/function/charity-fund.service';

@Component({
  selector: 'app-charity-money-management',
  templateUrl: './charity-money-management.component.html',
  styleUrls: ['./charity-money-management.component.scss']
})
export class CharityMoneyManagementComponent  implements OnInit {
  MoneyInput=[];
  MoneyOutput=[];
  AllINPut=0;
  AllOutPut=0;
  constructor(private charityFund:CharityFundService) { }

  ngOnInit() {
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
    let shop={
      ID_Shop:window.localStorage.getItem('ID')
    }
    this.charityFund.getFundID(JSON.stringify(shop)).subscribe(res=>{
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        if(res.data[i].Status==='1'){
          this.MoneyInput.push(res.data[i])
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
      console.log(this.MoneyOutput);
    })
  }

}

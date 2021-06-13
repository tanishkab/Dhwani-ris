import { HttpClient } from '@angular/common/http';
import { AfterContentInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  name = 'Angular';
  @ViewChild('value1') value1: ElementRef;
  @ViewChild('value2') value2: ElementRef;
  @ViewChild('value3') value3: ElementRef;
  @ViewChild('value4') value4: ElementRef;
  numbers:{number:string,id:string}[]=[];
  
 values={
    value1:'',
    value2:'',
    value3:'',
    value4:''
 }

 constructor(private http:HttpClient){

 }

  ngOnInit() {
     this.http.get('https://60c59e57ec8ef800175e1413.mockapi.io/api/v1/card-numbers').subscribe
     ((result:{number:string,id:string}[])=>
     {console.log(result);
      if(result.length>0)
        this.numbers=result;
      console.log(this.numbers);
     });
  }

  onSubmit(form) {

    for(let i=1;i<5;i++)
    {
      if(this[`value${i}`].nativeElement.classList.contains('invalid'))
        this[`value${i}`].nativeElement.classList.remove('invalid');
      if(!/\d{4}/.test(this.values[`value${i}`]))
        this[`value${i}`].nativeElement.classList.add('invalid');   
      console.log((/\D/.test(this.values[`value${i}`])));   
      console.log(this.values[`value${i}`]);
    }
    let no=this.values.value1+this.values.value2+this.values.value3+this.values.value4;
    console.log(no);

    if(/\d{16}/.test(no))
    {
      this.http.post('https://60c59e57ec8ef800175e1413.mockapi.io/api/v1/card-numbers',{number:no})
            .subscribe((result:{number:string,id:string})=>
            {
              console.log(result);
              this.numbers.push(result);
            });

       for(let i=1;i<5;i++)
      {
         this[`value${i}`].nativeElement.classList.remove('invalid');    
      }      
    }
    else
      return;

    if(no.length==16)
     
    console.log(form);
    
  }

  pasted(event: ClipboardEvent,position:number) {
    let pastedNo=event.clipboardData.getData('text').replace(/\s/g, "");

     var x='value'+position;
     console.log(this.values['value'+position]);
      //  console.log(existingValue.value.length); 
     for(let i=position;i<5;i++)
     {
       var existingLen= this.values['value'+i].length || 0;
       var len = pastedNo.length;
       var totalLength=len+existingLen;
       if(totalLength<=4 )
       {//shiftfocus next}
        this.values['value'+i]=pastedNo;
        console.log('here');
        if(totalLength==4 && i<4)
          this['value'+(i+1)].nativeElement.focus();
        else
            this['value'+(i)].nativeElement.focus();
         break;
       }
       else if(totalLength>4)
       {
         var leftNo=4;
         if(i==position) 
         {
            leftNo=4-existingLen;
            this.values['value'+i]+=pastedNo.substring(0,leftNo);
         }   
         else
            this.values['value'+i]=pastedNo.substring(0,leftNo);  
         pastedNo=pastedNo.substring(leftNo);
         console.log(pastedNo);
       }
       console.log(this[`value${position}`]);
       console.log();
       
     }
    return false;
      
  }

  changeFocus(position)
  { 
    console.log(position);
    var len=this.values['value'+position].length;
    if(len==4 && position<4)
       this['value'+(position+1)].nativeElement.focus();
    else if(len==0)
      this['value'+(position-1)].nativeElement.focus();      
  }

  deleteNo(numberId)
  {console.log(numberId);
  console.log(this.numbers);
    this.http.delete('https://60c59e57ec8ef800175e1413.mockapi.io/api/v1/card-numbers/'+numberId)
    .subscribe((result)=>
    {
      const uppdateNo=this.numbers.filter(number=>number.id!=numberId);
      this.numbers=uppdateNo;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Room } from 'src/app/shared/room.model';
import { Faculty } from 'src/app/shared/faculty.model';
import { Course } from 'src/app/shared/course.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  DAYS : string[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
  //ROOMS : Room[];
  //rooms : number[];
  ACBUILS: number[] = [1,2,3];
  
  //COURSES : string[] = ['ALGO', 'OS', 'Design Pattern'];
  //FACULTIES : string[] = ['MBH', 'MRK', 'HK', 'MI', 'TRT'];
  constructor(public service: EmployeeService, private fireStore: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.resetForm();

    this.service.getRooms().subscribe(actionArray4 =>{
      this.service.rooms = actionArray4.map(item4 =>{
        return {
          id : item4.payload.doc.id,
          ...item4.payload.doc.data() as Room
        } as Room;
      })
    });

    this.service.getFaculties().subscribe(actionArray1 =>{
      this.service.faculties = actionArray1.map(item1 =>{
        return{
          id : item1.payload.doc.id,
          ...item1.payload.doc.data() as Faculty
        } as Faculty;
      })
    });

    this.service.getCourses().subscribe(actionArray5 =>{
      this.service.courses = actionArray5.map(item5 => {
        return{
          id: item5.payload.doc.id,
          ...item5.payload.doc.data() as Course
        } as Course;
      })
    });
  }

  /*resetForm(form?:NgForm)   #FOR EMPLOYEE FORM RESET
  {
    if(form != null)
      form.resetForm();
    this.service.formData={
      id : null,
      fullName: '',
      empCode: '',
      postion: '',
      mobile: ''
    }
  }*/

  resetForm(form?:NgForm)
  {
    if(form != null)
      form.resetForm();
    this.service.routineFormData={
      id : null,
      ACBUIL : null,
      COURSE : '',
      DAY : '',
      DEPT : '',
      FACULTY : '',
      ROOM : null,
      SECTION :'',
      SEM : null,
      SPAN : null,
      START_HOUR : null,
      START_MIN : null
    }
  }

  /*onSubmit(form: NgForm)   # FOR EMPLOYEE FORM SUBMIT
  {
    let data = Object.assign({},form.value);
    delete data.id;
    if(form.value.id == null)
      this.fireStore.collection('employees').add(data);
    else
      this.fireStore.doc('employees/'+form.value.id).update(data);  
    this.resetForm(form);
    this.toastr.success("INSERTED SUCCESSFULLY!!","Registration");
  }*/

  onSubmit(form :NgForm)
  {
    let data = Object.assign({}, form.value);
    delete data.id;
    if(form.value.id == null)
      this.fireStore.collection('Routine').add(data);
    else
      this.fireStore.doc('Routine/'+form.value.id).update(data);
    this.resetForm(form);
    this.toastr.success("INSERTED SUCCESSFULLY!!","Registration");
    this.service.ButtonValue = true;
  }

  /*setACBUIL(acbuild:number)
  {
    this.rooms=[];
    for(var room of this.ROOMS){
      if(room.ACBUIL == acbuild){
        this.rooms = room.Rooms;
      }
    }
  }*/

  roomAvail(room : number){
    //console.log(room);
    return '#ff5f14';
  }

}

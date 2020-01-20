import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'tcc-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {
  usernameFormControl = new FormControl('', [Validators.required]);
  previousUsername: string;

  constructor(public dialogRef: MatDialogRef<DialogUserComponent>,
    @Inject(MAT_DIALOG_DATA) public params: any) {
    this.previousUsername = params.username ? params.username : undefined;
  }

  ngOnInit() {
  }

  public onSave(): void {
    this.dialogRef.close({
      username: this.params.username,
      dialogType: this.params.dialogType,
      previousUsername: this.previousUsername
    });
  }
  public onSave1(): void {
    let text;
    let name=[
      "Anger",
      "Cliff",
      "Codon",
      "Exercise",
      "Gram",
      'Gravy',
     'Great-grandfather',
      'Pepper',
      'Prospect',
      'Transaction',
      "Coyote",
      "Folklore",
      "Inn",
      "Kilogram",
      "Novel",
      "Outrigger",
      "Prosecution",
      "Rose",
      "Styling",
      "Vascular",
      "pollution",
      "anger",
      "milk",
      "sink",
      "ship",
      "birth",
      "blood",
      "death",
      "children",
      "request",
      "stone",
      "instrument",
      "notebook",
      "guide",
      "tank",
      "smile",
      "carriage",
      "afterthought",
      "spring",
      "oil",
      "play",
      "store",
      "smell",
      "rock",
      "morning",
      "order",
      "wax",
      "chess",
      "bushes",
      "woman",
      "office",
      "car",
      "creature",
      "letter",
      "front",
      "fly",
      "brass",
      "guitar",
      "collar",
      "flower",
      "zephyr",
      "flag",
      "fall",
      "rings",
      "reading",
      "skate",
      "song",
      "servant",
      "turkey",
      "toy",
      "Dispute",
      'Ethnicity',
      'Parole',
      'Particle',
      'Passport',
      'Sail',
      'Seafood',
      'Search',
      'Tintype',
      'Understatement',
      'Bake',
      'Chives',
      'Facility',
      'Makeup',
      'Mesenchyme',
      'Patience',
      'Sneaker',
      'Softening',
      'Theory',
      'Tote',
      'Avenue',
      'Clam',
      'Cria',
      'Godparent',
      'Heirloom',
      'Impact',
      'Most',
      'Patriarch',
      'Pattypan',
      'Sky',
    ]
      text = Math.floor(Math.random() * 100);
      console.log(name[text]);

    this.params.username=name[text],
    this.dialogRef.close({
      username: this.params.username,
      dialogType: this.params.dialogType,
      previousUsername: this.previousUsername
    });
  }
}

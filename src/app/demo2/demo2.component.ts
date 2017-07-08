import { Component, OnInit } from '@angular/core';
// import { InputModel, GroupModel, TextareaModel, SelectModel, RadiogroupModel, CheckboxModel } from 'ngx-myform';
import { FormConfig, InputModel, GroupModel, TextareaModel, SelectModel, RadiogroupModel, CheckboxGroupModel, CheckboxModel, } from 'ngx-myform';
import { FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
function customeValidator(): ValidatorFn {
  return (g: FormGroup) => {
    return g.get('password').value === g.get('repassword').value
      ? null : { mismatch: true };
  }
}
function customValidatorOtherFormat(g: FormGroup) {
  return g.get('password').value === g.get('repassword').value
    ? null : { mismatch: true };
}
function test_math_2(g: FormGroup) {
  return g.get('test_sub_group_1').value === g.get('test_sub_group_2').value ? null : { notmatch: true };
}
function customEmailValidator(): ValidatorFn {
  return (c: AbstractControl) => {
    if (!c.value) { return null; }
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return reg.test(c.value) ? null : { email_validator_key: true }
  }
}
function customEmailduplicated(control: AbstractControl) {
  const q = new Promise<{ [key: string]: boolean }>((resolve, reject) => {
    setTimeout(() => {
      if (control.value === 'test@gmail.com') {
        resolve({ 'duplicated': true });
      } else {
        resolve(null);
      }
    }, 1000);
  });
  return q;
}
function customCheckboxGroupValidator_1(g: FormGroup) {
  return g.get('checkbox_4').value
    ? null : { shouldlike: true };
}
function customCheckboxGroupValidator_2(g: FormGroup) {
  const num = Object.keys(g.controls).reduce((curr, key) => {
    if (g.get(key).value) {
      curr++;
    }
    return curr;
  }, 0);
  return num > 2 ? null : {
    shouldlikeatleast: true
  }
}
@Component({
  selector: 'app-demo2',
  templateUrl: './demo2.component.html',
  styleUrls: ['./demo2.component.css']
})
export class Demo2Component implements OnInit {
  models = [
    new InputModel({
      id: 'username',
      label: 'username:(use custom class `label_class_1`)',
      validators: [
        { key: 'required', validator: Validators.required, message: 'username is required' },
        { key: 'minlength', validator: Validators.minLength(3), message: 'username must 3 chars at least' }
      ],
      wrappersClass: {
        labelWrapper: ['label_class_1'],
      },
    }),

    new InputModel({
      id: 'age',
      label: 'your age:',
      disabled: true,
      value: "it's a secret :)"
    }),
    new InputModel({
      id: 'niceperson',
      label: '<div style="color:blue;">a nice person?(html label support)</div>',
      value: 'definitly',
      attributes: {
        readonly: 'readonly',
      }
    }),
    new InputModel({
      id: 'avatar',
      label: 'avatar:',
      attributes: {
        type: 'file',
        multiple: 'multiple'
      },
      events: {
        change: (e) => {
          console.log(e.target.files);
        }
      }
    }),
    new CheckboxGroupModel({
      id: 'intrests',
      // inline: false,
      label: 'what do you like:',

      options: [
        {
          id: 'checkbox_1',
          checkLabel: 'basketball',
        },
        {
          id: 'checkbox_2',
          checkLabel: 'football',
        },
        {
          id: 'checkbox_3',
          checkLabel: 'swimming',
        },
        {
          id: 'checkbox_4',
          checkLabel: 'reading',
        },
        {
          id: 'checkbox_5',
          checkLabel: 'music',
        },
      ],
      validators: [
        { key: 'shouldlike', validator: customCheckboxGroupValidator_1, message: 'why not like reading?' },
        { key: 'shouldlikeatleast', validator: customCheckboxGroupValidator_2, message: 'you should like at least 3 item' }
      ],
    }),
    new GroupModel({
      id: 'passwordGroup',
      group: [
        new InputModel({
          id: 'password',
          label: 'password:',
          // disabled: true,
          attributes: {
            type: 'password',
          },
          validators: [
            { key: 'required', validator: Validators.required, message: 'password is required' }
          ],
        }),
        new InputModel({
          id: 'repassword',
          label: 're-password:',

          attributes: {
            type: 'password',
          },
          validators: [
            { key: 'required', validator: Validators.required, message: 'please retype your password' }
          ],
        }),
      ],
      validators: [
        { key: 'mismatch', validator: customeValidator(), message: 'the password not match' },
      ],
    }),
    new InputModel({
      id: 'email',
      label: 'email:',

      prefix: {
        html: '@',
        class: ['input-group-addon'],
      },
      validators: [
        { key: 'email_validator_key', validator: customEmailValidator(), message: 'invalid Email' }
      ],
      asyncValidators: [
        { key: 'duplicated', validator: customEmailduplicated, message: 'Email is already existed!' }
      ],
      wrappersClass: {
        controlWrapper: ['input-group']
      },
    }),
    new InputModel({
      id: 'phone',
      label: 'phone number:',

      validators: [
        { key: 'required', validator: Validators.required, message: 'please fill the phone number' }
      ],
    }),
    new InputModel({
      id: 'verificationcode',
      label: 'verifacation code:',

      validators: [{ key: 'required', validator: Validators.required, message: 'this is required' }],
      suffix: {
        html: '<button type="button" class="btn btn-success" onclick="alert(\'send me verificaton code!\');">send code</button>',
        class: ['border-0', 'ml-3', 'p-0'],
      },
      wrappersClass: {
        controlWrapper: ['input-group']
      },
    }),
    new SelectModel({
      id: 'country',
      label: 'country:',

      value: 'england',
      options: [
        { label: 'select one country', value: '' },
        { label: 'China', value: 'china' },
        { label: 'USA', value: 'usa' },
        { label: 'Japan', value: 'japan' },
        { label: 'England', value: 'england' },
        { label: 'France', value: 'france' },
      ],
      validators: [
        { key: 'required', validator: Validators.required, message: 'country is required' }
      ],
      events: {
        change: () => {
          console.log('ok--changed!');
        }
      }
    }),
    new SelectModel({
      id: 'occupation',
      attributes: {
        multiple: 'multiple',
      },
      label: 'occupation:',
      validators: [{ key: 'required', validator: Validators.required, message: 'occupation is required' }],
      options: [
        { label: 'Programmer', value: 'programmer' },
        { label: 'Teacher', value: 'teacher' },
        { label: 'Dodctor', value: 'doctor' },
        { label: 'Driver', value: 'driver' }
      ],
    }),
    new RadiogroupModel({
      id: 'gender:',
      label: 'gender:',
      legend: {
        value: 'Radio Group Legend!',
      },
      inline: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'xxx', value: 'xxx', disabled: true }
      ],
      validators: [
        { key: 'required', validator: Validators.required, message: 'the gender is required' }
      ],
    }),
    new CheckboxModel({
      id: 'agree',
      value: true,
      required: true,
      checkLabel: 'agree some terms?',
      validators: [
        { key: 'required', validator: Validators.required, message: 'you must agree these terms' }
      ],
    }),
  ];
  formConfig: FormConfig = {
    models: this.models,
    attributes: {
      autocomplete: 'off',
    },
    showErrorsOnSubmit: true,
    wrappersClass: {
      mainWrapper: ['row'],
      labelWrapper: ['global_label_class_1', 'col-3'],
      secondaryWrapper: ['col-9']
    },
  };
  constructor() { }
  ngOnInit() {
  }

  test_submit(form) {
    console.log('test_submit', form.value);
  }
  test_change(data) {
    console.log('test_change', data);
  }
}

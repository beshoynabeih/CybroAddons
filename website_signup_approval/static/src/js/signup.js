/** @odoo-module **/
    import publicWidget from "@web/legacy/js/public/public_widget";
    import { rpc } from "@web/core/network/rpc";

    var MySignUpForm = publicWidget.registry.SignUpForm.extend({
        _onSubmit: function (el) {
        /**
        *Override onSubmit function for sending approval request
        */
        var file = this.$('.get_attach');
        var email = this.$('input[name=login]').val();
        var username = this.$('input[name=name]').val();
        var password = this.$('input[name=password]').val();
        //Get signup information's from user
        const data_array = []
        var count=0;
        for (var doc = 0; doc < file.length; doc++) {
              var SelectedFile = new FileReader();
              var data = SelectedFile.readAsDataURL(file[doc].files[0]);
              SelectedFile.addEventListener('load', (e) => {
                 count++;
                 const data = e.target.result;
                 data_array.push(data)
                 if (count===(file.length)){
                 //Pass parameters to the route
                      const route = rpc("/web/signup/approve",
                      {
                          'data':data_array,
                          'email':email,
                          'username':username,
                          'password':password
                      }
                      )
                 }
              });
            }
        },
    });
    publicWidget.registry.MySignUpForm = MySignUpForm;
    return MySignUpForm;

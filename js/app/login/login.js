function AdminLogin(){
    this.Initialize = function()
    {		var rules = { txtUsername: 'required', txtPassword: { 'required': true, remote:  'actions.php' } };
            var messages = { txtUsername: 'Introduceti numele utilizatorului', txtPassword: { required: 'Introduceti parola', remote: jQuery.validator.format("{0} is already taken.") }  };
            var rules = { txtUsername: 'required', txtPassword: 'required' };		var messages = { txtUsername: 'Introduceti numele utilizatorului', txtPassword: 'Introduceti parola' };
            var vW = new ValidatorWrapper();
            vW.InitValidator('mainForm', rules, messages, function() { verifyAjax(); }, function(label) { successFunction(label); } );
            vW.InitValidator('mainForm', rules, messages);
    }
    function verifyAjax()
    {
        $.get('actions.php', { txtPassword: $('#txtPassword').val() } , function(data) { alert(data); } );		return false;
    }

    function successFunction(label)	{	label.addClass("valid").text("Valid password!");	}
}
var objAdminLogin = new AdminLogin();objAdminLogin.Initialize();
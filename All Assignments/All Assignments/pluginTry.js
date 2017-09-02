$.fn.NumericPlugin = function () {

	this.on("keydown", f);
	return this;
}

var f = function (event) {      
	if (event.keyCode == 46 || event.keyCode == 8) {
		
	}
	else {
		
		if (event.keyCode < 48 || event.keyCode > 57) {
			event.preventDefault();
			alert("only Number can be Entered");
			$(this).val('');
		}
	}
}

var x = $('#txtName');

x.NumericPlugin();

----------------------------------------------------------------
$.fn.numeric=function ()
{

	
$(this).on('keypress',function(event){

		if(event.keyCode<48 || event.keyCode >57 || !event.keyCode==8 || !event.keyCode==46)

            {
            event.preventDefault();
alert('Input can only be a number');

        }
	
});

}



$('input').numeric();
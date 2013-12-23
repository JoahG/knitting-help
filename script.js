//Starting it up...
$(document).ready(function() {
	//right side stuff
    //Selecting all the divs with the "shown" class
	var $shown = $('.shown');
    //and grabbing all of the divs that follow a "shown" div
	var $hid = $('.shown + div');
//This makes the $shown and $hid objects into basically an accordion, but I wasn't very familiar with the jQuery UI when I wrote this, so I made my own.
	$shown.click(function(){
         //Pretty straight-forward, this checks to see if the div after the one that is clicked on already has the class "open"
		if ($(this).next().hasClass("open")){
            //If it does, then the class is removed and the div slid up out of sight
			$(this).next().removeClass("open").slideUp(350); 
		}
		else {
             //Otherwise, the div that *does* have the "open" class has the class removed and is slid up,
			$(".open").removeClass("open").slideUp(350);
            // While the div that we're working with is given the "open" class and is slid down into view
			$(this).next().addClass("open").slideDown(350); 
		}
	});
	//left side stuff
    //An array of the inputs from the Gauge Finding side of the program
	var inputs = [$("#sts"), $("#wid"), $("#row"), $("#len")]; 
	//When the 'Calculate' button is clicked, this function comes in to play
	$("#cal").click(function(){
        //This checks to see which of the radio buttons is checked; 'Inches' or 'Centimeters'
		var $op = ($("input[name=opt]:checked").val());
        //This is the primary function of the program, it does the arithmetic of finding your gauge by finding how many stitches and rows you are using per unit of knitting
		var perInch = function perInch(stitches, width, rows, length) {
            //The number of stitches per unit is equal to the number of stitches divided by the width, then `.toFixed(2)` to keep it down to two decimal points
			var stsPerIn = (parseFloat(stitches)/parseFloat(width)).toFixed(2);
            //Rows per unit is the same basic thing, except it is rows divided by length
			var rowsPerIn = (parseFloat(rows)/parseFloat(length)).toFixed(2);
            //This is where the radio button value comes in; I tack on either "inches" or "centimeters" to the end of this sentence using `$op`
			var ans = "Your gauge is " + stsPerIn + " stitches, " + rowsPerIn + " rows per square " + $op;
			return ans;
		};
		
		for(i = 0; i < 4; i++){
			if (inputs[i].val().length === 0){
				if($("#hid").hasClass("hide")){
					$(".hide").removeClass("hide").addClass("showWrong").text("Please fill in all the Swatch Info fields");
					return;
				}
				else if($("#hid").hasClass("showRight")){
					$(".showRight").removeClass("showRight").addClass("showWrong").text("Please fill in all the Swatch Info fields");
					return;
				}
				else if($("#hid").hasClass("showWrong")){
					$(".showWrong").text("Please fill in all the Swatch Info fields");
					return;
				}
			}
			else if (isNaN(inputs[i].val()) === true){
				$("#hid").removeClass().addClass("showWrong").text("All the inputted values should be numeric");
				return;
			}
			else if (i === 3){
				$("#hid").removeClass().addClass("showRight").text(perInch($("#sts").val(), $("#wid").val(), $("#row").val(), $("#len").val()));
			}
		}
	});
});
	

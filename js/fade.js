$(document).ready(function(){
   $('.firstFade').hide();
   $('.fourth').hide();
   $('.first').fadeIn(1500, function(){
   	$('.second').fadeIn(1500, function(){
   		$('.third').fadeIn(1500, function(){
   			$('.fourth').fadeIn(1500)
   		});
   	});
   });


   $('#1').hide();
   $('#2').hide();
   $('#3').hide();
   $('#4').hide();
  
});

   $(window).scroll(function() {

    if ($(this).scrollTop()>0)
     {
        
         $('#1').fadeIn(1500, function(){
         $('#2').fadeIn(1500, function(){
              $('#3').fadeIn(1500,function(){
                $('#4').fadeIn(1500, function(){

                $( 'div' ).removeClass("placeholder");
                });
              });
         });
     });
     }
    // else
    //  {
    //   $('.a').fadeIn();
    //  }
 });
 //searching

 $('#search').on('focus', function() {
     $(this).css('width', '300px');
     $('.tips').css({
         width: '100%',
         border: ' 1px solid #333',
         'border-top': '0'
     });
 });
 $('#search').on('blur', function() {
     $(this).css('width', '150px');
     $('.tips').css({
         width: '0%',
         border: '0'
     });
 });
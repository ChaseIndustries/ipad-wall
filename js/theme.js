var $body = $('body'),
  $modal = $('#config'),
  $modalClose = $('#config').find('.close'),
  $modalConfirm = $('#config').find('.confirm'),
  $fullScreenLayer = $('#fullScreen'),
  $setupSelect = $('#config').find('.ipad-select--device-chose'),
  $modalCheckbox = $('#fullscreenCheck'),
  i = 0;


$modal.modal('show'); 
$body.addClass('view-all');

$setupSelect.click(function() {
  $modal.modal('hide');
  $body.removeClass('view-all');

  if(!$modalCheckbox.checked) {
    $fullScreenLayer.addClass('hidden');
  }
});

$modalClose.click(function() {
  $body.removeClass('view-all');
  $fullScreenLayer.addClass('hidden');
});

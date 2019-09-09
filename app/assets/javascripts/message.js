$(function(){
  function buildHTML(message){
    var html = `<div class="upper-main">
                  <div class="upper-main__username">
                    ${message.user_name}
                  </div>
                  <div class="upper-main__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="lower-main">
                  <p class="lower-message__content">
                    ${message.content} 
                  </p>
                </div>`
    return html;
  }

  $('.form__submit').removeAttr('data-disable-with')

  function scrollBottom(){
    $('.main').animate({scrollTop: $('.main')[0].scrollHeight});
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main').append(html)
      $('.form__message').val('')
      scrollBottom();
    })
    .fail(function(){
      alert('error')
    })
  })
});
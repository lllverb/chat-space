$(function(){
  function buildHTML(message){
    var withImage = message.image? `<img class="lower-message__image" src="${message.image}" alt="${message.image}">` : ``;

    var aMessage = `<div class="upper-main">
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
                        ${withImage}
                      </div>`
    html = aMessage
    return html
  };

  
  function scrollBottom(){
    $('.main').animate({scrollTop: $('.main')[0].scrollHeight});
  };
  
  $('.form__submit').removeAttr('data-disable-with')
  
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
      $('.main').append(html);

      $('#message_content').val('');
      $('.hidden').val('');

      scrollBottom();
    })
    .fail(function(){
      alert('error');
    })
  })
});
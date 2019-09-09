$(function(){
  function buildHTML(message){
    if (message.image !== null){
      var html = `<div class="upper-main">
                    <div class="upper-main__username">
                      ${message.user_name}
                    </div>
                    <div class="upper-main__date">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="lower-main">
                    <img class="lower-message__image" src="${message.image}" alt="${message.image}"> 
                    <p class="lower-message__content">
                      ${message.content} 
                    </p>
                  </div>`
      return html;
    } else{
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
  }

  $(function(){
    $('.main').animate({scrollTop: $('.main')[0].scrollHeight});
  })

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
      $('.main').append(html)
      $('.form__message').val('')
      $('.hidden').val('')
      $(function(){
        $('.main').animate({scrollTop: $('.main')[0].scrollHeight});
      })
    })
    .fail(function(){
      alert('error')
    })
  })
});
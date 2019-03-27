// offset variable
var offset = 0;



$( document ).ready( showPosts );


function showPassword() {
  input = document.querySelector('#password');
  lockIcon = document.querySelector('#lockIcon');
  if (input.type === 'password') {
    input.type = 'text';
    lockIcon.className = 'fas fa-unlock-alt';
  } else if (input.type === 'text') {
    input.type = 'password';
    lockIcon.className = 'fas fa-lock';
  };
};


function scrollListen() {
  $(window).bind('scroll', function() {
     if ($(window).scrollTop() + $(window).height() > $(document).height() - 300) {
         addPosts(3);
     }
  });
}


function showPosts() {
  addPosts(5);
  scrollListen();
}


function addPosts(n) {
  $(window).off('scroll')
  mHeritageGoService.getPhotos({limit: n, offset: offset})
    .then(photos => {
      $.each(photos, function(index, photo) {
        mHeritageGoService.getPhoto(photo)
          .then(photo_detail => {
            let feed = $('.main_mid')
            let post = $('.post:first').clone()
            post.removeClass('post--display-none')

            post.find('#user-avatar').attr("src", "http:" + photo_detail.account.picture_url)

            post.find('.post__title').html(photo_detail.title[0].content)

            post.find('#area_name').html(photo_detail.area_name)

            post.find(".post__image").attr("src", "http:" + photo_detail.image_url + '?size=medium')

            post.find("#likes").html(photo_detail.like_count)

            post.find("#comments").html(photo_detail.comment_count)
            feed.append(post);
            offset += n;
          })
          .catch(error => { console.log(error); });
      })
      scrollListen();
    })
    .catch($error => { console.log($error); });
}
